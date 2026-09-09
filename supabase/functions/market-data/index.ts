import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

type JsonObject = Record<string, unknown>;
type SalesProvider = "ebay" | "cardhobby" | "cardladder" | "market_movers";

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { ...corsHeaders, "Content-Type": "application/json", "Cache-Control": "no-store" },
});

const env = (name: string) => (Deno.env.get(name) || "").trim();
const ebayUserScopes = () => (env("EBAY_USER_SCOPES") || "https://api.ebay.com/oauth/api_scope/sell.fulfillment")
  .split(/\s+/)
  .filter(Boolean);

function normalizedKey(value: string) {
  return value.toLocaleLowerCase().normalize("NFKC").replace(/[^\p{L}\p{N}]+/gu, " ").trim();
}

function deepValues(input: unknown, prefix = "", result: Array<[string, unknown]> = []) {
  if (!input || typeof input !== "object") return result;
  for (const [key, value] of Object.entries(input as JsonObject)) {
    const path = prefix ? `${prefix}.${key}` : key;
    result.push([normalizedKey(key), value], [normalizedKey(path), value]);
    if (value && typeof value === "object") deepValues(value, path, result);
  }
  return result;
}

function pick(entries: Array<[string, unknown]>, aliases: string[]) {
  const keys = aliases.map(normalizedKey);
  for (const key of keys) {
    const exact = entries.find(([entry]) => entry === key);
    if (exact && exact[1] != null && String(exact[1]).trim()) return exact[1];
  }
  return "";
}

function numberValue(value: unknown) {
  const raw = value && typeof value === "object" && "value" in value ? (value as JsonObject).value : value;
  const match = String(raw ?? "").replace(/,/g, "").match(/-?\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : 0;
}

function textValue(value: unknown) {
  return String(value ?? "").trim();
}

function currencyValue(value: unknown, fallback = "USD") {
  const raw = value && typeof value === "object" && "currency" in value ? (value as JsonObject).currency : value;
  const currency = textValue(raw).toUpperCase();
  return /^[A-Z]{3}$/.test(currency) ? currency : fallback;
}

function bytesToBase64(bytes: Uint8Array) {
  let binary = "";
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary);
}

function base64ToBytes(value: string) {
  const binary = atob(value);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

async function sha256(value: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function encryptionKey() {
  const secret = env("MARKETPLACE_TOKEN_ENCRYPTION_KEY");
  if (secret.length < 32) throw new Error("MARKETPLACE_TOKEN_ENCRYPTION_KEY must contain at least 32 characters.");
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(secret));
  return crypto.subtle.importKey("raw", digest, { name: "AES-GCM" }, false, ["encrypt", "decrypt"]);
}

async function encryptToken(value: string) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, await encryptionKey(), new TextEncoder().encode(value));
  return `v1.${bytesToBase64(iv)}.${bytesToBase64(new Uint8Array(encrypted))}`;
}

async function decryptToken(value: string) {
  const [version, iv, payload] = value.split(".");
  if (version !== "v1" || !iv || !payload) throw new Error("Stored marketplace token is invalid.");
  const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv: base64ToBytes(iv) }, await encryptionKey(), base64ToBytes(payload));
  return new TextDecoder().decode(decrypted);
}

function safeReturnUrl(candidate: string) {
  const fallback = env("APP_BASE_URL");
  const allow = new Set([
    ...env("APP_ALLOWED_ORIGINS").split(",").map((item) => item.trim()).filter(Boolean),
    "http://127.0.0.1:4180",
    "http://localhost:4180",
  ]);
  if (fallback) {
    try { allow.add(new URL(fallback).origin); } catch { /* Invalid configuration is handled below. */ }
  }
  try {
    const parsed = new URL(candidate || fallback);
    if ((parsed.protocol === "https:" || parsed.protocol === "http:") && allow.has(parsed.origin)) return parsed.href;
  } catch { /* Use the configured fallback. */ }
  return fallback;
}

function oauthResult(returnUrl: string, status: string, message: string) {
  const safe = safeReturnUrl(returnUrl);
  if (safe) {
    const target = new URL(safe);
    target.searchParams.set("marketplace", status);
    target.hash = "syncArea";
    return Response.redirect(target, 303);
  }
  const escaped = message.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character] || character));
  return new Response(`<!doctype html><meta name="viewport" content="width=device-width"><title>Card Ledger marketplace</title><body style="font:16px system-ui;background:#0b0f0e;color:#eef7f2;padding:40px"><h1>Card Ledger</h1><p>${escaped}</p><p>You may close this window.</p></body>`, {
    status: status === "connected" ? 200 : 400,
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  });
}

