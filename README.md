# Wholegacy Ratecard v11

Changes: persistent image upload fallback via Neon when Vercel Blob is not connected, Maira demo images, responsive CMS mobile command bar, refined template typography and spacing, public creator footer removed, and updated DANA support copy.

## Important migration
Run `neon-v11-migration.sql` once in Neon SQL Editor. Vercel Blob remains preferred when connected; the Neon `media_assets` table is a fallback so avatar/cover uploads still work without `BLOB_READ_WRITE_TOKEN`.

## Deployment
Replace the repository contents with this version, commit to `main`, and let Vercel redeploy.
