const assert=require('node:assert/strict');
const path=require('node:path');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true});
 try{
  const page=await browser.newPage({viewport:{width:1280,height:900}}),errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.route('**/*.supabase.co/**',route=>route.abort());
  await page.goto('file://'+path.resolve(__dirname,'../outputs/index.html'));
  await page.waitForFunction(()=>window.CardLedgerLibrary);
  await page.evaluate(async()=>{
   account={name:'Rotation Test',email:'rotation-test@example.invalid',role:'admin'};cards=[];saveAccount();render();
   const canvas=document.createElement('canvas');canvas.width=1000;canvas.height=600;
   const context=canvas.getContext('2d');context.fillStyle='red';context.fillRect(0,0,400,300);context.fillStyle='blue';context.fillRect(0,300,400,300);context.fillStyle='green';context.fillRect(500,0,400,600);
   window.rotationOriginal=canvas.toDataURL('image/jpeg');window.rotationScans=[];
   cardLedgerBridge.scanImage=async image=>{rotationScans.push(image);return {identity:{player:'Test Player',year:'2025',brand:'Topps',setName:'Test',sport:'Basketball'},matches:[],image:rotationOriginal};};
   const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/jpeg'));
   await CardLedgerLibrary.selectRegions(new File([blob],'two-cards.jpg',{type:'image/jpeg'}),{cards:[{corners:[[0,0],[.4,0],[.4,1],[0,1]]},{corners:[[.5,0],[.9,0],[.9,1],[.5,1]]}]});
  });
  const first=page.locator('[data-region-rotation="0"]'),second=page.locator('[data-region-rotation="1"]');
  await first.locator('[data-rotate=right]').click();
  assert.equal(await first.locator('[data-rotation-angle]').inputValue(),'90');
  assert.equal(await second.locator('[data-rotation-angle]').inputValue(),'0');
  const pixels=await first.locator('canvas').evaluate(canvas=>({width:canvas.width,height:canvas.height,left:Array.from(canvas.getContext('2d').getImageData(20,200,1,1).data),right:Array.from(canvas.getContext('2d').getImageData(580,200,1,1).data)}));
  assert.deepEqual([pixels.width,pixels.height],[600,400]);assert.ok(pixels.left[2]>200);assert.ok(pixels.right[0]>200);
  await first.locator('[data-rotate=left]').click();
  assert.deepEqual(await first.locator('canvas').evaluate(canvas=>[canvas.width,canvas.height]),[400,600]);
  await first.locator('[data-rotate=right]').click();
  await second.locator('[data-rotation-angle]').fill('12.5');
  assert.ok((await second.locator('canvas').evaluate(canvas=>canvas.width))>400);
  await second.locator('[data-rotate=reset]').click();
  assert.equal(await second.locator('[data-rotation-angle]').inputValue(),'0');
  await page.setViewportSize({width:390,height:844});await first.scrollIntoViewIfNeeded();
  assert.ok(await page.locator('.library-dialog').evaluate(element=>element.scrollWidth<=element.clientWidth+1));
  await page.screenshot({path:path.resolve(__dirname,'../work/split-card-rotation-mobile.png'),animations:'disabled'});
  await page.locator('#libraryRegionScan').click();
  await page.waitForFunction(()=>CardLedgerLibrary.getQueue().length===2 && CardLedgerLibrary.getQueue().every(item=>item.matches));
  const dimensions=await page.evaluate(async()=>{const sizes=[];for(const card of CardLedgerLibrary.getQueue()){const im=new Image();im.src=card.image;await im.decode();sizes.push([im.width,im.height]);}return sizes;});
  assert.deepEqual(dimensions,[[600,400],[400,600]]);
  for(let i=0;i<2;i++){await page.locator('#libraryBatchReviewNext').click();await page.locator('#libraryConfirmReview').click();}
  await page.locator('#libraryBatchSave').click();
  assert.equal(await page.evaluate(()=>cards.length),2);
  assert.deepEqual(errors,[]);
  console.log('PASS: independent quarter-turns, fine rotation, reset, uncropped rotated pixels, mobile layout and orientation preserved through scan/review/save.');
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
