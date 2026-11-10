"""Ordering for derived catalog records, never inferred from parallel colors."""
import re


def print_run(row):
    value = row.get('print_run')
    if value is not None and not isinstance(value, bool):
        try:
            number = int(str(value).replace(',', ''))
            if number > 0:
                return number
        except (ValueError, TypeError):
            pass
    path = row.get('image_local_path') or row.get('image_path') or ''
    match = re.search(r'-limit-(\d+)(?:-|\.)', path)
    return int(match[1]) if match and int(match[1]) > 0 else None


def ensure_columns(db):
    if 'print_run' not in {row[1] for row in db.execute('PRAGMA table_info(catalog)')}:
        db.execute('ALTER TABLE catalog ADD COLUMN print_run INTEGER')
        rows = db.execute('SELECT id,image_path FROM catalog').fetchall()
        db.executemany('UPDATE catalog SET print_run=? WHERE id=?',
                       [(number, row[0]) for row in rows
                        if (number := print_run({'image_path': row[1]}))])


def parallel_order(alias='c'):
    return (f"CASE WHEN lower(trim({alias}.parallel)) IN ('','base','base card') THEN 0 ELSE 1 END,"
            f"CASE WHEN {alias}.print_run>0 THEN 0 ELSE 1 END,{alias}.print_run DESC,"
            f"({alias}.image_path=''),{alias}.parallel COLLATE NOCASE,{alias}.id")
