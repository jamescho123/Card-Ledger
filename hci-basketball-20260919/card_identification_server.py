#!/usr/bin/env python3
import base64
import io
import json
import pathlib
import re
import sqlite3
import struct
import sys
import threading
import subprocess
import tempfile
import time
from concurrent.futures import ThreadPoolExecutor
from difflib import SequenceMatcher
from functools import lru_cache
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse, parse_qs

import numpy as np
from PIL import Image, ImageOps
from catalog_ordering import ensure_columns, parallel_order
from scan_learning import remember, nearest

ROOT = pathlib.Path(__file__).resolve().parent
sys.path.insert(0, str(ROOT / '.scan-deps'))
try:
    import cv2
    cv2.setNumThreads(1)
except ImportError:
    cv2 = None
DATABASE = ROOT / 'card-search.sqlite3'
EXTRACTED = ROOT / 'extracted'
HOST = '127.0.0.1'
PORT = 8765
WRITE_LOCK = threading.Lock()
VISUAL_LOOKUP = None
LIBRARY = ROOT / 'library.sqlite3'
LEARNING = ROOT / 'scan-learning.sqlite3'
NATIVE_OCR = ROOT / '.scan-deps/card-text-reader'

def read_card_text(payload):
    if sys.platform != 'darwin' or not NATIVE_OCR.is_file():
        return {'available':False, 'orientations':[]}
    encoded = str(payload.get('image') or '').split(',')[-1]
    image = image_from_bytes(base64.b64decode(encoded, validate=True))
    image.thumbnail((2200,2200))
    with tempfile.TemporaryDirectory(prefix='card-ledger-ocr-') as directory:
        photo = pathlib.Path(directory) / 'card.jpg'
        image.save(photo,format='JPEG',quality=95)
        result = subprocess.run([str(NATIVE_OCR),str(photo)],capture_output=True,timeout=25,check=True)
        return {'available':True, **json.loads(result.stdout)}

def catalog_query(params):
    filters, values = [], []
    if 'hci_ids' in params:
        ids = [value for value in params['hci_ids'][0].split(',')[:30] if re.fullmatch(r'[A-Za-z0-9_-]{1,64}', value)]
        filters.append('c.hci_id IN (' + ','.join('?' for _ in ids) + ')' if ids else '0=1')
        values.extend(ids)
    if params.get('images', [''])[0] == '1':
        filters.append("c.image_path!=''")
    for field in ('year', 'brand', 'set_name', 'player', 'parallel', 'card_number', 'hci_id'):
        if params.get(field, [''])[0] or (params.get('family', [''])[0] == '1' and field in params):
            filters.append(f'c.{field}=?')
            values.append(params[field][0])
    words = re.findall(r'\w+', params.get('q', [''])[0], re.UNICODE)[:12]
    if words:
        filters.append('c.id IN (SELECT rowid FROM catalog_search WHERE catalog_search MATCH ?)')
        values.append(' AND '.join('"' + word + '"*' for word in words))
    where = ' WHERE ' + ' AND '.join(filters) if filters else ''
    limit = min(5000, max(1, int(params.get('limit', ['24'])[0])))
    offset = max(0, int(params.get('offset', ['0'])[0]))
    grouped = params.get('group', [''])[0] == '1'
    sorts = {
        'newest': 'CAST(c.year AS INTEGER) DESC,c.player COLLATE NOCASE,c.card_number,c.id',
        'oldest': 'CAST(c.year AS INTEGER),c.player COLLATE NOCASE,c.card_number,c.id',
        'player': 'c.player COLLATE NOCASE,CAST(c.year AS INTEGER) DESC,c.set_name,c.card_number,c.id',
        'set': 'c.brand COLLATE NOCASE,c.set_name COLLATE NOCASE,CAST(c.year AS INTEGER) DESC,c.player,c.card_number,c.id',
        'number': 'CAST(c.card_number AS INTEGER),c.card_number COLLATE NOCASE,c.year DESC,c.player,c.id',
        'parallel': parallel_order()
    }
    order = sorts.get(params.get('sort', ['newest'])[0], sorts['newest'])
    with sqlite3.connect(LIBRARY) as db:
        ensure_columns(db)
        db.row_factory = sqlite3.Row
        if grouped:
            family = 'c.year,c.brand,c.set_name,c.player,c.card_number'
            families = ('SELECT id AS representative_id,variant_count,image_count FROM (SELECT c.id,'
                        f'ROW_NUMBER() OVER (PARTITION BY {family} ORDER BY {parallel_order()}) AS rank,'
                        f'COUNT(*) OVER (PARTITION BY {family}) AS variant_count,'
                        f'SUM(c.image_path!=\'\') OVER (PARTITION BY {family}) AS image_count FROM catalog c' + where +
                        ') WHERE rank=1')
            total = db.execute('SELECT count(*) FROM (SELECT 1 FROM catalog c' + where + ' GROUP BY ' + family + ')', values).fetchone()[0]
            rows = db.execute('WITH families AS (' + families + ') SELECT c.*,f.variant_count,f.image_count FROM families f '
                              'JOIN catalog c ON c.id=f.representative_id ORDER BY ' + order + ' LIMIT ? OFFSET ?', values+[limit,offset]).fetchall()
        else:
            total = db.execute('SELECT count(*) FROM catalog c' + where, values).fetchone()[0]
            rows = db.execute('SELECT c.*,1 AS variant_count,(c.image_path!=\'\') AS image_count FROM catalog c' + where + ' ORDER BY ' + order + ' LIMIT ? OFFSET ?', values + [limit, offset]).fetchall()
        result = [{**dict(row), 'imageUrl': f'http://{HOST}:{PORT}/reference?id={row["id"]}' if row['image_path'] else '',
                   'coverage': 'reference-image' if row['image_path'] else 'metadata-only'} for row in rows]
        facets = {}
        if params.get('facets', [''])[0] == '1':
            for field in ('year', 'brand', 'set_name', 'player', 'parallel'):
                facets[field] = [row[0] for row in db.execute(f'SELECT DISTINCT c.{field} FROM catalog c' + where + f' ORDER BY c.{field} LIMIT 1500', values) if row[0]]
        coverage = db.execute("SELECT count(*),sum(image_path!='') FROM catalog").fetchone()
    return {'cards': result, 'total': total, 'offset': offset, 'facets': facets, 'grouped':grouped,
            'coverage': {'metadata': coverage[0], 'imageReferences': coverage[1], 'snapshot': '2026-09-19'}}

