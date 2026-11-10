import base64
import io
import pathlib
import sqlite3
import sys
import tempfile
import unittest
from PIL import Image, ImageEnhance

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[1] / 'hci-basketball-20260919'))
import card_identification_server as server
from scan_learning import remember, nearest


class ScanLearning(unittest.TestCase):
    def test_confirmed_examples(self):
        with tempfile.TemporaryDirectory() as directory:
            original_path = server.LEARNING
            server.LEARNING = pathlib.Path(directory) / 'learning.sqlite3'
            try:
                row = server.catalog_query({'hci_id': ['1084814'], 'limit': ['1']})['cards'][0]
                image = Image.open(server.EXTRACTED / row['image_path']).convert('RGB')
                output = io.BytesIO(); image.save(output, format='PNG')
                payload = {'image': base64.b64encode(output.getvalue()).decode(), 'learningScope': 'a'*64}
                signatures = [server.learning_signature(image)]
                self.assertIsNone(server.learned_scan_match(payload, image, signatures))
                with self.assertRaises(ValueError):
                    server.learn_scan({**payload, 'hciId': '1084814'})
                self.assertTrue(server.learn_scan({**payload, 'hciId': '1084814', 'confirmed': True})['learned'])
                result = server.identify(payload)
                self.assertEqual(result['matches'][0]['id'], '1084814')
                self.assertTrue(result['matches'][0]['exactExample'])
                # A separate, brighter photograph is matched by visual features, not its hash.
                brighter = ImageEnhance.Brightness(image).enhance(.92)
                learned = server.learned_scan_match(payload, brighter, [server.learning_signature(brighter)])
                self.assertIsNotNone(learned)
                self.assertEqual(learned['id'], '1084814')
                self.assertFalse(learned['exactExample'])
                rotated = image.rotate(90, expand=True)
                self.assertEqual(server.learned_scan_match(payload, rotated, [])['id'], '1084814')
                other_row = server.catalog_query({'player': ['Luka Doncic'], 'year': ['2018'], 'images': ['1'], 'limit': ['1']})['cards'][0]
                other_image = Image.open(server.EXTRACTED / other_row['image_path']).convert('RGB')
                self.assertIsNone(server.learned_scan_match(payload, other_image, []))
                self.assertIsNone(server.learned_scan_match({'learningScope': 'b'*64}, image, signatures))
                blank = Image.new('RGB', image.size, '#ddddee')
                self.assertIsNone(server.learned_scan_match(payload, blank, [server.image_signature(blank)]))
                # Same photo corrected again replaces its old label rather than duplicating it.
                remember(server.LEARNING, 'a'*64, image, 'corrected', signatures[0])
                self.assertEqual(nearest(server.LEARNING, 'a'*64, image, signatures, server.signature_score)['id'], 'corrected')
                with sqlite3.connect(server.LEARNING) as db:
                    self.assertEqual(db.execute('SELECT count(*) FROM examples').fetchone()[0], 1)
                # Two indistinguishable labels cannot promote a held-out image to an exact match.
                remember(server.LEARNING, 'a'*64, ImageEnhance.Brightness(image).enhance(.98), 'other-parallel', signatures[0])
                self.assertIsNone(nearest(server.LEARNING, 'a'*64, brighter, [server.learning_signature(brighter)], server.signature_score))
                with self.assertRaises(ValueError):
                    server.learn_scan({**payload, 'hciId': 'nonexistent', 'confirmed': True})
            finally:
                server.LEARNING = original_path


if __name__ == '__main__':
    unittest.main()