function psaRecord(payload: JsonObject, certNumber: string, populationPayload: JsonObject = {}) {
  const entries = deepValues(payload);
  const populationEntries = deepValues(populationPayload);
  const specId = numberValue(pick(entries, ["specid", "spec id"]));
  const year = textValue(pick(entries, ["year", "specyear"]));
  const brandTitle = textValue(pick(entries, ["brandtitle", "brand title", "brand", "title"]));
  const subject = textValue(pick(entries, ["subject", "player", "name"]));
  const cardNumber = textValue(pick(entries, ["cardnumber", "card number", "cardno"]));
  const variety = textValue(pick(entries, ["varietypedigree", "variety pedigree", "variety", "pedigree"]));
  const category = textValue(pick(entries, ["category", "categoryname", "category name"]));
  const gradeLabel = textValue(pick(entries, ["gradedescription", "grade description", "grade", "itemgrade"]));
  const grade = numberValue(pick(entries, ["cardgrade", "card grade", "gradevalue", "grade value", "itemgrade", "grade"]));
  const certPopulationAtGrade = numberValue(pick(entries, ["population", "psapopulation", "psa population", "totalpopulation", "total population"]));
  const gradePopulationRaw = grade > 0
    ? pick(populationEntries, [`psapop grade${String(grade).replace(".", "_")}`])
    : "";
  const populationAtGrade = gradePopulationRaw === "" ? certPopulationAtGrade : numberValue(gradePopulationRaw);
  const populationHigher = numberValue(pick(entries, ["pophigher", "pop higher", "populationhigher", "population higher"]));
  const populationTotalRaw = pick(populationEntries, ["psapop total", "psa pop total", "total"]);
  const setName = brandTitle || textValue(pick(entries, ["setname", "set name", "set"]));
  const identityKey = [year, setName, subject, cardNumber, variety].map(normalizedKey).join("|");
  return {
    identity_key: identityKey,
    psa_spec_id: specId || null,
    year,
    brand: textValue(pick(entries, ["manufacturer", "brand"])),
    set_name: setName,
    subject,
    card_number: cardNumber,
    variety,
    category,
    grade,
    grade_label: gradeLabel || (grade ? `PSA ${grade}` : ""),
    population_at_grade: populationAtGrade,
    population_higher: populationHigher,
    population_total: populationTotalRaw === "" ? null : numberValue(populationTotalRaw),
    sample_cert_number: certNumber,
    source_type: "psa_public_api",
    source_url: `https://www.psacard.com/cert/${encodeURIComponent(certNumber)}/psa`,
    source_updated_at: new Date().toISOString(),
    fetched_at: new Date().toISOString(),
    raw_payload: { certification: payload, spec_population: populationPayload },
  };
}

async function psaApiGet(path: string, token: string) {
  const response = await fetch(`https://api.psacard.com/publicapi/${path.replace(/^\//, "")}`, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || payload.IsValidRequest === false) {
    throw new Error(payload.ServerMessage || payload.message || `PSA API request failed (${response.status}).`);
  }
  return payload as JsonObject;
}

let ebayToken = "";
let ebayTokenExpiresAt = 0;

