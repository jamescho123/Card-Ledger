const assert = require('node:assert/strict');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

(async () => {
  const browser = await chromium.launch({channel:'chrome',headless:true});
  try {
    const page = await browser.newPage({viewport:{width:1365,height:900}});
    const errors=[]; page.on('pageerror',error=>errors.push(error.message));
    await page.route('**/*.supabase.co/**',route=>route.abort());
    await page.goto('file:///Users/jamescho/Documents/Codex/2026-07-07/ma/outputs/index.html');
    await page.evaluate(()=>{
      account={email:'ui-test@example.invalid',name:'UI Test',role:'collector'}; saveAccount();
      cards=[{id:'ui-luka',player:'Luka Doncic',year:'2018',brand:'Panini',setName:'Donruss',sport:'Basketball',cardNumber:'177',quantity:1,paid:0,value:0,condition:'Raw'}];
      saveCards(); render(); setActivePage('collection'); setFocusWorkspaceView('collection','add',{scroll:false});
    });
    assert.equal(await page.locator('.beginner-entry-guide').getAttribute('open'),null);
    assert.equal(await page.locator('.player-scan-intro small').isVisible(),false);
    await page.locator('.beginner-entry-guide > summary').click();
    assert.equal(await page.locator('#beginnerGuideStatus').isVisible(),true);
    await page.locator('.beginner-entry-guide > summary').click();
    await page.locator('#sport').selectOption('Basketball');
    await page.locator('#hciYearPicker').selectOption('2018');
    await page.locator('#brand').selectOption('Panini');
    await page.locator('#setName').selectOption('Donruss');
    await page.locator('#player').selectOption('Luka Doncic');
    await page.screenshot({path:'/tmp/card-ledger-ui-add-desktop.png'});
    for(const viewport of [{width:1365,height:900},{width:390,height:844}]) {
      await page.setViewportSize(viewport);
      for(const name of ['portfolio','collection','market','trade','goals','community','account']) {
        await page.evaluate(name=>{setSidebarExpanded(false);setActivePage(name);if(name==='collection')setFocusWorkspaceView('collection','browse',{scroll:false});if(name==='trade')setFocusWorkspaceView('trade','builder',{scroll:false});},name);
        assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true,`${name} overflow at ${viewport.width}`);
        if(name==='trade') {
          assert.equal(await page.locator('.trade-entry-helper').getAttribute('open'),null);
          await page.locator('.trade-entry-helper > summary').click();
          assert.equal(await page.locator('.trade-entry-helper').getAttribute('open'),'');
          await page.locator('.trade-entry-helper > summary').click();
        }
        if(['collection','trade','portfolio'].includes(name)) await page.screenshot({path:`/tmp/card-ledger-ui-${name}-${viewport.width}.png`});
      }
    }
    assert.deepEqual(errors,[]);
    console.log('PASS: concise disclosures remain operable, entry fields remain available, and seven workspaces fit desktop/mobile without page errors.');
  } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
