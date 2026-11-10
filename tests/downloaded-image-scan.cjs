const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const folder = process.env.IMAGES_DIR || '/Users/jamescho/Documents/sportscard/image';
const manifestName = process.env.MANIFEST_NAME || fs.readdirSync(folder).filter(name => name.startsWith('basketball-download-manifest-')).sort().at(-1);
const manifest = JSON.parse(fs.readFileSync(path.join(folder, manifestName)));
const output = path.resolve(__dirname, process.env.RESULTS_FILE || '../work/downloaded-image-scan-results.json');

(async () => {
  const browser = await chromium.launch({channel: 'chrome', headless: true});
  const results = [], pageErrors = [];
  try {
    const page = await browser.newPage();
    page.on('pageerror', error => pageErrors.push(error.message));
    await page.route('**/*.supabase.co/**', route => route.abort());
    await page.goto('file://' + path.resolve(__dirname, '../outputs/index.html'));
    await page.evaluate(() => { account = { name: 'Image Scan Audit', email: 'image-audit@example.invalid', role: 'collector' }; });
    for (const item of manifest.images) {
      const bytes = fs.readFileSync(path.join(folder, item.file));
      const mime = item.file.endsWith('.png') ? 'image/png' : 'image/jpeg';
      const started = Date.now();
      let result;
      try {
        result = await page.evaluate(async ({data, mime}) => {
          const file = new File([await (await fetch(data)).blob()], 'scan.' + (mime === 'image/png' ? 'png' : 'jpg'), {type: mime});
          await performCardIdentityScan({files: [file]});
          const identity = playerScanReviewIdentity();
          return { identity, selected: Boolean(playerScanElements.match.value),
            ocr: playerScanDetectedIdentity.rawText || '', status: playerScanElements.status.textContent,
            candidates: playerScanMatches.slice(0, 3).map(c => ({identity: c.identity, score: c.score, visualScore: c.visualScore})) };
        }, {data: `data:${mime};base64,${bytes.toString('base64')}`, mime});
      } catch (error) { result = {error: error.message}; }
      const normalized = value => String(value || '').normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
      const sourceTitle = item.title || [item.expected?.year, item.expected?.brand, item.expected?.setName, item.expected?.type, item.expected?.player].filter(Boolean).join(' ');
      const title = normalized(sourceTitle);
      const player = normalized(result.identity?.player);
      const nameTokens = player.split(' ').filter(token => token.length > 2);
      const playerSupported = Boolean(player && nameTokens.length && nameTokens.every(token => title.includes(token)));
      const sourceYear = sourceTitle.match(/(?:19|20)\d{2}/)?.[0] || '';
      const yearMatches = sourceYear && result.identity?.year ? result.identity.year.startsWith(sourceYear) : null;
      const entry = {file: item.file, sourceTitle, sourceExpected: item.expected, sourcePage: item.source_page,
        width: item.width, height: item.height, side: /\bback\b|reverse/i.test(sourceTitle) ? 'back' : 'front/crop',
        elapsedMs: Date.now() - started, sourceNameSupported: playerSupported, sourceYear, yearMatches, ...result};
      results.push(entry);
      fs.writeFileSync(output, JSON.stringify({count: results.length, total: manifest.images.length, pageErrors, results}, null, 2));
      console.log(JSON.stringify({count: results.length, file: item.file, player: result.identity?.player || '', selected: result.selected, sourceNameSupported: playerSupported, error: result.error}));
    }
    console.log(`DONE: ${results.length} scans; ${results.filter(r=>r.error).length} exceptions; ${results.filter(r=>r.sourceNameSupported).length} source-name-supported results. ${output}`);
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
