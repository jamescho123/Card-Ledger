(() => {
  "use strict";

  const CUSTOM_VALUE = "__custom__";
  const fieldConfig = {
    brand: { selectId: "brand", customId: "brandCustom" },
    setName: { selectId: "setName", customId: "setNameCustom" },
    player: { selectId: "player", customId: "playerCustom" }
  };
  let pendingPlayer = "";

  const clean = (value) => String(value ?? "").trim();
  const escapeHtml = (value) => clean(value).replace(/[&<>"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;"
  })[character]);

  function customValue(key) {
    const config = fieldConfig[key];
    const select = document.getElementById(config.selectId);
    if (!select) return "";
    return select.value === CUSTOM_VALUE ? clean(document.getElementById(config.customId)?.value) : clean(select.value);
  }

  function updateCustomField(key) {
    const config = fieldConfig[key];
    const select = document.getElementById(config.selectId);
    const input = document.getElementById(config.customId);
    if (!select || !input) return;
    const isCustom = select.value === CUSTOM_VALUE;
    input.classList.toggle("hidden", !isCustom);
    input.disabled = !isCustom;
    input.required = isCustom;
    if (!isCustom) input.value = "";
  }

  function setOptions(key, values, placeholder, current, enabled, strict = false) {
    const config = fieldConfig[key];
    const select = document.getElementById(config.selectId);
    const input = document.getElementById(config.customId);
    if (!select) return;
    const unique = [...new Set(values.map(clean).filter(Boolean))].sort((a, b) => a.localeCompare(b));
    const match = unique.find((value) => value.toLowerCase() === clean(current).toLowerCase());
    const label = (value) => key === 'brand' && value === 'Upper' ? 'Upper Deck' : value;
    const manualLabel = document.documentElement.lang.startsWith('zh') ? '未列出 - 手动填写' : 'Not listed - enter manually';
    select.innerHTML = `<option value="">${escapeHtml(placeholder)}</option>${unique.map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(label(value))}</option>`).join("")}${strict ? '' : `<option value="${CUSTOM_VALUE}">${manualLabel}</option>`}`;
    select.disabled = !enabled;
    if (enabled && match) select.value = match;
    else if (enabled && current && !strict) {
      select.value = CUSTOM_VALUE;
      if (input) input.value = clean(current);
    } else select.value = "";
    updateCustomField(key);
  }

  function supportsSport(entry, sport) {
    const sports = Array.isArray(entry?.sports) ? entry.sports : [];
    return !sport || !sports.length || sports.includes(sport);
  }

  function basketballBrands(yearBrands) {
    const directory = (window.CARD_SET_CATALOG || [])
      .filter((entry) => supportsSport(entry, 'Basketball')).map((entry) => clean(entry.brand));
    // Preserve source keys for exact HCI lookups while displaying full brand names.
    const sourceBrands = Object.keys(yearBrands);
    return [...sourceBrands, ...directory.filter((brand) => !(brand === 'Upper Deck' && sourceBrands.includes('Upper')))];
  }

  function sync(seed = null) {
    if (seed instanceof Event) seed = null;
    const selectedSport = clean(seed?.sport ?? document.getElementById('sport')?.value);
    const yearPicker = document.getElementById('hciYearPicker');
    const yearInput = document.getElementById('year');
    const hci = window.HCI_SELECTION_CATALOG;
    const useHci = selectedSport === 'Basketball' && hci;
    if (yearPicker) yearPicker.hidden = !useHci;
    if (yearInput) yearInput.hidden = Boolean(useHci);
    if (yearPicker) yearPicker.required = Boolean(useHci);
    if (yearInput) yearInput.required = !useHci;
    if (useHci) {
      const year = clean(seed?.year ?? yearInput.value);
      const key = hci[year] ? year : Object.keys(hci).find(value => value === year.slice(0, 4));
      const brands = hci[key] || {};
      yearPicker.innerHTML = '<option value="">Choose a year</option>' + Object.keys(hci).sort().reverse().map(value => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`).join('');
      yearPicker.value = key || '';
      let currentBrand = clean(seed?.brand) || customValue('brand');
      if (currentBrand === 'Upper Deck' && brands.Upper && !brands['Upper Deck']) currentBrand = 'Upper';
      setOptions('brand', basketballBrands(brands), 'Choose a brand', currentBrand, Boolean(key));
      const selectedBrand = customValue('brand');
      const sets = brands[selectedBrand] || {};
      setOptions('setName', Object.keys(sets), 'Choose a set', clean(seed?.setName) || customValue('setName'), Boolean(key && selectedBrand));
      const players = sets[customValue('setName')] || [];
      const verifiedSet = Object.prototype.hasOwnProperty.call(sets, customValue('setName'));
      setOptions('player', players, 'Choose a player', clean(seed?.player) || customValue('player') || pendingPlayer, Boolean(key && selectedBrand && customValue('setName')), verifiedSet);
      const status = document.getElementById('setCatalogStatus');
      if (status) {
        const chinese = document.documentElement.lang.startsWith('zh');
        status.textContent = selectedBrand && !Object.keys(sets).length
          ? (chinese ? `HCI 暂无 ${year} 年 ${selectedBrand} 的清单；可手动填写系列与球员，资料尚未核实。`
            : `No HCI checklist for ${year} ${selectedBrand}. Set and player can be entered manually; details are unverified.`)
          : (chinese ? `HCI 篮球卡目录 · ${Object.keys(sets).length} 个系列 · 当前系列 ${players.length} 位球员`
            : `HCI basketball catalog · ${Object.keys(sets).length} sets · ${players.length} players in this set`);
      }
      return;
    }
    const catalog = Array.isArray(window.CARD_SET_CATALOG) ? window.CARD_SET_CATALOG : [];
    const sport = clean(seed?.sport ?? document.getElementById("sport")?.value);
    const year = clean(seed?.year ?? document.getElementById("year")?.value);
    const ready = Boolean(sport && year);
    const currentBrand = clean(seed?.brand) || customValue("brand");
    const brands = catalog.filter((entry) => supportsSport(entry, sport)).map((entry) => entry.brand);
    setOptions("brand", brands, ready ? "Choose a brand" : "Choose sport and year first", currentBrand, ready);

    const brand = customValue("brand");
    const currentSet = clean(seed?.setName) || customValue("setName");
    const sets = catalog
      .filter((entry) => supportsSport(entry, sport))
      .filter((entry) => !brand || clean(entry.brand).toLowerCase() === brand.toLowerCase())
      .map((entry) => entry.setName);
    setOptions("setName", sets, brand ? "Choose a set" : "Choose a brand first", currentSet, ready && Boolean(brand));

    const setName = customValue("setName");
    const currentPlayer = clean(seed?.player) || customValue("player") || pendingPlayer;
    const players = Array.isArray(window.CARD_PLAYER_DIRECTORY?.[sport]) ? window.CARD_PLAYER_DIRECTORY[sport] : [];
    setOptions("player", players, setName ? "Choose a player" : "Choose a set first", currentPlayer, ready && Boolean(brand && setName));

    const status = document.getElementById("setCatalogStatus");
    if (status) {
      const count = new Set(sets.map((value) => clean(value).toLowerCase()).filter(Boolean)).size;
      status.textContent = !ready
        ? "Choose a sport and enter a year to unlock the catalog."
        : !brand
          ? "Choose a brand to see its sets."
          : `${count} ${brand} catalog sets for ${sport}; recording year ${year}.`;
    }
  }

  function clear(keys) {
    if (keys.includes('player')) pendingPlayer = '';
    keys.forEach((key) => {
      const config = fieldConfig[key];
      const select = document.getElementById(config.selectId);
      const input = document.getElementById(config.customId);
      if (select) select.value = "";
      if (input) input.value = "";
    });
  }

  function initialize() {
    if (!document.getElementById("brand")) return;
    const yearInput = document.getElementById('year');
    const yearPicker = document.createElement('select');
    yearPicker.id = 'hciYearPicker';
    yearPicker.setAttribute('aria-label', 'Basketball year');
    yearPicker.hidden = true;
    yearInput.after(yearPicker);
    yearPicker.addEventListener('change', () => {
      yearInput.value = yearPicker.value;
      pendingPlayer = '';
      clear(['brand', 'setName', 'player']);
      yearInput.dispatchEvent(new Event('change', { bubbles: true }));
      sync();
    });
    document.getElementById("sport")?.addEventListener("change", () => { clear(["brand", "setName", "player"]); sync(); });
    document.getElementById("year")?.addEventListener("input", () => { clear(["brand", "setName", "player"]); sync(); });
    document.getElementById("brand")?.addEventListener("change", () => {
      updateCustomField("brand");
      clear(["setName", "player"]);
      if (document.getElementById("brand")?.value === CUSTOM_VALUE) {
        setOptions("setName", [], "Enter the brand name first", "", false);
        setOptions("player", [], "Choose a set first", "", false);
        document.getElementById("brandCustom")?.focus();
        return;
      }
      sync();
    });
    document.getElementById("brandCustom")?.addEventListener("input", sync);
    document.getElementById("setName")?.addEventListener("change", () => {
      updateCustomField("setName");
      clear(["player"]);
      if (document.getElementById("setName")?.value === CUSTOM_VALUE) {
        setOptions("player", [], "Enter the set name first", "", false);
        document.getElementById("setNameCustom")?.focus();
        return;
      }
      sync();
    });
    document.getElementById("setNameCustom")?.addEventListener("input", sync);
    document.getElementById("player")?.addEventListener("change", () => {
      pendingPlayer = "";
      updateCustomField("player");
    });
    sync();
  }

  function setPendingPlayer(player, sport = "") {
    pendingPlayer = clean(player);
    const sportField = document.getElementById("sport");
    if (sport && sportField && !sportField.value) sportField.value = sport;
    sync();
  }

  function clearPendingPlayer() {
    pendingPlayer = "";
  }

  window.CardLedgerCardSelectors = { sync, value: customValue, setPendingPlayer, clearPendingPlayer };
  initialize();
})();
