import pathlib
import json
import sqlite3
import time
from concurrent.futures import ThreadPoolExecutor
import numpy as np
from PIL import Image

root = pathlib.Path(__file__).resolve().parent
with sqlite3.connect(root / 'card-search.sqlite3') as db:
    rows = db.execute('SELECT id,image_path FROM cards ORDER BY id').fetchall()

def fingerprint(row):
    try:
        with Image.open(root / 'extracted' / row[1]) as image:
            image.draft('L', (64, 64))
            gray = np.asarray(image.convert('L').resize((9, 8), Image.Resampling.LANCZOS))
            return row[0], np.packbits((gray[:, 1:] > gray[:, :-1]).reshape(-1))
    except Exception as error:
        return row[0], str(error)

started = time.time()
ids, hashes = [], []
unreadable = []
with ThreadPoolExecutor(max_workers=12) as executor:
    for card_id, signature in executor.map(fingerprint, rows):
        if isinstance(signature, str):
            unreadable.append({'id': card_id, 'error': signature})
            continue
        ids.append(card_id)
        hashes.append(signature)
        if len(ids) % 25000 == 0:
            print(f'{len(ids)}/{len(rows)} ({time.time()-started:.0f}s)', flush=True)
np.savez(root / 'visual-lookup.npz', ids=np.asarray(ids), hashes=np.asarray(hashes))
(root / 'visual-lookup-unreadable.json').write_text(json.dumps(unreadable, indent=2))
print(f'Indexed {len(ids)} reference images in {time.time()-started:.1f}s', flush=True)
