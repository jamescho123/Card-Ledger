const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const norm = value => String(value || '').normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\bjr\.?\b/g, '').replace(/[^a-z0-9]/g, '');
function evaluate(file) {
  const data = JSON.parse(fs.readFileSync(path.join(root, 'work', file)));
  const rows = data.results.map(row => {
    const expected = row.sourceExpected;
    const actual = row.identity || {};
    const player = norm(actual.player) === norm(expected.player);
    const family = player && String(actual.year || '').startsWith(expected.year.slice(0, 4))
      && norm(actual.brand) === norm(expected.brand)
      && norm(actual.setName).replace(/^(panini|topps)/, '') === norm(expected.setName).replace(/^(panini|topps)/, '');
    return { file: row.file, player, family, selected: Boolean(row.selected), returned: actual.player || '', milliseconds: row.elapsedMs };
  });
  return { tested: rows.length, players: rows.filter(row => row.player).length,
    families: rows.filter(row => row.family).length, selected: rows.filter(row => row.selected).length,
    wrongSelections: rows.filter(row => row.selected && !row.family).length,
    exceptions: data.results.filter(row => row.error).length, pageErrors: data.pageErrors.length,
    seconds: Math.round(rows.reduce((sum, row) => sum + row.milliseconds, 0) / 1000), rows };
}
const before = evaluate('recent-image-scan-results.json');
const after = evaluate('recent-image-scan-improved-results.json');
if (before.tested !== 20 || after.tested !== 20) throw new Error('Both runs must contain all 20 images.');
fs.writeFileSync(path.join(root, 'work/recent-scan-comparison.json'), JSON.stringify({ before, after }, null, 2));
fs.writeFileSync(path.join(root, 'SCAN-IMPROVEMENT-REPORT.md'), `# Scan Improvement Test\n\nSame 20 recent gallery images, uploaded using neutral filenames. Expected source labels are used only for evaluation, not recognition. Isolated fake account; no cards saved or cloud data changed.\n\n| Measure | Before | After |\n|---|---:|---:|\n| Correct player | ${before.players}/20 | ${after.players}/20 |\n| Player/year/brand/set family | ${before.families}/20 | ${after.families}/20 |\n| Auto-selected | ${before.selected} | ${after.selected} |\n| Incorrect auto-selected family | ${before.wrongSelections} | ${after.wrongSelections} |\n| Exceptions/browser errors | ${before.exceptions}/${before.pageErrors} | ${after.exceptions}/${after.pageErrors} |\n| Combined scan seconds | ${before.seconds} | ${after.seconds} |\n\nThis measures card-family recognition, not exact parallel recognition or a representative camera-photo accuracy rate. Illustrated inserts and illegible nameplates still need review. The local HCI service must be running to supply database names and image comparison; offline OCR remains available.\n\n## Per Image\n\n| File | Returned player | Player correct | Family correct | Selected |\n|---|---|---|---|---|\n${after.rows.map(row => `| ${row.file} | ${row.returned.replace(/\|/g, '/')} | ${row.player} | ${row.family} | ${row.selected} |`).join('\n')}\n`);
console.log(JSON.stringify({ before: { ...before, rows: undefined }, after: { ...after, rows: undefined } }, null, 2));
