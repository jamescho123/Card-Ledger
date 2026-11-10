const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    const page = await browser.newPage();
    await page.route('**/*.supabase.co/**', route => route.abort());
    await page.route('http://127.0.0.1:8765/**', route => route.abort());
    await page.goto(pathToFileURL(path.resolve(__dirname, '../outputs/index.html')).href);
    const photo = 'data:image/jpeg;base64,' + fs.readFileSync('/Users/jamescho/Downloads/luka.jpeg').toString('base64');
    const result = await page.evaluate(async (source) => {
      account = { name: 'Scan Test', email: 'scan@example.invalid', role: 'collector' };
      cards = [{
        id: 'wrong-card', player: 'Luka Doncic', sport: 'Basketball', year: '2023-24',
        brand: 'Panini', setName: 'Prizm', cardNumber: '17', image: source
      }];
      const file = new File([await (await fetch(source)).blob()], 'luka.jpeg', { type: 'image/jpeg' });
      await identifyPlayerFromPhoto({ files: [file] });
      const initial = {
        detected: playerScanDetectedIdentity,
        selected: playerScanElements.match.value,
        reviewed: playerScanReviewIdentity(),
        title: globalScanElements.title.textContent,
        badge: globalScanElements.confidence.textContent
      };
      const suggestion = playerScanMatches.find((entry) => entry.identity.year === '2023-24');
      if (suggestion) {
        playerScanElements.match.value = suggestion.id;
        playerScanElements.match.dispatchEvent(new Event('change'));
        playerScanElements.match.value = '';
        playerScanElements.match.dispatchEvent(new Event('change'));
      }
      return { initial, restored: playerScanReviewIdentity(), suggestionShown: Boolean(suggestion) };
    }, photo);
    assert.equal(result.initial.detected.player, 'Luka Doncic');
    assert.equal(result.initial.selected, '');
    assert.equal(result.initial.reviewed.year, '');
    assert.equal(result.initial.reviewed.setName, '');
    assert.match(result.initial.title, /exact card not confirmed/i);
    assert.match(result.initial.badge, /Player identified; card unconfirmed/i);
    assert.equal(result.restored.year, '');
    assert.equal(result.restored.player, 'Luka Doncic');
    const textChecks = await page.evaluate(() => {
      const complete = identifyCardFromScanText('2018-19 Donruss Luka Doncic Rated Rookie #177');
      const conflicting = playerScanKnownIdentityMatch({ ...complete, year: '2020-21', setName: 'Prizm' });
      return { complete, conflicting };
    });
    assert.equal(textChecks.complete.player, 'Luka Doncic');
    assert.equal(textChecks.complete.year, '2018-19');
    assert.equal(textChecks.complete.setName, 'Donruss');
    assert.equal(textChecks.complete.cardNumber, '177');
    assert.equal(textChecks.conflicting, null);
    console.log('PASS: Luka photo keeps unsupported details blank, catalog suggestion is not auto-selected, clearing a suggestion restores OCR, contradictory catalog data is rejected.');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
