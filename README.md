# Wholegacy Rate Card v17.2

Major template correction based on the supplied 10-design HTML reference.

- 10 genuinely distinct rate-card layouts, not one shared layout with cosmetic skins.
- Theme-aware palettes remain compatible with the v17 database fields.
- CMS Design live preview now uses a real virtual browser viewport: Desktop 1440×810 (16:9) and Mobile 390×693 (9:16). The iframe viewport stays fixed and is only visually scaled to fit the CMS panel, so responsive breakpoints are genuine.
- Average Views styling from v17.1 is retained.
- No new Neon migration is required beyond neon-v17-migration.sql.

## v17.3 patch
- Removed decorative middle dots from the CMS sidebar step labels.
- Added Copy action for Creator link on Overview.
- Fixed Print / Download and Save & Publish so a browser tab is opened synchronously before async saves, avoiding popup blocking. Save & Publish now persists the latest design/palette, publishes it, and loads the public creator URL in the opened tab.
- Removed visible `WHOLEGACY CREATOR` labels from all rate-card templates.
- Improved contact contrast, especially Pastel Lookbook email/WhatsApp panels.
- Made social/rate/contact/list panels content-driven instead of forcing oversized minimum heights.
- Refined product character limits: Bio 420, Content Style 100, Content Type 70, Rate Description 200, Collaboration Experience 320/item, Terms 420/item. API limits match the CMS.
- Added final mobile CMS dark-theme overrides so sticky navigation, controls, palettes, preview panel, fields, and action areas remain visually consistent.
- No new Neon migration is required.
