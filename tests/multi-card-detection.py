import base64
import io
import pathlib
import sys
import unittest
from PIL import Image, ImageDraw

sys.path.insert(0,str(pathlib.Path(__file__).resolve().parents[1]/'hci-basketball-20260919'))
from card_identification_server import detect_cards, cv2

class MultiCardDetection(unittest.TestCase):
    @unittest.skipIf(cv2 is None,'OpenCV optional dependency unavailable')
    def test_separate_card_crops(self):
        image=Image.new('RGB',(1400,1000),'#141414')
        draw=ImageDraw.Draw(image)
        for x,y in [(70,60),(520,60),(970,60),(70,550),(520,550)]:
            draw.rectangle((x,y,x+260,y+370),fill='white')
            draw.rectangle((x+15,y+15,x+245,y+355),fill='#316080')
        output=io.BytesIO();image.save(output,format='JPEG')
        result=detect_cards({'image':base64.b64encode(output.getvalue()).decode()})
        self.assertEqual(len(result['cards']),5)
        for card in result['cards']:
            crop=Image.open(io.BytesIO(base64.b64decode(card['image'].split(',')[1])))
            self.assertGreater(crop.width,200)
            self.assertLess(crop.width,350)
            self.assertEqual(len(card['corners']),4)
        self.assertEqual(image.size,(1400,1000))

    @unittest.skipIf(cv2 is None,'OpenCV optional dependency unavailable')
    def test_empty_photo(self):
        output=io.BytesIO();Image.new('RGB',(400,500),'white').save(output,format='PNG')
        self.assertEqual(detect_cards({'image':base64.b64encode(output.getvalue()).decode()})['cards'],[])

    @unittest.skipIf(cv2 is None,'OpenCV optional dependency unavailable')
    def test_supplied_group_photo(self):
        path=pathlib.Path('/var/folders/cs/hhr3r2gx1p1c7hpvlzz4kjw40000gn/T/codex-clipboard-a4e6049b-d0a9-4f9d-9fc8-348148ad140e.jpg')
        if not path.exists():self.skipTest('Supplied photo unavailable')
        result=detect_cards({'image':base64.b64encode(path.read_bytes()).decode()})
        self.assertEqual(len(result['cards']),5)
        self.assertTrue(result['reviewRequired'])
        for card in result['cards']:
            self.assertGreater(card['corners'][2][0],card['corners'][0][0])
            self.assertGreater(card['corners'][2][1],card['corners'][0][1])

if __name__=='__main__':unittest.main()
