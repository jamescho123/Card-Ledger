const assert = require('node:assert/strict');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    const page = await browser.newPage();
    await page.route('**/*.supabase.co/**', route => route.abort());
    await page.goto('file:///Users/jamescho/Documents/Codex/2026-07-07/ma/outputs/index.html');
    await page.evaluate(() => {
      account = { name: 'Selector Demo', email: 'selectors@example.invalid', role: 'collector' };
      saveAccount(); render();
      setActivePage('collection'); setFocusWorkspaceView('collection', 'add');
    });
    await page.locator('#sport').selectOption('Basketball');
    await page.locator('#hciYearPicker').selectOption('2018');
    await page.locator('#brand').selectOption('Panini');
    await page.locator('#setName').selectOption('Donruss');
    const players = await page.locator('#player option').evaluateAll(items => items.map(item => item.value).filter(Boolean));
    const expected = await page.evaluate(() => window.HCI_SELECTION_CATALOG['2018'].Panini.Donruss);
    assert.deepEqual([...players].sort(), [...expected].sort());
    assert.ok(players.includes('Luka Doncic'));
    assert.ok(!players.includes('Victor Wembanyama'));
    await page.locator('#player').selectOption('Luka Doncic');
    await page.locator('#hciYearPicker').selectOption('2025');
    assert.equal(await page.locator('#player').inputValue(), '');
    await page.locator('#sport').selectOption('Soccer');
    assert.equal(await page.locator('#year').isVisible(), true);
    assert.equal(await page.locator('#hciYearPicker').isVisible(), false);
    const result = await page.evaluate(async () => {
      readPlayerScanFile = async () => 'data:image/png;base64,AA==';
      readPlayerScanText = async () => 'VICTOR WEMBANYAMA';
      enrichPlayerScanIdentity = async identity => identity;
      rankHciDatasetCandidates = async identity => [{
        id: 'hci-test', name: 'Victor Wembanyama', score: .91, visualScore: .885,
        matchReason: 'hci-image', identity: { ...identity, player: 'Victor Wembanyama', year: '2025', brand: 'Topps', setName: 'Holiday', cardNumber: 'H156', recognitionMethod: 'hci-image', confidence: 91 }
      }];
      rankPlayerScanCardCandidates = async () => [];
      await performCardIdentityScan({ files: [{name:'test.png'}] });
      return playerScanReviewIdentity();
    });
    assert.equal(result.year, '2025');
    assert.equal(result.brand, 'Topps');
    assert.equal(result.setName, 'Holiday');
    console.log('PASS: HCI dependent selectors, exact player membership, reset on year change, other sports, and 91% scan candidate promotion.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
