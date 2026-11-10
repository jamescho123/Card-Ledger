const assert = require('node:assert/strict');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    const page = await browser.newPage();
    await page.route('**/*.supabase.co/**', route => route.abort());
    await page.goto('file:///Users/jamescho/Documents/Codex/2026-07-07/ma/outputs/index.html');
    const results = await page.evaluate(async () => {
      account = { email: 'scan-review@example.invalid', role: 'collector' };
      readPlayerScanFile = async () => 'data:image/png;base64,AA==';
      readPlayerScanText = async () => 'JARA PR';
      let confidence = .6;
      let gap = .10;
      enrichPlayerScanIdentity = async () => ({ player: 'Jara Pr', confidence: 8, fieldConfidence: { player: confidence } });
      rankHciDatasetCandidates = async () => [
        { id: 'jordan', score: .92, visualScore: .92, matchReason: 'hci-image', identity: {
          player: 'Michael Jordan', sport: 'Basketball', year: '1986', brand: 'Fleer', setName: 'Fleer', cardNumber: '57',
          confidence: 92, recognitionMethod: 'hci-image', hciVisualScore: .92, fieldConfidence: { player: .92 }
        } },
        { id: 'other', score: .92-gap, visualScore: .92-gap, matchReason: 'hci-image', identity: { player: 'Michael Jordan', year: '1998', brand: 'Fleer', setName: '23KT Gold' } }
      ];
      rankPlayerScanCardCandidates = async () => [];
      const scan = async () => {
        await performCardIdentityScan({ files: [{ name: 'scan.jpg' }] });
        return { identity: playerScanReviewIdentity(), title: globalScanElements.title.textContent, selected: playerScanElements.match.value };
      };
      const weak = await scan();
      confidence = .96;
      const confidentConflict = await scan();
      confidence = .6; gap = .01;
      const ambiguous = await scan();
      return { weak, confidentConflict, ambiguous, parallel: {
        printed: playerScanHciParallel({parallel:'Black'},'VICTOR WEMBANYAMA MOSAIC BLACK'),
        absent: playerScanHciParallel({parallel:'Black'},'VICTOR WEMBANYAMA MOSAIC')
      } };
    });
    assert.equal(results.weak.identity.player, 'Michael Jordan');
    assert.equal(results.weak.identity.year, '1986');
    assert.equal(results.weak.identity.brand, 'Fleer');
    assert.equal(results.weak.identity.cardNumber, '57');
    assert.match(results.weak.title, /Michael Jordan/);
    assert.equal(results.confidentConflict.selected, '');
    assert.equal(results.ambiguous.selected, '');
    assert.equal(results.parallel.printed, 'Black');
    assert.equal(results.parallel.absent, '');
    console.log('PASS: leading Jordan image match replaces weak OCR; strong text conflicts and close candidates require review.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
