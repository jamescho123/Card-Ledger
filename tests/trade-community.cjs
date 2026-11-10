const assert = require('node:assert/strict');
const fs = require('node:fs');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const profile = fs.mkdtempSync('/tmp/card-ledger-demo-profile-');
const output = '/tmp/card-ledger-demo-results';
const email = 'demo.collector@example.test';
const password = 'DemoCollector2026!';

(async () => {
  fs.mkdirSync(output, { recursive: true });
  const context = await chromium.launchPersistentContext(profile, { channel: 'chrome', headless: true, viewport: { width: 1440, height: 1000 } });
  const results = [], errors = [], dialogs = [];
  const page = context.pages()[0];
  page.setDefaultTimeout(30000);
  page.on('pageerror', error => errors.push(error.message));
  page.on('dialog', async dialog => { dialogs.push(dialog.message()); await dialog.accept(); });
  await page.route('**/*.supabase.co/**', route => route.abort());
  const check = async (name, action) => {
    try { await action(); results.push({ name, passed: true }); }
    catch (error) { results.push({ name, passed: false, error: error.message }); }
    console.log(JSON.stringify(results.at(-1)));
  };
  try {
    await page.goto('file:///Users/jamescho/Documents/Codex/2026-07-07/ma/outputs/index.html');
    await page.evaluate(() => { localStorage.clear(); sessionStorage.clear(); });
    await page.reload();
    await page.evaluate(() => { supabaseSettings = { url: '', anonKey: '' }; saveSupabaseSettings(); setActivePage('landing'); showLandingAuth(); });
    await check('Sign up through the form', async () => {
      await page.locator('#landingSignupName').fill('Demo Collector');
      await page.locator('#landingSignupEmail').fill(email);
      await page.locator('#landingSignupPassword').fill(password);
      await page.locator('#landingSignupForm button[type="submit"]').click();
      await page.waitForFunction(email => account.email === email, email);
    });
    await check('Log out and log back in with the password', async () => {
      await page.evaluate(() => { els.logoutButton.click(); setActivePage('landing'); showLandingAuth(); });
      await page.locator('#landingLoginEmail').fill(email);
      await page.locator('#landingLoginPassword').fill(password);
      await page.locator('#landingLoginForm button[type="submit"]').click();
      await page.waitForFunction(email => account.email === email, email);
    });
    await page.evaluate(() => {
      const seed = [
        ['Luka Doncic', 'Basketball', '2018-19', 'Panini', 'Donruss', 'Rated Rookie', 'Base', '177', 300],
        ['Stephen Curry', 'Basketball', '2020-21', 'Panini', 'Prizm', 'Base', 'Silver', '25', 200],
        ['LeBron James', 'Basketball', '2020-21', 'Panini', 'Prizm', 'Base', 'Base', '1', 120],
        ['Lionel Messi', 'Soccer', '2023-24', 'Topps', 'Chrome', 'Base', 'Blue', '10', 180],
        ['Shohei Ohtani', 'Baseball', '2024', 'Topps', 'Chrome', 'Base', 'Base', '1', 90],
        ['Patrick Mahomes', 'Football', '2023', 'Panini', 'Prizm', 'Base', 'Silver', '149', 160]
      ];
      cards = seed.map((row, index) => ({ id: `demo-${index}`, player: row[0], sport: row[1], year: row[2], brand: row[3], setName: row[4], type: row[5], parallel: row[6], cardNumber: row[7], value: row[8], paid: row[8], quantity: 1, condition: 'Raw', grade: '', notes: 'DEMO ONLY: hypothetical card and manual test value.', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }));
      saveCards(); render(); setActivePage('trade');
    });
    await check('AI builder validates empty input', async () => {
      await page.locator('#generateTradeAi').click();
      assert.match(await page.locator('#tradeAiEmpty').innerText(), /at least one card/i);
    });
    await check('Collection picker and ranked proposals', async () => {
      await page.locator('#tradeAiCollectionSelect').selectOption('demo-0');
      await page.locator('#addTradeAiCollection').click();
      assert.match(await page.locator('#tradeAiMine').inputValue(), /Luka Doncic/);
      await page.locator('#tradeAiTheirs').fill('2020-21 | Panini | Prizm | Jayson Tatum | Base | Silver | 37 | Raw | 280');
      await page.locator('#generateTradeAi').click();
      assert.ok((await page.locator('#tradeAiResults').innerText()).length > 50);
    });
    await check('Sports Guy replies to a trade question', async () => {
      await page.locator('#sportsGuyInput').fill('The dealer wants 50 RMB extra. What should I counter?');
      await page.locator('#sportsGuySend').click();
      assert.ok((await page.locator('#sportsGuyMessages').innerText()).length > 80);
    });
    await page.screenshot({ path: `${output}/trade.png`, fullPage: true });
    await check('Completed trade removes outgoing card and adds incoming card', async () => {
      await page.evaluate(() => { setActivePage('collection'); setFocusWorkspaceView('collection', 'add'); setEntryMode('trade'); });
      await page.locator('#tradeCounterparty').fill('Demo Trading Partner');
      await page.locator('#tradeOutgoing').fill('2018-19 | Panini | Donruss | Luka Doncic | Rated Rookie | Base | 177');
      await page.locator('#tradeIncoming').fill('2020-21 | Panini | Prizm | Jayson Tatum | Base | Silver | 37');
      await page.locator('#tradeNotes').fill('DEMO ONLY: local test of a completed trade.');
      await page.locator('#tradeForm button[type="submit"]').click();
      assert.deepEqual(await page.evaluate(() => [cards.some(c => c.id === 'demo-0'), cards.some(c => c.player === 'Jayson Tatum'), trades.length]), [false, true, 1]);
    });
    await page.evaluate(() => { setActivePage('community'); document.querySelector('[data-focus-page="community"][data-focus-view="all"]')?.click(); });
    await check('Publish a community post with a collection card', async () => {
      await page.locator('#communityPostNote').fill('DEMO ONLY: Looking to trade my Curry Silver for a Tatum card.');
      await page.locator('#communityPostCard').selectOption('demo-1');
      await page.locator('#communityPostIntent').selectOption('trade');
      await page.locator('#communityPostForm button[type="submit"]').click();
      await page.waitForFunction(() => communityPosts.some(p => p.author === 'Demo Collector'));
      assert.match(await page.locator('#communityFeed').innerText(), /Curry/);
    });
    await check('Like, want and comment on a post', async () => {
      await page.locator('#communityFeed [data-post-action="like"]').first().click();
      await page.locator('#communityFeed [data-post-action="want"]').first().click();
      await page.locator('#communityFeed .post-comment-form input').first().fill('Demo comment: front and back photos available.');
      await page.locator('#communityFeed .post-comment-form button').first().click();
      assert.deepEqual(await page.evaluate(() => [communityPosts[0].likes, communityPosts[0].wants, communityPosts[0].comments.length]), [1, 1, 1]);
    });
    await check('Search and filter posts', async () => {
      await page.locator('#communityFeedSearch').fill('definitely-no-such-post');
      assert.equal(await page.locator('#communityFeed .community-post').count(), 0);
      await page.locator('#communityFeedSearch').fill('');
      await page.locator('#communityFeedFilter').selectOption('trade');
      assert.equal(await page.locator('#communityFeed .community-post').count(), 1);
      await page.locator('#communityFeedFilter').selectOption('');
    });
    await check('Create a local private chat', async () => {
      await page.locator('#chatParticipants').fill('Demo Trading Partner');
      await page.locator('#chatMessage').fill('DEMO ONLY: Can you share front and back photos?');
      await page.locator('#chatForm button[type="submit"]').click();
      assert.match(await page.locator('#chatList').innerText(), /Demo Trading Partner/);
    });
    await check('Open a collector profile', async () => {
      await page.locator('#communityCollectors [data-action="view-community-profile"]').first().click();
      assert.equal(await page.locator('#communityProfileViewer').isVisible(), true);
      await page.locator('#communityProfileViewer [data-action="close-profile"]').click();
    });
    await page.screenshot({ path: `${output}/community.png`, fullPage: true });
    await check('Reload preserves the account, collection, trade and post', async () => {
      await page.reload();
      assert.deepEqual(await page.evaluate(() => [account.email, cards.length, trades.length, communityPosts.length]), [email, 6, 1, 1]);
    });
    await page.evaluate(() => setActivePage('community'));
    fs.writeFileSync(`${output}/report.json`, JSON.stringify({ results, errors, dialogs, profile, email }, null, 2));
    if (results.some(result => !result.passed) || errors.length) process.exitCode = 1;
  } finally {
    await context.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
