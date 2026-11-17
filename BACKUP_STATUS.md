# Source Backup and Deployment Status

Updated November 18, 2026.

All seven previously pending iCloud-placeholder source files have been recovered and included in Git, including outputs/library.js and outputs/subset-selectors.js. The source backup is no longer blocked on these files. Existing mobile source and previously tracked files remain in the release history.

This is an application-source backup, not a backup of private datasets or personal account data.

## Private Data Exclusions

HCI export archives, extracted metadata and images, generated HCI selection data, local databases, learned examples, private download links and manifests, personal collection imports, screenshots and evaluation outputs remain excluded. Do not delete these original local files on the assumption that GitHub contains them.

## Website Build

`node scripts/build-vercel.mjs` produces the static site in dist/. It excludes private artifacts and replaces the private HCI dropdown catalog with an empty public fallback. The ordinary set catalog remains available; local source can still use the generated HCI selection catalog on the operator's computer.

The HCI API/image matcher at 127.0.0.1:8765 is not deployed by this build. Remote visitors need a separately hosted backend for those features. Existing Supabase services remain external and are not migrated by this deployment.

Verification: tests/vercel-build.cjs checks artifact exclusions, script loading, empty guest state, desktop/mobile workspace layout, the Chinese redirect, resource responses and browser exceptions. It does not claim live verification of payments, OAuth, private account data or the local HCI backend.
