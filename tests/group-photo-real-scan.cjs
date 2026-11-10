const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
(async()=>{
  const source='/var/folders/cs/hhr3r2gx1p1c7hpvlzz4kjw40000gn/T/codex-clipboard-a4e6049b-d0a9-4f9d-9fc8-348148ad140e.jpg';
  const photo='data:image/jpeg;base64,'+fs.readFileSync(source).toString('base64');
  const detection=await(await fetch('http://127.0.0.1:8765/detect-cards',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({image:photo})})).json();
  assert.equal(detection.cards.length,5);
  const browser=await chromium.launch({channel:'chrome',headless:true});
  try{
    const page=await browser.newPage();
    await page.route('**/*.supabase.co/**',route=>route.abort());
    await page.goto('file://'+path.resolve(__dirname,'../outputs/index.html'));
    await page.waitForFunction(()=>window.cardLedgerBridge);
    const results=[];
    for(let index=0;index<detection.cards.length;index++){
      const result=await page.evaluate(async({image,index})=>{
        const result=await cardLedgerBridge.scanImage(image,`segment-${index+1}.jpg`);
        return {identity:result.identity,candidates:result.matches.map(match=>({identity:match.identity,score:match.score,reason:match.matchReason}))};
      },{image:detection.cards[index].image,index});
      results.push(result);
      console.log('Segment',index+1,JSON.stringify({player:result.identity.player,set:result.identity.setName,brand:result.identity.brand,top:result.candidates.slice(0,2).map(entry=>({player:entry.identity.player,set:entry.identity.setName,score:entry.score}))}));
    }
    fs.writeFileSync(path.resolve(__dirname,'../work/group-photo-real-scan.json'),JSON.stringify(results,null,2));
    assert.deepEqual(results.map(result=>result.identity.player),['Stephen Curry','Jimmy Butler','Stephen Curry','Jimmy Butler','Stephen Curry']);
    assert.equal(results[0].candidates[0].identity.setName,'Bowman');
    assert.equal(results[4].candidates[0].identity.setName,'Select');
    console.log('PASS: actual supplied photo split into five regions; all five player names correct; Bowman and Select top family matches. Other exact identities remain unconfirmed.');
  }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
