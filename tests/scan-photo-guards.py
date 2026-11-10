import base64
import importlib.util
import io
import pathlib
import sqlite3

import numpy as np
from PIL import Image

root = pathlib.Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('identifier',root/'hci-basketball-20260919/card_identification_server.py')
server = importlib.util.module_from_spec(spec); spec.loader.exec_module(server)
cv = server.cv2
assert cv is not None, 'OpenCV preprocessing is required for this test'

def identify(image):
    data = io.BytesIO(); image.save(data,format='JPEG',quality=92)
    return server.identify({'image':base64.b64encode(data.getvalue()).decode(),'identity':{},'rawText':''})

with sqlite3.connect(server.DATABASE) as db:
    path = db.execute("SELECT image_path FROM cards WHERE player='Victor Wembanyama' AND year='2023' AND card_number='238' AND parallel='Black' LIMIT 1").fetchone()[0]
image = Image.open(server.EXTRACTED/path).convert('RGB').resize((320,448))
corners = np.array([[140,80],[440,120],[480,610],[90,550]],np.float32)
matrix = cv.getPerspectiveTransform(np.array([[0,0],[319,0],[319,447],[0,447]],np.float32),corners)
photo = cv.warpPerspective(np.asarray(image),matrix,(650,720),borderValue=(80,100,120))
variants, detected = server.photo_variants(Image.fromarray(photo))
assert detected, 'Perspective card boundary was missed'
match = identify(Image.fromarray(photo))['matches'][0]
assert match['player']=='Victor Wembanyama' and match['cardNumber']=='238',match
print('PASS: perspective-skewed card on background matches the right family')
for name, pixels in [('black',np.zeros((560,400,3),dtype=np.uint8)),
                     ('white',np.full((560,400,3),255,dtype=np.uint8)),
                     ('noise',np.random.default_rng(42).integers(0,256,(560,400,3),dtype=np.uint8))]:
    matches = identify(Image.fromarray(pixels))['matches']
    top = matches[0]['visualScore'] if matches else 0
    gap = matches[0]['score']-matches[1]['score'] if len(matches)>1 else 0
    assert not (top>=0.87 and gap>=0.06),(name,top,gap)
    print(f'PASS: {name} does not qualify for automatic image-only selection ({top:.3f})')
