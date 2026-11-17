const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const http = require('node:http');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

(async () => {
  const dist = path.resolve(__dirname, '../dist');
  const index = await fs.readFile(path.join(dist, 'index.html'), 'utf8');
  assert.ok(index.includes('window.HCI_SELECTION_CATALOG = {};'));
  assert.ok(!index.includes('src="./hci-selection-catalog.js'));
  for (const name of ['sports-card-import.json', 'hci-selection-catalog.js', 'wembanyama-mosaic-gallery.html']) {
    await assert.rejects(fs.access(path.join(dist, name)));
  }
  const types = {'.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.json':'application/json', '.png':'image/png', '.jpg':'image/jpeg', '.webmanifest':'application/manifest+json'};
  const server = http.createServer(async (req, res) => {
    try {
      const filename = path.resolve(dist, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname).replace(/\/$/, '/index.html'));
      if (!filename.startsWith(dist + path.sep)) throw new Error('Invalid path');
      const body = await fs.readFile(filename);
      res.writeHead(200, {'Content-Type': types[path.extname(filename)] || 'application/octet-stream'}); res.end(body);
    } catch { res.writeHead(404); res.end(); }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch({channel:'chrome', headless:true});
  try {
    const page = await browser.newPage({viewport:{width:1365,height:900}}), errors=[], missing=[];
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => { if(response.url().startsWith(base) && response.status() >= 400) missing.push(response.url()); });
    await page.route('**/*.supabase.co/**', route => route.abort());
    await page.route('http://127.0.0.1:8765/**', route => route.abort());
    await page.goto(base, {waitUntil:'load'});
    await page.waitForFunction(() => window.CardLedgerLibrary && window.CardLedgerSubsets && window.CardLedgerCatalog);
    assert.equal(await page.evaluate(() => cardLedgerBridge.getAccount().role), 'guest');
    assert.equal(await page.evaluate(() => cardLedgerBridge.getCards().length), 0);
    await page.waitForTimeout(4000);
    await page.screenshot({path:'/tmp/card-ledger-vercel-desktop.png'});
    await page.setViewportSize({width:390,height:844});
    await page.screenshot({path:'/tmp/card-ledger-vercel-mobile.png'});
    await page.evaluate(() => {
      account={email:'deploy-test@example.invalid',name:'Deploy Test',role:'collector'};
      cards=[];render();setSidebarExpanded(false);setActivePage('collection');
    });
    for (const name of ['portfolio','collection','market','trade','goals','community','account']) {
      await page.evaluate(name => setActivePage(name), name);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), true, `${name} mobile overflow`);
    }
    await page.goto(`${base}/zh.html`, {waitUntil:'load'});
    await page.waitForURL('**/index.html?lang=zh-CN');
    assert.deepEqual(errors, []);
    assert.deepEqual(missing, []);
    console.log('PASS: public-only build, complete script loading, empty guest account, desktop/mobile workspaces, Chinese route, no local resource 404s or JavaScript exceptions.');
  } finally {
    await browser.close();server.closeAllConnections();await new Promise(resolve => server.close(resolve));
  }
})().catch(error => { console.error(error);process.exitCode=1; });
