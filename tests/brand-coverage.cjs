const assert = require('node:assert/strict');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.route('**/*.supabase.co/**', route => route.abort());
    await page.goto('file:///Users/jamescho/Documents/Codex/2026-07-07/ma/outputs/index.html');
    await page.evaluate(() => {
      account = { name: 'Brand Test', email: 'brands@example.invalid', role: 'collector' };
      saveAccount(); render(); setActivePage('collection'); setFocusWorkspaceView('collection', 'add');
    });
    await page.locator('#sport').selectOption('Basketball');
    await page.locator('#hciYearPicker').selectOption('2017');
    const labels = await page.locator('#brand option').allTextContents();
    for (const brand of ['Panini', 'Topps', 'Bowman', 'Upper Deck', 'Fleer', 'SkyBox', 'Leaf', 'Press Pass', 'Sage', 'WildCard']) assert.ok(labels.includes(brand), `Missing ${brand}`);
    assert.equal(labels.filter(label => label === 'Upper Deck').length, 1);
    await page.locator('#brand').selectOption('Panini');
    const verifiedSet = await page.evaluate(() => Object.keys(HCI_SELECTION_CATALOG['2017'].Panini)[0]);
    await page.locator('#setName').selectOption(verifiedSet);
    assert.deepEqual((await page.locator('#player option').evaluateAll(options => options.map(option => option.value).filter(Boolean))).sort(),
      (await page.evaluate(set => HCI_SELECTION_CATALOG['2017'].Panini[set], verifiedSet)).sort());
    await page.locator('#brand').selectOption('Upper');
    assert.ok(await page.locator('#setName option[value="Deck EuroLeague"]').count());
    await page.locator('#brand').selectOption('Topps');
    assert.equal(await page.locator('#setName').isEnabled(), true);
    assert.match(await page.locator('#setCatalogStatus').textContent(), /No HCI checklist/);
    await page.locator('#setName').selectOption('__custom__');
    await page.locator('#setNameCustom').fill('Collector supplied set');
    assert.equal(await page.locator('#player').isEnabled(), true);
    await page.locator('#player').selectOption('__custom__');
    await page.locator('#playerCustom').fill('Collector supplied player');
    assert.equal(await page.evaluate(() => CardLedgerCardSelectors.value('player')), 'Collector supplied player');
    await page.locator('#hciYearPicker').selectOption('2018');
    assert.equal(await page.locator('#brand').inputValue(), '');
    assert.equal(await page.locator('#player').inputValue(), '');
    assert.equal(await page.locator('#playerCustom').isVisible(), false);
    await page.locator('#brand').selectOption('Panini');
    await page.locator('#setName').selectOption('Donruss');
    assert.ok(await page.locator('#player option[value="Luka Doncic"]').count());
    assert.equal(await page.locator('#player option[value="__custom__"]').count(), 0);
    assert.deepEqual(errors, []);
    console.log('PASS: complete basketball brand directory for 2017, Upper Deck label/source lookup, verified roster constraints, explicit manual fallback, and year-change reset.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