def visual_candidate_rows(image):
    global VISUAL_LOOKUP
    path = ROOT / 'visual-lookup.npz'
    if not path.exists():
        return []
    if VISUAL_LOOKUP is None:
        with np.load(path) as data:
            VISUAL_LOOKUP = (data['ids'], data['hashes'])
    ids, hashes = VISUAL_LOOKUP
    bits = np.array([value.bit_count() for value in range(256)], dtype=np.uint8)
    distances = np.full(len(ids), 64, dtype=np.uint16)
    for scale in (1.0, 0.95, 0.9):
        width, height = image.size
        crop = image.crop(((1-scale)*width/2, (1-scale)*height/2, (1+scale)*width/2, (1+scale)*height/2))
        gray = np.asarray(crop.convert('L').resize((9, 8), Image.Resampling.LANCZOS))
        signature = np.packbits((gray[:, 1:] > gray[:, :-1]).reshape(-1))
        distances = np.minimum(distances, bits[np.bitwise_xor(hashes, signature)].sum(axis=1))
    selected = ids[np.argsort(distances)[:160]].tolist()
    with sqlite3.connect(DATABASE) as connection:
        connection.row_factory = sqlite3.Row
        return [dict(row) for row in connection.execute(
            'SELECT * FROM cards WHERE id IN (' + ','.join('?' for _ in selected) + ')', selected
        )]

def normalized(value):
    return re.sub(r'[^a-z0-9]+', ' ', str(value or '').lower()).strip()

def image_from_bytes(payload):
    image = Image.open(io.BytesIO(payload))
    return ImageOps.exif_transpose(image).convert('RGB')

