import pathlib
import sqlite3
import sys
import tempfile
import unittest

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[1] / 'hci-basketball-20260919'))
import card_identification_server as server
from catalog_ordering import print_run


class CatalogOrdering(unittest.TestCase):
    def test_source_numbering(self):
        self.assertEqual(print_run({'print_run': 199}), 199)
        self.assertEqual(print_run({'image_path': 'card-limit-1-basketball.jpg'}), 1)
        self.assertIsNone(print_run({'parallel': 'Gold', 'title': '2023 Card #238'}))

    def test_family_order_and_cover(self):
        with tempfile.TemporaryDirectory() as directory:
            original = server.LIBRARY
            server.LIBRARY = pathlib.Path(directory) / 'catalog.sqlite3'
            try:
                with sqlite3.connect(server.LIBRARY) as db:
                    db.execute('CREATE TABLE catalog(id INTEGER PRIMARY KEY,hci_id TEXT,year TEXT,brand TEXT,set_name TEXT,player TEXT,parallel TEXT,card_number TEXT,title TEXT,image_path TEXT,print_run INTEGER)')
                    for number, parallel, run in [(1,'Gold',None),(2,'Black',1),(3,'White',25),(4,'Ice',125),(5,'Pink',18),(6,'Green',3),(7,'Glitter',5),(8,'Fluorescent',10),(9,'Base',None)]:
                        db.execute('INSERT INTO catalog VALUES(?,?,?,?,?,?,?,?,?,?,?)', (number,str(number),'2023','Panini','Mosaic','Player',parallel,'238',parallel,'' if number==9 else 'image.jpg',run))
                data = server.catalog_query({'sort':['parallel'],'limit':['100']})
                self.assertEqual([row['id'] for row in data['cards']], [9,4,3,5,8,7,6,2,1])
                grouped = server.catalog_query({'group':['1']})
                self.assertEqual(grouped['cards'][0]['id'],9)
                self.assertEqual(grouped['cards'][0]['variant_count'],9)
                with sqlite3.connect(server.LIBRARY) as db:
                    db.execute('DELETE FROM catalog WHERE id=9')
                self.assertEqual(server.catalog_query({'group':['1']})['cards'][0]['id'],4)
            finally:
                server.LIBRARY = original


if __name__ == '__main__':
    unittest.main()
