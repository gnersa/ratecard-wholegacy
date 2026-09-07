# Wholegacy Ratecard v12

Changes: persistent image upload fallback via Neon when Vercel Blob is not connected, Maira demo images, responsive CMS mobile command bar, refined template typography and spacing, public creator footer removed, and updated DANA support copy.

## Important migration
Run `neon-v12-migration.sql` once in Neon SQL Editor. Vercel Blob remains preferred when connected; the Neon `media_assets` table is a fallback so avatar/cover uploads still work without `BLOB_READ_WRITE_TOKEN`.

## Deployment
Replace the repository contents with this version, commit to `main`, and let Vercel redeploy.


## v12 hotfix
- Fixed TypeScript build error in `src/app/api/media/[id]/route.ts` by returning an exact `ArrayBuffer` body from the Neon media fallback route.


## v12 updates
- Mobile-first CMS navigation and sticky command bar.
- Auto-save before switching CMS sections, preview, and publish.
- Prev/Next wizard navigation replaces per-panel Save buttons.
- Contact cards render Email and WhatsApp side-by-side.
- Social media metric cards use a 3-column Followers / Engagement / Average Views row with Content Style below.
- Social, email, and WhatsApp icons use white glyphs on dark icon tiles.
- Public creator URL appears at the bottom-right of every preview/published template.
- Responsive spacing and typography refined for mobile and desktop.

No Neon migration is required for v12.