def photo_variants(image):
    """Keep the original; rectify a plausible outer card without editing the upload."""
    variants = [image]
    if cv2 is None:
        return variants, False
    preview = image.copy()
    preview.thumbnail((1200, 1200))
    rgb = np.asarray(preview)
    gray = cv2.cvtColor(rgb, cv2.COLOR_RGB2GRAY)
    edges = cv2.Canny(cv2.GaussianBlur(gray, (5, 5), 0), 35, 110)
    edges = cv2.morphologyEx(edges, cv2.MORPH_CLOSE, np.ones((5, 5), np.uint8))
    contours, _ = cv2.findContours(edges, cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
    detected = False
    area = gray.shape[0] * gray.shape[1]
    for contour in sorted(contours, key=cv2.contourArea, reverse=True)[:40]:
        fraction = cv2.contourArea(contour) / area
        if not 0.16 <= fraction <= 0.98:
            continue
        polygon = cv2.approxPolyDP(contour, 0.025 * cv2.arcLength(contour, True), True)
        if len(polygon) != 4 or not cv2.isContourConvex(polygon):
            continue
        points = polygon.reshape(4, 2).astype(np.float32)
        sums, differences = points.sum(axis=1), np.diff(points, axis=1).ravel()
        ordered = np.array([points[np.argmin(sums)], points[np.argmin(differences)],
                            points[np.argmax(sums)], points[np.argmax(differences)]], dtype=np.float32)
        if len(np.unique(ordered, axis=0)) != 4:
            continue
        width = max(np.linalg.norm(ordered[1]-ordered[0]), np.linalg.norm(ordered[2]-ordered[3]))
        height = max(np.linalg.norm(ordered[3]-ordered[0]), np.linalg.norm(ordered[2]-ordered[1]))
        if min(width, height) < 100 or not 0.55 <= width / height <= 0.85:
            continue
        destination = np.array([[0,0],[799,0],[799,1119],[0,1119]], dtype=np.float32)
        warped = cv2.warpPerspective(rgb, cv2.getPerspectiveTransform(ordered, destination), (800,1120))
        variants.append(Image.fromarray(warped))
        detected = True
        break
    # CLAHE improves dim text and shape retrieval without replacing original colors.
    lighting_image = variants[-1].copy()
    lighting_image.thumbnail((1200,1200))
    source = np.asarray(lighting_image)
    lab = cv2.cvtColor(source, cv2.COLOR_RGB2LAB)
    lab[:,:,0] = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8,8)).apply(lab[:,:,0])
    variants.append(Image.fromarray(cv2.cvtColor(lab, cv2.COLOR_LAB2RGB)))
    return variants, detected

def prepare_photo(payload):
    encoded = str(payload.get('image') or '').split(',')[-1]
    variants, detected = photo_variants(image_from_bytes(base64.b64decode(encoded, validate=True)))
    photo = variants[-1]
    buffer = io.BytesIO()
    photo.save(buffer, format='JPEG', quality=92)
    return {'image':'data:image/jpeg;base64,' + base64.b64encode(buffer.getvalue()).decode(),
            'cardBoundaryDetected':detected, 'lightingNormalized':cv2 is not None}

