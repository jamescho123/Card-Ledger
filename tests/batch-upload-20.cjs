const assert = require('node:assert/strict');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
(async () => {
  const browser = await chromium.launch({channel:'chrome',headless:true});
  try {
    const page = await browser.newPage({viewport:{width:1280,height:900}});
    await page.route('**/*.supabase.co/**',route => route.abort());
    const errors=[]; page.on('pageerror',error => errors.push(error.message));
    await page.goto('file://' + path.resolve(__dirname,'../outputs/index.html') + '?batch=1');
    await page.waitForFunction(() => window.CardLedgerLibrary);
    const batch = await page.evaluate(async () => {
      account={name:'Batch Audit',email:'batch-audit@example.invalid',role:'admin'};
      cards=[]; saveAccount(); render(); cardLedgerBridge.openLibrary();
      document.querySelector('[data-library-tab=batch]').click();
      const canvas=document.createElement('canvas'); canvas.width=80; canvas.height=112;
      canvas.getContext('2d').fillRect(0,0,80,112);
      const blob=await new Promise(resolve => canvas.toBlob(resolve));
      const files=Array.from({length:21},(_,i) => new File([blob],`photo-${i}.png`,{type:'image/png'}));
      let scanned=0;
      cardLedgerBridge.scanImage=async () => {scanned++; return {identity:{player:'Test Player',year:'2023',brand:'Panini',setName:'Mosaic',sport:'Basketball'},matches:[]};};
      await CardLedgerLibrary.scanBatch(files);
      const rejected={queued:CardLedgerLibrary.getQueue().length,scanned,status:document.querySelector('#libraryBatchStatus').textContent};
      await CardLedgerLibrary.scanBatch(files.slice(0,20));
      const queued=CardLedgerLibrary.getQueue();
      return {rejected,count:queued.length,scanned,images:queued.every(item => item.image.startsWith('data:image/jpeg')),confirmed:queued.filter(item=>item.confirmed).length};
    });
    assert.equal(batch.rejected.queued,0); assert.equal(batch.rejected.scanned,0);
    assert.match(batch.rejected.status,/20/);
    assert.equal(batch.count,20); assert.equal(batch.scanned,20); assert.ok(batch.images); assert.equal(batch.confirmed,0);
    assert.ok(await page.locator('#libraryBatchSave').isDisabled());
    for(let i=0;i<20;i++) {
      await page.locator('#libraryBatchReviewNext').click();
      await page.locator('#libraryConfirmReview').click();
    }
    assert.match(await page.locator('#libraryBatchCount').innerText(),/20 confirmed/);
    const safeguards=await page.evaluate(() => {
      const owner=account.email;
      account.email='different@example.invalid'; CardLedgerLibrary.saveBatch();
      const isolated=cards.length===0 && CardLedgerLibrary.getQueue().length===20;
      account.email=owner;
      const original=cardLedgerBridge.saveCards;
      cardLedgerBridge.saveCards=() => {throw new Error('Quota exceeded');};
      CardLedgerLibrary.saveBatch();
      const retained=cards.length===0 && CardLedgerLibrary.getQueue().length===20;
      cardLedgerBridge.saveCards=original;
      return {isolated,retained};
    });
    assert.deepEqual(safeguards,{isolated:true,retained:true});
    await page.locator('#libraryBatchSave').click();
    const saved=await page.evaluate(() => ({cards:cards.length,queue:CardLedgerLibrary.getQueue().length,
      persisted:JSON.parse(localStorage.getItem(STORAGE_KEY)).length,unique:new Set(cards.map(card=>card.id)).size,
      photos:cards.every(card=>card.image.startsWith('data:image/jpeg'))}));
    assert.deepEqual(saved,{cards:20,queue:0,persisted:20,unique:20,photos:true});
    assert.equal(errors.length,0,errors.join('\n'));
    console.log('PASS: rejects 21 without skipping; scans 20; requires review; account isolation; quota rollback; saves all 20 unique cards and photos.');
  } finally {await browser.close();}
})().catch(error => {console.error(error);process.exitCode=1;});
