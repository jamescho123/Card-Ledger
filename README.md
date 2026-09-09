# Card Ledger

Card Ledger is a bilingual sports-card collection platform with portfolio management, collection goals, trading tools, condition checks, community features, DIY cards, and an iPhone companion app.

## Web app

The web app is a static application in `outputs/`.

```bash
npm run dev
```

Then open <http://127.0.0.1:4180/>.

## iPhone app

Open `CardLedgerMobile/CardLedger.xcodeproj` in Xcode, select an iPhone simulator, and run the `CardLedger` scheme. See `CardLedgerMobile/README.md` for configuration details.

## Supabase

Database migrations and setup notes live in `supabase/`. Apply the SQL files to the configured Supabase project before enabling cloud-backed account, collection, trade, marketplace, subscription, and population features.

Secrets and private keys must be supplied through local environment configuration and must not be committed. Supabase publishable client configuration may be embedded in a client application, but service-role credentials must remain server-side.
