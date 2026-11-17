(() => {
  "use strict";
  const bridge = window.cardLedgerBridge;
  const advanced = window.CardLedgerAdvanced;
  if (!bridge || !document.querySelector("#cardLibraryArea")) return;
  const $ = (id) => document.getElementById(id);
  const escape = bridge.escapeHtml;
  const tr = (en, zh) => bridge.getLanguage() === "zh-CN" ? zh : en;
  const norm = (value) => String(value || "").normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9\u3400-\u9fff]/g, "");
  const endpoint = "http://127.0.0.1:8765";
  const filterFields = [["year", "Year", "年份"], ["brand", "Brand", "品牌"], ["set_name", "Set", "系列"], ["player", "Player", "球员"], ["parallel", "Parallel / insert", "平行 / 特卡"], ["card_number", "Card number", "卡号"]];
  let rows = [], page = 0, total = 0, request = 0, target = "", chosenEntry = null, variantRequest = 0;
  let queue = [], scanning = false, cleanupBusy = false, correctionRows = [];
  const BATCH_LIMIT = 20;
  let queueOwner = '';
  let copiesPage = 0, coverageTotal = 0, coverageData = null;
  const PAGE_SIZE = 24;
  const identityFields = ["year", "brand", "setName", "player", "parallel", "cardNumber"];
  function cardFromRow(row) {
    return { hciCardId: String(row.hci_id), sport: "Basketball", year: row.year, brand: row.brand, setName: row.set_name,
      player: row.player, parallel: row.parallel, cardNumber: row.card_number, type: "", condition: "Raw", referenceImage: row.imageUrl };
  }
  function sameIdentity(a, b) {
    if (a.sport && b.sport && norm(a.sport) !== norm(b.sport)) return false;
    if (a.hciCardId && b.hciCardId) return String(a.hciCardId) === String(b.hciCardId);
    return identityFields.every((field) => norm(a[field]) === norm(b[field]));
  }
  function name(card) { return [card.year, card.brand, card.setName, card.player, card.type, card.insertName, card.parallel, card.cardNumber ? `#${card.cardNumber}` : ""].filter(Boolean).join(" · "); }
  function status(value) { $("libraryStatus").textContent = value; }
  function showTab(tab) {
    document.querySelectorAll("[data-library-tab]").forEach((button) => button.classList.toggle("active", button.dataset.libraryTab === tab));
    ["search", "batch", "watch", "tools"].forEach((name) => { $(`library${name[0].toUpperCase() + name.slice(1)}Pane`).hidden = name !== tab; });
    if (tab === "tools") renderTools();
    if (tab === "watch") renderWatches();
  }
  async function query(params = {}) {
    const response = await fetch(`${endpoint}/catalog?${new URLSearchParams(params)}`, { signal: AbortSignal.timeout(30000) });
    if (!response.ok) throw new Error(tr("The local HCI library is unavailable.", "本地 HCI 数据库暂不可用。"));
    return response.json();
  }
  function filters() {
    const params = { q: $("libraryQuery").value.trim() };
    filterFields.forEach(([key]) => { const value = $(`libraryFilter-${key}`).value; if (value) params[key] = value; });
    return params;
  }
  function renderFilters() {
    $("libraryFilters").innerHTML = filterFields.map(([key, en, zh]) => `<label>${tr(en, zh)}${key === "card_number" ? `<input id="libraryFilter-${key}" />` : `<select id="libraryFilter-${key}"><option value="">${tr("All", "全部")}</option></select>`}</label>`).join("");
  }
  function fillFacets(facets) {
    filterFields.forEach(([field]) => {
      if (!facets[field]) return;
      const select = $(`libraryFilter-${field}`), current = select.value;
      const options = [...new Set([current, ...facets[field]].filter(Boolean))];
      select.innerHTML = `<option value="">${tr("All", "全部")}</option>${options.map((value) => `<option value="${escape(value)}">${escape(value)}</option>`).join("")}`;
      select.value = current;
    });
  }
  function thumbnail(url, alt) {
    return url ? `<img src="${escape(url)}" alt="${escape(alt)}" loading="lazy" />` : `<span class="library-no-image">${tr("Metadata only", "仅有资料")}</span>`;
  }
  async function search() {
    const token = ++request;
    $("libraryCount").textContent = tr("Searching…", "搜索中……");
    try {
      const data = await query({ ...filters(), limit: PAGE_SIZE, offset: page * PAGE_SIZE, facets: 1 });
      if (token !== request) return;
      rows = data.cards; total = data.total; fillFacets(data.facets);
      coverageTotal = data.coverage.metadata;
      coverageData = data.coverage;
      $("libraryCoverage").textContent = tr(`${data.coverage.metadata.toLocaleString()} records · Basketball`, `${data.coverage.metadata.toLocaleString()} 条 · 篮球`);
      $("libraryCount").textContent = tr(`${total.toLocaleString()} matches`, `${total.toLocaleString()} 个结果`);
      $("libraryResults").innerHTML = rows.map((row, index) => `<button type="button" class="library-result" data-library-card="${index}"><div class="library-thumbnail">${thumbnail(row.imageUrl, row.title)}</div><strong>${escape(row.player)}</strong><span>${escape([row.year, row.brand, row.set_name].filter(Boolean).join(" · "))}</span><small>${escape([row.parallel, row.card_number ? `#${row.card_number}` : ""].filter(Boolean).join(" · "))}</small></button>`).join("") || `<p>${tr("No matching cards.", "没有符合条件的卡片。")}</p>`;
      $("libraryPrevious").disabled = page === 0;
      $("libraryNext").disabled = (page + 1) * PAGE_SIZE >= total;
      $("libraryPage").textContent = `${total ? page + 1 : 0} / ${Math.ceil(total / PAGE_SIZE)}`;
      status(target ? tr(`Choose a card for ${target === "mine" ? "your side" : "the other side"}.`, "选择交易中的卡片。") : "");
    } catch (error) { if (token === request) { status(error.message); $("libraryCount").textContent = ""; } }
  }
  const dialog = document.createElement("dialog");
  dialog.className = "library-dialog";
  dialog.innerHTML = '<button type="button" class="library-close ghost-button" aria-label="Close">×</button><div class="library-dialog-content"></div>';
  document.body.append(dialog);
  dialog.querySelector(".library-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
  let modalGeneration = 0;
  function modal(content) { modalGeneration++; dialog.querySelector(".library-dialog-content").innerHTML = content; if (!dialog.open) dialog.showModal(); }
  function openEntry(card, image = "") {
    if (!bridge.requireMember("add cards")) return;
    bridge.openCardEntry(card, image);
    chosenEntry = { ...card }; updateVariants();
    dialog.close();
  }
  function tradeCard(card) {
    if (!bridge.requireMember("propose trades")) return;
    const input = $(target === "mine" ? "tradeAiMine" : "tradeAiTheirs");
    if (input) {
      const format = [card.year, [card.brand, card.setName].filter(Boolean).join(" "), card.player, card.type || "Base", card.parallel || "Base", card.cardNumber || "", "0"].join(" | ");
      input.value = [input.value.trim(), format].filter(Boolean).join("\n"); input.dispatchEvent(new Event("input", { bubbles: true }));
    }
    target = ""; dialog.close();
    bridge.openTrade();
  }
  function collectorsFor(card) {
    return bridge.getPublicCollectors().filter((profile) => profile.cards?.some((entry) => sameIdentity(entry, card)));
  }
  function showCollectors(card) {
    const owners = collectorsFor(card);
    modal(`<h2>${tr("Collectors", "藏家")}</h2><p>${escape(name(card))}</p>${owners.map((owner, index) => `<button type="button" class="ghost-button" data-library-owner="${index}">${escape(owner.name)}</button>`).join("") || `<p>${tr("No exact match in available public collections.", "可见的公开收藏中没有精确匹配。")}</p>`}`);
    dialog.querySelectorAll("[data-library-owner]").forEach((button) => { button.onclick = () => { dialog.close(); bridge.openCollector(owners[Number(button.dataset.libraryOwner)].id); }; });
  }
  function showCard(row) {
    const card = cardFromRow(row), owners = collectorsFor(card);
    const siblings = rows.filter((other) => other.player === row.player && other.year === row.year && other.brand === row.brand && other.set_name === row.set_name).length;
    modal(`<h2>${escape(card.player)}</h2><div class="library-card-detail"><div class="library-thumbnail">${thumbnail(row.imageUrl, name(card))}</div><div><p>${escape(name(card))}</p><dl><dt>HCI ID</dt><dd>${escape(card.hciCardId)}</dd><dt>${tr("Coverage", "资料覆盖")}</dt><dd>${tr(row.imageUrl ? "Reference photo available" : "Metadata only", row.imageUrl ? "有参考图片" : "仅有资料")}</dd><dt>${tr("Similar variants on this page", "当前页相似版本")}</dt><dd>${siblings}</dd></dl><div class="library-dialog-actions"><button id="libraryAddResult" type="button" class="primary-button">${tr(target ? "Use in trade" : "Add to collection", target ? "用于交易" : "加入收藏")}</button><button id="libraryWatchResult" type="button" class="ghost-button">${tr("Watch", "关注")}</button></div></div></div><details><summary>${tr("Collectors", "拥有此卡的藏家")} (${owners.length})</summary>${owners.map((owner) => `<p>${escape(owner.name)}</p>`).join("") || `<p>${tr("No exact match in available public collections.", "可见的公开收藏中没有精确匹配。")}</p>`}</details>`);
    $("libraryAddResult").onclick = () => target ? tradeCard(card) : openEntry(card);
    $("libraryWatchResult").onclick = () => { if (advanced.watchDatabaseCard(card)) { dialog.close(); status(tr("Added to watchlist.", "已加入关注名单。")); renderWatches(); } };
  }
  async function checklist() {
    if (!bridge.requirePlanAccess("goals", bridge.getGoals().length, "create collecting goals")) return;
    const params = filters();
    if (!params.year || !params.brand || !params.set_name) return status(tr("Choose a year, brand and set first.", "请先选择年份、品牌及系列。"));
    try {
      const data = await query({ ...params, limit: 1000 });
      if (!data.total) return status(tr("No cards in this checklist.", "此清单没有卡片。"));
      if (data.total > 1000) return status(tr("More than 1,000 cards. Narrow by player or parallel before creating a checklist.", "超过 1,000 张卡片，请按球员或平行版本缩小范围。"));
      const unique = [...new Map(data.cards.map((row) => [row.hci_id, row])).values()];
      modal(`<h2>${tr("Create checklist", "创建收集清单")}</h2><label>${tr("Name", "名称")}<input id="libraryGoalTitle" value="${escape([params.year, params.brand, params.set_name, params.player, params.parallel].filter(Boolean).join(" "))}" /></label><p>${tr(`${unique.length} exact database identities`, `${unique.length} 张精确数据库卡片`)}</p><button id="libraryConfirmGoal" class="primary-button" type="button">${tr("Create", "创建")}</button>`);
      $("libraryConfirmGoal").onclick = () => {
        if (!bridge.requireMember("create collecting goals")) return;
        const slots = Object.fromEntries(unique.map((row) => { const card = cardFromRow(row); return [`hci-${row.hci_id}`, { hciCardId: card.hciCardId, identity: card, cardNumber: card.cardNumber, player: card.player, label: name(card), owned: bridge.getCards().some((entry) => sameIdentity(entry, card)), image: "" }]; }));
        bridge.setGoals([...bridge.getGoals(), { id: crypto.randomUUID(), createdAt: new Date().toISOString(), title: $("libraryGoalTitle").value.trim() || params.set_name, type: "database", season: params.year, setName: params.set_name, player: params.player || "", parallel: params.parallel || "", slots }]);
        bridge.saveGoals(); bridge.render(); dialog.close(); status(tr("Checklist created.", "收集清单已创建。"));
      };
    } catch (error) { status(error.message); }
  }
  function syncGoalOwnership() {
    let changed = false;
    const ids = new Set(bridge.getCards().map((card) => String(card.hciCardId || "")));
    const key = (card) => identityFields.map((field) => norm(card[field])).join("|");
    const legacy = new Set(bridge.getCards().filter((card) => !card.hciCardId && card.sport === "Basketball").map(key));
    bridge.getGoals().filter((goal) => goal.type === "database").forEach((goal) => Object.values(goal.slots || {}).forEach((slot) => {
      const owned = ids.has(String(slot.hciCardId)) || Boolean(slot.identity && legacy.has(key(slot.identity)));
      if (slot.owned !== owned) { slot.owned = owned; changed = true; }
    }));
    if (changed) bridge.saveGoals();
  }
  function renderWatches() {
    const watches = advanced.getDatabaseWatches();
    $("libraryWatches").innerHTML = watches.map((item) => { const owners = collectorsFor(item.identity); return `<article><div><strong>${escape(item.card)}</strong><small>${tr(`${owners.length} public collectors · ${item.matchedPosts?.length || 0} listing alerts`, `${owners.length} 位公开藏家 · ${item.matchedPosts?.length || 0} 条上架提醒`)}</small></div><button class="ghost-button" type="button" data-library-watch-owners="${escape(item.id)}">${tr("Collectors", "藏家")}</button><button class="ghost-button" type="button" data-library-unwatch="${escape(item.id)}">${tr("Remove", "移除")}</button></article>`; }).join("") || `<p>${tr("No database cards watched.", "尚未关注数据库卡片。")}</p>`;
  }
  function persisted(card, extra = {}) {
    const now = new Date().toISOString();
    const record = advanced.enrichCard({ ...card, ...extra, id: crypto.randomUUID(), createdAt: now, updatedAt: now, quantity: 1, paid: Number(card.paid) || 0, value: Number(card.value) || 0, image: extra.image || "" });
    return { ...record, serialNumber:card.serialNumber || '', copies: [{ id: crypto.randomUUID(), serialNumber: card.serialNumber || "", certification: card.certification || "", grade: card.grade || "", location: card.location || "", createdAt: now }] };
  }
  function renderBatch() {
    const label=item=>{if(item.confirmed)return name(item.card);const best=item.matches?.reduce((top,entry)=>!top || Number(entry.score)>Number(top.score)?entry:top,null);return best?`${name(best.identity)} · ${tr('Review required','需要确认')}`:item.error || tr('Waiting','等待中');};
    $("libraryBatchQueue").innerHTML = queue.map((item, index) => `<article><img src="${escape(item.image)}" alt="${escape(item.filename)}" /><div><strong>${escape(item.filename)}</strong><small>${escape(label(item))}</small></div><button class="ghost-button" type="button" data-library-review-batch="${index}" ${!item.matches ? "disabled" : ""}>${tr("Review", "确认")}</button><button class="ghost-button" type="button" data-library-remove-batch="${index}">${tr("Remove", "移除")}</button></article>`).join("");
    $("libraryBatchSave").disabled = scanning || !queue.some((item) => item.confirmed);
    const confirmed = queue.filter(item => item.confirmed).length;
    $('libraryBatchCount').textContent = tr(`${queue.length}/${BATCH_LIMIT} cards · ${confirmed} confirmed`,`${queue.length}/${BATCH_LIMIT} 张卡片 · 已确认 ${confirmed} 张`);
    $('libraryBatchReviewNext').disabled = scanning || !queue.some(item => !item.confirmed && item.image && item.matches);
    $('libraryBatchUploadLabel').textContent = tr('Upload photos (up to 20)','上传图片（最多 20 张）');
    $('libraryBatchReviewNext').textContent = tr('Review next','确认下一张');
  }
  async function batchStorageImage(source) {
    const image = new Image(); image.src = source; await image.decode();
    const canvas = document.createElement('canvas');
    const scale = Math.min(1,1200 / Math.max(image.naturalWidth,image.naturalHeight));
    canvas.width = Math.round(image.naturalWidth * scale); canvas.height = Math.round(image.naturalHeight * scale);
    const context = canvas.getContext('2d'); context.fillStyle = '#fff'; context.fillRect(0,0,canvas.width,canvas.height); context.drawImage(image,0,0,canvas.width,canvas.height);
    let result = canvas.toDataURL('image/jpeg',0.82);
    if (result.length > 160000) result = canvas.toDataURL('image/jpeg',0.62);
    return result;
  }
  async function scanBatch(files) {
    if (scanning || !bridge.requireMember("scan cards")) return;
    files = Array.from(files || []);
    if (!files.length) return;
    if (files.length + queue.length > BATCH_LIMIT) {
      $('libraryBatchStatus').textContent = tr(`Up to 20 photos per batch. ${queue.length} already queued; choose at most ${BATCH_LIMIT-queue.length} more. No files were skipped or added.`,`每批最多 20 张。已有 ${queue.length} 张，请最多再选 ${BATCH_LIMIT-queue.length} 张。本次未添加任何文件。`);
      $('libraryBatchFiles').value = ''; return;
    }
    if (files.some(file => !(file.type.startsWith('image/') || /\.(jpe?g|png|webp|heic|heif)$/i.test(file.name)) || file.size > 20*1024*1024)) {
      $('libraryBatchStatus').textContent = tr('Choose image files of 20 MB or less each. No files were added.','请选择每张不超过 20 MB 的图片。本次未添加任何文件。'); $('libraryBatchFiles').value = ''; return;
    }
    const owner = bridge.getAccount().email;
    if (queue.length && queueOwner !== owner) { $('libraryBatchStatus').textContent = tr('Switch back to the account that started this batch.','请切回开始本批上传的账号。'); return; }
    queueOwner = owner;
    scanning = true; $("libraryBatchFiles").disabled = true;
    const progress = $('libraryBatchProgress'); progress.hidden = false; progress.max = files.length; progress.value = 0;
    try {
    for (const file of files) {
      if (bridge.getAccount().email !== owner) break;
      const item = { filename: file.name, image: "", confirmed: false }; queue.push(item);
      try {
        item.image = await bridge.readScanFile(file); renderBatch();
        $("libraryBatchStatus").textContent = tr(`Scanning ${progress.value+1}/${files.length}: ${file.name}`, `正在识别 ${progress.value+1}/${files.length}：${file.name}`);
        const detection = file.cardCrop ? {cards:[]} : await bridge.detectCards(item.image);
        const photos = detection.cards?.length > 1 ? detection.cards.map(card => card.image) : [item.image];
        if (queue.length - 1 + photos.length > BATCH_LIMIT) throw new Error(tr('Too many cards for this batch. Use smaller groups.','本批卡片超过 20 张，请分组上传。'));
        for (let index = 0; index < photos.length; index++) {
          if (bridge.getAccount().email !== owner) break;
          const child = index ? { filename:`${file.name} · ${index+1}`, confirmed:false } : item;
          if (index) queue.push(child);
          child.image = await batchStorageImage(photos[index]);
          if (photos.length > 1 && !index) child.filename = `${file.name} · 1`;
          try {
            const result = await bridge.scanImage(photos[index], `${file.name} card ${index+1}`);
            child.matches = result.matches || []; child.identity = result.identity || {};
            if(result.image && !file.rotationLocked)child.image=await batchStorageImage(result.image);
            if (!child.matches.length) child.error = tr('No match. Review manually.','没有匹配，请手动确认。');
          } catch (error) { child.matches = []; child.error = error.message; }
          renderBatch();
        }
      } catch (error) { item.error = error.message; item.matches = []; }
      progress.value += 1;
      renderBatch();
    }
    } finally {
    scanning = false; $("libraryBatchFiles").disabled = false; $("libraryBatchFiles").value = ""; renderBatch();
    $("libraryBatchStatus").textContent = bridge.getAccount().email === owner ? tr("Scanning finished. Confirm cards before saving.", "识别完成，请确认卡片后保存。") : tr('Account changed. Switch back before reviewing or saving.','账号已切换，请切回原账号后确认并保存。');
    }
  }
  async function referenceFor(identity) {
    if (!identity?.hciCardId) return null;
    const data = await query({ hci_id: identity.hciCardId, limit: 1 }); return data.cards[0] || null;
  }
  function rotatedCrop(image, bounds, angle=0, limit=Infinity) {
    const [x,y,width,height]=bounds, radians=angle*Math.PI/180;
    const snap=value=>value<1e-10?0:value>1-1e-10?1:value;
    const cosine=snap(Math.abs(Math.cos(radians))),sine=snap(Math.abs(Math.sin(radians)));
    const fullWidth=width*cosine+height*sine;
    const fullHeight=height*cosine+width*sine;
    const scale=Math.min(1,limit/Math.max(fullWidth,fullHeight));
    const canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.ceil(fullWidth*scale));canvas.height=Math.max(1,Math.ceil(fullHeight*scale));
    const context=canvas.getContext('2d');context.fillStyle='#fff';context.fillRect(0,0,canvas.width,canvas.height);
    context.translate(canvas.width/2,canvas.height/2);context.scale(scale,scale);context.rotate(radians);
    context.drawImage(image,x,y,width,height,-width/2,-height/2,width,height);
    return canvas;
  }
  function rotationTools(index, angle=0) {
    const label=tr(`Card ${index+1} rotation`,`卡片 ${index+1} 旋转角度`);
    return `<div class="library-rotation-tools">${[['left','rotate_left',tr('Rotate left 90 degrees','向左旋转 90 度')],['right','rotate_right',tr('Rotate right 90 degrees','向右旋转 90 度')],['reset','restart_alt',tr('Reset rotation','重置旋转')]].map(([action,icon,title])=>`<button type="button" class="ghost-button" data-rotate="${action}" title="${title}" aria-label="${title}"><span class="material-symbols-outlined" aria-hidden="true">${icon}</span></button>`).join('')}<label><span class="sr-only">${label}</span><input type="number" min="-360" max="360" step="0.1" value="${angle}" aria-label="${label}" data-rotation-angle><span aria-hidden="true">°</span></label></div>`;
  }
  async function scanRegions(regions, filename='photo') {
    const files = await Promise.all(regions.map(async (region,index) => {
      const blob = await (await fetch(region.image)).blob();
      const file = new File([blob], `${filename} · ${index+1}.jpg`, {type:'image/jpeg'});
      file.cardCrop = true;
      file.rotationLocked = Boolean(region.rotationLocked);
      return file;
    }));
    bridge.openLibrary(); showTab('batch');
    await scanBatch(files);
  }
  async function selectRegions(file, detection = null, additionalFiles = []) {
    if (!bridge.requireMember('scan cards')) return;
    const startingOwner = bridge.getAccount().email;
    const source = await bridge.readScanFile(file), image = new Image(); image.src = source; await image.decode();
    if (startingOwner !== bridge.getAccount().email) return;
    detection ||= await bridge.detectCards(source);
    if (startingOwner !== bridge.getAccount().email) return;
    modal(`<h2>${tr('Separate cards','分开识别卡片')}</h2><p>${tr('Check each numbered crop. Drag inside to move it, or drag its corner to resize.','请检查每个编号框。拖动框内可移动，拖动角点可调整大小。')}</p><div class="library-filter-grid"><label>${tr('Cards in photo','照片中的卡片数')}<input id="libraryRegionExpected" type="number" min="1" max="20" value="${detection.cards?.length || 1}"></label><label>${tr('Layout','排列')}<select id="libraryRegionLayout"><option value="columns">${tr('Columns','按列')}</option><option value="rows">${tr('Rows','按行')}</option></select></label><button id="libraryRegionSplit" type="button">${tr('Make segments','生成分区')}</button></div><canvas id="libraryRegionCanvas" style="display:block;width:100%;max-height:65vh;object-fit:contain;touch-action:none"></canvas><p id="libraryRegionCount" role="status"></p><button type="button" id="libraryRegionUndo">${tr('Undo','撤销')}</button><button type="button" id="libraryRegionClear">${tr('Clear boxes','清空框选')}</button><button type="button" id="libraryRegionScan" class="primary-button">${tr('Scan each card','逐张识别')}</button>`);
    const canvas=$('libraryRegionCanvas'), context=canvas.getContext('2d'), regions=[];
    const rotations=[];
    const previews=document.createElement('div');previews.id='libraryRegionRotations';previews.className='library-region-rotations';canvas.after(previews);
    const cropFor=(index,limit=Infinity)=>{const [x,y,w,h]=regions[index];return rotatedCrop(image,[x/scale,y/scale,w/scale,h/scale],rotations[index]||0,limit);};
    const paintPreview=index=>{
      const preview=previews.querySelector(`[data-region-rotation="${index}"] canvas`);if(!preview)return;
      const crop=cropFor(index,600);preview.width=crop.width;preview.height=crop.height;preview.getContext('2d').drawImage(crop,0,0);
    };
    const renderPreviews=()=>{
      previews.innerHTML=regions.map((_,index)=>`<section data-region-rotation="${index}"><h3>${tr(`Card ${index+1}`,`卡片 ${index+1}`)}</h3><canvas role="img" aria-label="${tr(`Card ${index+1} rotated preview`,`卡片 ${index+1} 旋转预览`)}"></canvas>${rotationTools(index,rotations[index]||0)}</section>`).join('');
      previews.querySelectorAll('[data-rotation-angle]').forEach(input=>{input.required=true;});
      regions.forEach((_,index)=>paintPreview(index));
    };
    previews.addEventListener('click',event=>{
      const button=event.target.closest('[data-rotate]');if(!button)return;
      const section=button.closest('[data-region-rotation]'),index=Number(section.dataset.regionRotation);
      const amount=button.dataset.rotate==='left'?-90:90;
      rotations[index]=button.dataset.rotate==='reset'?0:((rotations[index]||0)+amount+540)%360-180;
      section.querySelector('[data-rotation-angle]').value=rotations[index];paintPreview(index);
    });
    previews.addEventListener('input',event=>{
      if(!event.target.matches('[data-rotation-angle]') || !event.target.validity.valid || event.target.value==='')return;
      const index=Number(event.target.closest('[data-region-rotation]').dataset.regionRotation);
      rotations[index]=Number(event.target.value);paintPreview(index);
    });
    for(const id of ['libraryRegionSplit','libraryRegionUndo','libraryRegionClear'])$(id).classList.add('ghost-button');
    canvas.setAttribute('aria-label',tr('Numbered card regions. Drag to select, move or resize.','卡片编号分区。拖动可框选、移动或调整大小。'));
    const scale=Math.min(1,1000/Math.max(image.naturalWidth,image.naturalHeight));
    canvas.width=Math.round(image.naturalWidth*scale); canvas.height=Math.round(image.naturalHeight*scale);
    for (const card of detection.cards || []) {
      const xs=card.corners.map(p=>p[0]*canvas.width),ys=card.corners.map(p=>p[1]*canvas.height);
      regions.push([Math.min(...xs),Math.min(...ys),Math.max(...xs)-Math.min(...xs),Math.max(...ys)-Math.min(...ys)]);
    }
    // An explicit aspect ratio keeps pointer coordinates aligned on phones.
    canvas.style.aspectRatio=`${canvas.width}/${canvas.height}`; canvas.style.maxHeight='none';
    let start=null,editing=-1,resizing=false,originalBox=null;
    const point=event=>{const rect=canvas.getBoundingClientRect();return [Math.max(0,Math.min(canvas.width,(event.clientX-rect.left)*canvas.width/rect.width)),Math.max(0,Math.min(canvas.height,(event.clientY-rect.top)*canvas.height/rect.height))];};
    const draw=draft=>{context.drawImage(image,0,0,canvas.width,canvas.height);[...regions,...(draft?[draft]:[])].forEach(([x,y,w,h],index)=>{context.strokeStyle='#50d890';context.lineWidth=3;context.strokeRect(x,y,w,h);context.fillStyle='#052c22';context.fillRect(x,y,28,26);context.fillStyle='#fff';context.font='18px sans-serif';context.fillText(String(index+1),x+5,y+20);context.fillStyle='#50d890';context.fillRect(x+w-7,y+h-7,14,14);});$('libraryRegionCount').textContent=tr(`${regions.length} cards selected`, `已选择 ${regions.length} 张卡片`);$('libraryRegionScan').disabled=!regions.length;if(!start)renderPreviews();};
    const box=end=>[Math.min(start[0],end[0]),Math.min(start[1],end[1]),Math.abs(end[0]-start[0]),Math.abs(end[1]-start[1])];
    canvas.onpointerdown=event=>{event.preventDefault();start=point(event);editing=regions.findIndex(([x,y,w,h])=>Math.abs(start[0]-x-w)<20 && Math.abs(start[1]-y-h)<20);resizing=editing>=0;if(editing<0)editing=regions.findIndex(([x,y,w,h])=>start[0]>=x&&start[0]<=x+w&&start[1]>=y&&start[1]<=y+h);originalBox=editing>=0?[...regions[editing]]:null;if(editing<0&&regions.length+queue.length>=BATCH_LIMIT){start=null;return;}canvas.setPointerCapture(event.pointerId);};
    canvas.onpointermove=event=>{if(!start)return;const end=point(event);if(editing>=0){const [x,y,w,h]=originalBox;if(resizing)regions[editing]=[x,y,Math.max(26,end[0]-x),Math.max(26,end[1]-y)];else regions[editing]=[Math.max(0,Math.min(canvas.width-w,x+end[0]-start[0])),Math.max(0,Math.min(canvas.height-h,y+end[1]-start[1])),w,h];draw();}else draw(box(end));};
    canvas.onpointerup=event=>{if(!start)return;const rect=box(point(event));if(editing<0&&rect[2]>25&&rect[3]>25)regions.push(rect);start=null;editing=-1;draw();};
    canvas.onpointercancel=()=>{start=null;draw();};
    $('libraryRegionUndo').onclick=()=>{regions.pop();rotations.length=regions.length;draw();};
    $('libraryRegionClear').onclick=()=>{regions.length=0;rotations.length=0;draw();};
    $('libraryRegionSplit').onclick=()=>{
      const count=Number($('libraryRegionExpected').value);
      if(!Number.isInteger(count)||count<1||count+queue.length>BATCH_LIMIT)return;
      rotations.length=0;
      if(count===(detection.cards?.length||0)){regions.length=0;for(const card of detection.cards){const xs=card.corners.map(p=>p[0]*canvas.width),ys=card.corners.map(p=>p[1]*canvas.height);regions.push([Math.min(...xs),Math.min(...ys),Math.max(...xs)-Math.min(...xs),Math.max(...ys)-Math.min(...ys)]);}draw();return;}
      const columns=$('libraryRegionLayout').value==='columns',tracks=Math.min(count,Math.ceil(Math.sqrt(count/1.5))),long=columns?canvas.height:canvas.width,short=columns?canvas.width:canvas.height;
      regions.length=0;let remaining=count;
      for(let track=0;track<tracks;track++){const slots=Math.ceil(remaining/(tracks-track));remaining-=slots;for(let slot=0;slot<slots;slot++){const a=track*short/tracks,b=slot*long/slots,w=short/tracks,h=long/slots;regions.push(columns?[a,b,w,h]:[b,a,h,w]);}}
      draw();
    };
    const owner=bridge.getAccount().email;
    $('libraryRegionScan').onclick=async()=>{
      if(bridge.getAccount().email!==owner)return;
      if([...previews.querySelectorAll('[data-rotation-angle]')].some(input=>!input.reportValidity() || input.value===''))return;
      const crops=regions.map((_,index)=>({image:cropFor(index).toDataURL('image/jpeg',.92),rotationLocked:true}));
      dialog.close();bridge.closeScanner();await scanRegions(crops,file.name);
      if(additionalFiles.length && bridge.getAccount().email===owner)await scanBatch(additionalFiles);
    };
    draw();
  }
  function reviewMarkup(image, candidates, initial = {}) {
    return `<h2>${tr("Review card", "确认卡片")}</h2><div class="library-review-images"><div>${thumbnail(image, tr("Your photo", "上传图片"))}<small>${tr("Your photo", "上传图片")}</small></div><div id="libraryReviewReference"><span class="library-no-image">${tr("Select a reference", "选择参考卡片")}</span></div></div><label>${tr("Candidate", "候选卡片")}<select id="libraryReviewCandidate"><option value="">${tr("Manual details", "手动填写")}</option>${candidates.map((entry, index) => `<option value="${index}">${escape(name(entry.identity))} · ${Math.round(entry.score * 100)}%</option>`).join("")}</select></label><div class="library-filter-grid">${identityFields.map((field) => `<label>${tr(({year:"Year",brand:"Brand",setName:"Set",player:"Player",parallel:"Parallel",cardNumber:"Card number"})[field], ({year:"年份",brand:"品牌",setName:"系列",player:"球员",parallel:"平行版本",cardNumber:"卡号"})[field])}<input id="libraryReview-${field}" value="${escape(initial[field] || "")}" /></label>`).join("")}</div><p id="libraryReviewStatus" role="status"></p><button id="libraryConfirmReview" type="button" class="primary-button">${tr("Confirm details", "确认信息")}</button>`;
  }
  async function review(image, candidates, initial, onConfirm, {preserveEdits=false}={}) {
    initial = initial || {};
    candidates=[...(candidates||[])].sort((a,b)=>(Number(b.score)||0)-(Number(a.score)||0));
    const selectedIndex=Math.max(0,candidates.findIndex(entry=>initial.hciCardId && String(entry.identity.hciCardId)===String(initial.hciCardId)));
    const best=candidates[selectedIndex]?.identity || {};
    const strong = candidates[0] && (candidates[0].matchReason==='certificate' || candidates[0].score>=.9);
    const seed = {...initial};
    if(!preserveEdits)for (const field of [...identityFields,'type','insertName','cardDescription']) if(best[field])seed[field]=best[field];
    modal(reviewMarkup(image, candidates, seed));
    const generation = modalGeneration;
    if(!strong)$('libraryReviewStatus').textContent=tr('Review needed — no confident exact catalog match.','需要确认：尚无可靠的具体卡片匹配。');
    const extraFields = [['sport','Sport','运动'],['grade','Grade','评级'],['certification','Certification number','证书编号'],['serialNumber','Serial number','编限号码'],['location','Storage location','存放位置'],['notes','Notes','备注']];
    $('libraryReviewStatus').insertAdjacentHTML('beforebegin', `<div class="library-filter-grid">${extraFields.map(([field,en,zh])=>`<label>${tr(en,zh)}<input id="libraryReview-${field}" value="${escape(seed[field] || (field==='sport'?'Basketball':''))}" ${field==='grade'?'placeholder="PSA 9 / BGS 10"':''}></label>`).join('')}</div>`);
    const types=[['Base','Base card','基础卡'],['Autograph','Autograph / signature','签名卡'],['Memorabilia','Jersey / memorabilia','球衣 / 实物卡'],['Autograph Memorabilia','Autograph + memorabilia','签名实物卡'],['Insert','Insert','特卡'],['Other','Other','其他']];
    if(seed.type && !types.some(([value])=>value===seed.type))types.push([seed.type,seed.type,seed.type]);
    $('libraryReviewStatus').insertAdjacentHTML('beforebegin',`<div class="library-filter-grid"><label>${tr('Card type','卡片类型')}<select id="libraryReview-type"><option value="">${tr('Unspecified','未注明')}</option>${types.map(([value,en,zh])=>`<option value="${escape(value)}" ${seed.type===value?'selected':''}>${escape(tr(en,zh))}</option>`).join('')}</select></label><label>${tr('Insert / subset name','特卡 / 子系列名称')}<input id="libraryReview-insertName" value="${escape(seed.insertName||'')}" placeholder="${tr('All Heart, Emergent…','All Heart、Emergent 等')}"></label><label>${tr('Autograph / memorabilia details','签名 / 实物详情')}<input id="libraryReview-cardDescription" value="${escape(seed.cardDescription||'')}" placeholder="${tr('On-card auto, jersey patch…','卡签、贴签、球衣切片等')}"></label></div>`);
    $('libraryReview-sport').closest('.library-filter-grid').before($('libraryReview-type').closest('.library-filter-grid'));
    $('libraryReview-type').closest('.library-filter-grid').classList.add('library-card-type-fields');
    let selected = null, selectedReference = null, referenceToken = 0;
    const subsetPicker=window.CardLedgerSubsets?.bind($('libraryReview-insertName'),()=>({sport:$('libraryReview-sport').value,year:$('libraryReview-year').value,brand:$('libraryReview-brand').value,setName:$('libraryReview-setName').value}),'libraryReviewSubsetPicker');
    for(const field of ['sport','year','brand','setName'])for(const event of ['input','change'])$(`libraryReview-${field}`).addEventListener(event,()=>subsetPicker?.refresh(true));
    $('libraryConfirmReview').insertAdjacentHTML('beforebegin',`<label class="library-learn-choice"><input id="libraryLearnConfirmed" type="checkbox" checked> ${tr('Learn from this confirmed HCI match on this computer','在本机学习这次确认的 HCI 匹配')}</label><small>${tr('Visual features only; no photo upload or shared model training.','仅保存视觉特征，不上传照片或训练共享模型。')}</small>`);
    const owner = bridge.getAccount().email;
    $('libraryReviewCandidate').closest('label').insertAdjacentHTML('afterend', `<details class="library-scan-search"><summary>${tr('None match? Search HCI','都不匹配？搜索 HCI')}</summary><div class="library-search-chat" role="log" aria-live="polite"><p>${tr('Describe the card to search the local HCI catalog.','输入卡片信息，搜索本地 HCI 目录。')}</p></div><label for="libraryReviewSearchText">${tr('Card description','卡片描述')}</label><div class="library-search-compose"><textarea id="libraryReviewSearchText" rows="2" maxlength="350" placeholder="2018-19 Panini Prizm Trae Young Silver #78"></textarea><button id="libraryReviewSearchSend" type="button" class="primary-button">${tr('Search','搜索')}</button></div><div id="libraryReviewSearchResults"></div></details>`);
    const chat=dialog.querySelector('.library-search-chat'), searchInput=$('libraryReviewSearchText'), searchButton=$('libraryReviewSearchSend'), searchResults=$('libraryReviewSearchResults');
    let searchToken=0, searchRows=[];
    const live=()=>dialog.open && generation===modalGeneration && bridge.getAccount().email===owner;
    async function searchDescription(){
      const description=searchInput.value.trim();
      if(!description || !live())return;
      const token=++searchToken;
      const message=document.createElement('p');message.className='library-search-message';message.textContent=description;
      chat.append(message);while(chat.children.length>5)chat.firstElementChild.remove();
      const reply=document.createElement('p');reply.textContent=tr('Searching HCI…','正在搜索 HCI…');chat.append(reply);
      searchButton.disabled=true;searchResults.replaceChildren();searchRows=[];
      // Catalog years use the season's starting year; punctuation is not an FTS term.
      const year=description.match(/\b(?:19|20)\d{2}(?:\s*[-–/]\s*\d{2,4})?\b/);
      const words=description.replace(year?.[0]||/^$/,' ').replace(/\bsteph\b/gi,'Stephen').replace(/\b(?:PSA|BGS|SGC|CGC)\s*\d+(?:\.\d+)?\b/gi,' ').replace(/\b(?:basketball|card|cards|rookie|raw|please|find|the)\b/gi,' ').match(/[\p{L}\p{N}]+/gu)||[];
      if(!words.length){reply.textContent=tr('Include a player, brand or set name.','请输入球员、品牌或系列名称。');searchButton.disabled=false;return;}
      try{
        const data=await query({q:words.join(' '),...(year?{year:year[0].slice(0,4)}:{}),limit:24});
        if(!live() || token!==searchToken)return;
        searchRows=data.cards;
        reply.textContent=data.total?tr(`${data.total} catalog matches. Choose one to fill the details.`, `找到 ${data.total} 张卡片，选择一张填入信息。`):tr('No matching records in this HCI snapshot. Try fewer details, or edit the fields below.','当前 HCI 快照没有匹配记录。请减少搜索条件，或编辑下方信息。');
        searchResults.innerHTML=searchRows.map((row,index)=>`<button type="button" class="library-search-result" data-search-card="${index}">${thumbnail(row.imageUrl,name(cardFromRow(row)))}<span>${escape(name(cardFromRow(row)))}</span></button>`).join('');
        if(data.total>24){const hint=document.createElement('small');hint.textContent=tr('Showing the first 24. Add a set, parallel or card number to narrow the search.','显示前 24 张。添加系列、平行版本或卡号缩小搜索范围。');searchResults.append(hint);}
      }catch(error){if(live() && token===searchToken)reply.textContent=tr('HCI search is unavailable. Start the local HCI service and retry; manual details still work.','HCI 搜索暂不可用，请启动本地 HCI 服务后重试；仍可手动填写。');}
      finally{if(live() && token===searchToken)searchButton.disabled=false;}
    }
    searchButton.onclick=searchDescription;
    searchInput.onkeydown=event=>{if(event.key==='Enter' && !event.shiftKey && !event.isComposing){event.preventDefault();searchDescription();}};
    searchResults.addEventListener('click',event=>{
      const button=event.target.closest('[data-search-card]');
      if(!button || !live())return;
      const row=searchRows[Number(button.dataset.searchCard)];if(!row)return;
      let index=candidates.findIndex(entry=>String(entry.identity.hciCardId)===String(row.hci_id));
      if(index<0){index=candidates.length;candidates.push({identity:cardFromRow(row),score:0});$('libraryReviewCandidate').add(new Option(`${name(cardFromRow(row))} · HCI`,String(index)));}
      $('libraryReviewCandidate').value=String(index);
      for(const field of ['type','insertName','cardDescription'])$(`libraryReview-${field}`).value='';
      $('libraryReviewCandidate').onchange();
      [...searchResults.querySelectorAll('[data-search-card]')].forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
    });
    $("libraryReviewCandidate").onchange = async () => {
      const value = $("libraryReviewCandidate").value;
      selected = value === "" ? null : candidates[Number(value)]?.identity;
      selectedReference = null;
      const token = ++referenceToken;
      identityFields.forEach((field) => { $(`libraryReview-${field}`).value = (selected || seed)[field] || ""; });
      for(const field of ['type','insertName','cardDescription'])if(selected?.[field]){
        const input=$(`libraryReview-${field}`);
        if(field==='type' && ![...input.options].some(option=>option.value===selected.type))input.add(new Option(selected.type,selected.type));
        input.value=selected[field];
      }
      $("libraryReviewStatus").textContent = tr("Check the parallel and card number against your photo.", "请对照照片确认平行版本与卡号。");
      subsetPicker?.refresh();
      try {
        const row = await referenceFor(selected);
        if (token !== referenceToken || !dialog.open || generation !== modalGeneration) return;
        selectedReference = row;
        // References must not overwrite edits made while the request was in flight.
        $("libraryReviewReference").innerHTML = thumbnail(row?.imageUrl, selected ? name(selected) : "") + `<small>${tr("Database reference", "数据库参考图")}</small>`;
      } catch (error) { if (token === referenceToken && generation === modalGeneration && dialog.open) $("libraryReviewStatus").textContent = error.message; }
    };
    $("libraryConfirmReview").onclick = () => {
      if (bridge.getAccount().email !== owner || !bridge.requireMember('add cards')) return;
      const card = Object.fromEntries(identityFields.map((field) => [field, $(`libraryReview-${field}`).value.trim()]));
      if (!card.player || !card.year || !card.brand || !card.setName) { $("libraryReviewStatus").textContent = tr("Player, year, brand and set are required.", "请填写球员、年份、品牌及系列。"); return; }
      extraFields.forEach(([field]) => { card[field] = $(`libraryReview-${field}`).value.trim(); });
      for(const field of ['type','insertName','cardDescription'])card[field]=$(`libraryReview-${field}`).value.trim();
      card.sport ||= 'Basketball'; card.condition = card.grade ? 'Graded' : 'Raw';
      if (selectedReference && (!card.insertName || norm(selectedReference.set_name).endsWith(norm(card.insertName))) && identityFields.every((field) => norm(card[field]) === norm(cardFromRow(selectedReference)[field]))) card.hciCardId = selectedReference.hci_id;
      if(card.hciCardId && image && $('libraryLearnConfirmed').checked){
        const learningOwner=owner;
        (async()=>{
          try{
            const scope=await scanLearningScope();
            if(!scope || bridge.getAccount().email!==learningOwner)return;
            const response=await fetch(`${endpoint}/learn-scan`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({image,hciId:String(card.hciCardId),learningScope:scope,confirmed:true}),signal:AbortSignal.timeout(15000)});
            if(!response.ok)throw new Error('learning unavailable');
            if(bridge.getAccount().email===learningOwner)showWorkspaceFeedback(tr('Confirmed match learned on this computer.','已在本机学习这次确认的匹配。'));
          }catch{if(bridge.getAccount().email===learningOwner)showWorkspaceFeedback(tr('Card details confirmed. Learning was unavailable; keep the HCI service running.','卡片信息已确认，但学习暂不可用；请保持 HCI 服务运行。'));}
        })();
      }
      onConfirm(card); dialog.close();
    };
    const index = candidates.length ? selectedIndex : -1;
    if (index >= 0) {
      $('libraryReviewCandidate').value = String(index);
      selected = candidates[index].identity;
      const token = ++referenceToken;
      try { const row = await referenceFor(selected); if (token === referenceToken && generation === modalGeneration && dialog.open && $('libraryReviewReference')) { selectedReference=row; if(row)$('libraryReviewReference').innerHTML=thumbnail(row.imageUrl,name(selected)); } } catch { /* Editable fields remain usable offline. */ }
    }
  }
  function saveBatch() {
    if (scanning || !bridge.requireMember("add cards")) return;
    if (queueOwner !== bridge.getAccount().email) { status(tr('Switch back to the account that uploaded this batch.','请切回上传本批图片的账号。')); return; }
    const confirmed = queue.filter((item) => item.confirmed);
    if (!confirmed.length) return;
    const added = confirmed.map((item) => persisted(item.card, { image: item.image, imageProvider: "Uploaded card scan" }));
    const previous = bridge.getCards();
    try { bridge.setCards([...added, ...previous]); bridge.saveCards(); queue = queue.filter((item) => !item.confirmed); bridge.render(); renderBatch(); }
    catch { bridge.setCards(previous); status(tr("Could not save. Your confirmed photos are still queued.", "保存失败，已确认图片仍保留在队列中。")); return; }
    const savedMessage = tr(`${added.length} cards saved to your collection.`, `已将 ${added.length} 张卡片保存到收藏。`);
    status(savedMessage); $('libraryBatchStatus').textContent = savedMessage;
  }
  async function findCorrections() {
    if (cleanupBusy || !bridge.requireMember("review collection data")) return;
    cleanupBusy = true; $("libraryFindCorrections").disabled = true; correctionRows = [];
    const candidates = bridge.getCards().filter((card) => card.sport === "Basketball" && !card.hciCardId && card.player && card.year);
    try {
      for (const card of candidates) {
        const data = await query({ player: card.player, year: card.year.slice(0, 4), limit: 24, ...(card.brand ? { brand: card.brand } : {}) });
        const preferred = data.cards.filter((row) => !card.cardNumber || norm(row.card_number) === norm(card.cardNumber));
        if (preferred.length) correctionRows.push({ cardId: card.id, rows: preferred.slice(0, 8) });
        $("libraryCorrections").textContent = tr(`Checked ${candidates.indexOf(card) + 1}/${candidates.length}`, `已检查 ${candidates.indexOf(card) + 1}/${candidates.length}`);
      }
      $("libraryCorrections").innerHTML = correctionRows.map((entry, index) => `<article><div><strong>${escape(name(bridge.getCards().find((card) => card.id === entry.cardId) || {}))}</strong><small>${tr(`${entry.rows.length} suggestions`, `${entry.rows.length} 个候选`)}</small></div><button type="button" class="ghost-button" data-library-correction="${index}">${tr("Preview", "预览")}</button></article>`).join("") || `<p>${tr("No database suggestions found.", "没有找到资料修正建议。")}</p>`;
    } catch (error) { status(error.message); }
    finally { cleanupBusy = false; $("libraryFindCorrections").disabled = false; }
  }
  function correction(index) {
    const entry = correctionRows[index], card = bridge.getCards().find((item) => item.id === entry.cardId);
    if (!card) return;
    modal(`<h2>${tr("Review correction", "确认资料修正")}</h2><p>${escape(name(card))}</p><select id="libraryCorrectionChoice">${entry.rows.map((row, index) => `<option value="${index}">${escape(name(cardFromRow(row)))}</option>`).join("")}</select><div id="libraryCorrectionDiff"></div><button id="libraryApplyCorrection" type="button" class="primary-button">${tr("Apply selected identity", "应用所选资料")}</button>`);
    function preview() {
      const selected = cardFromRow(entry.rows[Number($("libraryCorrectionChoice").value)]);
      $("libraryCorrectionDiff").innerHTML = `<dl>${identityFields.map((field) => `<dt>${escape(field)}</dt><dd>${escape(card[field] || "—")} → ${escape(selected[field] || "—")}</dd>`).join("")}</dl>`;
    }
    $("libraryCorrectionChoice").onchange = preview; preview();
    $("libraryApplyCorrection").onclick = () => {
      if (!bridge.requireMember("correct collection records")) return;
      const selected = cardFromRow(entry.rows[Number($("libraryCorrectionChoice").value)]);
      const metadata = Object.fromEntries([...identityFields, "hciCardId", "sport"].map((field) => [field, selected[field]]));
      bridge.setCards(bridge.getCards().map((item) => item.id === card.id ? { ...item, ...metadata, revision: (Number(item.revision) || 0) + 1, updatedAt: new Date().toISOString() } : item));
      bridge.saveCards(); advanced.logActivity("database_correction", "cards", card.id, "Applied reviewed HCI identity", { before: card, identity: metadata });
      dialog.close(); bridge.render(); status(tr("Correction applied. Photos and copy details were preserved.", "资料已修正，照片与每张卡片的详情已保留。"));
    };
  }
  function copiesEditor(card) {
    let copies = advanced.enrichCard(card).copies.map((copy) => ({ ...copy }));
    modal(`<h2>${tr("Individual copies", "单张卡片档案")}</h2><p>${escape(name(card))}</p><div id="libraryCopyRows"></div><div class="library-dialog-actions"><button id="libraryCopyAdd" type="button" class="ghost-button">${tr("Add copy", "增加一张")}</button><button id="libraryCopySave" type="button" class="primary-button">${tr("Save", "保存")}</button></div>`);
    function draw() {
      $("libraryCopyRows").innerHTML = copies.map((copy, index) => `<fieldset><legend>${tr(`Copy ${index + 1}`, `第 ${index + 1} 张`)}</legend><div class="library-filter-grid">${[["serialNumber", "Serial", "编号"], ["certification", "Certification", "证书号"], ["grade", "Grade", "评级"], ["location", "Location", "存放位置"]].map(([key, en, zh]) => `<label>${tr(en, zh)}<input data-copy="${index}" data-copy-field="${key}" value="${escape(copy[key] || "")}" /></label>`).join("")}</div><button type="button" class="ghost-button" data-copy-remove="${index}" ${copies.length <= 1 ? "disabled" : ""}>${tr("Remove copy", "移除此张")}</button></fieldset>`).join("");
    }
    $("libraryCopyRows").oninput = (event) => { if (event.target.dataset.copyField) copies[Number(event.target.dataset.copy)][event.target.dataset.copyField] = event.target.value; };
    $("libraryCopyRows").onclick = (event) => { const button = event.target.closest("[data-copy-remove]"); if (button && copies.length > 1) { copies.splice(Number(button.dataset.copyRemove), 1); draw(); } };
    $("libraryCopyAdd").onclick = () => { copies.push({ id: crypto.randomUUID(), serialNumber: "", certification: "", grade: "", location: "", createdAt: new Date().toISOString() }); draw(); };
    $("libraryCopySave").onclick = () => {
      if (!bridge.requireMember("edit card copies")) return;
      bridge.setCards(bridge.getCards().map((entry) => entry.id === card.id ? { ...entry, copies, quantity: copies.length, revision: (Number(entry.revision) || 0) + 1, updatedAt: new Date().toISOString() } : entry));
      bridge.saveCards(); dialog.close(); bridge.render();
    }; draw();
  }
  function renderTools() {
    const groups = advanced.getDuplicateGroups();
    $("libraryDuplicates").innerHTML = groups.map((group, index) => `<article><strong>${escape(name(group[0]))}</strong><button class="ghost-button" type="button" data-library-duplicate="${index}">${tr(`Review ${group.length} records`, `查看 ${group.length} 条记录`)}</button></article>`).join("") || `<p>${tr("No duplicate identities.", "没有重复卡片记录。")}</p>`;
    renderCopies();
  }
  function renderCopies() {
    const query = norm($("libraryCopiesSearch").value);
    const matches = bridge.getCards().filter((card) => !query || norm(name(card)).includes(query));
    copiesPage = Math.min(copiesPage, Math.max(0, Math.ceil(matches.length / PAGE_SIZE) - 1));
    $("libraryCopies").innerHTML = matches.slice(copiesPage * PAGE_SIZE, (copiesPage + 1) * PAGE_SIZE).map((card) => `<article><div><strong>${escape(name(card))}</strong><small>${Number(card.quantity) || 1} ${tr("copies", "张")}</small></div><button class="ghost-button" type="button" data-library-copies="${escape(card.id)}">${tr("Manage", "管理")}</button></article>`).join("");
    $("libraryCopiesPrevious").disabled = copiesPage === 0;
    $("libraryCopiesNext").disabled = (copiesPage + 1) * PAGE_SIZE >= matches.length;
    $("libraryCopiesPage").textContent = `${matches.length ? copiesPage + 1 : 0} / ${Math.ceil(matches.length / PAGE_SIZE)}`;
  }
  function duplicateReview(index) {
    const group = advanced.getDuplicateGroups()[index]; if (!group) return;
    modal(`<h2>${tr("Merge preview", "合并预览")}</h2><p>${escape(name(group[0]))}</p>${group.map((card) => `<p>${Number(card.quantity) || 1} ${tr("copies", "张")} · ${escape([card.grade, card.certification, card.location].filter(Boolean).join(" · "))}</p>`).join("")}<button id="libraryMergeConfirm" type="button" class="primary-button">${tr("Confirm merge", "确认合并")}</button>`);
    $("libraryMergeConfirm").onclick = () => {
      if (!bridge.requireMember("merge card records")) return;
      // The advanced module owns duplicate keys and deletion history.
      advanced.mergeDatabaseDuplicates?.(group.map((card) => card.id));
      dialog.close(); renderTools();
    };
  }
  async function updateVariants() {
    const token = ++variantRequest;
    if ($("sport")?.value !== "Basketball") { $("libraryEntryVariant")?.parentElement.remove(); return; }
    const selection = Object.fromEntries(["year", "brand", "setName", "player"].map((key) => [key, $(key)?.value || ""]));
    if (!selection.year || !selection.brand || !selection.setName || !selection.player) return;
    try {
      const data = await query({ year: selection.year.slice(0, 4), brand: selection.brand, set_name: selection.setName, player: selection.player, limit: 1000 });
      if (token !== variantRequest) return;
      let select = $("libraryEntryVariant");
      if (!select) {
        const label = document.createElement("label"); label.className = "library-entry-variant";
        label.innerHTML = `<span>${tr("Exact database card / variant", "数据库卡片 / 版本")}</span><select id="libraryEntryVariant"></select>`;
        $("player").closest("label").after(label); select = $("libraryEntryVariant");
      }
      select.innerHTML = `<option value="">${tr("Not confirmed", "尚未确认")}</option>${data.cards.map((row, index) => `<option value="${index}">${escape([row.title, row.parallel, `#${row.card_number}`].filter(Boolean).join(" · "))}</option>`).join("")}`;
      const chosenIndex = data.cards.findIndex((row) => row.hci_id === chosenEntry?.hciCardId);
      if (chosenIndex >= 0) select.value = String(chosenIndex);
      select.onchange = () => {
        const row = select.value === "" ? null : data.cards[Number(select.value)]; chosenEntry = row ? cardFromRow(row) : null;
        if (row) { $("parallel").value = row.parallel; $("cardNumber").value = row.card_number; }
      };
    } catch { /* Keep existing manual entry usable when the local library is offline. */ }
  }
  function entryIdentity(existing) {
    const selected = chosenEntry || existing;
    if (!selected?.hciCardId) return "";
    if($('insertName')?.value && !norm(selected.setName).endsWith(norm($('insertName').value)))return '';
    const formIdentity = Object.fromEntries(identityFields.map((field) => [field, $(field)?.value || ""]));
    if (selected.hciReferenceParallel && norm(selected.hciReferenceParallel) !== norm(formIdentity.parallel)) return "";
    return identityFields.every((field) => norm(formIdentity[field]) === norm(selected[field])) ? selected.hciCardId : "";
  }
  function afterRender() {
    window.CardLedgerSubsets?.refresh();
    advanced.checkDatabaseWatchlist(bridge.getCommunityPosts().filter((post) => post.authorId !== bridge.getAccount().email));
    if (!$("libraryWatchPane").hidden) renderWatches();
    if (!$("libraryToolsPane").hidden) renderTools();
    document.querySelectorAll(".goal-slot-actions").forEach((actions) => {
      if (actions.querySelector(".library-goal-owners")) return;
      const toggle = actions.querySelector("[data-goal-id][data-slot-id]");
      const goal = bridge.getGoals().find((item) => item.id === toggle?.dataset.goalId);
      const slot = goal?.slots?.[toggle?.dataset.slotId];
      if (!slot?.identity || slot.owned) return;
      const button = document.createElement("button"); button.type = "button"; button.className = "ghost-button library-goal-owners";
      button.textContent = tr("Find collectors", "查找藏家"); button.onclick = () => showCollectors(slot.identity); actions.append(button);
    });
  }
  renderFilters();
  $("librarySearchForm").onsubmit = (event) => { event.preventDefault(); page = 0; search(); };
  document.addEventListener("error", (event) => {
    if (event.target instanceof HTMLImageElement && (event.target.closest(".library-dialog") || event.target.closest("#cardLibraryArea"))) {
      const unavailable = document.createElement("span"); unavailable.className = "library-no-image";
      unavailable.textContent = tr("Image unavailable", "图片暂不可用"); event.target.replaceWith(unavailable);
    }
  }, true);
  $("libraryFilters").onchange = (event) => {
    const field = event.target.id.replace("libraryFilter-", "");
    const index = filterFields.findIndex(([key]) => key === field);
    if (index >= 0 && index < 4) filterFields.slice(index + 1).forEach(([key]) => { $(`libraryFilter-${key}`).value = ""; });
    page = 0; search();
  };
  $("libraryClear").onclick = () => { filterFields.forEach(([key]) => { $(`libraryFilter-${key}`).value = ""; }); $("libraryQuery").value = ""; page = 0; search(); };
  $("libraryPrevious").onclick = () => { page = Math.max(0, page - 1); search(); };
  $("libraryNext").onclick = () => { page += 1; search(); };
  $("libraryResults").onclick = (event) => { const button = event.target.closest("[data-library-card]"); if (button) showCard(rows[Number(button.dataset.libraryCard)]); };
  $("libraryChecklist").onclick = checklist;
  $("libraryCoverage").onclick = () => {
    if (!coverageData) return;
    modal(`<h2>${tr("Database coverage", "数据库覆盖情况")}</h2><dl><dt>${tr("Metadata records", "卡片资料")}</dt><dd>${coverageData.metadata.toLocaleString()}</dd><dt>${tr("Image references", "图片记录")}</dt><dd>${coverageData.imageReferences.toLocaleString()}</dd><dt>${tr("Metadata only", "无图片的资料")}</dt><dd>${(coverageData.metadata - coverageData.imageReferences).toLocaleString()}</dd><dt>${tr("Snapshot", "数据快照")}</dt><dd>${coverageData.snapshot}</dd></dl><p>${tr("Image references may be unavailable or show a similar parallel. A match is not proof of authenticity or condition.", "个别图片可能无法显示或属于相似平行版本。识别结果不能证明真伪或品相。")}</p>`);
  };
  $("libraryBatchFiles").onchange = (event) => scanBatch([...event.target.files]);
  const groupInput = document.createElement('input'); groupInput.id='libraryGroupPhotoInput'; groupInput.type='file'; groupInput.accept='image/*'; groupInput.hidden=true; document.body.append(groupInput);
  groupInput.onchange=()=>{const file=groupInput.files[0];if(file)selectRegions(file);groupInput.value='';};
  for(const anchor of [$('libraryBatchUploadLabel'),$('globalScanChoose')].filter(Boolean)) {
    const button=document.createElement('button');button.type='button';button.className='ghost-button';button.dataset.multiCardPhoto='true';button.textContent=tr('Select cards in group photo','框选合照中的卡片');anchor.after(button);button.onclick=()=>groupInput.click();
  }
  const splitInline=document.createElement('button');splitInline.type='button';splitInline.id='playerScanSplitPhoto';splitInline.className='ghost-button';
  const inlineAnchor=$('playerScanMatch');
  if(inlineAnchor)inlineAnchor.closest('label')?.after(splitInline);
  else $('playerScanFile')?.parentElement?.append(splitInline);
  splitInline.onclick=async()=>{
    const source=bridge.getScanReview().image;
    if(!source){groupInput.click();return;}
    const blob=await(await fetch(source)).blob();await selectRegions(new File([blob],'scan-photo.jpg',{type:blob.type||'image/jpeg'}));
  };
  $("libraryBatchSave").onclick = saveBatch;
  $('libraryBatchReviewNext').onclick = () => {
    if (queueOwner !== bridge.getAccount().email) return status(tr('Switch back to the account that uploaded this batch.','请切回上传本批图片的账号。'));
    const item = queue.find(item => !item.confirmed && item.image && item.matches);
    if (item) review(item.image,item.matches,item.card || item.identity,(card) => { item.card = card; item.confirmed = true; renderBatch(); },{preserveEdits:Boolean(item.card)});
  };
  $("libraryBatchQueue").onclick = (event) => {
    const reviewButton = event.target.closest("[data-library-review-batch]");
    const removeButton = event.target.closest("[data-library-remove-batch]");
    if (reviewButton) { if(queueOwner!==bridge.getAccount().email)return; const item = queue[Number(reviewButton.dataset.libraryReviewBatch)]; review(item.image, item.matches, item.card || item.identity, (card) => { item.card = card; item.confirmed = true; renderBatch(); },{preserveEdits:Boolean(item.card)}); }
    if (removeButton && !scanning) { queue.splice(Number(removeButton.dataset.libraryRemoveBatch), 1); renderBatch(); }
  };
  $("libraryFindCorrections").onclick = findCorrections;
  $("libraryCorrections").onclick = (event) => { const button = event.target.closest("[data-library-correction]"); if (button) correction(Number(button.dataset.libraryCorrection)); };
  $("libraryDuplicates").onclick = (event) => { const button = event.target.closest("[data-library-duplicate]"); if (button) duplicateReview(Number(button.dataset.libraryDuplicate)); };
  $("libraryCopies").onclick = (event) => { const button = event.target.closest("[data-library-copies]"); if (button) copiesEditor(bridge.getCards().find((card) => card.id === button.dataset.libraryCopies)); };
  $("libraryCopiesSearch").oninput = () => { copiesPage = 0; renderCopies(); };
  $("libraryCopiesPrevious").onclick = () => { copiesPage = Math.max(0, copiesPage - 1); renderCopies(); };
  $("libraryCopiesNext").onclick = () => { copiesPage += 1; renderCopies(); };
  $("libraryWatches").onclick = (event) => {
    const button = event.target.closest("[data-library-unwatch]"); if (button) { advanced.removeDatabaseWatch(button.dataset.libraryUnwatch); renderWatches(); }
    const owners = event.target.closest("[data-library-watch-owners]");
    if (owners) { const item = advanced.getDatabaseWatches().find((item) => item.id === owners.dataset.libraryWatchOwners); if (item) showCollectors(item.identity); }
  };
  document.querySelectorAll("[data-library-tab]").forEach((button) => button.onclick = () => showTab(button.dataset.libraryTab));
  document.querySelector('[data-focus-view="library"]')?.addEventListener("click", () => { if (!rows.length) search(); });
  ["sport", "year", "hciYearPicker", "brand", "setName", "player"].forEach((id) => $(id)?.addEventListener("change", () => { chosenEntry = null; setTimeout(updateVariants, 100); }));
  document.querySelector("#cardForm")?.addEventListener("reset", () => { chosenEntry = null; });
  for (const side of ["mine", "theirs"]) {
    const input = $(side === "mine" ? "tradeAiMine" : "tradeAiTheirs");
    if (!input) continue;
    const button = document.createElement("button"); button.type = "button"; button.className = "ghost-button library-trade-picker";
    button.textContent = tr("Choose from card library", "从卡片数据库选择");
    input.after(button); button.onclick = () => { target = side; bridge.openLibrary(); showTab("search"); search(); };
  }
  const scanButton = document.createElement("button"); scanButton.type = "button"; scanButton.className = "ghost-button";
  scanButton.textContent = tr("Compare references", "对照参考图片");
  $("globalScanResult")?.after(scanButton);
  const scanVisibility = () => { scanButton.hidden = $("globalScanResult").classList.contains("hidden"); };
  new MutationObserver(scanVisibility).observe($("globalScanResult"), { attributes: true, attributeFilter: ["class"] }); scanVisibility();
  scanButton.onclick = () => { const scan = bridge.getScanReview(); if (scan.image) review(scan.image, scan.matches, scan.identity, (card) => openEntry(card, scan.image)); };
  document.querySelectorAll("#globalScanReview,#playerScanApply").forEach((button) => button.addEventListener("click", () => { const scan = bridge.getScanReview(); if (scan.identity?.hciCardId) chosenEntry = { ...scan.identity }; setTimeout(updateVariants, 200); }));
  const phrases = { "Card Library": "卡片数据库", "Library": "卡片库", "Search": "搜索", "Search cards": "搜索卡片", "Batch Scan": "批量识别", "Watchlist": "关注名单", "Collection Tools": "收藏工具", "Filters": "筛选", "Create checklist": "创建收集清单", "Clear filters": "清除筛选", "Previous": "上一页", "Next": "下一页", "Select card photos": "选择卡片照片", "Save confirmed cards": "保存已确认卡片", "Database cleanup": "资料修正", "Find suggestions": "查找修正建议", "Duplicate records": "重复记录", "Individual copies": "单张卡片档案", "Year": "年份", "Brand": "品牌", "Set": "系列", "Player": "球员", "Parallel / insert": "平行 / 特卡", "Card number": "卡号", "All": "全部", "Choose from card library": "从卡片数据库选择", "Compare references": "对照参考图片" };
  const originals = new WeakMap();
  function localize() {
    splitInline.textContent=tr('Split photo / multiple cards','拆分照片 / 多张卡片');
    document.querySelectorAll('[data-multi-card-photo]').forEach(button=>{button.textContent=tr('Select cards in group photo','框选合照中的卡片');});
    const roots = [$("cardLibraryArea"), scanButton, ...document.querySelectorAll(".library-trade-picker,[data-focus-view='library']")];
    roots.forEach((root) => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      for (let node = walker.nextNode(); node; node = walker.nextNode()) {
        const original = originals.get(node) || node.textContent.trim();
        if (phrases[original]) { originals.set(node, original); node.textContent = tr(original, phrases[original]); }
      }
    });
    $("libraryQuery").placeholder = tr("Player, set, card name", "球员、系列、卡片名称");
    $("libraryCopiesSearch").placeholder = tr("Search your cards", "搜索收藏中的卡片");
    if (coverageTotal) $("libraryCoverage").textContent = tr(`${coverageTotal.toLocaleString()} records · Basketball`, `${coverageTotal.toLocaleString()} 条 · 篮球`);
    if (rows.length) $("libraryCount").textContent = tr(`${total.toLocaleString()} matches`, `${total.toLocaleString()} 个结果`);
    status(""); renderBatch();
  }
  new MutationObserver(localize).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] }); localize();
  window.CardLedgerLibrary = { entryIdentity, syncGoalOwnership, afterRender, search, updateVariants, scanBatch, saveBatch,
    getQueue: () => queue, sameIdentity, cardFromRow, review, openEntry, scanRegions, selectRegions };
  if (new URLSearchParams(location.search).get('batch') === '1') {
    queueMicrotask(() => { bridge.openLibrary(); showTab('batch'); });
  }
})();
