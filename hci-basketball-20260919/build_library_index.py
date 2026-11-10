#!/usr/bin/env python3
"""Build a derived, searchable catalog without changing exported dataset files."""
import io
import json
import pathlib
import sqlite3
import zstandard
from catalog_ordering import ensure_columns, print_run

ROOT = pathlib.Path(__file__).resolve().parent
SOURCE = ROOT / 'extracted/metadata/cards.jsonl.zst'
DB = ROOT / 'library.sqlite3'

def clean_set(row):
    name = str(row.get('set_name') or '').strip()
    for prefix in ('Basketball Cards ', str(row.get('year') or '') + ' ', str(row.get('brand') or '') + ' '):
        if prefix.strip() and name.lower().startswith(prefix.lower()):
            name = name[len(prefix):].strip()
    return name

with sqlite3.connect(DB) as db:
    db.executescript('''
      CREATE TABLE IF NOT EXISTS catalog (id INTEGER PRIMARY KEY, hci_id TEXT, year TEXT,
      brand TEXT, set_name TEXT, player TEXT, parallel TEXT, card_number TEXT,
      title TEXT, image_path TEXT);
      CREATE INDEX IF NOT EXISTS catalog_identity ON catalog(year,brand,set_name,player);
      CREATE INDEX IF NOT EXISTS catalog_hci ON catalog(hci_id);
      CREATE VIRTUAL TABLE IF NOT EXISTS catalog_search USING fts5(title, player, brand, set_name,
      content='catalog', content_rowid='id', tokenize='unicode61 remove_diacritics 2');
    ''')
    ensure_columns(db)
    db.execute('DELETE FROM catalog')
    batch = []
    with SOURCE.open('rb') as raw, zstandard.ZstdDecompressor().stream_reader(raw) as reader:
        for line in io.TextIOWrapper(reader, encoding='utf-8'):
            row = json.loads(line)
            batch.append((str(row.get('hci_card_id') or row.get('id') or ''), str(row.get('year') or ''),
                          str(row.get('brand') or ''), clean_set(row), str(row.get('player_name') or ''),
                          str(row.get('parallel') or ''), str(row.get('card_number') or '').lstrip('#'),
                          str(row.get('title') or ''), str(row.get('image_local_path') or ''), print_run(row)))
            if len(batch) == 5000:
                db.executemany('INSERT INTO catalog(hci_id,year,brand,set_name,player,parallel,card_number,title,image_path,print_run) VALUES(?,?,?,?,?,?,?,?,?,?)', batch)
                batch.clear()
    db.executemany('INSERT INTO catalog(hci_id,year,brand,set_name,player,parallel,card_number,title,image_path,print_run) VALUES(?,?,?,?,?,?,?,?,?,?)', batch)
    db.execute("INSERT INTO catalog_search(catalog_search) VALUES('rebuild')")
    count, images = db.execute("SELECT count(*),sum(image_path!='') FROM catalog").fetchone()
    print(f'Library ready: {count} metadata rows, {images} image references.')