def detect_cards(payload):
    """Find separate card/slab outlines; return independent perspective crops."""
    encoded = str(payload.get('image') or '').split(',')[-1]
    original = image_from_bytes(base64.b64decode(encoded, validate=True))
    if cv2 is None:
        return {'cards': [], 'available': False}
    preview = original.copy()
    preview.thumbnail((1800, 1800))
    rgb = np.asarray(preview)
    gray = cv2.cvtColor(rgb, cv2.COLOR_RGB2GRAY)
    area = gray.size
    candidates = []
    for low, high in ((30, 90), (70, 180)):
        edges = cv2.Canny(cv2.GaussianBlur(gray, (5, 5), 0), low, high)
        edges = cv2.morphologyEx(edges, cv2.MORPH_CLOSE, np.ones((5, 5), np.uint8))
        contours, _ = cv2.findContours(edges, cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
        for contour in contours:
            size = cv2.contourArea(contour)
            if not .018 * area < size < .94 * area:
                continue
            polygon = cv2.approxPolyDP(contour, .025 * cv2.arcLength(contour, True), True)
            if len(polygon) != 4 or not cv2.isContourConvex(polygon):
                continue
            points = polygon.reshape(4, 2).astype(np.float32)
            sums, differences = points.sum(axis=1), np.diff(points, axis=1).ravel()
            ordered = np.array([points[np.argmin(sums)], points[np.argmin(differences)],
                                points[np.argmax(sums)], points[np.argmax(differences)]])
            if len(np.unique(ordered, axis=0)) != 4:
                continue
            width = max(np.linalg.norm(ordered[1]-ordered[0]), np.linalg.norm(ordered[2]-ordered[3]))
            height = max(np.linalg.norm(ordered[3]-ordered[0]), np.linalg.norm(ordered[2]-ordered[1]))
            ratio = min(width, height) / max(width, height)
            if not .48 < ratio < .83 or min(width, height) < 80:
                continue
            candidates.append((size, ordered, width, height))
    selected = []
    for candidate in sorted(candidates, key=lambda entry: -entry[0]):
        size, points, width, height = candidate
        if any(cv2.intersectConvexConvex(points, other[1])[0] / min(size, other[0]) > .55 for other in selected):
            continue
        selected.append(candidate)
    method = 'outlines'
    # Touching clear holders often form one open contour. Separate colored card
    # interiors instead, and require the user to review these approximate crops.
    if len(selected) < 2:
        hsv = cv2.cvtColor(rgb, cv2.COLOR_RGB2HSV)
        mask = np.uint8((hsv[:,:,1] > 75) & (hsv[:,:,2] > 70)) * 255
        kernel = max(3, round(min(preview.size) * .025))
        mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, np.ones((kernel, kernel), np.uint8))
        contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        components = []
        for contour in contours:
            size = cv2.contourArea(contour)
            x, y, width, height = cv2.boundingRect(contour)
            if .018 * area < size < .35 * area and .45 < width / height < 2.2:
                components.append((size, x, y, width, height))
        if components:
            largest = max(entry[0] for entry in components)
            components = [entry for entry in components if entry[0] > largest * .2]
        if 3 <= len(components) <= 20:
            expanded = []
            for size, x, y, width, height in components:
                left, top = max(0,x-width*.35), max(0,y-height*.16)
                right, bottom = min(preview.width-1,x+width*1.35), min(preview.height-1,y+height*1.16)
                points = np.array([[left,top],[right,top],[right,bottom],[left,bottom]], dtype=np.float32)
                expanded.append((size,points,right-left,bottom-top))
            # Keep neighboring crop padding from including a second card.
            boxes = [[entry[1][0,0],entry[1][0,1],entry[1][2,0],entry[1][2,1]] for entry in expanded]
            centers = [((x+r)/2,(y+b)/2) for x,y,r,b in boxes]
            for i, first in enumerate(boxes):
                for j in range(i+1,len(boxes)):
                    second = boxes[j]
                    horizontal = max(0,min(first[2],second[2])-max(first[0],second[0]))
                    vertical = max(0,min(first[3],second[3])-max(first[1],second[1]))
                    if horizontal > .6 * min(first[2]-first[0],second[2]-second[0]):
                        upper, lower = (first,second) if centers[i][1]<centers[j][1] else (second,first)
                        boundary = (centers[i][1]+centers[j][1])/2
                        upper[3]=min(upper[3],boundary);lower[1]=max(lower[1],boundary)
                    elif vertical > .6 * min(first[3]-first[1],second[3]-second[1]):
                        left, right = (first,second) if centers[i][0]<centers[j][0] else (second,first)
                        boundary = (centers[i][0]+centers[j][0])/2
                        left[2]=min(left[2],boundary);right[0]=max(right[0],boundary)
            expanded = [(entry[0],np.array([[x,y],[r,y],[r,b],[x,b]],dtype=np.float32),r-x,b-y)
                        for entry,(x,y,r,b) in zip(expanded,boxes)]
            selected = expanded
            method = 'color-regions'
    if len(selected) > 20:
        raise ValueError('More than 20 card regions detected. Photograph smaller groups.')
    selected.sort(key=lambda entry: (int(entry[1][:,1].mean() / (preview.height * .16)), entry[1][:,0].mean()))
    cards = []
    scale = original.width / preview.width
    for _, points, width, height in selected:
        width, height = max(1, round(width * scale)), max(1, round(height * scale))
        factor = min(1, 1400 / max(width, height))
        width, height = round(width * factor), round(height * factor)
        destination = np.array([[0,0],[width-1,0],[width-1,height-1],[0,height-1]], dtype=np.float32)
        warped = cv2.warpPerspective(np.asarray(original), cv2.getPerspectiveTransform(points * scale, destination), (width,height))
        buffer = io.BytesIO()
        Image.fromarray(warped).save(buffer, format='JPEG', quality=92)
        cards.append({'image':'data:image/jpeg;base64,' + base64.b64encode(buffer.getvalue()).decode(),
                      'corners':(points / np.array([preview.width, preview.height])).tolist()})
    return {'cards':cards, 'available':True, 'method':method, 'reviewRequired':method=='color-regions'}

