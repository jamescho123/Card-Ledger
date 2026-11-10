const assert=require('node:assert/strict');
const path=require('node:path');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true});
 try{
  const page=await browser.newPage({viewport:{width:390,height:844}}),learned=[],errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.route('**/*.supabase.co/**',route=>route.abort());
  await page.route('**/learn-scan',async route=>{
   learned.push(route.request().postDataJSON());
   await route.fulfill({json:{learned:true},headers:{'Access-Control-Allow-Origin':'*'}});
  });
  await page.goto('file://'+path.resolve(__dirname,'../outputs/index.html'));
  await page.waitForFunction(()=>window.CardLedgerLibrary);
  await page.evaluate(async()=>{
   account={name:'Learning Test',email:'learning-test@example.invalid',role:'admin'};cards=[];saveAccount();render();
   const row=(await (await fetch('http://127.0.0.1:8765/catalog?hci_id=1084814&limit=1')).json()).cards[0];
   window.learningIdentity={year:row.year,brand:row.brand,setName:row.set_name,player:row.player,parallel:row.parallel,cardNumber:row.card_number,hciCardId:row.hci_id};
   const canvas=document.createElement('canvas');canvas.width=100;canvas.height=140;window.learningPhoto=canvas.toDataURL('image/png');
   window.openLearningReview=()=>CardLedgerLibrary.review(learningPhoto,[{identity:learningIdentity,score:.93}],{},card=>window.learningSaved=card);
   openLearningReview();
  });
  await page.waitForSelector('#libraryReviewReference img');
  assert.equal(learned.length,0,'suggestion alone must not train');
  await page.locator('#libraryConfirmReview').click();
  await page.waitForFunction(()=>document.querySelector('#workspaceFeedback').textContent.includes('learned on this computer'));
  assert.equal(learned.length,1);assert.equal(learned[0].hciId,'1084814');assert.equal(learned[0].confirmed,true);
  assert.match(learned[0].learningScope,/^[a-f0-9]{64}$/);
  assert.ok(!JSON.stringify(learned[0]).includes('learning-test@example.invalid'));
  await page.evaluate(()=>openLearningReview());
  await page.waitForSelector('#libraryReviewReference img');
  await page.locator('#libraryLearnConfirmed').uncheck();
  await page.locator('#libraryConfirmReview').click();
  await page.evaluate(()=>openLearningReview());
  await page.waitForSelector('#libraryReviewReference img');
  await page.locator('#libraryReview-player').fill('Different Player');
  await page.locator('#libraryConfirmReview').click();
  await page.waitForTimeout(300);
  assert.equal(learned.length,1,'opt-out and modified identity must not train the selected HCI record');
  let exact=true;
  await page.route('**/identify',async route=>{
   assert.match(route.request().postDataJSON().learningScope,/^[a-f0-9]{64}$/);
   await route.fulfill({json:{matches:[{id:'1084814',year:'2009',brand:'Topps',setName:'Topps',player:'Stephen Curry',cardNumber:'321',parallel:'Gold',score:.995,visualScore:.995,confirmedExample:true,exactExample:exact}]},headers:{'Access-Control-Allow-Origin':'*'}});
  });
  let matches=await page.evaluate(()=>rankHciDatasetCandidates({},learningPhoto));
  assert.equal(matches[0].identity.parallel,'Gold');
  assert.match(matches[0].identity.matchSource,/previously confirmed/);
  exact=false;
  matches=await page.evaluate(()=>rankHciDatasetCandidates({},learningPhoto));
  assert.equal(matches[0].identity.parallel,'','similar photo alone must not infer a parallel');
  assert.deepEqual(errors,[]);
  console.log('PASS: confirmation-only learning; scoped payload without email; opt-out; edited identity blocked; mobile UI.');
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
