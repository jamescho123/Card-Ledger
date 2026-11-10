const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const data = JSON.parse(fs.readFileSync(path.join(root, 'work/recent-image-scan-results.json')));
const norm = value => String(value || '').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\bjr\.?\b/g,'').replace(/[^a-z0-9]/g,'');
const rows = data.results.map(r => {
  const expected = r.sourceExpected;
  const identity = r.identity || {};
  const player = norm(expected.player) === norm(identity.player);
  const year = String(identity.year || '').startsWith(expected.year.slice(0,4));
  const brand = norm(expected.brand) === norm(identity.brand);
  const set = norm(identity.setName).replace(/^(panini|topps)/,'') === norm(expected.setName).replace(/^(panini|topps)/,'');
  const number = expected.cardNumber ? norm(identity.cardNumber) === norm(expected.cardNumber) : null;
  const insert = expected.type ? norm([identity.setName,identity.type,identity.parallel].join(' ')).includes(norm(expected.type)) : null;
  return {...r, checks:{player,year,brand,set,number,insert}, familyCorrect: player && year && brand && set};
});
const count = fn => rows.filter(fn).length;
const summary = {tested:rows.length, exceptions:count(r=>r.error), playerMatches:count(r=>r.checks.player),
  yearMatches:count(r=>r.checks.year), brandMatches:count(r=>r.checks.brand), setMatches:count(r=>r.checks.set),
  familyMatches:count(r=>r.familyCorrect), selectedCandidates:count(r=>r.selected), selectedFamilyMatches:count(r=>r.selected && r.familyCorrect),
  insertsRecognized:count(r=>r.checks.insert), insertImages:count(r=>r.sourceExpected.type),
  photographicPlayerMatches:count(r=>!r.sourceExpected.type && r.checks.player), photographicImages:count(r=>!r.sourceExpected.type),
  illustratedPlayerMatches:count(r=>r.sourceExpected.type && r.checks.player),
  pageErrors:data.pageErrors.length, seconds:Math.round(rows.reduce((n,r)=>n+r.elapsedMs,0)/1000)};
fs.writeFileSync(path.join(root, 'work/recent-image-scan-evaluation.json'), JSON.stringify({summary,results:rows},null,2));
const cell = value => String(value || '—').replace(/\|/g,'/').replace(/[\r\n]/g,' ');
const report = `# Recent Basketball Card Scan Test

Test date: 2026-10-04. Downloaded 20 front images from public Trader Cracks galleries, each 400 x 560 pixels. Includes 2023-24 Prizm Prizmania, 2024-25 Prizm Manga, and 2023-24 Wembanyama rookie cards in Donruss, Elite, Donruss Optic, Mosaic, Prizm and Topps Chrome. Two Prizmania images depict the same Dirk Nowitzki card, so this is 20 images rather than 20 unique card identities.

Files: /Users/jamescho/Documents/sportscard/image/recent-2023-2025

## Method

Used the actual website performCardIdentityScan function in an isolated browser with a local fake account. Uploaded files were renamed to neutral scan.jpg filenames. Source labels were used only to evaluate outputs, never supplied to the recognition pipeline. No collection card was saved; cloud requests were blocked. These public gallery images are a convenience sample, not a representative real-camera benchmark. Copyright remains with the respective owners; images are downloaded for local testing, not licensed for republication.

## Results

- Tested: ${summary.tested}/20. Exceptions: ${summary.exceptions}. Browser errors: ${summary.pageErrors}.
- Matching player: ${summary.playerMatches}/20 (normalizes accents, punctuation and Jr.).
- Matching starting year: ${summary.yearMatches}/20.
- Matching brand: ${summary.brandMatches}/20.
- Matching set: ${summary.setMatches}/20.
- Matching player + year + brand + set: ${summary.familyMatches}/20.
- Selected candidates: ${summary.selectedCandidates}; of these, ${summary.selectedFamilyMatches} match those four fields.
- Insert names present in results: ${summary.insertsRecognized}/${summary.insertImages} insert images.
- Combined scan time: ${summary.seconds} seconds.

Photographic rookie-card subset: ${summary.photographicPlayerMatches}/${summary.photographicImages} matching players. Illustrated insert subset: ${summary.illustratedPlayerMatches}/${summary.insertImages} matching players. All four selected families were the Wembanyama Donruss Optic, Mosaic, Prizm and Topps Chrome cards. None of the 14 illustrated insert images selected a card identity or identified its insert name. Failures included Allen Iverson being read as Josh Allen and Bronny James being read as LeBron James.

The selected references were sometimes different parallels from the gallery photo. The scanner correctly left the parallel field blank in all four selected cases. This is useful card-family recognition, not exact parallel identification.

Year checks compare the first four digits, because the database uses 2023 while gallery labels use 2023-24. Brand and set checks remain conservative: aliases may require manual review. Matching the four main fields does not establish exact identity or parallel. Many fronts do not show the card number, so unverified numbers are not counted as proven correct. Insert names and gallery numbers are scored separately in the JSON evaluation.

## Per-Image Results

| Image | Expected | Returned | Player | Four fields | Selected |
|---|---|---|---|---|---|
${rows.map(r=>`| ${cell(r.file)} | ${cell([r.sourceExpected.year,r.sourceExpected.brand,r.sourceExpected.setName,r.sourceExpected.type,r.sourceExpected.player].filter(Boolean).join(' / '))} | ${cell([r.identity?.year,r.identity?.brand,r.identity?.setName,r.identity?.player,r.identity?.cardNumber].filter(Boolean).join(' / '))} | ${r.checks.player?'Match':'No'} | ${r.familyCorrect?'Match':'No'} | ${r.selected?'Yes':'No'} |`).join('\n')}

## Sources

- https://www.tradercracks.com/2023-24-panini-prizm-basketball-prizmania
- https://www.tradercracks.com/2024-25-panini-prizm-basketball-manga-checklist
- https://www.tradercracks.com/victor-wembanyama-rookie-card-guide
`;
fs.writeFileSync(path.join(root,'RECENT-IMAGE-SCAN-REPORT.md'), report);
console.log(JSON.stringify(summary,null,2));
