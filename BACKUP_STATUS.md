# Source Backup - November 10, 2026

This branch is a PARTIAL source backup, not a deployable release and not a replacement for the original local working directory.

The current readable web source changes, new catalog and local scanner code, and available tests were copied onto the existing GitHub release history. The existing mobile source and other tracked files remain from that release; the original working tree reported no modifications to them.

## Pending Source Files

These files were iCloud placeholders and could not be read during backup. They must be downloaded locally and backed up before removing any original working files or Git history:

- outputs/library.js
- outputs/subset-selectors.js
- tests/scan-description-search.cjs
- tests/brand-coverage.cjs
- tests/split-card-rotation.cjs
- tests/hci-card-identification.cjs
- hci-basketball-20260919/validate_export.py

The updated HTML references some pending scripts. Do not deploy this branch as-is.

## Intentionally Excluded

Private HCI export archives, extracted metadata and images, generated HCI selection data, local databases, learned scan examples, private download links and manifests, personal collection import files, local verification outputs and screenshots, and machine-specific historical download scripts are not uploaded. The generated selection catalog can be rebuilt locally with the included builder and private dataset.

These exclusions are not instructions to delete the excluded files. The original dataset packages must remain intact. No local data was deleted by this backup.
