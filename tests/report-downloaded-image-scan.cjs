const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const data = JSON.parse(fs.readFileSync(path.join(root, 'work/downloaded-image-scan-results.json')));
const normalize = value => String(value || '').normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
function expectedPlayer(title) {
  const clean = title.replace(/^File:/, '').replace(/\.(jpg|png|jpeg)$/i, '').replace(/\s*\(cropped\)/i, '');
  const duke = clean.match(/Duke MBB .*? card - (.*?) (?:front|back)/i);
  if (duke) return duke[1];
  const fleer = clean.match(/Fleer - (.*)/i);
  if (fleer) return fleer[1];
  const explicit = {'EdWachterGoudeycard':'Ed Wachter', 'JoeLapchickGoudeycard':'Joe Lapchick', 'NatHolmanGoudeycard':'Nat Holman',
    'Stan Pawlak':'Stan Pawlak', 'Al Leslie':'Al Leslie', 'Arthur spector bowman card':'Arthur Spector',
    'Bill russell fleer card back 1961':'Bill Russell'};
  for (const [label, player] of Object.entries(explicit)) if (clean.toLowerCase() === label.toLowerCase()) return player;
  const dated = clean.match(/^(.*?) (?:19|20)\d{2}/);
  if (dated && !/^\d|Face detail/i.test(dated[1])) return dated[1];
  const face = clean.match(/^Face detail (.*?) \d{4}/i);
  return face ? face[1] : '';
}
const rows = data.results.map(row => {
  const expected = expectedPlayer(row.sourceTitle);
  const predicted = row.identity?.player || '';
  return {...row, expectedPlayer: expected, exactSourceNameMatch: Boolean(expected && normalize(expected) === normalize(predicted))};
});
const count = predicate => rows.filter(predicate).length;
const summary = {
  attempted: rows.length, expectedTotal: data.total,
  exceptions: count(r=>r.error), pageErrors: data.pageErrors.length,
  sourceNamedImages: count(r=>r.expectedPlayer), matchingPlayerNames: count(r=>r.exactSourceNameMatch),
  nonmatchingPlayerNames: count(r=>r.expectedPlayer && r.identity?.player && !r.exactSourceNameMatch),
  noPlayer: count(r=>!r.identity?.player && !r.error), selectedCandidates: count(r=>r.selected),
  fullIdentitySelected: count(r=>r.selected && ['player','year','brand','setName','cardNumber'].every(k=>r.identity?.[k])),
  lowResolution: count(r=>r.width<200), backs: count(r=>r.side==='back'),
  seconds: Math.round(rows.reduce((n,r)=>n+r.elapsedMs,0)/1000)
};
fs.writeFileSync(path.join(root, 'work/downloaded-image-scan-evaluation.json'), JSON.stringify({summary,results:rows},null,2));
const cell = value => String(value || '—').replace(/\|/g,'/').replace(/[\r\n]/g,' ');
const report = `# Downloaded Basketball Image Scan Test

Tested on 2026-10-04 with an isolated local account and cloud traffic blocked. Images were passed through the website's actual performCardIdentityScan function, with neutral filenames, without seeding expected names or bypassing OCR.

## Results

- Images tested: ${summary.attempted}/${summary.expectedTotal}.
- Scan exceptions: ${summary.exceptions}; browser page errors: ${summary.pageErrors}.
- Source descriptions with an identifiable person name: ${summary.sourceNamedImages}.
- Exact normalized source-name matches: ${summary.matchingPlayerNames}.
- Returned player names that differ from the source name: ${summary.nonmatchingPlayerNames}.
- No player returned: ${summary.noPlayer}.
- Automatically selected candidates: ${summary.selectedCandidates}.
- Selected results containing player, year, brand, set and card number: ${summary.fullIdentitySelected}.
- Images under 200 pixels wide: ${summary.lowResolution}; card backs: ${summary.backs}.
- Combined scan time: ${summary.seconds} seconds.

## Interpretation

Running without an exception is not the same as correctly identifying a card. Player names were checked against the Wikimedia file descriptions, not against filenames supplied to the scanner. Nicknames and source-label differences can require manual review. Source descriptions do not contain complete card identities for every image, so this test does not claim a definitive full-card accuracy percentage. Auto-selection indicates the app chose a candidate, not that the candidate is verified correct.

This set includes small thumbnails, backs, coach/team cards and cropped portraits. It is a difficult and imperfect recognition benchmark, and should not be treated as 100 high-resolution full-front NBA cards.

## Selected Candidates

${rows.filter(r=>r.selected).map(r=>`- ${r.sourceTitle}: ${r.identity.year} / ${r.identity.brand} / ${r.identity.setName} / ${r.identity.player} / #${r.identity.cardNumber}. Source year agrees: ${r.yearMatches?'yes':'not confirmed'}.`).join('\n')}

The Lee Mogus image returned "Leo John Mogus," which needs alias verification and is excluded from the exact-name match count. The George Mikan result deliberately left the parallel blank: its closest reference says "No Red Ink," but the scan did not establish that variant. These are candidate-family results, not three fully verified card identities.

## Improvements Needed

1. Reject OCR fragments, sponsor names and locations as player names unless supported by a player catalog.
2. Add front/back detection and use back text without comparing a back to front-only references.
3. Warn on small/cropped images and request a sharp full-card image.
4. Check vintage and college-card coverage before implying the HCI database can identify them.
5. Validate complete identities against labeled references before applying any scan result.

No collection card was added or modified. No website behavior was changed by this test.

## Per-Image Results

| Image | Source player | Returned player | Name match | Selected | Scan error |
|---|---|---|---|---|---|
${rows.map(r=>`| ${cell(r.file)} | ${cell(r.expectedPlayer)} | ${cell(r.identity?.player)} | ${r.expectedPlayer ? (r.exactSourceNameMatch?'Yes':'No'):'Unscored'} | ${r.selected?'Yes':'No'} | ${cell(r.error)} |`).join('\n')}
`;
fs.writeFileSync(path.join(root, 'DOWNLOADED-IMAGE-SCAN-REPORT.md'), report);
console.log(JSON.stringify(summary,null,2));
