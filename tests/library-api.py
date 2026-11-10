import json
import urllib.request
import urllib.parse
import unittest

BASE = 'http://127.0.0.1:8765'

def catalog(**params):
    with urllib.request.urlopen(BASE + '/catalog?' + urllib.parse.urlencode(params)) as response:
        return json.load(response)

class LibraryTests(unittest.TestCase):
    def test_coverage_and_pagination(self):
        first = catalog(limit=24)
        second = catalog(limit=24, offset=24)
        self.assertEqual(first['total'], 454840)
        self.assertEqual(first['coverage']['imageReferences'], 311095)
        self.assertEqual(len(first['cards']), 24)
        self.assertFalse({row['id'] for row in first['cards']} & {row['id'] for row in second['cards']})

    def test_exact_identity_and_reference(self):
        result = catalog(year='2009', brand='Topps', set_name='Topps', player='Stephen Curry', card_number='321')
        self.assertEqual(result['total'], 2)
        base = next(row for row in result['cards'] if not row['parallel'])
        self.assertEqual(base['hci_id'], '1084814')
        with urllib.request.urlopen(base['imageUrl']) as response:
            self.assertEqual(response.headers['Content-Type'], 'image/jpeg')
            self.assertGreater(len(response.read()), 1000)

    def test_invalid_filter_does_not_execute_sql(self):
        self.assertEqual(catalog(player="' OR 1=1 --")['total'], 0)
        self.assertEqual(catalog(q='nonexistentzzz" OR * "')['total'], 0)

    def test_missing_image_not_invented(self):
        records = catalog(limit=24)['cards']
        missing = next(row for row in records if not row['image_path'])
        self.assertEqual(missing['coverage'], 'metadata-only')
        self.assertEqual(missing['imageUrl'], '')

if __name__ == '__main__':
    unittest.main()