def image_signature(image):
    width, height = image.size
    crops = []
    hashes = []
    for scale in (1.0, 0.9, 0.8):
        crop_width, crop_height = max(1, int(width * scale)), max(1, int(height * scale))
        left, top = (width - crop_width) // 2, (height - crop_height) // 2
        crop = image.crop((left, top, left + crop_width, top + crop_height))
        gray = np.asarray(ImageOps.fit(crop.convert('L'), (16, 22), Image.Resampling.LANCZOS), dtype=np.uint8)
        crops.append(gray)
        dhash_image = np.asarray(crop.convert('L').resize((9, 8), Image.Resampling.LANCZOS), dtype=np.uint8)
        bits = (dhash_image[:, 1:] > dhash_image[:, :-1]).reshape(-1)
        hashes.append(sum(int(bit) << index for index, bit in enumerate(bits)))
    histogram = []
    thumbnail = image.resize((64, 64), Image.Resampling.LANCZOS)
    array = np.asarray(thumbnail, dtype=np.uint8)
    for channel in range(3):
        counts, _ = np.histogram(array[:, :, channel], bins=16, range=(0, 256))
        histogram.extend((counts / max(1, counts.sum())).astype(np.float32))
    header = struct.pack('<3Q', *hashes)
    return header + np.stack(crops).tobytes() + np.asarray(histogram, dtype=np.float32).tobytes()

def unpack_signature(payload):
    hashes = struct.unpack('<3Q', payload[:24])
    gray_end = 24 + 3 * 16 * 22
    crops = np.frombuffer(payload[24:gray_end], dtype=np.uint8).reshape((3, 22, 16))
    histogram = np.frombuffer(payload[gray_end:], dtype=np.float32)
    return hashes, crops, histogram

def signature_score(query_payload, candidate_payload):
    query_hashes, query_crops, query_hist = unpack_signature(query_payload)
    candidate_hashes, candidate_crops, candidate_hist = unpack_signature(candidate_payload)
    best_correlation = 0.0
    best_hash = 0.0
    best_local = 0.0
    for query_crop, query_hash in zip(query_crops, query_hashes):
        q = query_crop.astype(np.float32)
        q = (q - q.mean()) / max(float(q.std()), 1.0)
        for candidate_crop, candidate_hash in zip(candidate_crops, candidate_hashes):
            c = candidate_crop.astype(np.float32)
            c = (c - c.mean()) / max(float(c.std()), 1.0)
            correlation = float(np.mean(q * c))
            best_correlation = max(best_correlation, max(0.0, min(1.0, (correlation + 1) / 2)))
            best_hash = max(best_hash, 1.0 - ((query_hash ^ candidate_hash).bit_count() / 64.0))
            if cv2 is not None:
                q_local = q - cv2.GaussianBlur(q, (0,0), 2)
                c_local = c - cv2.GaussianBlur(c, (0,0), 2)
                denominator = float(np.linalg.norm(q_local) * np.linalg.norm(c_local))
                if denominator > 0:
                    local = float(np.sum(q_local * c_local)) / denominator
                    best_local = max(best_local, max(0.0, (local+1)/2))
    histogram = float(np.minimum(query_hist, candidate_hist).sum() / 3.0)
    original = best_correlation * 0.68 + histogram * 0.2 + best_hash * 0.12
    lighting_tolerant = max(best_correlation, best_local - 0.02) * 0.8 + histogram * 0.08 + best_hash * 0.12
    return max(0.0, min(1.0, max(original, lighting_tolerant)))

def metadata_score(card, identity, raw_text):
    player_key = normalized(identity.get('player'))
    year = normalized(identity.get('year'))
    brand = normalized(identity.get('brand'))
    set_name = normalized(identity.get('setName'))
    number = normalized(identity.get('cardNumber')).lstrip('0')
    parallel = normalized(identity.get('parallel'))
    raw = normalized(raw_text)
    score, possible = 0.0, 0.0
    fields = [
        (player_key, card['player_key'], 0.38), (year[:4], normalized(card['year'])[:4], 0.14),
        (brand, card['brand_key'], 0.1), (set_name, card['set_key'], 0.17),
        (number, normalized(card['card_number']).lstrip('0'), 0.14),
        (parallel, normalized(card['parallel']), 0.07)
    ]
    for expected, actual, weight in fields:
        if not expected:
            continue
        possible += weight
        if expected == actual:
            score += weight
        elif expected in actual or actual in expected:
            score += weight * 0.88
        else:
            score += weight * SequenceMatcher(None, expected, actual).ratio() * 0.35
    if raw:
        set_tokens = [token for token in card['set_key'].split() if len(token) > 3 and token not in {'basketball','cards','panini'}]
        if set_tokens and any(token in raw for token in set_tokens):
            score += 0.04
            possible += 0.04
    return score / possible if possible else 0.0

