const assert = require('node:assert/strict');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

// Runs in a disposable browser profile and blocks all cloud traffic.
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    const page = await browser.newPage();
    await page.route('**/*.supabase.co/**', route => route.abort());
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(pathToFileURL(path.resolve(__dirname, '../outputs/index.html')).href);
    assert.deepEqual(await page.evaluate(() => [cards.length, goals.length, trades.length]), [0, 0, 0]);
    await page.evaluate(() => {
      account = { name: 'Audit Collector', email: 'audit@example.invalid', role: 'collector' };
      saveAccount();
      cards = [{ id: 'audit-card', player: 'Luka Doncic', sport: 'Basketball', year: '2018-19', brand: 'Panini', setName: 'Donruss', type: 'Rookie', quantity: 1, paid: 20, value: 30, grade: '', condition: 'Raw', notes: 'Audit', provenance: [{ label: 'Retain this history' }], conditionEstimate: { label: 'Preserved' } }];
      goals = [{ id: 'audit-goal', title: 'A long collection goal title for mobile wrapping and readable expansion controls', player: 'Luka Doncic', setName: 'Donruss', startYear: 2018, endYear: 2019, slots: { '2018': { owned: false }, '2019': { owned: false } } }];
      saveCards(); saveGoals(); render(); setActivePage('collection');
    });
    assert.equal(await page.locator('#collectionInventory').isVisible(), true);
    for (const view of ['portfolio', 'market', 'collection']) {
      await page.locator(`#portfolioSections [data-page-button="${view}"]`).click();
      assert.equal(await page.evaluate(() => activePage), view);
      assert.equal(await page.locator('#portfolioSections').isVisible(), true);
      assert.ok((await page.locator('.side-nav [data-page-button="portfolio"]').getAttribute('class')).includes('active'));
    }
    for (const view of ['diy', 'condition']) {
      await page.evaluate(view => setActivePage(view), view);
      assert.equal(await page.evaluate(() => activePage), 'portfolio');
      assert.equal(await page.locator(`#${view}Area`).isVisible(), false);
    }
    await page.locator('#portfolioSections [data-page-button="collection"]').click();
    await page.locator('#quickTableView').click();
    assert.equal(await page.locator('#tableWrap').isVisible(), true);
    await page.locator('#quickGridView').click();
    await page.locator('.collection-display-disclosure > summary').click();
    assert.equal(await page.locator('#closetCardStage').isVisible(), true);
    await page.locator('.collection-display-disclosure > summary').click();
    await page.locator('.edit-button').first().click();
    assert.equal(await page.locator('#cardForm').isVisible(), true);
    assert.equal(await page.locator('#player').inputValue(), 'Luka Doncic');
    await page.evaluate(async () => {
      attachCardImage = async card => { await new Promise(resolve => setTimeout(resolve, 100)); return card; };
      form.dispatchEvent(new Event('submit', { cancelable: true }));
      form.dispatchEvent(new Event('submit', { cancelable: true }));
    });
    await page.waitForFunction(() => !cardSaveInFlight);
    assert.equal(await page.locator('#collectionInventory').isVisible(), true);
    assert.deepEqual(await page.evaluate(() => [cards.length, cards[0].provenance[0].label, Boolean(cards[0].conditionEstimate)]), [1, 'Retain this history', true]);
    await page.locator('[data-focus-page="collection"][data-focus-view="add"]').click();
    await page.locator('#sport').selectOption('Basketball');
    await page.locator('#hciYearPicker').selectOption('2018');
    await page.locator('#brand').selectOption('Panini');
    await page.locator('#setName').selectOption('Donruss');
    await page.locator('#player').selectOption('Luka Doncic');
    await page.evaluate(() => form.requestSubmit());
    await page.waitForFunction(() => !cardSaveInFlight && cards.length === 2);
    page.once('dialog', dialog => dialog.accept());
    await page.evaluate(() => deleteCard(cards.find(card => card.id !== 'audit-card').id));
    assert.equal(await page.evaluate(() => cards.length), 1);
    await page.evaluate(() => {
      cards.push({ ...cards[0], id: 'sort-test', year: '2024-25' });
      els.sortBy.value = 'yearDesc';
    });
    assert.equal(await page.evaluate(() => filteredCards()[0].year), '2024-25');
    await page.evaluate(() => {
      cards = cards.filter(card => card.id !== 'sort-test');
      els.search.value = 'no-card-with-this-name'; render();
    });
    assert.equal(await page.locator('#emptyState h3').innerText(), 'No matching cards');
    await page.locator('#emptyCollectionAction').click();
    assert.equal(await page.locator('#search').inputValue(), '');
    assert.equal(await page.locator('#emptyState').isVisible(), false);
    await page.evaluate(() => {
      for (let i = 0; i < 30; i++) cards.push({ ...cards[0], id: `count-test-${i}` });
      render();
    });
    assert.match(await page.locator('#collectionViewerCount').innerText(), /31 cards/);
    await page.evaluate(() => { cards = cards.filter(card => !card.id.startsWith('count-test-')); render(); });
    await page.evaluate(() => {
      tradeForm.dispatchEvent(new Event('submit', { cancelable: true }));
    });
    assert.equal(await page.evaluate(() => trades.length), 0);
    await page.evaluate(() => setActivePage('goals'));
    await page.locator('[data-action="toggle-goal-slots"]').first().click();
    assert.equal(await page.locator('.goal-details').first().isVisible(), true);
    await page.locator('[data-action="toggle-goal-slots"]').first().click();
    assert.equal(await page.locator('.goal-details').first().isVisible(), false);
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: 900 });
      for (const section of ['landing', 'portfolio', 'collection', 'diy', 'condition', 'goals', 'market', 'community', 'trade', 'account']) {
        await page.evaluate(section => setActivePage(section), section);
        await page.waitForTimeout(100);
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${section} overflows at ${width}`);
        if (section === 'goals') {
          assert.ok(await page.locator('.goal-disclosure').evaluate(element => element.getBoundingClientRect().right <= innerWidth), 'Goal disclosure clipped');
        }
      }
    }
    await page.reload();
    assert.deepEqual(await page.evaluate(() => [cards.length, goals.length, trades.length, account.email]), [1, 1, 0, 'audit@example.invalid']);
    await page.evaluate(() => setActivePage('account'));
    for (const theme of ['emerald', 'midnight', 'crimson', 'titanium']) {
      await page.locator('#themeSelect').selectOption(theme);
      assert.equal(await page.evaluate(() => localStorage.getItem(THEME_KEY)), theme);
    }
    for (const language of ['zh-CN', 'en']) {
      await page.locator('#languageSelect').selectOption(language);
      assert.equal(await page.evaluate(() => currentLanguage), language);
    }
    await page.evaluate(() => setActivePage('goals'));
    await page.screenshot({ path: '/tmp/card-ledger-audit-goals-mobile.png' });
    assert.deepEqual(errors, []);
    console.log('PASS: empty start, collection visibility, edit navigation, save guard, metadata preservation, add/delete card, empty-trade validation, goal expansion, 20 responsive page checks, reload persistence, four themes, English/Chinese switching.');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
