import io
import json
import pathlib
import re
import zstandard

root = pathlib.Path(__file__).resolve().parent
catalog = {}
count = 0
with (root / 'extracted/metadata/cards.jsonl.zst').open('rb') as source:
    with zstandard.ZstdDecompressor().stream_reader(source) as reader:
        for line in io.TextIOWrapper(reader, encoding='utf-8'):
            row = json.loads(line)
            count += 1
            year, brand, name, player = [str(row.get(key) or '').strip() for key in ('year', 'brand', 'set_name', 'player_name')]
            name = re.sub(r'^Basketball Cards\s+', '', name, flags=re.I)
            name = re.sub(r'^' + re.escape(year) + r'\s+', '', name, flags=re.I)
            name = re.sub(r'^' + re.escape(brand) + r'\s+', '', name, flags=re.I)
            if all((year, brand, name, player)):
                catalog.setdefault(year, {}).setdefault(brand, {}).setdefault(name, set()).add(player)
for brands in catalog.values():
    for sets in brands.values():
        for name in sets:
            sets[name] = sorted(sets[name])
output = root.parent / 'outputs/hci-selection-catalog.js'
output.write_text('window.HCI_SELECTION_CATALOG=' + json.dumps(catalog, ensure_ascii=True, separators=(',', ':')) + ';\n', encoding='utf-8')
print(f'{count} metadata rows; {len(catalog)} years; {output.stat().st_size} bytes')