def candidate_rows(identity, raw_text):
    connection = sqlite3.connect(DATABASE)
    connection.row_factory = sqlite3.Row
    player_key = normalized(identity.get('player'))
    year = normalized(identity.get('year'))[:4]
    brand_key = normalized(identity.get('brand'))
    if player_key:
        rows = connection.execute('SELECT * FROM cards WHERE player_key=?', (player_key,)).fetchall()
    elif year and brand_key:
        rows = connection.execute('SELECT * FROM cards WHERE year LIKE ? AND brand_key=? LIMIT 6000', (f'{year}%', brand_key)).fetchall()
    elif year:
        rows = connection.execute('SELECT * FROM cards WHERE year LIKE ? LIMIT 6000', (f'{year}%',)).fetchall()
    else:
        rows = []
    connection.close()
    return [dict(row) for row in rows]

def cached_or_compute(card):
    image_path = EXTRACTED / pathlib.Path(*pathlib.PurePosixPath(card['image_path']).parts)
    if not image_path.is_file():
        return card, None
    size = image_path.stat().st_size
    connection = sqlite3.connect(DATABASE)
    cached = connection.execute('SELECT file_size,signature FROM visual_signatures WHERE image_path=?', (card['image_path'],)).fetchone()
    connection.close()
    if cached and cached[0] == size:
        return card, cached[1]
    try:
        signature = image_signature(Image.open(image_path).convert('RGB'))
    except Exception:
        return card, None
    with WRITE_LOCK:
        connection = sqlite3.connect(DATABASE)
        connection.execute('INSERT OR REPLACE INTO visual_signatures(image_path,file_size,signature) VALUES(?,?,?)', (card['image_path'], size, signature))
        connection.commit()
        connection.close()
    return card, signature

def local_features(image):
    if cv2 is None:
        return None
    image=image.copy()
    image.thumbnail((650,900))
    gray=cv2.cvtColor(np.asarray(image),cv2.COLOR_RGB2GRAY)
    points,descriptors=cv2.ORB_create(nfeatures=900,fastThreshold=10).detectAndCompute(gray,None)
    if descriptors is None or len(points)<10:
        return None
    return np.float32([point.pt for point in points]),descriptors,gray.shape

@lru_cache(maxsize=4096)
def reference_features(image_path):
    try:
        return local_features(Image.open(EXTRACTED / image_path).convert('RGB'))
    except (OSError,ValueError):
        return None

def geometric_match(query, image_path):
    reference=reference_features(image_path)
    if query is None or reference is None:
        return 0.0
    points,descriptors,shape=query
    ref_points,ref_descriptors,_=reference
    matches=cv2.BFMatcher(cv2.NORM_HAMMING).knnMatch(descriptors,ref_descriptors,k=2)
    good=[pair[0] for pair in matches if len(pair)==2 and pair[0].distance < .72*pair[1].distance]
    if len(good)<10:
        return 0.0
    source=np.float32([points[match.queryIdx] for match in good])
    target=np.float32([ref_points[match.trainIdx] for match in good])
    _,mask=cv2.findHomography(source,target,cv2.RANSAC,4)
    if mask is None:
        return 0.0
    accepted=mask.ravel().astype(bool)
    inliers=int(accepted.sum())
    coverage=cv2.contourArea(cv2.convexHull(source[accepted]))/(shape[0]*shape[1]) if inliers>=3 else 0
    if inliers<10 or inliers/len(good)<.45 or coverage<.035:
        return 0.0
    return min(.985,.90+inliers*.001)

def learning_signature(image):
    return image_signature(ImageOps.autocontrast(image, cutoff=1))


def learn_scan(payload):
    card_id = str(payload.get('hciId') or '')
    rows = catalog_query({'hci_id': [card_id], 'limit': ['1']})['cards']
    if not rows or payload.get('confirmed') is not True:
        raise ValueError('An explicitly confirmed HCI record is required')
    image = image_from_bytes(base64.b64decode(str(payload.get('image') or '').split(',')[-1], validate=True))
    with WRITE_LOCK:
        remember(LEARNING, payload.get('learningScope'), image, card_id, learning_signature(image))
    return {'learned': True}


def learned_scan_match(payload, image, signatures):
    if not payload.get('learningScope') or not LEARNING.exists():
        return None
    signatures = [learning_signature(image.rotate(angle, expand=True)) for angle in (0, 90, 180, 270)]
    match = nearest(LEARNING, payload.get('learningScope'), image, signatures, signature_score)
    if not match:
        return None
    rows = catalog_query({'hci_id': [match['id']], 'limit': ['1']})['cards']
    if not rows:
        return None
    row = rows[0]
    return {'id': row['hci_id'], 'player': row['player'], 'sport': 'Basketball',
            'year': row['year'], 'brand': row['brand'], 'setName': row['set_name'],
            'parallel': row['parallel'], 'cardNumber': row['card_number'], 'title': row['title'],
            'imagePath': row['image_path'], 'score': match['score'], 'visualScore': match['score'],
            'metadataScore': 0, 'confirmedExample': True, 'exactExample': match['exact']}


