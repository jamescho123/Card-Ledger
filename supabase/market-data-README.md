# Card Ledger marketplace sales and PSA data

## What works

- eBay active listings and images through the Browse API. These remain clearly labelled as asking prices, never sales.
- The signed-in seller's completed eBay orders through OAuth and the Fulfillment API.
- eBay Seller Hub CSV and CardHobby CSV/JSON sales exports through the website importer.
- Market-wide eBay sold comparisons only when eBay has approved Marketplace Insights access.
- CardHobby live sales only when CardHobby supplies an approved partner endpoint. The app does not scrape the site.
- Card Ladder and Market Movers trend history through licensed partner endpoints or user-owned CSV/JSON exports. Their sites are not scraped.
- PSA cert verification and per-grade population through the official PSA cert and `GetPSASpecPopulation` API methods. The shared Supabase cache prevents repeated lookups.

The sales schema deliberately excludes buyer names, usernames, email addresses, shipping addresses, and payment details.

## Database setup

Apply these files in order in the Supabase SQL editor:

1. `card-ledger-market-population.sql`
2. `card-ledger-marketplace-sales.sql`

The marketplace migration enables RLS, grants each authenticated user access only to their own sales records, and keeps encrypted OAuth tokens service-role-only. It also includes explicit Data API grants for current Supabase projects where new tables are not exposed automatically.

## eBay setup

1. Create production keys in the eBay Developers Program.
2. Create an OAuth redirect URL and copy its RuName to `EBAY_RUNAME`.
3. Set the eBay accepted redirect URL to:

   `https://wmvffpuxrdbsexryazxu.supabase.co/functions/v1/market-data?action=ebay-oauth-callback`

4. Generate a private encryption secret of at least 32 characters for `MARKETPLACE_TOKEN_ENCRYPTION_KEY`.
5. Set `APP_BASE_URL` to the hosted Card Ledger page. Add every permitted local or hosted origin to `APP_ALLOWED_ORIGINS`.
6. Leave `EBAY_MARKETPLACE_INSIGHTS_ENABLED=false` unless eBay explicitly approves sold-comps API access.

The seller must approve the OAuth consent screen. Card Ledger cannot silently obtain a user token.

## Deploy

Set the secrets listed in `functions/market-data/.env.example`, then deploy the Edge Function. `supabase/config.toml` sets `verify_jwt = false` only so eBay can reach the OAuth callback; the function manually validates the Supabase user for every other action.

```bash
supabase secrets set --env-file supabase/functions/market-data/.env
supabase functions deploy market-data
```

## Export fallback

eBay sellers can download an orders report from Seller Hub Reports and import its CSV in **Imports > Verified Sales Records**. CardHobby CSV or JSON exports use the same importer. Choose whether the file contains your own completed sales or market comparison records, preview validation errors, then import.

CardHobby has no documented public developer API at the time of implementation. Live CardHobby sync therefore remains an adapter hook through `CARDHOBBY_SALES_API_URL`; file import works without it.

Card Ladder and Market Movers both prohibit automated harvesting in their published terms. Configure `CARDLADDER_TREND_API_URL` and `CARDLADDER_API_TOKEN`, or `MARKET_MOVERS_TREND_API_URL` and `MARKET_MOVERS_API_TOKEN`, only after obtaining written/licensed access. Their normalized exports work immediately through the same importer. The Values review queue then attaches exact matching sales to each card and shows source, recency, and confidence.

PSA bulk population pages should not be bypassed. When a card has a certification number, Card Ledger fetches its official cert, reads the returned `SpecID`, then requests the current PSA population breakdown for that exact specification. Cards without a cert search the shared cache by year, set, subject, number, variety, and grade. Reviewed admin imports remain available for permitted source files.
