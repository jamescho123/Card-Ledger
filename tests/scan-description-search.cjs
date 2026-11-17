const assert=require('node:assert/strict');
const path=require('node:path');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true});
 try{
  const page=await browser.newPage({viewport:{width:390,height:844}}),errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.route('**/*.supabase.co/**',route=>route.abort());
  await page.goto('file://'+path.resolve(__dirname,'../outputs/index.html'));
  await page.waitForFunction(()=>window.CardLedgerLibrary);
  await page.evaluate(()=>{
   account={name:'Search Test',email:'search-test@example.invalid',role:'admin'};cards=[];saveAccount();render();
   CardLedgerLibrary.review('',[],{player:'Bad OCR',grade:'BGS 9.5',notes:'Keep my notes'},card=>window.searchSaved=card);
  });
  await page.locator('.library-scan-search summary').click();
  await page.locator('#libraryReviewSearchText').fill('2009-10 Topps Steph Curry #321 PSA 10');
  await page.locator('#libraryReviewSearchSend').click();
  await page.waitForFunction(()=>document.querySelectorAll('[data-search-card]').length>0);
  assert.equal(await page.locator('#libraryReview-player').inputValue(),'Bad OCR');
  assert.match(await page.locator('[data-search-card]').first().innerText(),/Stephen Curry/);
  await page.locator('[data-search-card]').first().click();
  await page.waitForFunction(()=>document.querySelector('#libraryReviewReference img'));
  assert.equal(await page.locator('#libraryReview-year').inputValue(),'2009');
  assert.equal(await page.locator('#libraryReview-brand').inputValue(),'Topps');
  assert.equal(await page.locator('#libraryReview-cardNumber').inputValue(),'321');
  assert.equal(await page.locator('#libraryReview-grade').inputValue(),'BGS 9.5');
  assert.equal(await page.locator('#libraryReview-notes').inputValue(),'Keep my notes');
  await page.locator('#libraryReviewSearchText').fill('<img src=x onerror=alert(1)> nonexistentzzzz');
  await page.locator('#libraryReviewSearchSend').click();
  await page.waitForFunction(()=>document.querySelector('.library-search-chat').textContent.includes('No matching records'));
  assert.equal(await page.locator('.library-search-chat img').count(),0);
  assert.ok(await page.locator('.library-dialog').evaluate(el=>el.scrollWidth<=el.clientWidth+1));
  await page.screenshot({path:path.resolve(__dirname,'../work/scan-description-search-mobile.png')});
  await page.locator('#libraryConfirmReview').click();
  const saved=await page.evaluate(()=>window.searchSaved);
  assert.equal(saved.player,'Stephen Curry');assert.ok(saved.hciCardId);assert.equal(saved.grade,'BGS 9.5');
  assert.deepEqual(errors,[]);
  console.log('PASS: live HCI season/name query, explicit selection, editable identity, grade/notes preserved, no-match, escaped chat, mobile and confirmation.');
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