async function getEbayToken() {
  if (ebayToken && Date.now() < ebayTokenExpiresAt - 60_000) return ebayToken;
  const clientID = env("EBAY_CLIENT_ID");
  const clientSecret = env("EBAY_CLIENT_SECRET");
  if (!clientID || !clientSecret) throw new Error("eBay credentials are not configured.");
  const response = await fetch("https://api.ebay.com/identity/v1/oauth2/token", {
    method: "POST",
    headers: { Authorization: `Basic ${btoa(`${clientID}:${clientSecret}`)}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "client_credentials", scope: "https://api.ebay.com/oauth/api_scope" }),
  });
  const body = await response.json();
  if (!response.ok) throw new Error(body.error_description || body.error || "eBay OAuth failed.");
  ebayToken = body.access_token;
  ebayTokenExpiresAt = Date.now() + Number(body.expires_in || 7200) * 1000;
  return ebayToken;
}

async function ebaySearch(query: string, limit: number) {
  const token = await getEbayToken();
  const url = new URL("https://api.ebay.com/buy/browse/v1/item_summary/search");
  url.searchParams.set("q", query);
  url.searchParams.set("limit", String(Math.min(Math.max(limit, 1), 25)));
  url.searchParams.set("filter", "buyingOptions:{FIXED_PRICE|AUCTION}");
  const response = await fetch(url, { headers: { Authorization: `Bearer ${token}`, "X-EBAY-C-MARKETPLACE-ID": env("EBAY_MARKETPLACE_ID") || "EBAY_US" } });
  const body = await response.json();
  if (!response.ok) throw new Error(body.errors?.[0]?.message || "eBay Browse search failed.");
  return (body.itemSummaries || []).map((item: JsonObject) => ({
    provider: "ebay",
    id: item.itemId,
    title: item.title,
    imageUrl: (item.image as JsonObject | undefined)?.imageUrl || "",
    itemUrl: item.itemWebUrl || "",
    buyingOptions: item.buyingOptions || [],
    condition: item.condition || "",
    price: item.price || null,
    listingOnly: true,
  }));
}

async function cardHobbySearch(query: string, limit: number) {
  const base = env("CARDHOBBY_API_BASE");
  const token = env("CARDHOBBY_API_TOKEN");
  if (!base || !token) throw new Error("CardHobby has no documented public API. Use a CardHobby export file or configure an approved partner endpoint.");
  const url = new URL(base.replace(/\/$/, "") + "/search");
  url.searchParams.set("q", query);
  url.searchParams.set("limit", String(Math.min(Math.max(limit, 1), 25)));
  const response = await fetch(url, { headers: { Authorization: `Bearer ${token}`, Accept: "application/json" } });
  const body = await response.json();
  if (!response.ok) throw new Error(body.message || "CardHobby partner search failed.");
  const rows = Array.isArray(body) ? body : body.items || body.results || [];
  return rows.map((item: JsonObject) => ({
    provider: "cardhobby",
    id: item.id || item.itemId,
    title: item.title || item.name,
    imageUrl: item.imageUrl || item.image || "",
    itemUrl: item.itemUrl || item.url || "",
    buyingOptions: item.buyingOptions || [],
    condition: item.condition || "",
    price: item.price || null,
    listingOnly: true,
  }));
}

function normalizeSoldRecord(provider: SalesProvider, row: JsonObject, userId: string, index = 0) {
  const entries = deepValues(row);
  const title = textValue(pick(entries, ["title", "item title", "name", "card", "商品名称", "卡片名称", "标题"]));
  const soldAt = textValue(pick(entries, ["sold at", "sold date", "sale date", "last sold date", "date", "成交时间", "成交日期", "交易时间", "订单时间"]));
  const priceRaw = pick(entries, ["last sold price", "sold for", "sale price", "price", "amount", "成交价", "成交金额", "实付金额", "订单金额"]);
  const price = numberValue(priceRaw);
  const externalOrderId = textValue(pick(entries, ["order id", "order number", "sales record number", "订单号", "订单编号"]));
  const externalLineItemId = textValue(pick(entries, ["line item id", "transaction id", "成交编号", "明细编号"]));
  const externalItemId = textValue(pick(entries, ["item id", "item number", "商品编号", "拍品编号"]));
  const buyingOption = textValue(pick(entries, ["sale type", "sold format", "buying option", "交易类型", "成交方式"])).toLowerCase();
  const saleType = buyingOption.includes("auction") || buyingOption.includes("竞拍") || buyingOption.includes("拍卖")
    ? "auction"
    : buyingOption.includes("offer") || buyingOption.includes("议价") || buyingOption.includes("报价")
    ? "accepted_offer"
    : buyingOption ? "fixed_price" : "unknown";
  const fingerprint = textValue(pick(entries, ["source fingerprint"])) || [externalOrderId, externalLineItemId, externalItemId, soldAt, price, title, index].join("|");
  return {
    user_id: userId,
    provider,
    record_scope: "market_comp",
    source_record_type: provider === "ebay" ? "marketplace_insights_api" : provider === "cardhobby" ? "partner_api" : "licensed_api",
    verification_status: "provider_verified",
    external_order_id: externalOrderId,
    external_line_item_id: externalLineItemId,
    external_item_id: externalItemId,
    title,
    year: textValue(pick(entries, ["year", "season", "年份", "赛季"])),
    brand: textValue(pick(entries, ["brand", "manufacturer", "品牌", "厂商"])),
    set_name: textValue(pick(entries, ["set", "set name", "系列", "卡组"])),
    player: textValue(pick(entries, ["player", "subject", "球员", "人物"])),
    card_type: textValue(pick(entries, ["card type", "type", "类型"])),
    parallel: textValue(pick(entries, ["parallel", "variation", "平行", "版本"])),
    card_number: textValue(pick(entries, ["card number", "number", "卡号", "编号"])),
    grade: textValue(pick(entries, ["grade", "评级"])),
    certification: textValue(pick(entries, ["certification", "cert number", "证书编号"])),
    sale_type: saleType,
    transaction_status: "completed",
    sold_at: soldAt || new Date().toISOString(),
    sale_price: price,
    shipping_price: numberValue(pick(entries, ["shipping", "shipping price", "运费"])),
    currency: currencyValue(priceRaw, provider === "cardhobby" ? "CNY" : "USD"),
    quantity: Math.max(1, Math.trunc(numberValue(pick(entries, ["quantity", "qty", "数量"])) || 1)),
    source_url: textValue(pick(entries, ["item url", "source url", "url", "链接"])),
    source_fingerprint: fingerprint,
    import_metadata: { marketplace_id: textValue(pick(entries, ["marketplace id", "marketplace"])) },
    updated_at: new Date().toISOString(),
  };
}

async function ebaySoldSearch(query: string, limit: number, userId: string) {
  if (env("EBAY_MARKETPLACE_INSIGHTS_ENABLED").toLowerCase() !== "true") {
    throw new Error("eBay Marketplace Insights is restricted and this application has not been marked as approved.");
  }
  const token = await getEbayToken();
  const url = new URL("https://api.ebay.com/buy/marketplace_insights/v1_beta/item_sales/search");
  url.searchParams.set("q", query);
  url.searchParams.set("limit", String(Math.min(Math.max(limit, 1), 50)));
  if (env("EBAY_SPORTS_CARD_CATEGORY_IDS")) url.searchParams.set("category_ids", env("EBAY_SPORTS_CARD_CATEGORY_IDS"));
  const response = await fetch(url, { headers: { Authorization: `Bearer ${token}`, "X-EBAY-C-MARKETPLACE-ID": env("EBAY_MARKETPLACE_ID") || "EBAY_US" } });
  const body = await response.json();
  if (!response.ok) throw new Error(body.errors?.[0]?.message || "eBay sold-comps search is not available for this application.");
  return (body.itemSales || []).map((item: JsonObject, index: number) => normalizeSoldRecord("ebay", {
    ...item,
    "source fingerprint": `market:${textValue(item.itemId)}:${textValue(item.lastSoldDate)}:${numberValue(item.lastSoldPrice)}`,
  }, userId, index)).filter((record: JsonObject) => numberValue(record.sale_price) > 0 && textValue(record.title));
}

async function cardHobbySoldSearch(query: string, limit: number, userId: string) {
  const endpoint = env("CARDHOBBY_SALES_API_URL");
  const token = env("CARDHOBBY_API_TOKEN");
  if (!endpoint || !token) throw new Error("No approved CardHobby sales API is configured. Import a CardHobby CSV/JSON export instead.");
  const url = new URL(endpoint);
  url.searchParams.set("q", query);
  url.searchParams.set("limit", String(Math.min(Math.max(limit, 1), 50)));
  const response = await fetch(url, { headers: { Authorization: `Bearer ${token}`, Accept: "application/json" } });
  const body = await response.json();
  if (!response.ok) throw new Error(body.message || "CardHobby partner sales search failed.");
  const rows = Array.isArray(body) ? body : body.sales || body.items || body.results || [];
  return rows.map((row: JsonObject, index: number) => normalizeSoldRecord("cardhobby", row, userId, index))
    .filter((record: JsonObject) => numberValue(record.sale_price) > 0 && textValue(record.title));
}

async function licensedTrendSearch(provider: "cardladder" | "market_movers", query: string, limit: number, userId: string) {
  const prefix = provider === "cardladder" ? "CARDLADDER" : "MARKET_MOVERS";
  const endpoint = env(`${prefix}_TREND_API_URL`);
  const token = env(`${prefix}_API_TOKEN`);
  const label = provider === "cardladder" ? "Card Ladder" : "Market Movers";
  if (!endpoint || !token) {
    throw new Error(`${label} does not publish an unrestricted scraping API. Configure a licensed ${label} endpoint or import an export file.`);
  }
  const target = endpoint.includes("{query}")
    ? endpoint.replace("{query}", encodeURIComponent(query))
    : endpoint;
  const url = new URL(target);
  if (!endpoint.includes("{query}")) url.searchParams.set("q", query);
  url.searchParams.set("limit", String(Math.min(Math.max(limit, 1), 100)));
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json", "User-Agent": "CardLedger/1.0 licensed-data-connector" },
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(textValue((body as JsonObject).message) || `${label} licensed trend request failed.`);
  const payload = body as JsonObject;
  const rows = Array.isArray(body) ? body : ([payload.sales, payload.items, payload.results, payload.data].find(Array.isArray) || []) as JsonObject[];
  return rows
    .map((row: JsonObject, index: number) => ({
      ...normalizeSoldRecord(provider, row, userId, index),
      source_fingerprint: textValue(pick(deepValues(row), ["source fingerprint", "sale id", "transaction id", "id"]))
        || `${provider}:${query}:${index}:${textValue(pick(deepValues(row), ["sold date", "sale date", "date"]))}:${numberValue(pick(deepValues(row), ["sold for", "sale price", "price", "amount"]))}`,
      import_metadata: { licensed_source: label, query, connector: "server_side" },
    }))
    .filter((record: JsonObject) => numberValue(record.sale_price) > 0 && textValue(record.title));
}

async function startEbayOAuth(service: ReturnType<typeof createClient>, userId: string, returnUrl: string) {
  const clientID = env("EBAY_CLIENT_ID");
  const ruName = env("EBAY_RUNAME");
  if (!clientID || !env("EBAY_CLIENT_SECRET") || !ruName) throw new Error("eBay OAuth needs EBAY_CLIENT_ID, EBAY_CLIENT_SECRET, and EBAY_RUNAME.");
  await encryptionKey();
  const state = bytesToBase64(crypto.getRandomValues(new Uint8Array(32))).replace(/[+/=]/g, "");
  const stateHash = await sha256(state);
  const safe = safeReturnUrl(returnUrl);
  const { error } = await service.from("marketplace_oauth_states").insert({
    state_hash: stateHash,
    user_id: userId,
    provider: "ebay",
    return_url: safe,
    expires_at: new Date(Date.now() + 10 * 60_000).toISOString(),
  });
  if (error) throw error;
  const authorize = new URL("https://auth.ebay.com/oauth2/authorize");
  authorize.searchParams.set("client_id", clientID);
  authorize.searchParams.set("redirect_uri", ruName);
  authorize.searchParams.set("response_type", "code");
  authorize.searchParams.set("scope", ebayUserScopes().join(" "));
  authorize.searchParams.set("state", state);
  return authorize.href;
}

async function handleEbayOAuthCallback(url: URL, service: ReturnType<typeof createClient>) {
  const state = textValue(url.searchParams.get("state"));
  const code = textValue(url.searchParams.get("code"));
  if (!state || !code) return oauthResult("", "error", "eBay did not return an authorization code.");
  const stateHash = await sha256(state);
  const { data: oauthState, error: stateError } = await service.from("marketplace_oauth_states")
    .select("state_hash,user_id,return_url,expires_at,consumed_at")
    .eq("state_hash", stateHash)
    .eq("provider", "ebay")
    .maybeSingle();
  if (stateError || !oauthState || oauthState.consumed_at || new Date(oauthState.expires_at).getTime() < Date.now()) {
    return oauthResult(oauthState?.return_url || "", "error", "This eBay connection request is invalid or has expired.");
  }
  const response = await fetch("https://api.ebay.com/identity/v1/oauth2/token", {
    method: "POST",
    headers: { Authorization: `Basic ${btoa(`${env("EBAY_CLIENT_ID")}:${env("EBAY_CLIENT_SECRET")}`)}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "authorization_code", code, redirect_uri: env("EBAY_RUNAME") }),
  });
  const body = await response.json();
  if (!response.ok || !body.access_token || !body.refresh_token) {
    return oauthResult(oauthState.return_url, "error", body.error_description || body.error || "eBay token exchange failed.");
  }
  const now = new Date().toISOString();
  const { error: tokenError } = await service.from("marketplace_oauth_tokens").upsert({
    user_id: oauthState.user_id,
    provider: "ebay",
    access_token_ciphertext: await encryptToken(body.access_token),
    refresh_token_ciphertext: await encryptToken(body.refresh_token),
    access_expires_at: new Date(Date.now() + Number(body.expires_in || 7200) * 1000).toISOString(),
    refresh_expires_at: body.refresh_token_expires_in ? new Date(Date.now() + Number(body.refresh_token_expires_in) * 1000).toISOString() : null,
    scopes: ebayUserScopes(),
    external_account_label: "eBay seller",
    updated_at: now,
  }, { onConflict: "user_id,provider" });
  if (tokenError) return oauthResult(oauthState.return_url, "error", tokenError.message);
  await Promise.all([
    service.from("marketplace_oauth_states").update({ consumed_at: now }).eq("state_hash", stateHash),
    service.from("marketplace_connections").upsert({
      user_id: oauthState.user_id,
      provider: "ebay",
      status: "connected",
      external_account_label: "eBay seller",
      capabilities: ["active_listing_search", "seller_completed_order_sync"],
      last_checked_at: now,
      last_error: "",
      updated_at: now,
    }, { onConflict: "user_id,provider" }),
  ]);
  return oauthResult(oauthState.return_url, "connected", "eBay seller sales are connected to Card Ledger.");
}

