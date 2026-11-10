const assert=require('node:assert/strict');
const path=require('node:path');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
(async()=>{
  const browser=await chromium.launch({channel:'chrome',headless:true});
  try {
    const page=await browser.newPage({viewport:{width:1280,height:900}}),errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    await page.route('**/*.supabase.co/**',route=>route.abort());
    await page.goto('file://'+path.resolve(__dirname,'../outputs/index.html')+'?batch=1');
    await page.waitForFunction(()=>window.CardLedgerLibrary);
    const count=await page.evaluate(async()=>{
      account={name:'Multi Card Test',email:'multi-card@example.invalid',role:'admin'};cards=[];saveAccount();render();
      cardLedgerBridge.scanImage=async image=>({identity:{grade:'PSA 9'},matches:[{id:'test',identity:{hciCardId:'1084814',sport:'Basketball',year:'2009',brand:'Topps',setName:'Topps',player:'Stephen Curry',cardNumber:'321',parallel:''},score:.9}]});
      const canvas=document.createElement('canvas');canvas.width=1400;canvas.height=1000;const c=canvas.getContext('2d');c.fillStyle='#141414';c.fillRect(0,0,1400,1000);
      for(const [x,y] of [[70,60],[520,60],[970,60],[70,550],[520,550]]){c.fillStyle='#fff';c.fillRect(x,y,260,370);c.fillStyle='#316080';c.fillRect(x+15,y+15,230,340);}
      const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/jpeg'));
      await CardLedgerLibrary.scanBatch([new File([blob],'five-cards.jpg',{type:'image/jpeg'})]);
      return CardLedgerLibrary.getQueue().length;
    });
    assert.equal(count,5);
    await page.locator('#libraryBatchReviewNext').click();
    assert.equal(await page.locator('#libraryReview-player').inputValue(),'Stephen Curry');
    assert.equal(await page.locator('#libraryReview-year').inputValue(),'2009');
    assert.equal(await page.locator('#libraryReview-grade').inputValue(),'PSA 9');
    await page.locator('#libraryReview-grade').fill('BGS 9.5');
    await page.locator('#libraryReview-certification').fill('TEST-123');
    await page.locator('#libraryReview-serialNumber').fill('5/49');
    await page.locator('#libraryReview-notes').fill('Edited scan details');
    await page.locator('#libraryReviewCandidate').selectOption('');
    assert.equal(await page.locator('#libraryReview-grade').inputValue(),'BGS 9.5');
    await page.locator('#libraryReview-player').fill('Jimmy Butler');
    await page.locator('#libraryReview-year').fill('2018');
    await page.locator('#libraryConfirmReview').click();
    await page.locator('[data-library-review-batch="0"]').click();
    assert.equal(await page.locator('#libraryReview-player').inputValue(),'Jimmy Butler');
    assert.equal(await page.locator('#libraryReview-grade').inputValue(),'BGS 9.5');
    await page.locator('#libraryConfirmReview').click();
    for(let index=1;index<5;index++){await page.locator('#libraryBatchReviewNext').click();await page.locator('#libraryConfirmReview').click();}
    await page.locator('#libraryBatchSave').click();
    const saved=await page.evaluate(()=>cards.find(card=>card.player==='Jimmy Butler'));
    assert.equal(saved.year,'2018');assert.equal(saved.grade,'BGS 9.5');assert.equal(saved.certification,'TEST-123');assert.equal(saved.serialNumber,'5/49');assert.equal(saved.copies[0].grade,'BGS 9.5');assert.equal(saved.notes,'Edited scan details');assert.ok(!saved.hciCardId);
    assert.equal(await page.evaluate(()=>cards.length),5);
    // Quick Scan now uses the same editable review instead of an empty entry form.
    await page.evaluate(()=>{const item=cards[0];pendingScannedCardImage=item.image;playerScanIdentity={sport:'Basketball',year:'2009',brand:'Topps',setName:'Topps',player:'Stephen Curry',grade:'PSA 9'};playerScanDetectedIdentity=playerScanIdentity;playerScanMatches=[];reviewGlobalScanInAddCard();});
    await page.locator('#libraryReview-grade').fill('BGS 10');
    await page.locator('#libraryConfirmReview').click();
    assert.equal(await page.locator('#grade').inputValue(),'BGS 10');
    assert.equal(await page.locator('#player').inputValue(),'Stephen Curry');
    await page.screenshot({path:path.resolve(__dirname,'../work/multi-card-review-entry.png'),animations:'disabled'});
    const groupPhoto='/var/folders/cs/hhr3r2gx1p1c7hpvlzz4kjw40000gn/T/codex-clipboard-a4e6049b-d0a9-4f9d-9fc8-348148ad140e.jpg';
    if(require('node:fs').existsSync(groupPhoto)) {
      await page.locator('#playerScanFile').setInputFiles(groupPhoto);
      await page.waitForSelector('#libraryRegionCanvas');
      assert.match(await page.locator('#libraryRegionCount').innerText(),/5 cards/);
      await page.screenshot({path:path.resolve(__dirname,'../work/five-card-segments.png'),animations:'disabled'});
      await page.locator('#libraryRegionExpected').fill('5');
      await page.locator('#libraryRegionSplit').click();
      assert.match(await page.locator('#libraryRegionCount').innerText(),/5 cards/);
      await page.locator('#libraryRegionScan').click();
      await page.waitForFunction(()=>CardLedgerLibrary.getQueue().length===5 && CardLedgerLibrary.getQueue().every(item=>item.matches));
      await page.locator('#libraryBatchReviewNext').click();
      await page.setViewportSize({width:390,height:844});
      assert.equal(await page.locator('#libraryReview-player').inputValue(),'Stephen Curry');
      await page.screenshot({path:path.resolve(__dirname,'../work/multi-card-review-mobile.png'),animations:'disabled'});
      assert.ok(await page.evaluate(()=>document.querySelector('.library-dialog').scrollWidth<=document.querySelector('.library-dialog').clientWidth+1));
    }
    assert.deepEqual(errors,[]);
    console.log('PASS: automatic five-card crops, editable prefilled reviews, grades/certification/serial/copy persistence, Quick Scan handoff; five manual crops from supplied group photo and mobile review. Recognition is mocked; boundary detection is real.');
  } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
