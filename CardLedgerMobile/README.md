# 卡藏 for iPhone

Native SwiftUI companion app for Card Ledger / 卡藏账本, redesigned from the July 2026 Stitch mobile screens.

## Included

- Chinese-first landing, email signup, login, and Keychain session persistence
- Supabase profile sync and collector account settings
- Five-tab mobile navigation: 资产、收藏、添加、目标、账户
- Offline-bundled Stitch artwork for the landing, card displays, goals, account, and community
- Display cabinet / storage box collection browser
- Three-step card entry: photo, closest match, confirm details
- Separate Year, Brand, Set, Player, Type, Parallel, and Number fields
- Goal checklists and a separate watchlist surface
- AI trade workspace with market-data placeholders instead of invented valuations
- Community feed, collector profile, badges, privacy, and marketplace connection states

## Run in Xcode

1. Open `CardLedger.xcodeproj`.
2. Select an iPhone simulator.
3. Press Run.

The project targets iOS 17 and later. Normal launches use Supabase authentication. Debug simulator verification can launch with `-CardLedgerDemo` and optionally `-CardLedgerTab collection|add|goals|account`.