def identify(payload):
    started = time.time()
    image_value = str(payload.get('image') or '')
    encoded = image_value.split(',', 1)[1] if ',' in image_value else image_value
    query_image = image_from_bytes(base64.b64decode(encoded, validate=True))
    query_signature = image_signature(query_image)
    variants, boundary_detected = photo_variants(query_image)
    query_signatures = [query_signature] + [image_signature(variant) for variant in variants[1:]]
    query_signatures.extend(image_signature(query_image.rotate(angle,expand=True)) for angle in (90,180,270))
    try:
        learned = learned_scan_match(payload, query_image, query_signatures)
    except (sqlite3.DatabaseError, ValueError):
        learned = None  # A damaged optional learning store must not disable HCI scans.
    if learned:
        return {'matches': [learned], 'candidateCount': 1, 'comparedCount': 1,
                'elapsedMs': round((time.time() - started) * 1000)}
    identity = payload.get('identity') or {}
    raw_text = str(payload.get('rawText') or '')
    rows = candidate_rows(identity, raw_text)
    image_only = not rows
    visual_rows = list({card['id']:card for variant in variants for card in visual_candidate_rows(variant)}.values())
    if image_only:
        rows = visual_rows
    if not rows:
        return {'matches': [], 'candidateCount': 0, 'elapsedMs': round((time.time() - started) * 1000)}
    ranked_metadata = sorted(rows, key=lambda card: metadata_score(card, identity, raw_text), reverse=True)
    specific_fields = sum(bool(identity.get(key)) for key in ('year','brand','setName','cardNumber','parallel'))
    pool = ranked_metadata[:800] if specific_fields >= 2 else ranked_metadata[:4000]
    # OCR must not exclude a visually matching card from a different player.
    pool = list({card['id']: card for card in pool + visual_rows}.values())
    results = []
    # Fetch cached reference signatures once instead of reopening SQLite per card.
    cached = {}
    with sqlite3.connect(DATABASE) as connection:
        for start in range(0, len(pool), 500):
            paths = [card['image_path'] for card in pool[start:start + 500]]
            placeholders = ','.join('?' for _ in paths)
            cached.update(connection.execute(
                f'SELECT image_path,signature FROM visual_signatures WHERE image_path IN ({placeholders})', paths
            ).fetchall())
    def reference_signature(card):
        signature = cached.get(card['image_path'])
        return (card, signature) if signature is not None else cached_or_compute(card)
    with ThreadPoolExecutor(max_workers=8) as executor:
        for card, signature in executor.map(reference_signature, pool, chunksize=20):
            if not signature:
                continue
            visual = max(signature_score(query, signature) for query in query_signatures)
            metadata = metadata_score(card, identity, raw_text)
            player_confidence = float((identity.get('fieldConfidence') or {}).get('player') or 0)
            weight = 0.22 if player_confidence >= 0.84 else 0.08
            score = visual if image_only else visual * (1 - weight) + metadata * weight
            results.append((score, visual, metadata, card))
    results.sort(key=lambda item: (item[0], item[1]), reverse=True)
    geometric={}
    if cv2 is not None and identity.get('player'):
        query_features=local_features(query_image)
        # Artwork feature geometry tolerates rotation/perspective and distinguishes
        # a photo of one card from a merely similar color histogram.
        player_rows=[entry[3] for entry in results if normalized(entry[3]['player'])==normalized(identity['player'])]
        families={}
        for card in player_rows:
            families.setdefault((card['year'],card['brand'],card['set_name']),card)
        geometrical_pool=list({card['id']:card for card in player_rows[:160]+list(families.values())}.values())[:900]
        with ThreadPoolExecutor(max_workers=4) as executor:
            scores=executor.map(lambda card:geometric_match(query_features,card['image_path']),geometrical_pool)
            geometric={card['id']:value for card,value in zip(geometrical_pool,scores) if value>=.91}
        results=[(max(score,geometric.get(card['id'],0)),max(visual,geometric.get(card['id'],0)),metadata,card) for score,visual,metadata,card in results]
        results.sort(key=lambda item:(item[0],item[1]),reverse=True)
    matches = []
    for score, visual, metadata, card in results[:8]:
        matches.append({
            'id': card['hci_card_id'] or str(card['id']), 'player': card['player'], 'sport': 'Basketball',
            'year': card['year'], 'brand': card['brand'], 'setName': card['set_name'],
            'parallel': card['parallel'], 'cardNumber': card['card_number'], 'title': card['title'],
            'imagePath': card['image_path'], 'score': round(score, 6),
            'visualScore': round(visual, 6), 'metadataScore': round(metadata, 6)
            ,'geometricScore':round(geometric.get(card['id'],0),6)
        })
    return {'matches': matches, 'candidateCount': len(rows), 'comparedCount': len(pool),
            'preprocessing': {'cardBoundaryDetected':boundary_detected, 'lightingNormalized':cv2 is not None, 'variants':len(variants)},
            'elapsedMs': round((time.time() - started) * 1000)}

