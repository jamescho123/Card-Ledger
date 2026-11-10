"""Synthetic photo stress test; source files and recognition hints remain untouched."""
import base64
import importlib.util
import io
import json
import pathlib
import sqlite3
import sys

import numpy as np
from PIL import Image, ImageEnhance

ROOT = pathlib.Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('identifier', ROOT / 'hci-basketball-20260919/card_identification_server.py')
server = importlib.util.module_from_spec(spec)
spec.loader.exec_module(server)


def cases(image):
    image = image.resize((320, 448))
    yield 'clean', image
    yield 'dim', ImageEnhance.Brightness(image).enhance(0.42)
    pixels = np.asarray(image).astype(float)
    gradient = np.linspace(0.25, 1.05, 320)[None, :, None]
    yield 'uneven-light', Image.fromarray(np.clip(pixels * gradient, 0, 255).astype('uint8'))
    yield 'warm-cast', Image.fromarray(np.clip(pixels * [1.2, 0.78, 0.5], 0, 255).astype('uint8'))
    background = Image.new('RGB', (650, 720), (81, 104, 126))
    rotated = image.rotate(13, expand=True, resample=Image.Resampling.BICUBIC)
    mask = Image.new('L', image.size, 255).rotate(13, expand=True, resample=Image.Resampling.BICUBIC)
    background.paste(rotated, (145, 100), mask)
    yield 'background-tilt', background


with sqlite3.connect(server.DATABASE) as db:
    db.row_factory = sqlite3.Row
    cards = [dict(db.execute(sql).fetchone()) for sql in [
        "SELECT * FROM cards WHERE player='Stephen Curry' AND year='2009' AND card_number='321' AND image_path!='' LIMIT 1",
        "SELECT * FROM cards WHERE player='Luka Doncic' AND year='2018' AND card_number='177' AND set_name LIKE '%Donruss%' AND image_path!='' LIMIT 1",
        "SELECT * FROM cards WHERE player='Victor Wembanyama' AND year='2023' AND card_number='238' AND set_name LIKE '%Mosaic%' AND parallel='Black' AND image_path!='' LIMIT 1"
    ]]
rows = []
for card in cards:
    with Image.open(server.EXTRACTED / card['image_path']) as source:
        for condition, image in cases(source.convert('RGB')):
            buffer = io.BytesIO(); image.save(buffer, format='JPEG', quality=90)
            result = server.identify({'image':base64.b64encode(buffer.getvalue()).decode(), 'identity':{}, 'rawText':''})
            top = result['matches'][0] if result['matches'] else {}
            family = all(str(top.get(key, '')) == str(card[field]) for key, field in [('player','player'),('year','year'),('cardNumber','card_number'),('setName','set_name')])
            row = {'player':card['player'], 'condition':condition, 'familyCorrect':family,
                   'referenceInTop8':any(match['imagePath']==card['image_path'] for match in result['matches']),
                   'returned':top.get('title'), 'visualScore':top.get('visualScore'), 'milliseconds':result['elapsedMs']}
            rows.append(row); print(json.dumps(row), flush=True)
summary = {'tested':len(rows), 'familyCorrect':sum(row['familyCorrect'] for row in rows),
           'referenceInTop8':sum(row['referenceInTop8'] for row in rows), 'results':rows}
output = ROOT / 'work' / (sys.argv[1] if len(sys.argv)>1 else 'scan-photo-robustness.json')
output.write_text(json.dumps(summary, indent=2))
print('SAVED', output)
