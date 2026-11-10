#!/usr/bin/env python3
import io
import json
import pathlib
import re
import sqlite3
import sys
import time

import zstandard as zstd

ROOT = pathlib.Path(__file__).resolve().parent
SOURCE = ROOT / 'extracted' / 'metadata' / 'cards.jsonl.zst'
DATABASE = ROOT / 'card-search.sqlite3'

def normalized(value):
    return re.sub(r'[^a-z0-9]+', ' ', str(value or '').lower()).strip()

started = time.time()
connection = sqlite3.connect(DATABASE)
connection.executescript('''
PRAGMA journal_mode=WAL;
PRAGMA synchronous=NORMAL;
CREATE TABLE IF NOT EXISTS cards (
  id INTEGER PRIMARY KEY,
  hci_card_id TEXT,
  player TEXT,
  player_key TEXT,
  year TEXT,
  brand TEXT,
  brand_key TEXT,
  set_name TEXT,
  set_key TEXT,
  parallel TEXT,
  card_number TEXT,
  title TEXT,
  image_path TEXT UNIQUE
);
CREATE INDEX IF NOT EXISTS cards_player_key_idx ON cards(player_key);
CREATE INDEX IF NOT EXISTS cards_year_idx ON cards(year);
CREATE INDEX IF NOT EXISTS cards_brand_key_idx ON cards(brand_key);
CREATE INDEX IF NOT EXISTS cards_card_number_idx ON cards(card_number);
CREATE TABLE IF NOT EXISTS visual_signatures (
  image_path TEXT PRIMARY KEY,
  file_size INTEGER NOT NULL,
  signature BLOB NOT NULL
);
CREATE TABLE IF NOT EXISTS index_metadata (key TEXT PRIMARY KEY, value TEXT NOT NULL);
''')

current_source = f'{SOURCE.stat().st_size}:{SOURCE.stat().st_mtime_ns}'
prior = connection.execute("SELECT value FROM index_metadata WHERE key='source'").fetchone()
count = connection.execute('SELECT count(*) FROM cards').fetchone()[0]
if prior and prior[0] == current_source and count:
    print(f'INDEX_READY {count} cards {DATABASE}')
    raise SystemExit(0)

connection.execute('DELETE FROM cards')
connection.execute('DELETE FROM visual_signatures')
batch = []
inserted = 0
with SOURCE.open('rb') as raw, zstd.ZstdDecompressor().stream_reader(raw) as reader:
    for line in io.TextIOWrapper(reader, encoding='utf-8'):
        row = json.loads(line)
        image_path = str(row.get('image_local_path') or '').strip()
        if not image_path:
            continue
        batch.append((
            str(row.get('hci_card_id') or row.get('id') or ''),
            str(row.get('player_name') or ''), normalized(row.get('player_name')),
            str(row.get('year') or ''),
            str(row.get('brand') or ''), normalized(row.get('brand')),
            str(row.get('set_name') or ''), normalized(row.get('set_name')),
            str(row.get('parallel') or ''),
            str(row.get('card_number') or '').lstrip('#'),
            str(row.get('title') or ''), image_path
        ))
        if len(batch) >= 5000:
            connection.executemany('''INSERT OR REPLACE INTO cards
              (hci_card_id,player,player_key,year,brand,brand_key,set_name,set_key,parallel,card_number,title,image_path)
              VALUES (?,?,?,?,?,?,?,?,?,?,?,?)''', batch)
            inserted += len(batch)
            batch.clear()
if batch:
    connection.executemany('''INSERT OR REPLACE INTO cards
      (hci_card_id,player,player_key,year,brand,brand_key,set_name,set_key,parallel,card_number,title,image_path)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?)''', batch)
    inserted += len(batch)
connection.execute("INSERT OR REPLACE INTO index_metadata(key,value) VALUES('source',?)", (current_source,))
connection.commit()
connection.execute('PRAGMA optimize')
connection.close()
print(f'INDEX_BUILT {inserted} cards {time.time()-started:.1f}s {DATABASE}')