async function ebayUserToken(service: ReturnType<typeof createClient>, userId: string) {
  const { data: stored, error } = await service.from("marketplace_oauth_tokens").select("*").eq("user_id", userId).eq("provider", "ebay").maybeSingle();
  if (error) throw error;
  if (!stored) throw new Error("Connect your eBay seller account first.");
  if (new Date(stored.access_expires_at).getTime() > Date.now() + 60_000) return decryptToken(stored.access_token_ciphertext);
  const refreshToken = await decryptToken(stored.refresh_token_ciphertext);
  const response = await fetch("https://api.ebay.com/identity/v1/oauth2/token", {
    method: "POST",
    headers: { Authorization: `Basic ${btoa(`${env("EBAY_CLIENT_ID")}:${env("EBAY_CLIENT_SECRET")}`)}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: refreshToken, scope: (stored.scopes || ebayUserScopes()).join(" ") }),
  });
  const body = await response.json();
  if (!response.ok || !body.access_token) throw new Error(body.error_description || body.error || "eBay token refresh failed. Reconnect the account.");
  await service.from("marketplace_oauth_tokens").update({
    access_token_ciphertext: await encryptToken(body.access_token),
    access_expires_at: new Date(Date.now() + Number(body.expires_in || 7200) * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  }).eq("user_id", userId).eq("provider", "ebay");
  return body.access_token;
}

async function syncEbaySellerSales(service: ReturnType<typeof createClient>, userId: string, requestedDays: number) {
  const token = await ebayUserToken(service, userId);
  const days = Math.min(Math.max(Math.trunc(requestedDays || 90), 1), 90);
  const start = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
  const end = new Date().toISOString();
  const records: JsonObject[] = [];
  let offset = 0;
  for (let page = 0; page < 20; page += 1) {
    const url = new URL("https://api.ebay.com/sell/fulfillment/v1/order");
    url.searchParams.set("filter", `creationdate:[${start}..${end}]`);
    url.searchParams.set("limit", "50");
    url.searchParams.set("offset", String(offset));
    const response = await fetch(url, { headers: { Authorization: `Bearer ${token}`, Accept: "application/json" } });
    const body = await response.json();
    if (!response.ok) throw new Error(body.errors?.[0]?.message || "eBay completed-order sync failed.");
    const orders = Array.isArray(body.orders) ? body.orders : [];
    for (const order of orders) {
      const cancelled = textValue(order.cancelStatus?.cancelState).toUpperCase().includes("CANCEL");
      for (const line of order.lineItems || []) {
        const refunded = (Array.isArray(line.refunds) && line.refunds.length > 0)
          || (Array.isArray(order.paymentSummary?.refunds) && order.paymentSummary.refunds.length > 0);
        const priceObject = line.discountedLineItemCost || line.lineItemCost || line.total || order.pricingSummary?.priceSubtotal || order.pricingSummary?.total;
        const title = textValue(line.title);
        const lineItemId = textValue(line.lineItemId);
        const itemId = textValue(line.legacyItemId);
        records.push({
          user_id: userId,
          provider: "ebay",
          record_scope: "personal_sale",
          source_record_type: "seller_order_api",
          verification_status: "provider_verified",
          external_order_id: textValue(order.orderId),
          external_line_item_id: lineItemId,
          external_item_id: itemId,
          title,
          sale_type: textValue(line.soldFormat).toUpperCase().includes("AUCTION") ? "auction" : "fixed_price",
          transaction_status: cancelled ? "cancelled" : refunded ? "refunded" : "completed",
          sold_at: order.creationDate || order.lastModifiedDate || end,
          sale_price: numberValue(priceObject),
          shipping_price: numberValue(line.deliveryCost?.shippingCost),
          currency: currencyValue(priceObject, "USD"),
          quantity: Math.max(1, Math.trunc(numberValue(line.quantity) || 1)),
          source_url: itemId ? `https://www.ebay.com/itm/${encodeURIComponent(itemId)}` : "",
          source_fingerprint: `seller:${textValue(order.orderId)}:${lineItemId || itemId}`,
          import_metadata: {
            marketplace_id: textValue(line.listingMarketplaceId || line.purchaseMarketplaceId),
            payment_status: textValue(order.orderPaymentStatus),
            fulfillment_status: textValue(order.orderFulfillmentStatus),
          },
          updated_at: new Date().toISOString(),
        });
      }
    }
    offset += orders.length;
    if (!orders.length || offset >= Number(body.total || offset) || !body.next) break;
  }
  const valid = records.filter((record) => textValue(record.title) && numberValue(record.sale_price) >= 0);
  if (valid.length) {
    const { error } = await service.from("marketplace_sales_records").upsert(valid, { onConflict: "user_id,provider,source_fingerprint" });
    if (error) throw error;
  }
  const now = new Date().toISOString();
  await service.from("marketplace_connections").update({ last_checked_at: now, last_error: "", updated_at: now }).eq("user_id", userId).eq("provider", "ebay");
  return valid;
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  const supabaseURL = env("SUPABASE_URL");
  const anonKey = env("SUPABASE_ANON_KEY");
  const serviceKey = env("SUPABASE_SERVICE_ROLE_KEY");
  const service = createClient(supabaseURL, serviceKey);
  const url = new URL(request.url);
  const queryAction = textValue(url.searchParams.get("action"));
  try {
    if (request.method === "GET" && queryAction === "ebay-oauth-callback") return await handleEbayOAuthCallback(url, service);
    const authorization = request.headers.get("Authorization") || "";
    const userClient = createClient(supabaseURL, anonKey, { global: { headers: { Authorization: authorization } } });
    const { data: { user } } = await userClient.auth.getUser();
    if (!user) return json({ error: "Authentication required." }, 401);
    const input = (request.method === "GET" ? Object.fromEntries(url.searchParams) : await request.json().catch(() => ({}))) as JsonObject;
    const action = textValue(input.action);
    const query = textValue(input.query || input.q);
    const limit = numberValue(input.limit) || 12;

    if (action === "provider-status") {
      const { data: ebayConnection } = await service.from("marketplace_oauth_tokens").select("updated_at").eq("user_id", user.id).eq("provider", "ebay").maybeSingle();
      return json({
        ebay: {
          configured: Boolean(env("EBAY_CLIENT_ID") && env("EBAY_CLIENT_SECRET")),
          oauthConfigured: Boolean(env("EBAY_RUNAME") && env("MARKETPLACE_TOKEN_ENCRYPTION_KEY")),
          connected: Boolean(ebayConnection),
          marketSoldCompsApproved: env("EBAY_MARKETPLACE_INSIGHTS_ENABLED").toLowerCase() === "true",
          capabilities: ["active_listing_search", "seller_completed_order_sync", "restricted_marketplace_sold_comps"],
        },
        cardhobby: {
          configured: Boolean(env("CARDHOBBY_API_BASE") && env("CARDHOBBY_API_TOKEN")),
          salesConfigured: Boolean(env("CARDHOBBY_SALES_API_URL") && env("CARDHOBBY_API_TOKEN")),
          connected: false,
          capabilities: ["approved_partner_adapter", "csv_json_sales_import"],
        },
        cardladder: {
          configured: Boolean(env("CARDLADDER_TREND_API_URL") && env("CARDLADDER_API_TOKEN")),
          connected: false,
          capabilities: ["licensed_sales_history_adapter", "csv_json_sales_import"],
        },
        marketMovers: {
          configured: Boolean(env("MARKET_MOVERS_TREND_API_URL") && env("MARKET_MOVERS_API_TOKEN")),
          connected: false,
          capabilities: ["licensed_sales_history_adapter", "csv_json_sales_import"],
        },
        psa: { configured: Boolean(env("PSA_API_TOKEN")), capability: "cert_verification_and_population_cache" },
      });
    }
    if (action === "ebay-oauth-start") return json({ authorizeUrl: await startEbayOAuth(service, user.id, textValue(input.returnUrl)) });
    if (action === "ebay-sync-sales") return json({ records: await syncEbaySellerSales(service, user.id, numberValue(input.days) || 90), recordType: "seller_completed_orders" });
    if (action === "provider-disconnect") {
      const provider = textValue(input.provider);
      if (provider === "ebay") await service.from("marketplace_oauth_tokens").delete().eq("user_id", user.id).eq("provider", "ebay");
      await service.from("marketplace_connections").delete().eq("user_id", user.id).eq("provider", provider);
      return json({ disconnected: provider });
    }
    if (action === "ebay-search") return json({ items: await ebaySearch(query, limit), listingType: "active_listings" });
    if (action === "cardhobby-search") return json({ items: await cardHobbySearch(query, limit), listingType: "active_listings" });
    if (action === "ebay-sold-search") {
      const records = await ebaySoldSearch(query, limit, user.id);
      if (records.length) {
        const { error } = await service.from("marketplace_sales_records").upsert(records, { onConflict: "user_id,provider,source_fingerprint" });
        if (error) throw error;
      }
      return json({ records, recordType: "marketplace_sold_comps" });
    }
    if (action === "cardhobby-sold-search") {
      const records = await cardHobbySoldSearch(query, limit, user.id);
      if (records.length) {
        const { error } = await service.from("marketplace_sales_records").upsert(records, { onConflict: "user_id,provider,source_fingerprint" });
        if (error) throw error;
      }
      return json({ records, recordType: "marketplace_sold_comps" });
    }
    if (action === "cardladder-sold-search" || action === "market_movers-sold-search") {
      const provider = action === "cardladder-sold-search" ? "cardladder" : "market_movers";
      const records = await licensedTrendSearch(provider, query, limit, user.id);
      if (records.length) {
        const { error } = await service.from("marketplace_sales_records").upsert(records, { onConflict: "user_id,provider,source_fingerprint" });
        if (error) throw error;
      }
      return json({ records, recordType: "licensed_sales_history", provider });
    }
    if (action === "psa-search") {
      const { data, error } = await userClient.rpc("search_psa_population", { search_text: query, result_limit: limit });
      if (error) throw error;
      return json({ records: data || [] });
    }
    if (action === "psa-cert") {
      const certNumber = textValue(input.certNumber || input.cert_number).replace(/\D/g, "");
      if (certNumber.length < 7) return json({ error: "Enter a valid PSA certification number." }, 400);
      const psaToken = env("PSA_API_TOKEN");
      if (!psaToken) return json({ error: "PSA_API_TOKEN is not configured." }, 503);
      const payload = await psaApiGet(`cert/GetByCertNumber/${encodeURIComponent(certNumber)}`, psaToken);
      const specId = numberValue(pick(deepValues(payload), ["specid", "spec id"]));
      let populationPayload: JsonObject = {};
      let populationWarning = "";
      if (specId > 0) {
        try {
          populationPayload = await psaApiGet(`pop/GetPSASpecPopulation/${specId}`, psaToken);
        } catch (error) {
          populationWarning = error instanceof Error ? error.message : String(error);
        }
      }
      const record = psaRecord(payload, certNumber, populationPayload);
      if (!record.identity_key.replace(/\|/g, "") || !record.grade) return json({ error: "PSA returned a cert record without enough population identity data.", raw: payload }, 422);
      const { data, error } = await service.from("psa_population_records").upsert(record, { onConflict: "identity_key,grade" }).select().single();
      if (error) throw error;
      return json({ record: data, populationWarning });
    }
    return json({ error: "Unknown market-data action." }, 400);
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : String(error) }, 500);
  }
});
