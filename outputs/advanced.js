(() => {
  "use strict";

  const bridge = window.cardLedgerBridge;
  if (!bridge) return;

  const STATE_KEY = "card-ledger-advanced-state-v1";
  const SECURITY_KEY = "card-ledger-security-state-v1";
  const TRUST_KEY = "card-ledger-trust-state-v1";
  const ACTIVITY_KEY = "card-ledger-activity-events-v1";
  const TOMBSTONE_KEY = "card-ledger-sync-tombstones-v1";
  const MARKETPLACE_SALES_KEY = "card-ledger-marketplace-sales-v1";
  const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
  const defaultPortfolio = { id: "personal", name: "Personal", type: "personal", createdAt: new Date().toISOString() };

  const tutorialCatalog = [
    { id: "tutorial-wemby", year: "2023-24", brand: "Panini", setName: "Prizm", player: "Victor Wembanyama", type: "Rookie", parallel: "Base", cardNumber: "136", sport: "Basketball", condition: "Raw" },
    { id: "tutorial-curry", year: "2012-13", brand: "Panini", setName: "Prizm", player: "Stephen Curry", type: "Base", parallel: "Silver", cardNumber: "245", sport: "Basketball", condition: "Raw" },
    { id: "tutorial-charizard", year: "2023", brand: "Pokemon", setName: "151", player: "Charizard ex", type: "Special Illustration Rare", parallel: "Holo", cardNumber: "199/165", sport: "PTCG", condition: "Raw" }
  ];

  const glossary = {
    parallel: "A visually different version of the same card, often with another color, pattern, or print quantity.",
    insert: "A card from a themed subset placed less frequently than the main base cards.",
    refractor: "A Topps term for a reflective, rainbow-like parallel produced with a special finish.",
    rookie: "A card associated with a player's first officially recognized major card season. The RC logo and set rules still matter.",
    "serial number": "A printed copy number such as 23/99. It identifies this specific copy within a limited print run.",
    grade: "A condition score assigned by a grading company such as PSA, BGS, or SGC. Record the company and certification too."
  };

  function loadJson(key, fallback) {
    try {
      const parsed = JSON.parse(localStorage.getItem(key));
      return parsed == null ? fallback : parsed;
    } catch {
      return fallback;
    }
  }

  function saveJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function normalizeState(saved = {}) {
    const portfolios = Array.isArray(saved.portfolios) && saved.portfolios.length ? saved.portfolios : [defaultPortfolio];
    return {
      starterMode: saved.starterMode !== false,
      portfolios,
      activePortfolioId: portfolios.some((item) => item.id === saved.activePortfolioId) ? saved.activePortfolioId : portfolios[0].id,
      watchlist: Array.isArray(saved.watchlist) ? saved.watchlist : [],
      notifications: Array.isArray(saved.notifications) ? saved.notifications : [],
      savedViews: Array.isArray(saved.savedViews) ? saved.savedViews : [],
      page: Math.max(1, Number(saved.page) || 1),
      pageSize: [12, 24, 48, 96].includes(Number(saved.pageSize)) ? Number(saved.pageSize) : 24,
      resultCount: 0,
      lastRefreshAt: saved.lastRefreshAt || "",
      nextRefreshAt: saved.nextRefreshAt || "",
      privacy: {
        alias: saved.privacy?.alias || "Private Collector",
        privateIdentity: Boolean(saved.privacy?.privateIdentity),
        shareValues: saved.privacy?.shareValues !== false,
        shareLocation: Boolean(saved.privacy?.shareLocation),
        shareSerials: Boolean(saved.privacy?.shareSerials)
      },
      csvRows: [],
      csvHeaders: [],
      csvMap: {},
      selectedCards: []
    };
  }

  let state = normalizeState(loadJson(STATE_KEY, {}));
  let security = loadJson(SECURITY_KEY, { sessions: [], recoveryCodeHashes: [], documents: [], pendingMfa: null });
  let trust = loadJson(TRUST_KEY, { verifications: [], contracts: [], auctionEvents: [] });
  let activityEvents = loadJson(ACTIVITY_KEY, []);
  let tombstones = loadJson(TOMBSTONE_KEY, {});
  const storedMarketplaceSales = loadJson(MARKETPLACE_SALES_KEY, []);
  let marketplaceSales = Array.isArray(storedMarketplaceSales) ? storedMarketplaceSales : [];
  let selectedCards = new Set(state.selectedCards);
  let currentCaptureStep = 1;
  let guidedImage = "";
  let guidedSelection = null;
  let advancedCloudTimer = 0;

  function scheduleAdvancedCloud() {
    window.clearTimeout(advancedCloudTimer);
    advancedCloudTimer = window.setTimeout(() => syncAdvancedCloud(), 1300);
  }

  function saveState() {
    state.selectedCards = [...selectedCards];
    saveJson(STATE_KEY, state);
    scheduleAdvancedCloud();
  }

  function saveSecurity() {
    saveJson(SECURITY_KEY, security);
    scheduleAdvancedCloud();
  }

  function saveTrust() {
    saveJson(TRUST_KEY, trust);
    scheduleAdvancedCloud();
  }

  function text(value) {
    return String(value ?? "").trim();
  }

  function html(value) {
    return bridge.escapeHtml(text(value));
  }

  function uuid() {
    return crypto.randomUUID();
  }

  function cardIdentity(card) {
    if (card.hciCardId) return `hci:${card.hciCardId}`;
    return [card.year, card.brand, card.setName, card.player, card.type, card.parallel, card.cardNumber, card.grade]
      .map((part) => text(part).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim())
      .join("|");
  }

  function normalizeCopies(card) {
    const copies = Array.isArray(card.copies) ? card.copies.slice() : [];
    const count = Math.max(1, Number(card.quantity) || 1);
    while (copies.length < count) {
      copies.push({
        id: uuid(),
        serialNumber: copies.length === 0 ? text(card.serialNumber) : "",
        certification: copies.length === 0 ? text(card.certification) : "",
        grade: text(card.grade),
        location: text(card.location),
        createdAt: card.createdAt || new Date().toISOString()
      });
    }
    return copies.slice(0, count);
  }

  function enrichCard(card) {
    const existing = bridge.getCards().find((item) => item.id === card.id);
    const next = {
      ...card,
      portfolioId: existing?.portfolioId || state.activePortfolioId,
      revision: Math.max(0, Number(existing?.revision) || 0) + 1,
      deviceId: deviceId(),
      serialNumber: text(document.querySelector("#guidedSerial")?.value || existing?.serialNumber),
      certification: text(card.certification || existing?.certification)
    };
    next.copies = normalizeCopies({ ...next, copies: existing?.copies });
    return next;
  }

  function deviceId() {
    let id = localStorage.getItem("card-ledger-device-id");
    if (!id) {
      id = uuid();
      localStorage.setItem("card-ledger-device-id", id);
    }
    return id;
  }

  function logActivity(action, entityType, entityId, summary, detail = {}) {
    const event = Object.freeze({ id: uuid(), occurredAt: new Date().toISOString(), action, entityType, entityId, summary, detail, deviceId: deviceId() });
    activityEvents = [event, ...activityEvents].slice(0, 1500);
    saveJson(ACTIVITY_KEY, activityEvents);
    scheduleAdvancedCloud();
    return event;
  }

  function recordDeletion(table, id, snapshot = {}) {
    tombstones[table] = tombstones[table] || {};
    tombstones[table][id] = { id, deletedAt: new Date().toISOString(), snapshot };
    saveJson(TOMBSTONE_KEY, tombstones);
    logActivity("delete", table, id, `Deleted ${snapshot.player || snapshot.title || id}`);
  }

  function catalog() {
    const merged = [...tutorialCatalog, ...bridge.getCards()];
    const seen = new Set();
    return merged.filter((card) => {
      const key = cardIdentity(card);
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function tokenScore(card, query) {
    const terms = text(query).toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return 0;
    const title = bridge.fixedCardName(card).toLowerCase();
    return terms.reduce((score, term) => score + (title.includes(term) ? 3 : 0) + (text(card.player).toLowerCase().startsWith(term) ? 2 : 0), 0);
  }

  const CUSTOM_CATALOG_VALUE = "__custom__";
  const mainCatalogFields = {
    brand: { selectId: "brand", customId: "brandCustom" },
    setName: { selectId: "setName", customId: "setNameCustom" },
    player: { selectId: "player", customId: "playerCustom" }
  };

  function mainCatalogValue(key) {
    const config = mainCatalogFields[key];
    const select = document.getElementById(config?.selectId);
    if (!select) return "";
    return select.value === CUSTOM_CATALOG_VALUE ? text(document.getElementById(config.customId)?.value) : text(select.value);
  }

  function syncCustomCatalogInput(key) {
    const config = mainCatalogFields[key];
    const select = document.getElementById(config?.selectId);
    const input = document.getElementById(config?.customId);
    if (!select || !input) return;
    const custom = select.value === CUSTOM_CATALOG_VALUE;
    input.classList.toggle("hidden", !custom);
    input.required = custom;
    input.disabled = !custom;
    if (!custom) input.value = "";
  }

  function setDependentSelect(key, values, placeholder, current = "", enabled = true) {
    const config = mainCatalogFields[key];
    const select = document.getElementById(config?.selectId);
    const input = document.getElementById(config?.customId);
    if (!select) return;
    const unique = [...new Set(values.map(text).filter(Boolean))].sort((a, b) => a.localeCompare(b));
    const canonical = unique.find((value) => value.toLowerCase() === text(current).toLowerCase());
    select.innerHTML = `<option value="">${html(placeholder)}</option>${unique.map((value) => `<option value="${html(value)}">${html(value)}</option>`).join("")}<option value="${CUSTOM_CATALOG_VALUE}">${html("Not listed - enter manually")}</option>`;
    select.disabled = !enabled;
    if (enabled && canonical) {
      select.value = canonical;
    } else if (enabled && current) {
      select.value = CUSTOM_CATALOG_VALUE;
      if (input) input.value = text(current);
    } else {
      select.value = "";
    }
    syncCustomCatalogInput(key);
  }

  function cardCatalogBrand(card, officialBrands) {
    const saved = text(card.brand);
    if (saved) return saved;
    return officialBrands.find((brand) => text(card.setName).toLowerCase().startsWith(brand.toLowerCase())) || "";
  }

  function entrySupportsSport(entry, sport) {
    if (!sport) return true;
    const sports = Array.isArray(entry.sports) ? entry.sports : [];
    return !sports.length || sports.includes(sport);
  }

  function syncCardSelectors(seed = null) {
    if (window.CardLedgerCardSelectors?.sync) return window.CardLedgerCardSelectors.sync(seed);
    const official = Array.isArray(window.CARD_SET_CATALOG) ? window.CARD_SET_CATALOG : [];
    const collection = catalog();
    const officialBrands = [...new Set(official.map((entry) => text(entry.brand)).filter(Boolean))];
    const sport = text(seed?.sport ?? document.getElementById("sport")?.value);
    const year = text(seed?.year ?? document.getElementById("year")?.value);
    const ready = Boolean(sport && year);
    const brandCurrent = text(seed?.brand) || mainCatalogValue("brand");
    const sportYearCards = collection.filter((card) => (!sport || text(card.sport) === sport) && (!year || text(card.year) === year));
    const brands = [
      ...official.filter((entry) => entrySupportsSport(entry, sport)).map((entry) => entry.brand),
      ...sportYearCards.map((card) => cardCatalogBrand(card, officialBrands))
    ];
    setDependentSelect("brand", brands, ready ? "Choose a brand" : "Choose sport and year first", brandCurrent, ready);

    const brand = mainCatalogValue("brand");
    const setCurrent = text(seed?.setName) || mainCatalogValue("setName");
    const setEntries = official.filter((entry) => entrySupportsSport(entry, sport) && (!brand || text(entry.brand).toLowerCase() === brand.toLowerCase()));
    const setNames = [
      ...setEntries.map((entry) => entry.setName),
      ...sportYearCards
        .filter((card) => !brand || cardCatalogBrand(card, officialBrands).toLowerCase() === brand.toLowerCase())
        .map((card) => card.setName)
    ];
    setDependentSelect("setName", setNames, brand ? "Choose a set" : "Choose a brand first", setCurrent, ready && Boolean(brand));

    const setName = mainCatalogValue("setName");
    const playerCurrent = text(seed?.player) || mainCatalogValue("player");
    const directoryPlayers = Array.isArray(window.CARD_PLAYER_DIRECTORY?.[sport]) ? window.CARD_PLAYER_DIRECTORY[sport] : [];
    const players = [
      ...directoryPlayers,
      ...collection
        .filter((card) => (!sport || text(card.sport) === sport) && (!year || text(card.year) === year))
        .filter((card) => !brand || cardCatalogBrand(card, officialBrands).toLowerCase() === brand.toLowerCase())
        .filter((card) => !setName || text(card.setName).toLowerCase() === setName.toLowerCase())
        .map((card) => card.player)
    ];
    setDependentSelect("player", players, setName ? "Choose a player" : "Choose a set first", playerCurrent, ready && Boolean(brand && setName));

    const status = document.getElementById("setCatalogStatus");
    if (status) {
      const isChinese = document.documentElement.lang.toLowerCase().startsWith("zh");
      const setCount = [...new Set(setNames.map((value) => text(value).toLowerCase()).filter(Boolean))].length;
      status.textContent = !ready
        ? (isChinese ? "请先选择运动项目并填写年份。" : "Choose a sport and enter a year to unlock the catalog.")
        : !brand
          ? (isChinese ? "请选择卡片品牌。" : "Choose a brand to see its sets.")
          : (isChinese ? `${sport} 目录中有 ${setCount} 个 ${brand} 系列；当前录入年份为 ${year}。` : `${setCount} ${brand} catalog sets for ${sport}; recording year ${year}.`);
    }
  }

  function renderDatalists() {
    const data = catalog();
    const official = Array.isArray(window.CARD_SET_CATALOG) ? window.CARD_SET_CATALOG : [];
    const officialBrands = [...new Set(official.map((entry) => text(entry.brand)).filter(Boolean))];
    const inferredBrand = (card) => text(card.brand) || officialBrands.find((brand) => text(card.setName).toLowerCase().startsWith(brand.toLowerCase())) || "";
    const brands = [...new Set([...officialBrands, ...data.map(inferredBrand).filter(Boolean)])].sort();
    const lists = {
      cardYearOptions: [...new Set(data.map((card) => card.year).filter(Boolean))],
      cardPlayerOptions: [...new Set(data.map((card) => card.player).filter(Boolean))],
      cardTypeOptions: [...new Set(data.flatMap((card) => [card.type, "Base", "Rookie", "Insert", "Autograph", "Memorabilia", "Jersey", "Patch", "Autograph Memorabilia", "Other"]).filter(Boolean))],
      cardParallelOptions: [...new Set(data.flatMap((card) => [card.parallel, "Silver", "Refractor", "Holo", "Gold", "Red", "Base"]).filter(Boolean))]
    };
    Object.entries(lists).forEach(([id, values]) => {
      const target = document.getElementById(id);
      if (target) target.innerHTML = values.sort().slice(0, 400).map((value) => `<option value="${html(value)}"></option>`).join("");
    });
    const brandTarget = document.getElementById("cardBrandOptions");
    if (brandTarget) brandTarget.innerHTML = brands.map((value) => `<option value="${html(value)}"></option>`).join("");

    const renderSets = (targetId, brandInputId) => {
      const target = document.getElementById(targetId);
      if (!target) return;
      const brand = text(document.getElementById(brandInputId)?.value);
      const officialMatches = official.filter((entry) => !brand || text(entry.brand).toLowerCase() === brand.toLowerCase());
      const existing = data
        .filter((card) => !brand || inferredBrand(card).toLowerCase() === brand.toLowerCase())
        .map((card) => ({ setName: text(card.setName), source: "Your collection" }));
      const unique = new Map();
      [...officialMatches, ...existing].forEach((entry) => {
        const key = text(entry.setName).toLowerCase();
        if (key && !unique.has(key)) unique.set(key, entry);
      });
      const entries = [...unique.values()].sort((a, b) => text(a.setName).localeCompare(text(b.setName)));
      target.innerHTML = entries.map((entry) => `<option value="${html(entry.setName)}" label="${html(entry.source || "Set catalog")}"></option>`).join("");
      if (targetId === "cardSetOptions") {
        const status = document.getElementById("setCatalogStatus");
        if (status) {
          const isChinese = document.documentElement.lang.toLowerCase().startsWith("zh");
          status.textContent = isChinese
            ? `目录中有 ${entries.length} 个${brand ? ` ${brand} 品牌` : "全部品牌"}系列；未收录的系列也可手动输入。`
            : `${entries.length} catalog sets${brand ? ` for ${brand}` : " across all brands"}. You can still enter a set not listed.`;
        }
      }
    };
    renderSets("cardSetOptions", "brand");
    renderSets("guidedSetOptions", "guidedBrand");
    syncCardSelectors();
  }

  function showCaptureStep(step) {
    currentCaptureStep = Math.min(3, Math.max(1, Number(step) || 1));
    document.querySelectorAll("[data-capture-step]").forEach((button) => {
      const index = Number(button.dataset.captureStep);
      button.classList.toggle("active", index === currentCaptureStep);
      button.classList.toggle("complete", index < currentCaptureStep);
    });
    document.querySelectorAll("[data-capture-panel]").forEach((panel) => panel.classList.toggle("active", Number(panel.dataset.capturePanel) === currentCaptureStep));
  }

  function renderTutorial() {
    const target = document.querySelector("#tutorialSamples");
    if (!target) return;
    target.innerHTML = tutorialCatalog.map((card) => `<button type="button" data-tutorial-card="${html(card.id)}">${html(card.player)} · ${html(card.setName)}</button>`).join("");
  }

  function renderGlossary() {
    const target = document.querySelector("#collectorGlossary");
    if (!target) return;
    target.innerHTML = Object.entries(glossary).map(([term, definition]) => `<article><strong>${html(term)}</strong><p>${html(definition)}</p></article>`).join("");
  }

  function renderGuidedMatches(query = "") {
    const target = document.querySelector("#guidedMatchList");
    if (!target) return;
    const matches = catalog()
      .map((card) => ({ card, score: tokenScore(card, query) }))
      .filter((item) => !query || item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);
    target.innerHTML = matches.length
      ? matches.map(({ card }) => `<article class="guided-match-card"><div><strong>${html(bridge.fixedCardName(card))}</strong><p>${html(card.sport || "Card")} · ${html(card.condition || "Condition unknown")}</p></div><button class="ghost-button compact-button" type="button" data-guided-match="${html(card.id)}">Choose</button></article>`).join("")
      : '<div class="trade-empty">No close catalog match yet. Try the player, set, year, or card number. You can still confirm details manually.</div>';
  }

  function fillGuidedForm(card = {}) {
    const map = { guidedYear: "year", guidedBrand: "brand", guidedSet: "setName", guidedPlayer: "player", guidedNumber: "cardNumber", guidedSport: "sport", guidedCondition: "condition", guidedType: "type", guidedParallel: "parallel", guidedGrade: "grade", guidedSerial: "serialNumber", guidedLocation: "location" };
    Object.entries(map).forEach(([id, key]) => {
      const input = document.getElementById(id);
      if (input) input.value = text(card[key]) || (id === "guidedSport" ? "Basketball" : id === "guidedCondition" ? "Raw" : "");
    });
  }

  async function guidedFileChanged() {
    const input = document.querySelector("#guidedCardPhoto");
    guidedImage = await bridge.readImageFile(input);
    const preview = document.querySelector("#guidedCardPhotoPreview");
    if (guidedImage && preview) {
      preview.src = guidedImage;
      preview.classList.remove("hidden");
      showCaptureStep(2);
      document.querySelector("#guidedMatchSearch")?.focus();
    }
  }

  function guidedCardFromForm() {
    const now = new Date().toISOString();
    const card = {
      id: uuid(), createdAt: now, updatedAt: now,
      year: text(document.querySelector("#guidedYear")?.value),
      brand: text(document.querySelector("#guidedBrand")?.value),
      setName: text(document.querySelector("#guidedSet")?.value),
      player: text(document.querySelector("#guidedPlayer")?.value),
      cardNumber: text(document.querySelector("#guidedNumber")?.value),
      sport: text(document.querySelector("#guidedSport")?.value),
      condition: text(document.querySelector("#guidedCondition")?.value),
      type: text(document.querySelector("#guidedType")?.value),
      parallel: text(document.querySelector("#guidedParallel")?.value),
      grade: text(document.querySelector("#guidedGrade")?.value),
      serialNumber: text(document.querySelector("#guidedSerial")?.value),
      location: text(document.querySelector("#guidedLocation")?.value),
      quantity: 1, paid: 0, value: 0, image: guidedImage,
      notes: guidedSelection ? `Confirmed from catalog suggestion: ${bridge.fixedCardName(guidedSelection)}.` : "Added through beginner guided capture.",
      portfolioId: state.activePortfolioId, revision: 1, deviceId: deviceId()
    };
    card.copies = normalizeCopies(card);
    return card;
  }

  function resetGuidedCapture() {
    guidedImage = "";
    guidedSelection = null;
    document.querySelector("#guidedConfirmForm")?.reset();
    const input = document.querySelector("#guidedCardPhoto");
    if (input) input.value = "";
    const preview = document.querySelector("#guidedCardPhotoPreview");
    if (preview) { preview.src = ""; preview.classList.add("hidden"); }
    const search = document.querySelector("#guidedMatchSearch");
    if (search) search.value = "";
    renderGuidedMatches();
    showCaptureStep(1);
  }

  function setupStarterEntry() {
    const advancedGrid = document.querySelector("#advancedCardFields");
    const details = document.querySelector("#advancedCardDetails");
    if (!advancedGrid || !details) return;
    ["cardType", "parallel", "cardNumber", "condition", "grade", "certification", "quantity", "paid", "value", "location", "notes"].forEach((id) => {
      const field = document.getElementById(id);
      const label = field?.closest("label");
      if (label && label.parentElement !== advancedGrid) advancedGrid.append(label);
    });
    const psaLookup = document.querySelector("#psaCardLookup");
    if (psaLookup && psaLookup.parentElement !== details) details.append(psaLookup);
    const helps = { cardType: "insert", parallel: "parallel", cardNumber: "serial number", grade: "grade" };
    Object.entries(helps).forEach(([id, term]) => {
      const label = document.getElementById(id)?.closest("label");
      if (!label || label.querySelector(".term-help")) return;
      const button = document.createElement("button");
      button.type = "button";
      button.className = "term-help";
      button.title = glossary[term];
      button.setAttribute("aria-label", `${term}: ${glossary[term]}`);
      button.textContent = "?";
      label.insertBefore(button, label.querySelector("input, select, textarea"));
    });
    const starterToggle = document.querySelector("#starterModeToggle");
    if (starterToggle) starterToggle.checked = state.starterMode;
    details.open = !state.starterMode;
    document.querySelector("#toggleAdvancedEntry").textContent = details.open ? "Hide advanced details" : "Show advanced details";
  }

  function initBeginnerFlow() {
    renderTutorial();
    renderGlossary();
    renderDatalists();
    renderGuidedMatches();
    setupStarterEntry();
    const clearCatalogField = (key) => {
      const config = mainCatalogFields[key];
      const select = document.getElementById(config.selectId);
      const custom = document.getElementById(config.customId);
      if (select) select.value = "";
      if (custom) custom.value = "";
    };
    const resetAfterSportOrYear = () => {
      clearCatalogField("brand");
      clearCatalogField("setName");
      clearCatalogField("player");
      syncCardSelectors();
    };
    document.querySelector("#sport")?.addEventListener("change", resetAfterSportOrYear);
    document.querySelector("#year")?.addEventListener("input", resetAfterSportOrYear);
    document.querySelector("#year")?.addEventListener("change", resetAfterSportOrYear);
    document.querySelector("#brand")?.addEventListener("change", () => {
      syncCustomCatalogInput("brand");
      clearCatalogField("setName");
      clearCatalogField("player");
      if (document.querySelector("#brand")?.value === CUSTOM_CATALOG_VALUE) {
        setDependentSelect("setName", [], "Enter the brand name first", "", false);
        setDependentSelect("player", [], "Choose a set first", "", false);
        document.querySelector("#brandCustom")?.focus();
        return;
      }
      syncCardSelectors();
    });
    document.querySelector("#brandCustom")?.addEventListener("input", syncCardSelectors);
    document.querySelector("#setName")?.addEventListener("change", () => {
      syncCustomCatalogInput("setName");
      clearCatalogField("player");
      if (document.querySelector("#setName")?.value === CUSTOM_CATALOG_VALUE) {
        setDependentSelect("player", [], "Enter the set name first", "", false);
        document.querySelector("#setNameCustom")?.focus();
        return;
      }
      syncCardSelectors();
    });
    document.querySelector("#setNameCustom")?.addEventListener("input", syncCardSelectors);
    document.querySelector("#player")?.addEventListener("change", () => syncCustomCatalogInput("player"));
    document.querySelector("#guidedBrand")?.addEventListener("input", renderDatalists);
    document.querySelector("#guidedBrand")?.addEventListener("change", renderDatalists);
    document.querySelector("#guidedCardPhoto")?.addEventListener("change", guidedFileChanged);
    document.querySelector("#findGuidedMatches")?.addEventListener("click", () => renderGuidedMatches(document.querySelector("#guidedMatchSearch")?.value));
    document.querySelector("#guidedMatchSearch")?.addEventListener("input", (event) => renderGuidedMatches(event.target.value));
    document.querySelector("#restartGuidedCapture")?.addEventListener("click", resetGuidedCapture);
    document.querySelectorAll("[data-capture-step]").forEach((button) => button.addEventListener("click", () => showCaptureStep(button.dataset.captureStep)));
    document.querySelector("#tutorialSamples")?.addEventListener("click", (event) => {
      const card = tutorialCatalog.find((item) => item.id === event.target.dataset.tutorialCard);
      if (!card) return;
      guidedSelection = card;
      fillGuidedForm(card);
      const search = document.querySelector("#guidedMatchSearch");
      if (search) search.value = `${card.player} ${card.year}`;
      renderGuidedMatches(search?.value);
      showCaptureStep(2);
    });
    document.querySelector("#guidedMatchList")?.addEventListener("click", (event) => {
      const card = catalog().find((item) => item.id === event.target.dataset.guidedMatch);
      if (!card) return;
      guidedSelection = card;
      fillGuidedForm(card);
      showCaptureStep(3);
    });
    document.querySelector("#guidedConfirmForm")?.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!bridge.requireMember("add cards through guided capture")) return;
      let card = guidedCardFromForm();
      if (!card.year || !card.setName || !card.player) return;
      card = await bridge.attachPsaPopulation(card);
      const cards = bridge.getCards();
      cards.unshift(card);
      bridge.setCards(cards);
      bridge.saveCards();
      bridge.syncGoalSlotsFromCard(card);
      logActivity("create", "cards", card.id, `Added ${bridge.fixedCardName(card)} through guided capture`);
      document.querySelector("#guidedCaptureStatus").textContent = "Card added to your active portfolio.";
      resetGuidedCapture();
      renderDatalists();
      bridge.render();
    });
    document.querySelector("#starterModeToggle")?.addEventListener("change", (event) => {
      state.starterMode = event.target.checked;
      saveState();
      const details = document.querySelector("#advancedCardDetails");
      if (details) details.open = !state.starterMode;
      document.querySelector("#toggleAdvancedEntry").textContent = details?.open ? "Hide advanced details" : "Show advanced details";
    });
    document.querySelector("#toggleAdvancedEntry")?.addEventListener("click", () => {
      const details = document.querySelector("#advancedCardDetails");
      if (!details) return;
      details.open = !details.open;
      document.querySelector("#toggleAdvancedEntry").textContent = details.open ? "Hide advanced details" : "Show advanced details";
    });
  }

  function parseCsv(source) {
    const rows = [];
    let row = [], cell = "", quoted = false;
    for (let index = 0; index < source.length; index += 1) {
      const char = source[index];
      if (char === '"' && quoted && source[index + 1] === '"') { cell += '"'; index += 1; }
      else if (char === '"') quoted = !quoted;
      else if (char === "," && !quoted) { row.push(cell); cell = ""; }
      else if ((char === "\n" || char === "\r") && !quoted) {
        if (char === "\r" && source[index + 1] === "\n") index += 1;
        row.push(cell); cell = "";
        if (row.some((value) => text(value))) rows.push(row);
        row = [];
      } else cell += char;
    }
    row.push(cell);
    if (row.some((value) => text(value))) rows.push(row);
    return rows;
  }

  const csvTargets = [
    ["year", "Year", true], ["brand", "Brand / manufacturer"], ["setName", "Set", true], ["player", "Player / subject", true],
    ["type", "Type"], ["insertName", "Insert / subset name"], ["cardDescription", "Autograph / memorabilia details"], ["parallel", "Parallel"], ["cardNumber", "Card number"],
    ["sport", "Sport"], ["condition", "Condition"], ["grade", "Grade"],
    ["quantity", "Quantity"], ["location", "Location"], ["notes", "Notes"]
  ];

  function bestHeader(headers, target) {
    const aliases = {
      year: ["year", "season"], brand: ["brand", "manufacturer", "publisher", "maker"], setName: ["set", "set name", "product", "program"], player: ["player", "subject", "name"],
      type: ["type", "insert"], parallel: ["parallel", "variation"], cardNumber: ["number", "card number", "card no"],
      insertName: ["insertname", "insert name", "subset", "subset name"], cardDescription: ["carddescription", "card description", "autograph / memorabilia details"],
      sport: ["sport", "category"], condition: ["condition"], grade: ["grade"], quantity: ["quantity", "qty", "copies"],
      location: ["location", "box", "binder", "vault"], notes: ["notes", "description"]
    };
    const index = headers.findIndex((header) => aliases[target]?.includes(text(header).toLowerCase()));
    return index >= 0 ? String(index) : "";
  }

  function renderCsvMapping() {
    const target = document.querySelector("#csvMappingFields");
    if (!target) return;
    target.innerHTML = csvTargets.map(([key, label, required]) => {
      const options = ['<option value="">Ignore</option>', ...state.csvHeaders.map((header, index) => `<option value="${index}" ${String(state.csvMap[key]) === String(index) ? "selected" : ""}>${html(header)}</option>`)].join("");
      return `<label>${html(label)}${required ? " *" : ""}<select data-csv-target="${key}">${options}</select></label>`;
    }).join("");
    renderCsvPreview();
  }

  function mappedCsvCard(row) {
    const value = (key) => state.csvMap[key] === "" || state.csvMap[key] == null ? "" : text(row[Number(state.csvMap[key])]);
    const quantity = Math.max(1, Number(value("quantity")) || 1);
    const now = new Date().toISOString();
    const card = {
      id: uuid(), createdAt: now, updatedAt: now, year: value("year"), brand: value("brand"), setName: value("setName"), player: value("player"),
      type: value("type"), parallel: value("parallel"), cardNumber: value("cardNumber"), sport: value("sport") || "Other",
      insertName: value('insertName'), cardDescription: value('cardDescription'),
      condition: value("condition") || "Raw", grade: value("grade"), quantity, location: value("location"), notes: value("notes"),
      paid: 0, value: 0, portfolioId: state.activePortfolioId, revision: 1, deviceId: deviceId()
    };
    card.copies = normalizeCopies(card);
    return card;
  }

  function renderCsvPreview() {
    const target = document.querySelector("#csvPreview");
    const required = ["year", "setName", "player"];
    const mapped = state.csvRows.slice(0, 8).map(mappedCsvCard);
    if (!target) return;
    if (!state.csvRows.length) { target.innerHTML = '<div class="trade-empty">Choose a CSV file to map its columns.</div>'; return; }
    target.innerHTML = `<table><thead><tr><th>Status</th><th>Year</th><th>Brand</th><th>Set</th><th>Player / subject</th><th>Parallel</th><th>Number</th></tr></thead><tbody>${mapped.map((card, rowIndex) => {
      const valid = required.every((key) => text(card[key]));
      const editable = (key, value) => `<input data-csv-row="${rowIndex}" data-csv-key="${key}" value="${html(value)}" aria-label="Correct ${key} in row ${rowIndex + 1}" />`;
      return `<tr class="${valid ? "" : "csv-error-row"}"><td>${valid ? "Ready" : "Missing required field"}</td><td>${editable("year", card.year)}</td><td>${editable("brand", card.brand)}</td><td>${editable("setName", card.setName)}</td><td>${editable("player", card.player)}</td><td>${editable("parallel", card.parallel)}</td><td>${editable("cardNumber", card.cardNumber)}</td></tr>`;
    }).join("")}</tbody></table><p>${state.csvRows.length} data rows · previewing ${Math.min(8, state.csvRows.length)}. Financial columns are intentionally ignored.</p>`;
    const button = document.querySelector("#importMappedCsv");
    if (button) button.disabled = !required.every((key) => state.csvMap[key] !== "" && state.csvMap[key] != null);
  }

  async function handleCsvFile(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const rows = parseCsv(await file.text());
    state.csvHeaders = rows.shift()?.map(text) || [];
    state.csvRows = rows;
    state.csvMap = Object.fromEntries(csvTargets.map(([key]) => [key, bestHeader(state.csvHeaders, key)]));
    renderCsvMapping();
  }

  function importMappedCsv() {
    if (!bridge.requireMember("import a collection")) return;
    const imported = state.csvRows.map(mappedCsvCard).filter((card) => card.year && card.setName && card.player);
    bridge.setCards([...imported, ...bridge.getCards()]);
    bridge.saveCards();
    imported.forEach((card) => logActivity("import", "cards", card.id, `Imported ${bridge.fixedCardName(card)} from CSV`));
    document.querySelector("#csvImportStatus").textContent = `${imported.length} valid rows imported. Review duplicates before merging.`;
    state.csvRows = []; state.csvHeaders = []; state.csvMap = {};
    renderCsvMapping(); renderDuplicates(); renderDatalists(); bridge.render();
  }

  function duplicateGroups() {
    const groups = new Map();
    bridge.getCards().forEach((card) => {
      const key = cardIdentity(card);
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(card);
    });
    return [...groups.values()].filter((group) => group.length > 1);
  }

  function renderDuplicates() {
    const target = document.querySelector("#duplicateReviewList");
    if (!target) return;
    const groups = duplicateGroups();
    target.innerHTML = groups.length ? groups.map((group) => `<article><div><strong>${html(bridge.fixedCardName(group[0]))}</strong><p>${group.length} records · ${group.reduce((sum, card) => sum + Math.max(1, Number(card.quantity) || 1), 0)} copies</p></div><button class="ghost-button compact-button" type="button" data-merge-identity="${html(cardIdentity(group[0]))}">Merge records</button></article>`).join("") : '<div class="trade-empty">No likely duplicate identities found.</div>';
  }

  function mergeDuplicateGroup(identity) {
    const cards = bridge.getCards();
    const group = cards.filter((card) => cardIdentity(card) === identity);
    if (group.length < 2) return;
    const primary = { ...group[0] };
    primary.copies = group.flatMap(normalizeCopies);
    primary.quantity = primary.copies.length;
    primary.notes = [...new Set(group.map((card) => text(card.notes)).filter(Boolean))].join(" · ");
    primary.image = group.find((card) => card.image)?.image || primary.image;
    primary.updatedAt = new Date().toISOString();
    primary.revision = Math.max(...group.map((card) => Number(card.revision) || 0)) + 1;
    const removed = new Set(group.slice(1).map((card) => card.id));
    bridge.setCards(cards.filter((card) => !removed.has(card.id)).map((card) => card.id === primary.id ? primary : card));
    group.slice(1).forEach((card) => recordDeletion("cards", card.id, card));
    logActivity("merge", "cards", primary.id, `Merged ${group.length} records into ${primary.quantity} copy records`);
    bridge.saveCards(); renderDuplicates(); bridge.render();
  }

  function selectionCards() {
    return bridge.getCards().filter((card) => selectedCards.has(card.id));
  }

  function renderSelectionCount() {
    const target = document.querySelector("#operationSelectionCount");
    if (target) target.textContent = `${selectedCards.size} selected`;
  }

  function applyBatch() {
    if (!bridge.requireMember("batch edit cards") || !selectedCards.size) return;
    const location = text(document.querySelector("#batchLocation")?.value);
    const sport = text(document.querySelector("#batchSport")?.value);
    const cards = bridge.getCards().map((card) => selectedCards.has(card.id) ? { ...card, ...(location ? { location } : {}), ...(sport ? { sport } : {}), updatedAt: new Date().toISOString(), revision: (Number(card.revision) || 0) + 1, deviceId: deviceId() } : card);
    bridge.setCards(cards); bridge.saveCards();
    logActivity("batch_update", "cards", [...selectedCards].join(","), `Updated ${selectedCards.size} selected records`, { location, sport });
    bridge.render();
  }

  function batchDelete() {
    if (!bridge.requireMember("batch delete cards") || !selectedCards.size) return;
    if (!window.confirm(`Delete ${selectedCards.size} selected records? A deletion history will be retained.`)) return;
    const cards = bridge.getCards();
    cards.filter((card) => selectedCards.has(card.id)).forEach((card) => recordDeletion("cards", card.id, card));
    bridge.setCards(cards.filter((card) => !selectedCards.has(card.id)));
    selectedCards.clear(); saveState(); bridge.saveCards(); renderDuplicates(); bridge.render();
  }

  function queueRefresh() {
    if (!selectedCards.size) return;
    const when = new Date().toISOString();
    state.lastRefreshAt = when;
    state.nextRefreshAt = new Date(Date.now() + WEEK_MS).toISOString();
    state.notifications.unshift({ id: uuid(), createdAt: when, title: "Value refresh queued", body: `${selectedCards.size} cards are ready for refresh when a verified sales feed is connected. No values changed.`, read: false });
    saveState(); renderNotifications(); renderWeeklyRefresh();
  }

  function qrPayload(card) {
    return JSON.stringify({ schema: "card-ledger-label/1", id: card.id, portfolio: card.portfolioId || "personal", card: bridge.fixedCardName(card), location: card.location || "" });
  }

  function drawQrFallback(canvas, payload) {
    const context = canvas.getContext("2d");
    const size = 21, cell = canvas.width / size;
    let seed = [...payload].reduce((sum, char) => (sum * 31 + char.charCodeAt(0)) >>> 0, 2166136261);
    context.fillStyle = "#fff"; context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#071811";
    for (let y = 0; y < size; y += 1) for (let x = 0; x < size; x += 1) {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      if ((seed >>> 30) & 1) context.fillRect(x * cell, y * cell, Math.ceil(cell), Math.ceil(cell));
    }
  }

  function renderQrLabels() {
    const cards = selectionCards();
    const target = document.querySelector("#qrLabelSheet");
    const location = text(document.querySelector("#batchLocation")?.value);
    if (!target || (!cards.length && !location)) return;
    const labels = cards.length ? cards.map((card) => ({ id: card.id, title: bridge.fixedCardName(card), subtitle: card.location || "Unassigned location", payload: qrPayload(card) })) : [{ id: `location-${location}`, title: location, subtitle: "Card Ledger storage location", payload: JSON.stringify({ schema: "card-ledger-location/1", location, portfolio: state.activePortfolioId }) }];
    target.classList.remove("hidden");
    target.innerHTML = `<div class="form-actions"><button id="printQrLabels" class="primary-button compact-button" type="button">Print labels</button><button id="closeQrLabels" class="ghost-button compact-button" type="button">Close</button></div>${labels.map((label) => `<article><div class="qr-code" data-qr-card="${html(label.id)}"></div><div><strong>${html(label.title)}</strong><p>${html(label.subtitle)}</p><small>${html(label.id)}</small></div></article>`).join("")}`;
    labels.forEach((label) => {
      const holder = target.querySelector(`[data-qr-card="${CSS.escape(label.id)}"]`);
      if (window.QRCode) new window.QRCode(holder, { text: label.payload, width: 120, height: 120, correctLevel: window.QRCode.CorrectLevel?.M });
      else { const canvas = document.createElement("canvas"); canvas.width = 120; canvas.height = 120; holder.append(canvas); drawQrFallback(canvas, label.payload); }
    });
    document.querySelector("#printQrLabels")?.addEventListener("click", () => window.print());
    document.querySelector("#closeQrLabels")?.addEventListener("click", () => target.classList.add("hidden"));
  }

  function renderSavedViews() {
    const target = document.querySelector("#savedViewsList");
    if (!target) return;
    target.innerHTML = state.savedViews.map((view) => `<span><button type="button" data-apply-view="${html(view.id)}">${html(view.name)}</button><button type="button" aria-label="Delete ${html(view.name)}" data-delete-view="${html(view.id)}">×</button></span>`).join("") || '<div class="trade-empty">No saved views yet.</div>';
  }

  function saveCurrentView() {
    const name = text(document.querySelector("#savedViewName")?.value);
    if (!name) return;
    if (!bridge.requirePlanAccess("savedViews", state.savedViews.length, "save more collection views")) return;
    state.savedViews.push({ id: uuid(), name, search: text(document.querySelector("#search")?.value), sport: text(document.querySelector("#sportFilter")?.value), sort: text(document.querySelector("#sortBy")?.value), pageSize: state.pageSize });
    document.querySelector("#savedViewName").value = "";
    saveState(); renderSavedViews();
  }

  function paginateCards(cards) {
    state.resultCount = cards.length;
    const pages = Math.max(1, Math.ceil(cards.length / state.pageSize));
    state.page = Math.min(pages, Math.max(1, state.page));
    saveState();
    return cards.slice((state.page - 1) * state.pageSize, state.page * state.pageSize);
  }

  function resetCollectionPage() {
    if (state.page === 1) return;
    state.page = 1;
    saveState();
  }

  function renderPagination() {
    const pages = Math.max(1, Math.ceil(state.resultCount / state.pageSize));
    const summary = document.querySelector("#collectionResultSummary");
    const indicator = document.querySelector("#collectionPageIndicator");
    if (summary) summary.textContent = bridge.getLanguage() === "zh-CN"
      ? `${state.resultCount.toLocaleString()} 张卡片`
      : `${state.resultCount.toLocaleString()} card${state.resultCount === 1 ? "" : "s"}`;
    if (indicator) indicator.textContent = `${state.page} / ${pages}`;
    const previous = document.querySelector("#collectionPreviousPage");
    const next = document.querySelector("#collectionNextPage");
    if (previous) previous.disabled = state.page <= 1;
    if (next) next.disabled = state.page >= pages;
  }

  function portfolioCards(cards) {
    return cards.filter((card) => (card.portfolioId || "personal") === state.activePortfolioId);
  }

  function renderPortfolios() {
    const target = document.querySelector("#portfolioSpaceList");
    const active = state.portfolios.find((portfolio) => portfolio.id === state.activePortfolioId) || state.portfolios[0];
    if (document.querySelector("#activePortfolioBadge")) document.querySelector("#activePortfolioBadge").textContent = active.name;
    if (!target) return;
    target.innerHTML = state.portfolios.map((portfolio) => {
      const count = bridge.getCards().filter((card) => (card.portfolioId || "personal") === portfolio.id).reduce((sum, card) => sum + Math.max(1, Number(card.quantity) || 1), 0);
      return `<article class="${portfolio.id === state.activePortfolioId ? "active" : ""}"><div><strong>${html(portfolio.name)}</strong><p>${html(portfolio.type)} · ${count} cards</p></div><button class="ghost-button compact-button" type="button" data-portfolio="${html(portfolio.id)}">${portfolio.id === state.activePortfolioId ? "Active" : "Open"}</button></article>`;
    }).join("");
  }

  function initCollectionOperations() {
    renderCsvMapping(); renderDuplicates(); renderSavedViews(); renderPortfolios();
    const pageSize = document.querySelector("#collectionPageSize");
    if (pageSize) pageSize.value = String(state.pageSize);
    document.querySelector("#csvImportFile")?.addEventListener("change", handleCsvFile);
    document.querySelector("#csvMappingFields")?.addEventListener("change", (event) => { if (event.target.dataset.csvTarget) { state.csvMap[event.target.dataset.csvTarget] = event.target.value; renderCsvPreview(); } });
    document.querySelector("#csvPreview")?.addEventListener("input", (event) => {
      const rowIndex = Number(event.target.dataset.csvRow), key = event.target.dataset.csvKey;
      if (!Number.isInteger(rowIndex) || !key || state.csvMap[key] === "" || state.csvMap[key] == null) return;
      state.csvRows[rowIndex][Number(state.csvMap[key])] = event.target.value;
      const row = event.target.closest("tr"), valid = ["year", "setName", "player"].every((field) => text(mappedCsvCard(state.csvRows[rowIndex])[field]));
      row.classList.toggle("csv-error-row", !valid); row.firstElementChild.textContent = valid ? "Ready" : "Missing required field";
    });
    document.querySelector("#importMappedCsv")?.addEventListener("click", importMappedCsv);
    document.querySelector("#duplicateReviewList")?.addEventListener("click", (event) => { if (event.target.dataset.mergeIdentity) mergeDuplicateGroup(event.target.dataset.mergeIdentity); });
    document.querySelector("#batchApply")?.addEventListener("click", applyBatch);
    document.querySelector("#batchDelete")?.addEventListener("click", batchDelete);
    document.querySelector("#batchRefresh")?.addEventListener("click", queueRefresh);
    document.querySelector("#batchQr")?.addEventListener("click", renderQrLabels);
    document.querySelector("#saveCurrentView")?.addEventListener("click", saveCurrentView);
    document.querySelector("#savedViewsList")?.addEventListener("click", (event) => {
      const apply = state.savedViews.find((view) => view.id === event.target.dataset.applyView);
      if (apply) {
        document.querySelector("#search").value = apply.search; document.querySelector("#sportFilter").value = apply.sport; document.querySelector("#sortBy").value = apply.sort;
        state.pageSize = apply.pageSize; state.page = 1; saveState(); bridge.render();
      }
      if (event.target.dataset.deleteView) { state.savedViews = state.savedViews.filter((view) => view.id !== event.target.dataset.deleteView); saveState(); renderSavedViews(); }
    });
    pageSize?.addEventListener("change", (event) => { state.pageSize = Number(event.target.value); state.page = 1; saveState(); bridge.render(); });
    document.querySelector("#collectionPreviousPage")?.addEventListener("click", () => { state.page -= 1; saveState(); bridge.render(); });
    document.querySelector("#collectionNextPage")?.addEventListener("click", () => { state.page += 1; saveState(); bridge.render(); });
    document.querySelector("#portfolioForm")?.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = text(document.querySelector("#portfolioName")?.value); if (!name) return;
      if (!bridge.requirePlanAccess("portfolios", state.portfolios.length, "create more portfolio spaces")) return;
      const portfolio = { id: uuid(), name, type: text(document.querySelector("#portfolioType")?.value), createdAt: new Date().toISOString() };
      state.portfolios.push(portfolio); state.activePortfolioId = portfolio.id; saveState(); event.target.reset(); renderPortfolios(); bridge.render();
    });
    document.querySelector("#portfolioSpaceList")?.addEventListener("click", (event) => { if (event.target.dataset.portfolio) { state.activePortfolioId = event.target.dataset.portfolio; state.page = 1; selectedCards.clear(); saveState(); renderPortfolios(); bridge.render(); } });
  }

  function addNotification(title, body, browser = false, ownerEmail = "") {
    const notification = { id: uuid(), title, body, ownerEmail, createdAt: new Date().toISOString(), read: false };
    state.notifications.unshift(notification);
    state.notifications = state.notifications.slice(0, 100);
    saveState(); renderNotifications();
    if (browser && "Notification" in window && Notification.permission === "granted") new Notification(title, { body, icon: "icons/icon-192.png" });
  }

  function renderWatchlist() {
    const target = document.querySelector("#watchlistList");
    if (!target) return;
    const watches = currentWatchlist();
    target.innerHTML = watches.length ? watches.map((item) => `<article><div><strong>${html(item.card)}</strong><p>${html(item.priority)} priority · ${item.channels.inApp ? "In-app" : ""}${item.channels.browser ? " · Browser" : ""} · added ${new Date(item.createdAt).toLocaleDateString()}</p></div><button class="delete-button compact-button" type="button" data-delete-watch="${html(item.id)}">Delete</button></article>`).join("") : '<div class="trade-empty">Your watchlist is independent from collecting goals. Add any card you want to monitor.</div>';
  }

  function renderNotifications() {
    const target = document.querySelector("#notificationCenter");
    if (!target) return;
    const notifications = state.notifications.filter((item) => !item.ownerEmail || item.ownerEmail === watchOwnerKey());
    target.innerHTML = `<div class="section-heading compact-heading"><h3>In-app alerts</h3>${notifications.length ? '<button id="markAlertsRead" class="ghost-button compact-button" type="button">Mark all read</button>' : ""}</div>${notifications.slice(0, 12).map((item) => `<article class="${item.read ? "read" : ""}"><strong>${html(item.title)}</strong><p>${html(item.body)}</p><time>${new Date(item.createdAt).toLocaleString()}</time></article>`).join("") || '<div class="trade-empty">No alerts yet.</div>'}`;
    document.querySelector("#markAlertsRead")?.addEventListener("click", () => { notifications.forEach((item) => { item.read = true; }); saveState(); renderNotifications(); });
  }

  function renderWeeklyRefresh() {
    const target = document.querySelector("#weeklyRefreshStatus");
    if (!target) return;
    const last = state.lastRefreshAt ? new Date(state.lastRefreshAt).toLocaleString() : "Never";
    const next = state.nextRefreshAt ? new Date(state.nextRefreshAt).toLocaleString() : "Waiting for verified data connection";
    target.textContent = `Last checked: ${last} · Next eligible check: ${next}. Values remain unchanged.`;
  }

  function initWatchlist() {
    renderWatchlist(); renderNotifications(); renderWeeklyRefresh();
    document.querySelector("#watchlistForm")?.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!bridge.requirePlanAccess("watchlist", state.watchlist.length, "add more watchlist cards")) return;
      const item = { id: uuid(), card: text(document.querySelector("#watchlistCard")?.value), priority: text(document.querySelector("#watchlistPriority")?.value), channels: { inApp: document.querySelector("#watchInApp")?.checked, browser: document.querySelector("#watchBrowser")?.checked }, createdAt: new Date().toISOString() };
      if (!item.card) return;
      state.watchlist.unshift(item); saveState(); renderWatchlist(); event.target.reset();
      addNotification("Watchlist item added", `${item.card} will be checked when a verified listing feed is connected.`, item.channels.browser);
    });
    document.querySelector("#watchlistList")?.addEventListener("click", (event) => { if (event.target.dataset.deleteWatch) { state.watchlist = state.watchlist.filter((item) => item.id !== event.target.dataset.deleteWatch); saveState(); renderWatchlist(); } });
    document.querySelector("#requestBrowserAlerts")?.addEventListener("click", async () => {
      if (!("Notification" in window)) return addNotification("Browser alerts unavailable", "This browser does not support notifications.");
      const permission = await Notification.requestPermission();
      addNotification("Browser alert status", permission === "granted" ? "Browser notifications are enabled." : "Permission was not granted.");
    });
    if (!state.nextRefreshAt) { state.nextRefreshAt = new Date(Date.now() + WEEK_MS).toISOString(); saveState(); renderWeeklyRefresh(); }
  }

  function injectOrderFileImporter() {
    const panel = document.querySelector("#orderFileImporter");
    if (!panel) return;

    const fileInput = document.querySelector("#marketplaceOrderFile");
    const providerInput = document.querySelector("#salesRecordImportProvider");
    const scopeInput = document.querySelector("#salesRecordImportScope");
    const preview = document.querySelector("#marketplaceOrderPreview");
    const confirm = document.querySelector("#confirmOrderImport");
    const status = document.querySelector("#marketplaceSalesStatus");
    const summary = document.querySelector("#marketplaceSalesSummary");
    const list = document.querySelector("#marketplaceSalesList");
    const queryInput = document.querySelector("#salesRecordSearchQuery");
    const providerFilter = document.querySelector("#salesRecordProviderFilter");
    let pendingRecords = [];
    let invalidRows = [];

    const providerLabel = (provider) => ({
      ebay: "eBay",
      cardhobby: "CardHobby",
      cardladder: "Card Ladder",
      market_movers: "Market Movers"
    })[provider] || text(provider);

    const normalizedHeader = (value) => text(value).toLocaleLowerCase().normalize("NFKC").replace(/[^\p{L}\p{N}]+/gu, " ").trim();
    const aliases = {
      title: ["item title", "title", "item", "card", "name", "商品名称", "卡片名称", "拍品名称", "标题"],
      orderId: ["sales record number", "order number", "order id", "order", "订单号", "订单编号"],
      lineId: ["line item id", "transaction id", "sale record id", "成交编号", "明细编号"],
      itemId: ["item number", "item id", "legacy item id", "商品编号", "拍品编号"],
      date: ["sold date", "sale date", "transaction date", "creation date", "date", "成交时间", "成交日期", "交易时间", "订单时间"],
      price: ["sold for", "sale price", "item subtotal", "item price", "total price", "price", "price value", "line item cost value", "total value", "amount", "成交价", "成交金额", "实付金额", "订单金额"],
      shipping: ["shipping and handling", "shipping price", "shipping", "postage", "运费"],
      currency: ["currency", "currency code", "price currency", "line item cost currency", "total currency", "币种", "货币"],
      quantity: ["quantity", "qty", "数量"],
      saleType: ["sale type", "sold format", "buying option", "format", "交易类型", "成交方式"],
      status: ["transaction status", "order status", "status", "交易状态", "订单状态"],
      url: ["item url", "source url", "listing url", "url", "链接"],
      year: ["year", "season", "年份", "赛季"],
      brand: ["brand", "manufacturer", "publisher", "品牌", "厂商"],
      setName: ["set", "set name", "product", "program", "系列", "卡组"],
      player: ["player", "subject", "athlete", "球员", "人物"],
      cardType: ["card type", "type", "insert", "类型"],
      parallel: ["parallel", "variation", "variant", "平行", "版本"],
      cardNumber: ["card number", "card no", "number", "卡号", "编号"],
      grade: ["grade", "grading", "评级"],
      certification: ["certification", "cert number", "certification number", "证书编号"]
    };

    function flattenRow(value, prefix = "", output = {}) {
      if (!value || typeof value !== "object" || Array.isArray(value)) return output;
      Object.entries(value).forEach(([key, nested]) => {
        const path = prefix ? `${prefix} ${key}` : key;
        if (nested && typeof nested === "object" && !Array.isArray(nested)) flattenRow(nested, path, output);
        else {
          output[normalizedHeader(key)] = nested;
          output[normalizedHeader(path)] = nested;
        }
      });
      return output;
    }

    function pickRow(row, field) {
      const flat = flattenRow(row);
      for (const alias of aliases[field] || []) {
        const value = flat[normalizedHeader(alias)];
        if (value != null && text(value)) return value;
      }
      return "";
    }

    function parseAmount(value) {
      const raw = value && typeof value === "object" && value.value != null ? value.value : value;
      const match = text(raw).replace(/,/g, "").match(/-?\d+(?:\.\d+)?/);
      return match ? Number(match[0]) : NaN;
    }

    function parseDate(value) {
      const raw = text(value);
      if (!raw) return "";
      if (/^\d{5}(?:\.\d+)?$/.test(raw)) {
        const excelDate = new Date(Date.UTC(1899, 11, 30) + Number(raw) * 86400000);
        return Number.isNaN(excelDate.getTime()) ? "" : excelDate.toISOString();
      }
      const normalized = raw.replace(/[年/.]/g, "-").replace(/月/g, "-").replace(/日/g, "");
      const parsed = new Date(normalized);
      return Number.isNaN(parsed.getTime()) ? "" : parsed.toISOString();
    }

    function fingerprint(value) {
      let hashValue = 2166136261;
      for (let index = 0; index < value.length; index += 1) {
        hashValue ^= value.charCodeAt(index);
        hashValue = Math.imul(hashValue, 16777619);
      }
      return `file:${(hashValue >>> 0).toString(16).padStart(8, "0")}`;
    }

    function detectProvider(row, fileName = "") {
      if (providerInput?.value && providerInput.value !== "auto") return providerInput.value;
      const sample = `${fileName} ${Object.keys(flattenRow(row)).join(" ")}`.toLocaleLowerCase();
      if (/card\s*ladder|cardladder/.test(sample)) return "cardladder";
      if (/market\s*movers|sports\s*card\s*investor|sportscardinvestor/.test(sample)) return "market_movers";
      if (/ebay/.test(sample)) return "ebay";
      return /cardhobby|card hobby|卡淘|卡淘商城|卡淘拍卖/.test(sample) || /[\u4e00-\u9fff]/.test(sample) ? "cardhobby" : "ebay";
    }

    function saleType(value) {
      const format = normalizedHeader(value);
      if (/auction|bid|拍卖|竞拍/.test(format)) return "auction";
      if (/offer|议价|报价/.test(format)) return "accepted_offer";
      return format ? "fixed_price" : "unknown";
    }

    function transactionStatus(value) {
      const stateValue = normalizedHeader(value);
      if (/refund|return|退款|退货/.test(stateValue)) return "refunded";
      if (/cancel|取消|撤销/.test(stateValue)) return "cancelled";
      return "completed";
    }

    function normalizeImportedSale(row, index, fileName) {
      const provider = detectProvider(row, fileName);
      const title = text(pickRow(row, "title"));
      const soldAt = parseDate(pickRow(row, "date"));
      const price = parseAmount(pickRow(row, "price"));
      const errors = [];
      if (!title) errors.push("missing item title");
      if (!soldAt) errors.push("missing or invalid sold date");
      if (!Number.isFinite(price) || price < 0) errors.push("missing or invalid sale price");
      if (errors.length) return { error: `Row ${index + 1}: ${errors.join(", ")}` };
      const orderId = text(pickRow(row, "orderId"));
      const lineId = text(pickRow(row, "lineId"));
      const itemId = text(pickRow(row, "itemId"));
      const rawCurrency = text(pickRow(row, "currency")).toUpperCase();
      const currencyMatch = rawCurrency.match(/\b[A-Z]{3}\b/);
      const currency = currencyMatch?.[0] || (provider === "cardhobby" ? "CNY" : "USD");
      const sourceKey = [provider, orderId, lineId, itemId, soldAt, price.toFixed(2), title].join("|");
      return {
        id: uuid(),
        provider,
        record_scope: scopeInput?.value === "market_comp" ? "market_comp" : "personal_sale",
        source_record_type: "file_import",
        verification_status: "imported",
        external_order_id: orderId,
        external_line_item_id: lineId,
        external_item_id: itemId,
        title,
        year: text(pickRow(row, "year")),
        brand: text(pickRow(row, "brand")),
        set_name: text(pickRow(row, "setName")),
        player: text(pickRow(row, "player")),
        card_type: text(pickRow(row, "cardType")),
        parallel: text(pickRow(row, "parallel")),
        card_number: text(pickRow(row, "cardNumber")),
        grade: text(pickRow(row, "grade")),
        certification: text(pickRow(row, "certification")),
        sale_type: saleType(pickRow(row, "saleType")),
        transaction_status: transactionStatus(pickRow(row, "status")),
        sold_at: soldAt,
        sale_price: price,
        shipping_price: Math.max(0, parseAmount(pickRow(row, "shipping")) || 0),
        currency,
        quantity: Math.max(1, Math.trunc(parseAmount(pickRow(row, "quantity")) || 1)),
        source_url: text(pickRow(row, "url")),
        source_fingerprint: fingerprint(sourceKey),
        import_metadata: { file_name: fileName, imported_from: "user_export" },
        imported_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    }

    function mergeSales(records) {
      const merged = new Map(marketplaceSales.map((record) => [`${record.provider}|${record.source_fingerprint}`, record]));
      records.forEach((record) => {
        if (!record?.provider || !record?.source_fingerprint) return;
        const key = `${record.provider}|${record.source_fingerprint}`;
        merged.set(key, { ...merged.get(key), ...record });
      });
      marketplaceSales = [...merged.values()].sort((a, b) => new Date(b.sold_at || 0) - new Date(a.sold_at || 0));
      saveJson(MARKETPLACE_SALES_KEY, marketplaceSales);
      renderSales();
      window.dispatchEvent(new CustomEvent("cardledger:sales-updated"));
    }

    function formatPrice(record) {
      const amount = Number(record.sale_price) || 0;
      try { return new Intl.NumberFormat(undefined, { style: "currency", currency: record.currency || "USD" }).format(amount); }
      catch { return `${record.currency || ""} ${amount.toFixed(2)}`.trim(); }
    }

    function renderSales() {
      const query = normalizedHeader(queryInput?.value);
      const selectedProvider = providerFilter?.value || "all";
      const visible = marketplaceSales.filter((record) => {
        if (selectedProvider !== "all" && record.provider !== selectedProvider) return false;
        if (!query) return true;
        const haystack = normalizedHeader([record.title, record.year, record.brand, record.set_name, record.player, record.parallel, record.card_number, record.grade].join(" "));
        return query.split(/\s+/).every((term) => haystack.includes(term));
      });
      const totals = visible.filter((record) => record.transaction_status === "completed").reduce((groups, record) => {
        const currency = record.currency || "USD";
        groups[currency] = (groups[currency] || 0) + (Number(record.sale_price) || 0) + (Number(record.shipping_price) || 0);
        return groups;
      }, {});
      if (summary) summary.innerHTML = `<strong>${visible.length} saved record${visible.length === 1 ? "" : "s"}</strong><span>${Object.entries(totals).map(([currency, total]) => `${html(currency)} ${Number(total).toLocaleString(undefined, { maximumFractionDigits: 2 })}`).join(" · ") || "No completed-sale total"}</span>`;
      if (!list) return;
      list.innerHTML = visible.slice(0, 100).map((record) => {
        const sourceLabel = providerLabel(record.provider);
        const verification = record.verification_status === "provider_verified" ? "Provider verified" : "Imported export";
        const date = record.sold_at ? new Date(record.sold_at).toLocaleDateString() : "Date unavailable";
        return `<article class="marketplace-sale-row" data-provider="${html(record.provider)}">
          <div class="marketplace-sale-source"><span>${html(sourceLabel)}</span><small>${html(verification)}</small></div>
          <div class="marketplace-sale-title"><strong>${html(record.title)}</strong><small>${html([record.sale_type?.replace(/_/g, " "), date, record.transaction_status].filter(Boolean).join(" · "))}</small></div>
          <div class="marketplace-sale-price"><strong>${html(formatPrice(record))}</strong><small>${record.quantity > 1 ? `${Number(record.quantity)} items` : record.record_scope === "market_comp" ? "Sold comp" : "Your sale"}</small></div>
          ${record.source_url ? `<a class="icon-button" href="${html(record.source_url)}" target="_blank" rel="noreferrer" aria-label="Open source"><span class="material-symbols-outlined" aria-hidden="true">open_in_new</span></a>` : ""}
        </article>`;
      }).join("") || '<div class="trade-empty">No saved sales match this view.</div>';
    }

    async function saveSalesToCloud(records) {
      const settings = bridge.getSupabaseSettings();
      if (!bridge.supabaseReady() || !settings.userId || !settings.accessToken || !records.length) return false;
      const rows = records.map((record) => {
        const { id, ...cloudRecord } = record;
        return { ...cloudRecord, user_id: settings.userId };
      });
      await bridge.supabaseDataRequest("marketplace_sales_records?on_conflict=user_id,provider,source_fingerprint", {
        method: "POST",
        headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
        body: rows
      });
      return true;
    }

    async function hydrateSalesFromCloud() {
      const settings = bridge.getSupabaseSettings();
      if (!bridge.supabaseReady() || !settings.userId || !settings.accessToken) return;
      try {
        const rows = await bridge.supabaseDataRequest(`marketplace_sales_records?user_id=eq.${encodeURIComponent(settings.userId)}&select=*&order=sold_at.desc&limit=1000`);
        if (Array.isArray(rows)) mergeSales(rows);
      } catch (error) {
        if (status) status.textContent = `Local sales are available. Cloud sales table is waiting for deployment: ${error.message}`;
      }
    }

    function rowsFromCsv(source) {
      const rows = parseCsv(source);
      const titleKeys = aliases.title.map(normalizedHeader);
      const priceKeys = aliases.price.map(normalizedHeader);
      const headerIndex = rows.findIndex((row) => {
        const values = row.map(normalizedHeader);
        return values.some((value) => titleKeys.includes(value)) && values.some((value) => priceKeys.includes(value));
      });
      if (headerIndex < 0) throw new Error("Could not find item-title and sale-price columns in this CSV.");
      const headers = rows[headerIndex].map((cell) => text(cell));
      return rows.slice(headerIndex + 1).map((row) => Object.fromEntries(headers.map((header, index) => [header, row[index] ?? ""])));
    }

    function renderPreview() {
      if (!preview) return;
      const sample = pendingRecords.slice(0, 5);
      preview.innerHTML = `<div class="sales-preview-summary"><strong>${pendingRecords.length} valid row${pendingRecords.length === 1 ? "" : "s"}</strong><span>${invalidRows.length} row${invalidRows.length === 1 ? "" : "s"} need correction</span></div>
        ${sample.length ? `<div class="sales-preview-table">${sample.map((record) => `<div><span>${html(providerLabel(record.provider))}</span><strong>${html(record.title)}</strong><span>${html(new Date(record.sold_at).toLocaleDateString())}</span><span>${html(formatPrice(record))}</span></div>`).join("")}</div>` : ""}
        ${invalidRows.length ? `<details><summary>Show import errors</summary><p>${invalidRows.slice(0, 20).map(html).join("<br>")}</p></details>` : ""}`;
      if (confirm) confirm.disabled = !pendingRecords.length;
    }

    fileInput?.addEventListener("change", async (event) => {
      const file = event.target.files?.[0];
      if (!file) return;
      pendingRecords = [];
      invalidRows = [];
      try {
        const raw = await file.text();
        let rows;
        if (file.name.toLowerCase().endsWith(".json")) {
          const parsed = JSON.parse(raw);
          rows = Array.isArray(parsed) ? parsed : ["orders", "sales", "records", "items", "data"].map((key) => parsed?.[key]).find(Array.isArray) || [];
        } else rows = rowsFromCsv(raw);
        rows.forEach((row, index) => {
          const result = normalizeImportedSale(row, index, file.name);
          if (result.error) invalidRows.push(result.error);
          else pendingRecords.push(result);
        });
        renderPreview();
        if (status) status.textContent = `${rows.length} export row${rows.length === 1 ? "" : "s"} reviewed locally. Buyer identity fields were ignored.`;
      } catch (error) {
        if (preview) preview.textContent = `Could not read file: ${error.message}`;
        if (confirm) confirm.disabled = true;
      }
    });

    confirm?.addEventListener("click", async () => {
      if (!bridge.requireMember("import marketplace sales records")) return;
      const records = pendingRecords.slice();
      mergeSales(records);
      let cloudSaved = false;
      try { cloudSaved = await saveSalesToCloud(records); }
      catch (error) { if (status) status.textContent = `Imported locally; Supabase save failed: ${error.message}`; }
      if (status && (!status.textContent || !status.textContent.includes("failed"))) status.textContent = `${records.length} sales record${records.length === 1 ? "" : "s"} imported${cloudSaved ? " and saved to Supabase" : " locally"}.`;
      records.forEach((record) => logActivity("sales_import", "marketplace_sales_records", record.id, `Imported ${record.provider} sale: ${record.title}`));
      pendingRecords = [];
      invalidRows = [];
      if (fileInput) fileInput.value = "";
      if (preview) preview.innerHTML = "";
      confirm.disabled = true;
    });

    document.querySelector("#syncEbaySales")?.addEventListener("click", async () => {
      if (!bridge.requireMember("sync eBay sales")) return;
      if (status) status.textContent = "Downloading completed eBay seller orders from the last 90 days...";
      try {
        const data = await bridge.marketDataRequest("ebay-sync-sales", { days: 90 });
        const records = Array.isArray(data.records) ? data.records : [];
        mergeSales(records);
        if (status) status.textContent = `${records.length} provider-verified eBay sale${records.length === 1 ? "" : "s"} synchronized.`;
      } catch (error) { if (status) status.textContent = error.message; }
    });

    document.querySelector("#searchSoldComps")?.addEventListener("click", async () => {
      const query = text(queryInput?.value);
      if (!query) { if (status) status.textContent = "Enter a card description before searching sold comps."; return; }
      const selected = providerFilter?.value || "all";
      const actions = selected === "all"
        ? ["ebay-sold-search", "cardhobby-sold-search", "cardladder-sold-search", "market_movers-sold-search"]
        : [`${selected}-sold-search`];
      if (status) status.textContent = "Checking approved completed-sales sources...";
      const results = await Promise.allSettled(actions.map((action) => bridge.marketDataRequest(action, { query, limit: 30 })));
      const records = results.flatMap((result) => result.status === "fulfilled" && Array.isArray(result.value.records) ? result.value.records : []);
      const errors = results.filter((result) => result.status === "rejected").map((result) => result.reason?.message).filter(Boolean);
      mergeSales(records);
      if (status) status.textContent = [`${records.length} completed-sale record${records.length === 1 ? "" : "s"} found`, ...errors].join(" · ");
    });

    document.querySelector("#downloadSalesRecords")?.addEventListener("click", () => {
      const headers = ["provider", "record_scope", "verification_status", "title", "sold_at", "sale_price", "shipping_price", "currency", "quantity", "sale_type", "transaction_status", "external_order_id", "external_item_id", "source_url"];
      const csvCell = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;
      const csv = [headers.join(","), ...marketplaceSales.map((record) => headers.map((key) => csvCell(record[key])).join(","))].join("\n");
      bridge.download(`card-ledger-sales-${new Date().toISOString().slice(0, 10)}.csv`, csv, "text/csv;charset=utf-8");
    });

    queryInput?.addEventListener("input", renderSales);
    providerFilter?.addEventListener("change", renderSales);
    renderSales();
    hydrateSalesFromCloud();
  }

  function parseTradeLines(source) {
    return text(source).split(/\n+/).map(text).filter(Boolean).map((line) => ({ line, parsed: bridge.parseFixedCardParts(line, { withValue: true }) || {} }));
  }

  function matchTradeCard(card, parsed, line) {
    const normalized = text(line).toLowerCase();
    const fields = ["year", "brand", "setName", "player", "type", "parallel", "cardNumber"];
    const populated = fields.filter((key) => text(parsed[key]));
    if (populated.length >= 2) return populated.every((key) => text(card[key]).toLowerCase().includes(text(parsed[key]).toLowerCase()) || text(parsed[key]).toLowerCase().includes(text(card[key]).toLowerCase()));
    return [card.year, card.brand, card.setName, card.player, card.type, card.parallel, card.cardNumber].filter(Boolean).every((value) => normalized.includes(text(value).toLowerCase()));
  }

  function completeTradeInventory(trade) {
    let cards = bridge.getCards().slice();
    const removed = [], missing = [];
    parseTradeLines(trade.outgoing).forEach(({ line, parsed }) => {
      const index = cards.findIndex((card) => matchTradeCard(card, parsed, line));
      if (index < 0) { missing.push(line); return; }
      const card = { ...cards[index] }, copies = normalizeCopies(card);
      const removedCopy = copies.shift();
      removed.push({ card: bridge.fixedCardName(card), copyId: removedCopy?.id || "" });
      if (!copies.length) { recordDeletion("cards", card.id, card); cards.splice(index, 1); }
      else { card.copies = copies; card.quantity = copies.length; card.updatedAt = new Date().toISOString(); card.revision = (Number(card.revision) || 0) + 1; cards[index] = card; }
    });
    const added = [];
    parseTradeLines(trade.incoming).forEach(({ line, parsed }) => {
      if (!text(parsed.year) && !text(parsed.player)) return;
      const now = new Date().toISOString();
      const incoming = { id: uuid(), createdAt: now, updatedAt: now, year: text(parsed.year), brand: text(parsed.brand), setName: text(parsed.setName), player: text(parsed.player), type: text(parsed.type), parallel: text(parsed.parallel), cardNumber: text(parsed.cardNumber), sport: text(parsed.sport) || "Other", condition: text(parsed.condition) || "Raw", grade: text(parsed.grade), quantity: 1, paid: 0, value: 0, location: "", notes: `Received in trade with ${text(trade.counterparty) || "collector"} on ${trade.date}.`, portfolioId: state.activePortfolioId, revision: 1, deviceId: deviceId() };
      const existing = cards.find((card) => cardIdentity(card) === cardIdentity(incoming) && (card.portfolioId || "personal") === state.activePortfolioId);
      if (existing) { existing.copies = [...normalizeCopies(existing), ...normalizeCopies(incoming)]; existing.quantity = existing.copies.length; existing.updatedAt = now; existing.revision = (Number(existing.revision) || 0) + 1; added.push(bridge.fixedCardName(existing)); }
      else { incoming.copies = normalizeCopies(incoming); cards.unshift(incoming); added.push(bridge.fixedCardName(incoming)); }
    });
    trade.inventoryChange = { removed, added, missing, appliedAt: new Date().toISOString() };
    bridge.setCards(cards); bridge.saveCards();
    logActivity("trade_complete", "trades", trade.id, `Applied trade inventory: ${removed.length} removed, ${added.length} added`, trade.inventoryChange);
    if (missing.length) addNotification("Trade needs inventory review", `${missing.length} outgoing line(s) could not be matched and were left unchanged.`);
  }

  function currentSession() {
    const account = bridge.getAccount();
    let session = security.sessions.find((item) => item.deviceId === deviceId());
    if (!session) {
      session = { id: uuid(), deviceId: deviceId(), name: navigator.platform || "Browser device", browser: navigator.userAgent, firstSeenAt: new Date().toISOString(), lastSeenAt: new Date().toISOString(), email: account.email || "local" };
      security.sessions.unshift(session);
    } else session.lastSeenAt = new Date().toISOString();
    saveSecurity(); return session;
  }

  function renderSessions() {
    currentSession();
    const target = document.querySelector("#deviceSessionList");
    if (!target) return;
    target.innerHTML = security.sessions.map((session) => `<article><div><strong>${html(session.name)}</strong><p>${session.deviceId === deviceId() ? "This device" : "Known device"} · last active ${new Date(session.lastSeenAt).toLocaleString()}</p></div>${session.deviceId === deviceId() ? '<span class="role-badge">Current</span>' : `<button class="delete-button compact-button" type="button" data-forget-device="${html(session.id)}">Forget</button>`}</article>`).join("");
  }

  function randomRecoveryCode() {
    const bytes = crypto.getRandomValues(new Uint8Array(8));
    const value = [...bytes].map((part) => part.toString(16).padStart(2, "0")).join("").toUpperCase();
    return `${value.slice(0, 4)}-${value.slice(4, 8)}-${value.slice(8, 12)}-${value.slice(12)}`;
  }

  async function hashText(value) {
    const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
    return btoa(String.fromCharCode(...new Uint8Array(digest)));
  }

  async function generateRecoveryCodes() {
    const codes = Array.from({ length: 8 }, randomRecoveryCode);
    security.recoveryCodeHashes = await Promise.all(codes.map(hashText));
    saveSecurity();
    const target = document.querySelector("#recoveryCodeList");
    target.innerHTML = `<p>Store these once. Only hashes remain after this view closes.</p>${codes.map((code) => `<code>${code}</code>`).join("")}<button id="downloadRecoveryKit" class="ghost-button compact-button" type="button">Download kit</button>`;
    document.querySelector("#downloadRecoveryKit")?.addEventListener("click", () => bridge.download(`card-ledger-recovery-${Date.now()}.txt`, `Card Ledger local recovery references\n\n${codes.join("\n")}\n\nThese codes become account recovery codes only after the secure Supabase recovery endpoint is deployed.`, "text/plain"));
  }

  function base64(bytes) { return btoa(String.fromCharCode(...bytes)); }
  function bytes(value) { return Uint8Array.from(atob(value), (char) => char.charCodeAt(0)); }

  async function deriveDocumentKey(passphrase, salt) {
    const material = await crypto.subtle.importKey("raw", new TextEncoder().encode(passphrase), "PBKDF2", false, ["deriveKey"]);
    return crypto.subtle.deriveKey({ name: "PBKDF2", salt, iterations: 250000, hash: "SHA-256" }, material, { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]);
  }

  async function encryptDocument(event) {
    event.preventDefault();
    if (!bridge.requireMember("store encrypted documents")) return;
    const file = document.querySelector("#privateDocumentFile")?.files?.[0];
    const passphrase = document.querySelector("#privateDocumentPassphrase")?.value;
    if (!file || !passphrase) return;
    const salt = crypto.getRandomValues(new Uint8Array(16)), iv = crypto.getRandomValues(new Uint8Array(12));
    const key = await deriveDocumentKey(passphrase, salt);
    const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, await file.arrayBuffer());
    security.documents.unshift({ id: uuid(), name: file.name, type: file.type || "application/octet-stream", size: file.size, salt: base64(salt), iv: base64(iv), ciphertext: base64(new Uint8Array(encrypted)), createdAt: new Date().toISOString() });
    saveSecurity(); event.target.reset(); renderDocuments();
  }

  function renderDocuments() {
    const target = document.querySelector("#privateDocumentList");
    if (!target) return;
    target.innerHTML = security.documents.map((doc) => `<article><div><strong>${html(doc.name)}</strong><p>${Math.ceil(doc.size / 1024)} KB · encrypted ${new Date(doc.createdAt).toLocaleDateString()}</p></div><div class="form-actions"><button class="ghost-button compact-button" type="button" data-open-doc="${html(doc.id)}">Decrypt</button><button class="delete-button compact-button" type="button" data-delete-doc="${html(doc.id)}">Delete</button></div></article>`).join("") || '<div class="trade-empty">No private documents stored.</div>';
  }

  async function decryptDocument(id) {
    const doc = security.documents.find((item) => item.id === id); if (!doc) return;
    const passphrase = window.prompt(`Passphrase for ${doc.name}`); if (!passphrase) return;
    try {
      const key = await deriveDocumentKey(passphrase, bytes(doc.salt));
      const clear = await crypto.subtle.decrypt({ name: "AES-GCM", iv: bytes(doc.iv) }, key, bytes(doc.ciphertext));
      const url = URL.createObjectURL(new Blob([clear], { type: doc.type }));
      const anchor = document.createElement("a"); anchor.href = url; anchor.download = doc.name; anchor.click(); URL.revokeObjectURL(url);
    } catch { window.alert("The passphrase is incorrect or this document is damaged."); }
  }

  async function authFactorRequest(path, method = "GET", body) {
    const settings = bridge.getSupabaseSettings();
    if (!bridge.supabaseReady() || !settings.accessToken) throw new Error("Sign in with Supabase before setting up MFA.");
    const response = await fetch(`${settings.url.replace(/\/$/, "")}/auth/v1/${path}`, { method, headers: { apikey: settings.anonKey, Authorization: `Bearer ${settings.accessToken}`, "Content-Type": "application/json" }, body: body ? JSON.stringify(body) : undefined });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.msg || data.message || data.error_description || "MFA request failed");
    return data;
  }

  async function startMfaEnrollment() {
    const status = document.querySelector("#mfaStatus");
    try {
      const data = await authFactorRequest("factors", "POST", { factor_type: "totp", friendly_name: "Card Ledger authenticator" });
      const factor = data.totp ? data : data.data || data;
      const factorId = factor.id || data.id;
      const challenge = await authFactorRequest(`factors/${factorId}/challenge`, "POST", {});
      security.pendingMfa = { factorId, challengeId: challenge.id, uri: factor.totp?.uri || data.totp?.uri || "", secret: factor.totp?.secret || data.totp?.secret || "" };
      saveSecurity();
      const area = document.querySelector("#mfaQrArea"); area.classList.remove("hidden");
      area.innerHTML = `<strong>Authenticator setup</strong><p>Open this URI in your authenticator app, then enter its six-digit code.</p><code>${html(security.pendingMfa.uri || security.pendingMfa.secret)}</code>`;
      document.querySelector("#mfaVerifyCode").classList.remove("hidden"); document.querySelector("#verifyMfaEnrollment").classList.remove("hidden");
      status.textContent = "Enrollment started.";
    } catch (error) { status.textContent = error.message; }
  }

  async function verifyMfaEnrollment() {
    const status = document.querySelector("#mfaStatus"), code = text(document.querySelector("#mfaVerifyCode")?.value);
    try {
      await authFactorRequest(`factors/${security.pendingMfa.factorId}/verify`, "POST", { challenge_id: security.pendingMfa.challengeId, code });
      security.mfaVerified = true; security.pendingMfa = null; saveSecurity(); status.textContent = "MFA enabled for this Supabase account."; renderSecurityLevel();
    } catch (error) { status.textContent = error.message; }
  }

  function renderSecurityLevel() {
    const badge = document.querySelector("#securityLevelBadge");
    if (badge) badge.textContent = security.mfaVerified ? "MFA protected" : "Standard";
  }

  function injectPrivacyControls() {
    const host = document.querySelector("#accountPrivacySettings") || document.querySelector("#securityCenter");
    if (!host || document.querySelector("#privateIdentityControls")) return;
    host.insertAdjacentHTML("beforeend", `<section id="privateIdentityControls" class="account-extension-panel"><h3>Private identity and selective disclosure</h3><label class="checkbox-row"><input id="privateIdentityMode" type="checkbox" ${state.privacy.privateIdentity ? "checked" : ""} /> Use an alias in public spaces</label><label>Public alias<input id="privateIdentityAlias" value="${html(state.privacy.alias)}" /></label><div class="contract-checks"><label><input id="sharePublicValues" type="checkbox" ${state.privacy.shareValues ? "checked" : ""} /> Show values</label><label><input id="sharePublicLocation" type="checkbox" ${state.privacy.shareLocation ? "checked" : ""} /> Show location</label><label><input id="sharePublicSerials" type="checkbox" ${state.privacy.shareSerials ? "checked" : ""} /> Show serials</label></div><button id="savePrivateIdentity" class="primary-button compact-button" type="button">Save disclosure settings</button></section>`);
    document.querySelector("#savePrivateIdentity")?.addEventListener("click", () => {
      state.privacy = { privateIdentity: document.querySelector("#privateIdentityMode").checked, alias: text(document.querySelector("#privateIdentityAlias").value) || "Private Collector", shareValues: document.querySelector("#sharePublicValues").checked, shareLocation: document.querySelector("#sharePublicLocation").checked, shareSerials: document.querySelector("#sharePublicSerials").checked };
      saveState(); addNotification("Privacy settings saved", "Public collector details now follow your selective disclosure choices.");
    });
  }

  function initSecurity() {
    renderSessions(); renderDocuments(); renderSecurityLevel(); injectPrivacyControls();
    document.querySelector("#deviceSessionList")?.addEventListener("click", (event) => { if (event.target.dataset.forgetDevice) { security.sessions = security.sessions.filter((item) => item.id !== event.target.dataset.forgetDevice); saveSecurity(); renderSessions(); } });
    document.querySelector("#generateRecoveryCodes")?.addEventListener("click", generateRecoveryCodes);
    document.querySelector("#privateDocumentForm")?.addEventListener("submit", encryptDocument);
    document.querySelector("#privateDocumentList")?.addEventListener("click", (event) => {
      if (event.target.dataset.openDoc) decryptDocument(event.target.dataset.openDoc);
      if (event.target.dataset.deleteDoc) { security.documents = security.documents.filter((doc) => doc.id !== event.target.dataset.deleteDoc); saveSecurity(); renderDocuments(); }
    });
    document.querySelector("#startMfaEnrollment")?.addEventListener("click", startMfaEnrollment);
    document.querySelector("#verifyMfaEnrollment")?.addEventListener("click", verifyMfaEnrollment);
  }

  function renderVerifications() {
    const target = document.querySelector("#verificationList");
    if (!target) return;
    target.innerHTML = trust.verifications.map((item) => `<article><div><strong>${html(item.name)}</strong><p>${html(item.type)} · ${new Date(item.createdAt).toLocaleDateString()}</p><small>${html(item.note)}</small></div><span class="role-badge">Recorded</span></article>`).join("") || '<div class="trade-empty">No verification checks recorded.</div>';
  }

  function renderContracts() {
    const target = document.querySelector("#dealContractList");
    if (!target) return;
    target.innerHTML = trust.contracts.map((item) => `<article><div><strong>${html(item.title)}</strong><p>${html(item.participants)} · ${new Date(item.createdAt).toLocaleDateString()}</p><small>${html(item.terms)}</small></div><button class="ghost-button compact-button" type="button" data-export-contract="${html(item.id)}">Export</button></article>`).join("") || '<div class="trade-empty">No deal agreements created.</div>';
  }

  function renderAuctionCalendar() {
    const target = document.querySelector("#auctionCalendarList");
    if (!target) return;
    trust.auctionEvents.sort((a, b) => a.date.localeCompare(b.date));
    target.innerHTML = trust.auctionEvents.map((item) => `<article><time>${html(item.date)}</time><div><strong>${html(item.platform)} · ${html(item.title)}</strong><p>${html(item.status)}${item.notes ? ` · ${html(item.notes)}` : ""}</p></div><button class="delete-button compact-button" type="button" data-delete-auction="${html(item.id)}">Delete</button></article>`).join("") || '<div class="trade-empty">No auction or consignment dates yet.</div>';
  }

  function provenanceEvents() {
    return loadJson("card-ledger-provenance-events-v1", []);
  }

  function saveProvenance(events) {
    saveJson("card-ledger-provenance-events-v1", events);
  }

  function renderProvenance() {
    const select = document.querySelector("#provenanceCard");
    if (select) {
      const chosen = select.value;
      select.innerHTML = portfolioCards(bridge.getCards()).map((card) => `<option value="${html(card.id)}">${html(bridge.fixedCardName(card))}</option>`).join("");
      if ([...select.options].some((option) => option.value === chosen)) select.value = chosen;
    }
    const events = provenanceEvents();
    const target = document.querySelector("#provenanceTimeline");
    if (!target) return;
    target.innerHTML = events.map((event) => {
      const card = bridge.getCards().find((item) => item.id === event.cardId);
      return `<article><time>${html(event.date)}</time><div><strong>${html(event.type)} · ${html(card ? bridge.fixedCardName(card) : "Archived card")}</strong><p>${html(event.details)}</p><small>${html(event.source || "Source not specified")}${event.documentName ? ` · document: ${html(event.documentName)}` : ""}</small></div><span class="role-badge">Immutable</span></article>`;
    }).join("") || '<div class="trade-empty">No provenance events yet.</div>';
  }

  function initTrustAndProvenance() {
    renderVerifications(); renderContracts(); renderAuctionCalendar(); renderProvenance();
    const date = document.querySelector("#provenanceDate"); if (date && !date.value) date.value = new Date().toISOString().slice(0, 10);
    document.querySelector("#verificationForm")?.addEventListener("submit", (event) => {
      event.preventDefault();
      trust.verifications.unshift({ id: uuid(), name: text(document.querySelector("#verificationName")?.value), type: text(document.querySelector("#verificationType")?.value), note: text(document.querySelector("#verificationNote")?.value), createdAt: new Date().toISOString(), reviewerDeviceId: deviceId() });
      saveTrust(); event.target.reset(); renderVerifications(); logActivity("verify", "collector_verifications", trust.verifications[0].id, `Recorded ${trust.verifications[0].type} for ${trust.verifications[0].name}`);
    });
    document.querySelector("#dealContractForm")?.addEventListener("submit", (event) => {
      event.preventDefault();
      const contract = { id: uuid(), title: text(document.querySelector("#contractTitle")?.value), participants: text(document.querySelector("#contractParticipants")?.value), terms: text(document.querySelector("#contractTerms")?.value), inspection: document.querySelector("#contractInspection")?.checked, authenticity: document.querySelector("#contractAuthenticity")?.checked, shipping: document.querySelector("#contractShipping")?.checked, status: "draft", createdAt: new Date().toISOString() };
      trust.contracts.unshift(contract); saveTrust(); event.target.reset(); renderContracts(); logActivity("create", "deal_contracts", contract.id, `Created agreement ${contract.title}`);
    });
    document.querySelector("#dealContractList")?.addEventListener("click", (event) => {
      const contract = trust.contracts.find((item) => item.id === event.target.dataset.exportContract); if (!contract) return;
      bridge.download(`card-ledger-agreement-${contract.id}.json`, JSON.stringify({ schema: "card-ledger-deal-contract/1", ...contract }, null, 2), "application/json");
    });
    document.querySelector("#auctionCalendarForm")?.addEventListener("submit", (event) => {
      event.preventDefault();
      const item = { id: uuid(), platform: text(document.querySelector("#auctionPlatform")?.value), title: text(document.querySelector("#auctionEventTitle")?.value), date: text(document.querySelector("#auctionEventDate")?.value), status: text(document.querySelector("#auctionEventStatus")?.value), notes: text(document.querySelector("#auctionEventNotes")?.value), createdAt: new Date().toISOString() };
      trust.auctionEvents.push(item); saveTrust(); event.target.reset(); renderAuctionCalendar(); logActivity("create", "auction_calendar", item.id, `Added ${item.platform} calendar item ${item.title}`);
    });
    document.querySelector("#auctionCalendarList")?.addEventListener("click", (event) => { if (event.target.dataset.deleteAuction) { trust.auctionEvents = trust.auctionEvents.filter((item) => item.id !== event.target.dataset.deleteAuction); saveTrust(); renderAuctionCalendar(); } });
    document.querySelector("#provenanceForm")?.addEventListener("submit", (event) => {
      event.preventDefault();
      const file = document.querySelector("#provenanceDocument")?.files?.[0];
      const item = Object.freeze({ id: uuid(), cardId: text(document.querySelector("#provenanceCard")?.value), date: text(document.querySelector("#provenanceDate")?.value), type: text(document.querySelector("#provenanceType")?.value), source: text(document.querySelector("#provenanceSource")?.value), details: text(document.querySelector("#provenanceDetails")?.value), documentName: file?.name || "", createdAt: new Date().toISOString(), deviceId: deviceId() });
      const events = provenanceEvents(); events.unshift(item); saveProvenance(events); event.target.reset(); document.querySelector("#provenanceDate").value = new Date().toISOString().slice(0, 10); renderProvenance(); logActivity("append", "provenance_events", item.id, `Appended ${item.type} provenance event`);
    });
  }

  function renderCopyRecords(card) {
    const copies = normalizeCopies(card);
    return `<details class="copy-records"><summary>${copies.length} individual ${copies.length === 1 ? "copy" : "copies"}</summary><div class="copy-records-list">${copies.map((copy, index) => `<div class="copy-record"><span>#${index + 1}</span><span>${html(copy.serialNumber || "No serial")}</span><span>${html(copy.certification || copy.grade || "Raw")}</span></div>`).join("")}</div></details>`;
  }

  function afterRender() {
    document.querySelectorAll("[data-card-id]").forEach((node) => {
      const id = node.dataset.cardId, card = bridge.getCards().find((item) => item.id === id); if (!card) return;
      node.classList.toggle("operation-selected", selectedCards.has(id));
      if (!node.querySelector(".operation-card-select")) {
        const label = document.createElement("label"); label.className = "operation-card-select"; label.title = "Select for batch actions";
        label.innerHTML = `<input type="checkbox" ${selectedCards.has(id) ? "checked" : ""} aria-label="Select ${html(bridge.fixedCardName(card))}" /><span>Select</span>`;
        (node.querySelector(".actions") || node.querySelector(".table-actions") || node.lastElementChild).prepend(label);
        label.querySelector("input").addEventListener("change", (event) => { if (event.target.checked) selectedCards.add(id); else selectedCards.delete(id); saveState(); renderSelectionCount(); node.classList.toggle("operation-selected", event.target.checked); });
      }
      const host = node.querySelector(".notes-details") || node.querySelector(".table-actions");
      if (host && !host.querySelector(".copy-records")) host.insertAdjacentHTML("beforeend", renderCopyRecords(card));
    });
    renderSelectionCount(); renderPagination(); renderPortfolios(); renderProvenance();
    scheduleAdvancedCloud();
  }

  function publicProfile(profile) {
    if (!state.privacy.privateIdentity) return profile;
    return { ...profile, name: state.privacy.alias, email: "", location: state.privacy.shareLocation ? profile.location : "Private", value: state.privacy.shareValues ? profile.value : 0, cards: (profile.cards || []).map((card) => ({ ...card, value: state.privacy.shareValues ? card.value : 0, cardNumber: state.privacy.shareSerials ? card.cardNumber : "Hidden" })) };
  }

  function mergeCloudCards(localCards, cloudCards) {
    const merged = new Map();
    [...cloudCards, ...localCards].forEach((card) => {
      if (tombstones.cards?.[card.id]) return;
      const prior = merged.get(card.id);
      const revision = Number(card.revision) || 1, priorRevision = Number(prior?.revision) || 0;
      const isNewer = !prior || revision > priorRevision || (revision === priorRevision && new Date(card.updatedAt || card.createdAt || 0) > new Date(prior.updatedAt || prior.createdAt || 0));
      if (isNewer) merged.set(card.id, enrichCloudCard(card));
    });
    return [...merged.values()];
  }

  function enrichCloudCard(card) {
    const next = { ...card, portfolioId: card.portfolioId || "personal", revision: Math.max(1, Number(card.revision) || 1), deviceId: card.deviceId || deviceId() };
    next.copies = normalizeCopies(next);
    return next;
  }

  async function upsertAdvancedTable(table, rows, conflict = "user_id,id", ignoreDuplicates = false) {
    if (!rows.length) return;
    await bridge.supabaseDataRequest(`${table}?on_conflict=${conflict}`, { method: "POST", headers: { Prefer: `resolution=${ignoreDuplicates ? "ignore" : "merge"}-duplicates,return=minimal` }, body: rows });
  }

  async function syncAdvancedCloud() {
    const settings = bridge.getSupabaseSettings();
    if (!bridge.supabaseReady() || !settings.accessToken || !settings.userId) return false;
    const user_id = settings.userId;
    try {
      await Promise.all([
        upsertAdvancedTable("portfolios", state.portfolios.map((item) => ({ user_id, id: item.id, name: item.name, portfolio_type: item.type, revision: item.revision || 1, device_id: deviceId(), created_at: item.createdAt }))),
        upsertAdvancedTable("card_copies", bridge.getCards().flatMap((card) => normalizeCopies(card).map((copy) => ({ user_id, id: copy.id, card_id: card.id, serial_number: copy.serialNumber || "", certification: copy.certification || "", grade: copy.grade || "", location: copy.location || card.location || "", revision: card.revision || 1, device_id: deviceId(), created_at: copy.createdAt || card.createdAt })))),
        upsertAdvancedTable("watchlist_items", currentWatchlist().map((item) => ({ user_id, id: item.id, card_query: item.card, priority: item.priority, in_app_enabled: Boolean(item.channels.inApp), browser_enabled: Boolean(item.channels.browser), email_enabled: false, created_at: item.createdAt }))),
        upsertAdvancedTable("notifications", state.notifications.filter((item) => !item.ownerEmail || item.ownerEmail === watchOwnerKey()).map((item) => ({ user_id, id: item.id, title: item.title, body: item.body, notification_type: "in_app", read_at: item.read ? item.createdAt : null, created_at: item.createdAt }))),
        upsertAdvancedTable("saved_views", state.savedViews.map((item) => ({ user_id, id: item.id, name: item.name, filters: item, created_at: item.createdAt || new Date().toISOString() }))),
        upsertAdvancedTable("activity_events", activityEvents.map((item) => ({ user_id, id: item.id, action: item.action, entity_type: item.entityType, entity_id: item.entityId, summary: item.summary, detail: item.detail || {}, device_id: item.deviceId, occurred_at: item.occurredAt })), "user_id,id", true),
        upsertAdvancedTable("provenance_events", provenanceEvents().map((item) => ({ user_id, id: item.id, card_id: bridge.getCards().some((card) => card.id === item.cardId) ? item.cardId : null, event_date: item.date, event_type: item.type, source_or_custodian: item.source || "", disclosure: item.details, document_path: null, device_id: item.deviceId, created_at: item.createdAt })), "user_id,id", true),
        upsertAdvancedTable("device_sessions", security.sessions.map((item) => ({ user_id, id: item.id, device_id: item.deviceId, display_name: item.name, auth_session_id: item.authSessionId || null, first_seen_at: item.firstSeenAt, last_seen_at: item.lastSeenAt, revoked_at: item.revokedAt || null }))),
        upsertAdvancedTable("sync_tombstones", Object.entries(tombstones).flatMap(([entity_type, entries]) => Object.values(entries).map((item) => ({ user_id, entity_type, entity_id: item.id, revision: item.revision || 1, device_id: deviceId(), deleted_at: item.deletedAt }))), "user_id,entity_type,entity_id"),
        upsertAdvancedTable("collector_verifications", trust.verifications.map((item) => ({ user_id, id: item.id, subject_name: item.name, verification_type: item.type, evidence_note: item.note || "", status: "recorded", created_at: item.createdAt }))),
        upsertAdvancedTable("deal_contracts", trust.contracts.map((item) => ({ user_id, id: item.id, title: item.title, participants: item.participants, inspection_required: item.inspection, authenticity_required: item.authenticity, tracked_shipping_required: item.shipping, terms: item.terms || "", status: item.status || "draft", created_at: item.createdAt }))),
        upsertAdvancedTable("auction_calendar", trust.auctionEvents.map((item) => ({ user_id, id: item.id, platform: item.platform, event_title: item.title, event_date: item.date, workflow_status: item.status, notes: item.notes || "", created_at: item.createdAt })))
      ]);
      return true;
    } catch (error) {
      console.info("Advanced cloud tables are waiting for card-ledger-advanced.sql:", error.message);
      return false;
    }
  }

  function afterSupabaseSession(data) {
    const session = currentSession();
    session.authSessionId = text(data?.session_id || data?.access_token?.session_id);
    session.lastSeenAt = new Date().toISOString();
    const factors = data?.user?.factors || [];
    security.mfaVerified = factors.some((factor) => factor.status === "verified") || security.mfaVerified;
    saveSecurity(); renderSessions(); renderSecurityLevel(); syncAdvancedCloud();
  }

  function watchOwnerKey() {
    const account = bridge.getAccount();
    return text(account.email).toLowerCase() || (account.phone ? `phone:${text(account.phone)}` : "")
      || (bridge.getSupabaseSettings().userId ? `user:${bridge.getSupabaseSettings().userId}` : "guest");
  }
  function currentWatchlist() {
    return state.watchlist.filter((item) => (!item.ownerEmail && !item.hciCardId) || item.ownerEmail === watchOwnerKey());
  }

  function watchDatabaseCard(card) {
    if (!bridge.requireMember("watch database cards")) return false;
    const ownerEmail = watchOwnerKey();
    if (state.watchlist.some((item) => item.hciCardId === card.hciCardId && item.ownerEmail === ownerEmail)) return true;
    if (!bridge.requirePlanAccess("watchlist", currentWatchlist().length, "add more watchlist cards")) return false;
    state.watchlist.unshift({ id: uuid(), card: bridge.fixedCardName(card), hciCardId: card.hciCardId, ownerEmail,
      identity: card, priority: "normal", channels: { inApp: true, browser: false }, createdAt: new Date().toISOString(), matchedPosts: [] });
    saveState(); renderWatchlist(); return true;
  }

  function checkDatabaseWatchlist(posts) {
    let changed = false;
    state.watchlist.filter((item) => item.hciCardId && item.ownerEmail === watchOwnerKey()).forEach((item) => {
      item.matchedPosts ||= [];
      posts.filter((post) => ["sell", "trade"].includes(post.intent)
        && post.selectedCard?.hciCardId === item.hciCardId && !item.matchedPosts.includes(post.id)).forEach((post) => {
        item.matchedPosts.push(post.id); changed = true;
        addNotification(bridge.getLanguage() === "zh-CN" ? "关注卡片已上架" : "Watchlist match", `${post.author}: ${item.card}`, item.channels.browser, item.ownerEmail);
      });
    });
    if (changed) saveState();
  }

  window.CardLedgerAdvanced = { enrichCard, recordDeletion, paginateCards, resetCollectionPage, portfolioCards, completeTradeInventory, afterRender, publicProfile, afterSupabaseSession, mergeCloudCards, syncAdvancedCloud, logActivity, syncCardSelectors,
    collectionResultCount: () => state.resultCount,
    watchDatabaseCard, checkDatabaseWatchlist, getDatabaseWatches: () => state.watchlist.filter((item) => item.hciCardId && item.ownerEmail === watchOwnerKey()),
    removeDatabaseWatch: (id) => { state.watchlist = state.watchlist.filter((item) => item.id !== id || item.ownerEmail !== watchOwnerKey()); saveState(); renderWatchlist(); },
    getDuplicateGroups: duplicateGroups, mergeDuplicateGroup,
    mergeDatabaseDuplicates: (ids) => {
      const groups = duplicateGroups();
      const group = groups.find((items) => items.length === ids.length && items.every((card) => ids.includes(card.id)));
      if (group) mergeDuplicateGroup(cardIdentity(group[0]));
    } };

  function init() {
    initBeginnerFlow();
    initCollectionOperations();
    initWatchlist();
    injectOrderFileImporter();
    initSecurity();
    initTrustAndProvenance();
    bridge.render();
  }

  init();
})();
