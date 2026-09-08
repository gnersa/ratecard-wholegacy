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

## v17.4 corrections

- Removes the CMS `Unsaved changes` status badge/text from the editor header while keeping local draft behavior internally.
- Removes the duplicate Language selector from Design. The global top-right language selector remains authoritative.
- Renames `Pengalaman Kolaborasi / Collaboration Experience` to `Kemitraan / Partnerships` across CMS and public templates.
- Simplifies social Average Views into one `Views` field. Public templates render it approximately, e.g. `±2 rb` / `±2K` or `±150`.
- About Accounts social editor is a strict 2 × 3 grid: Platform/Handle, Followers/Engagement, Views/Content Style.
- Normalizes text/select/number field heights and alignment across CMS rate/account grids.
- Print / Download prints the current live draft directly from the desktop preview and applies dynamic A4 portrait fitting.
- Save & Publish saves all sections including the latest theme + palette, publishes, then opens the creator URL in a browser tab.
- Adds stronger final mobile CMS dark-surface overrides.
- No new Neon migration is required after v17 migration.

## v17.5.1
- Save & Publish now stays inside the CMS while data is saved.
- Uses visible step-by-step progress instead of opening a temporary publishing tab.
- Public rate card opens only after profile, design, socials, rates, partnerships, terms, and publish all succeed.
- API errors are shown inside the CMS modal so failed publishes no longer disappear silently.
- If a browser blocks the final automatic new tab, the success state provides an explicit Open Rate Card button.
- No new Neon migration required.
