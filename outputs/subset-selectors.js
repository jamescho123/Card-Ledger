(() => {
  'use strict';
  const clean=value=>String(value||'').trim();
  const norm=value=>clean(value).toLowerCase().replace(/\s+/g,' ');
  const tr=(en,zh)=>document.documentElement.lang.startsWith('zh')?zh:en;
  const starts=(value,prefix)=>norm(value).startsWith(norm(prefix)+' ');
  function knownSubsets(context) {
    if(context.sport!=='Basketball')return [];
    const sets=Object.keys(window.HCI_SELECTION_CATALOG?.[clean(context.year).slice(0,4)]?.[context.brand]||{});
    const selected=clean(context.setName);
    if(!selected || !sets.length)return [];
    const programs=(window.CARD_SET_CATALOG||[]).filter(entry=>norm(entry.brand)===norm(context.brand)).map(entry=>entry.setName);
    // Intermediate HCI namespaces may be separate products, not inserts.
    // Prefer conservative omissions to listing Draft Picks/Deca as base Prizm inserts.
    const roots=[...new Set([...programs,...sets.filter(name=>sets.some(other=>starts(other,name)))])];
    const root=roots.filter(name=>norm(name)===norm(selected)||starts(selected,name)).sort((a,b)=>b.length-a.length)[0] || selected;
    return [...new Set(sets.filter(name=>starts(name,root) && !roots.some(program=>norm(program)!==norm(root) && starts(program,root) && (norm(name)===norm(program)||starts(name,program))))
      .map(name=>name.slice(root.length).trim()).filter(Boolean))].sort((a,b)=>a.localeCompare(b));
  }
  const bindings=new WeakMap();
  function bind(input,getContext,id) {
    if(!input)return {refresh:()=>{}};
    if(bindings.has(input))return bindings.get(input);
    const picker=document.createElement('select');picker.id=id;
    const source=document.createElement('small');source.className='subset-coverage';
    input.before(picker);input.after(source);
    let signature='',previousContext='';
    function refresh(reset=false) {
      const context=getContext(),key=JSON.stringify(context);
      if(reset && previousContext && key!==previousContext && picker.value!=='__custom__')input.value='';
      previousContext=key;
      const next=JSON.stringify([key,input.value,document.documentElement.lang]);
      if(next===signature)return;
      signature=next;
      const choices=knownSubsets(context),value=clean(input.value);
      picker.replaceChildren(new Option(tr('None / base card','无 / 基础卡'),''),...choices.map(name=>new Option(name,name)),new Option(tr('Other / enter manually','其他 / 手动输入'),'__custom__'));
      picker.setAttribute('aria-label',tr('Insert / subset selection','特卡 / 子系列选择'));
      picker.value=value?(choices.includes(value)?value:'__custom__'):'';
      input.hidden=picker.value!=='__custom__';
      input.setAttribute('aria-label',tr('Custom insert / subset name','手动输入特卡 / 子系列名称'));
      source.textContent=choices.length?tr(`HCI · ${choices.length} known names · partial list`,`HCI · ${choices.length} 个已知名称 · 非完整清单`):tr('No HCI subset list for this selection','当前选择暂无 HCI 子系列清单');
    }
    picker.onchange=()=>{
      if(picker.value==='__custom__'){input.hidden=false;input.focus();return;}
      input.value=picker.value;input.hidden=true;input.dispatchEvent(new Event('change',{bubbles:true}));signature='';refresh();
    };
    input.addEventListener('input',()=>{signature='';});
    const binding={refresh};bindings.set(input,binding);refresh();return binding;
  }
  const value=id=>{const field=document.getElementById(id);return field?.value==='__custom__'?document.getElementById(id+'Custom')?.value||'':field?.value||'';};
  const main=bind(document.getElementById('insertName'),()=>({sport:value('sport'),year:value('year'),brand:value('brand'),setName:value('setName')}),'insertNamePicker');
  for(const id of ['sport','year','hciYearPicker','brand','brandCustom','setName','setNameCustom']){
    const field=document.getElementById(id);
    for(const event of ['change','input'])field?.addEventListener(event,()=>queueMicrotask(()=>main.refresh(true)));
  }
  document.getElementById('cardForm')?.addEventListener('reset',()=>queueMicrotask(()=>main.refresh()));
  new MutationObserver(()=>main.refresh()).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  window.CardLedgerSubsets={knownSubsets,bind,refresh:()=>main.refresh()};
})();
