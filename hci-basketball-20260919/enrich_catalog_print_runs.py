"""Enrich only the derived SQLite index from immutable exported metadata."""
import io
import json
import sqlite3
import zstandard
from catalog_ordering import ensure_columns, print_run
from pathlib import Path

root = Path(__file__).resolve().parent
with sqlite3.connect(root / 'library.sqlite3') as db:
    ensure_columns(db)
    batch = []
    with (root / 'extracted/metadata/cards.jsonl.zst').open('rb') as raw:
        with zstandard.ZstdDecompressor().stream_reader(raw) as reader:
            for line in io.TextIOWrapper(reader, encoding='utf-8'):
                row = json.loads(line)
                batch.append((print_run(row), str(row.get('hci_card_id') or row.get('id') or '')))
                if len(batch) == 5000:
                    db.executemany('UPDATE catalog SET print_run=? WHERE hci_id=?', batch)
                    batch.clear()
    db.executemany('UPDATE catalog SET print_run=? WHERE hci_id=?', batch)
    print('Known print runs:', db.execute('SELECT count(*) FROM catalog WHERE print_run>0').fetchone()[0])
