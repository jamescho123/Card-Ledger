#!/usr/bin/env python3
import datetime as dt
import io
import json
import pathlib
import random
import sys

import zstandard as zstd

ROOT = pathlib.Path(__file__).resolve().parent
EXTRACTED = ROOT / 'extracted'
METADATA = EXTRACTED / 'metadata'

with (ROOT / 'downloads' / 'export-summary.json').open() as handle:
    download_summary = json.load(handle)
with (METADATA / 'export-summary.json').open() as handle:
    extracted_summary = json.load(handle)

summary_match = download_summary == extracted_summary
cutoff_text = extracted_summary['snapshot_cutoff']
cutoff = dt.datetime.fromisoformat(cutoff_text)
row_count = 0
local_path_rows = 0
missing_paths = []
unsafe_paths = []
rows_after_cutoff = 0
max_updated_at = None
referenced = set()
sample = []
rng = random.Random(20260919)
sample_size = 200

metadata_path = METADATA / 'cards.jsonl.zst'
with metadata_path.open('rb') as raw, zstd.ZstdDecompressor().stream_reader(raw) as reader:
    text_stream = io.TextIOWrapper(reader, encoding='utf-8')
    for line in text_stream:
        row_count += 1
        row = json.loads(line)
        updated_text = row.get('updated_at')
        if updated_text:
            updated = dt.datetime.fromisoformat(updated_text.replace('Z', '+00:00'))
            if max_updated_at is None or updated > max_updated_at:
                max_updated_at = updated
            if updated > cutoff:
                rows_after_cutoff += 1
        image_path = row.get('image_local_path')
        if not image_path:
            continue
        local_path_rows += 1
        relative = pathlib.PurePosixPath(image_path)
        if relative.is_absolute() or '..' in relative.parts or not relative.parts or relative.parts[0] != 'images':
            unsafe_paths.append(image_path)
            continue
        normalized = relative.as_posix()
        referenced.add(normalized)
        exists = (EXTRACTED / pathlib.Path(*relative.parts)).is_file()
        if not exists:
            missing_paths.append(normalized)
        record = {'row': row_count, 'path': normalized, 'exists': exists}
        if len(sample) < sample_size:
            sample.append(record)
        else:
            index = rng.randrange(local_path_rows)
            if index < sample_size:
                sample[index] = record

all_images = {
    path.relative_to(EXTRACTED).as_posix()
    for path in (EXTRACTED / 'images').rglob('*')
    if path.is_file()
}
unreferenced = sorted(all_images - referenced)
sample_missing = [item for item in sample if not item['exists']]

result = {
    'summary_match': summary_match,
    'expected_rows': extracted_summary['card_rows'],
    'metadata_rows': row_count,
    'expected_local_path_rows': extracted_summary['rows_with_local_image_path'],
    'local_path_rows': local_path_rows,
    'snapshot_cutoff': cutoff_text,
    'max_metadata_updated_at': max_updated_at.isoformat() if max_updated_at else None,
    'rows_after_cutoff': rows_after_cutoff,
    'sample_size': len(sample),
    'sample_missing': len(sample_missing),
    'all_metadata_paths_checked': local_path_rows,
    'all_missing_paths': len(missing_paths),
    'unsafe_paths': len(unsafe_paths),
    'extracted_image_files': len(all_images),
    'unique_referenced_paths': len(referenced),
    'unreferenced_image_files': len(unreferenced),
    'unreferenced_examples': unreferenced[:20],
    'sample': sample,
}
with (ROOT / 'validation-results.json').open('w') as handle:
    json.dump(result, handle, indent=2)

checks = {
    'summary_match': summary_match,
    'row_count_match': row_count == extracted_summary['card_rows'],
    'local_path_count_match': local_path_rows == extracted_summary['rows_with_local_image_path'],
    'cutoff_valid': rows_after_cutoff == 0,
    'sample_paths_exist': not sample_missing,
    'all_metadata_paths_exist': not missing_paths,
    'safe_metadata_paths': not unsafe_paths,
}
for name, passed in checks.items():
    print(f'{name}: {"PASS" if passed else "FAIL"}')
print(f'metadata_rows: {row_count}')
print(f'snapshot_cutoff: {cutoff_text}')
print(f'sample_paths_checked: {len(sample)}')
print(f'extracted_image_files: {len(all_images)}')
print(f'unreferenced_image_files: {len(unreferenced)}')
if not all(checks.values()):
    raise SystemExit(1)