class Handler(BaseHTTPRequestHandler):
    def log_message(self, fmt, *args):
        return

    def cors(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')

    def send_json(self, status, data):
        body = json.dumps(data).encode('utf-8')
        self.send_response(status)
        self.cors()
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self.send_response(204)
        self.cors()
        self.end_headers()

    def do_GET(self):
        route = urlparse(self.path)
        params = parse_qs(route.query)
        if route.path == '/scan-players':
            with sqlite3.connect(DATABASE) as db:
                players = [row[0] for row in db.execute('SELECT DISTINCT player FROM cards WHERE player IS NOT NULL AND player != "" ORDER BY player')]
            self.send_json(200, {'players': players})
        elif route.path == '/catalog':
            try:
                if not LIBRARY.is_file():
                    raise ValueError('Library index is not ready')
                self.send_json(200, catalog_query(params))
            except Exception as error:
                self.send_json(400, {'error': str(error)})
        elif route.path == '/reference':
            try:
                with sqlite3.connect(LIBRARY) as db:
                    row = db.execute('SELECT image_path FROM catalog WHERE id=?', (int(params.get('id', ['0'])[0]),)).fetchone()
                if not row or not row[0]:
                    raise ValueError('No reference image')
                path = (EXTRACTED / row[0]).resolve()
                if not path.is_relative_to(EXTRACTED.resolve()) or not path.is_file():
                    raise ValueError('Reference unavailable')
                # Serve compact previews, not full-resolution dataset files.
                with Image.open(path) as source:
                    preview = source.convert('RGB')
                    preview.thumbnail((560, 780))
                    buffer = io.BytesIO()
                    preview.save(buffer, format='JPEG', quality=85)
                body = buffer.getvalue()
                self.send_response(200)
                self.cors()
                self.send_header('Content-Type', 'image/jpeg')
                self.send_header('Content-Length', str(len(body)))
                self.send_header('Cache-Control', 'public, max-age=86400')
                self.end_headers()
                self.wfile.write(body)
            except Exception:
                self.send_json(404, {'error': 'Reference image unavailable'})
        elif route.path == '/health':
            self.send_json(200, {'status': 'ok', 'dataset': 'HCI basketball', 'database': DATABASE.exists()})
        else:
            self.send_json(404, {'error': 'not found'})

    def do_POST(self):
        if self.path not in ('/identify', '/prepare', '/detect-cards', '/read-card-text', '/learn-scan'):
            self.send_json(404, {'error': 'not found'})
            return
        try:
            length = int(self.headers.get('Content-Length', '0'))
            if length <= 0 or length > 25 * 1024 * 1024:
                raise ValueError('invalid request size')
            payload = json.loads(self.rfile.read(length))
            operation = {'/prepare':prepare_photo, '/identify':identify, '/detect-cards':detect_cards, '/read-card-text':read_card_text, '/learn-scan':learn_scan}[self.path]
            self.send_json(200, operation(payload))
        except Exception as error:
            self.send_json(400, {'error': str(error)})

def main():
    source = ROOT / 'card_text_reader.swift'
    if sys.platform == 'darwin' and (not NATIVE_OCR.exists() or source.stat().st_mtime > NATIVE_OCR.stat().st_mtime):
        try:
            NATIVE_OCR.parent.mkdir(exist_ok=True)
            subprocess.run(['/usr/bin/swiftc',str(source),'-o',str(NATIVE_OCR)],capture_output=True,timeout=90,check=True)
        except (OSError,subprocess.SubprocessError):
            print('Native card text reader unavailable; browser OCR remains enabled.',flush=True)
    if not DATABASE.is_file():
        raise SystemExit(f'Missing search index: run build_card_search_index.py first ({DATABASE})')
    print(f'Card Ledger HCI identifier listening on http://{HOST}:{PORT}', flush=True)
    ThreadingHTTPServer((HOST, PORT), Handler).serve_forever()

if __name__ == '__main__':
    main()
