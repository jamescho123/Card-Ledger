const assert = require('node:assert/strict');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    const page = await browser.newPage();
    await page.route('**/*.supabase.co/**', route => route.abort());
    await page.goto('file://' + path.resolve(__dirname, '../outputs/index.html'));
    const results = await page.evaluate(async () => {
      await loadHciScanPlayers();
      return {
        iverson: identifyCardFromScanText('ALLEN IVERSON').player,
        bronny: identifyCardFromScanText('BRONNY JAMES JR.').player,
        collier: identifyCardFromScanText('NSAIAHCOLLIER').player,
        names: playerScanDirectory().map(entry => entry.name)
      };
    });
    assert.equal(results.iverson, 'Allen Iverson');
    assert.match(results.bronny, /^Bronny James/);
    assert.equal(results.collier, 'Isaiah Collier');
    assert.ok(!results.names.includes('Dallas Mavericks'));
    assert.ok(!results.names.includes('Taz'));
    console.log('PASS: database player names resolve OCR; teams and single-name non-player entries are excluded.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
