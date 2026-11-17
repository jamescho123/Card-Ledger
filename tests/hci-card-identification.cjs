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
    await page.goto(pathToFileURL(path.resolve(__dirname, '../outputs/index.html')).href);
    const curry = process.argv.includes('--curry');
    const imagePath = curry ? '/Users/jamescho/Downloads/curry rc.jpeg' : '/Users/jamescho/Downloads/luka.jpeg';
    const image = 'data:image/jpeg;base64,' + fs.readFileSync(imagePath).toString('base64');
    const result = await page.evaluate(async (source) => {
      account = { name: 'HCI Scan Test', email: 'hci-scan@example.invalid', role: 'collector' };
      const file = new File([await (await fetch(source)).blob()], 'luka.jpeg', { type: 'image/jpeg' });
      await identifyPlayerFromPhoto({ files: [file] });
      const selected = playerScanReviewIdentity();
      return {
        selected,
        matchReason: playerScanMatches.find((entry) => entry.id === playerScanElements.match.value)?.matchReason,
        selectedValue: playerScanElements.match.value,
        status: playerScanElements.status.textContent,
        title: globalScanElements.title.textContent,
        candidates: playerScanMatches.map((entry) => ({
          reason: entry.matchReason,
          visualScore: entry.visualScore,
          player: entry.identity.player,
          year: entry.identity.year,
          brand: entry.identity.brand,
          setName: entry.identity.setName,
          cardNumber: entry.identity.cardNumber,
          parallel: entry.identity.parallel
        }))
      };
    }, image);

    assert.equal(result.matchReason, 'hci-image', JSON.stringify(result));
    assert.ok(result.selectedValue, 'the strongest HCI image match should be selected for review');
    assert.equal(result.selected.player, curry ? 'Stephen Curry' : 'Luka Doncic');
    assert.equal(result.selected.year, curry ? '2009' : '2018');
    assert.equal(result.selected.brand, curry ? 'Topps' : 'Panini');
    assert.equal(result.selected.setName, curry ? 'Topps' : 'Donruss');
    assert.equal(result.selected.cardNumber, curry ? '321' : '177');
    assert.equal(result.selected.parallel, '', 'an unsupported reference parallel must not be copied');
    assert.ok(result.selected.hciVisualScore >= (curry ? 0.87 : 0.93));
    assert.match(result.status, /HCI card-image dataset/i);
    assert.match(result.title, curry ? /2009.*Topps.*Stephen Curry.*#321/i : /2018.*Panini.*Donruss.*Luka Doncic.*#177/i);
    console.log(`PASS: ${curry ? 'Curry 2009 Topps #321' : 'Luka 2018 Panini Donruss #177'} identified from the supplied photo without inventing a parallel.`);
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
