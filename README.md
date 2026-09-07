# Wholegacy Ratecard v5

GitHub → Vercel → Neon starter for ratecard.wholegacy.com.

## v5 changes
- Fixed avatar/cover upload flow with explicit Vercel Blob token diagnostics and automatic profile save after upload.
- Replaced embedded live preview with `/preview`, using the exact same renderer as the published creator page.
- Editorial Beige is now multi-social. It no longer labels the creator as TikTok-only; each social account has its own logo, handle, followers, engagement rate, average-view range and content style.
- Fixed Add buttons so their text remains visible.
- Added Indonesian / English CMS and output-language option.
- Improved desktop and mobile responsive layouts.

## Required Vercel environment variables
- DATABASE_URL
- AUTH_SECRET
- NEXT_PUBLIC_SITE_URL=https://ratecard.wholegacy.com
- BLOB_READ_WRITE_TOKEN

## Database upgrade
Run `neon-v5-migration.sql` once in Neon SQL Editor before deploying v5.

## Upload note
If image upload says `BLOB_READ_WRITE_TOKEN belum tersedia`, connect a Vercel Blob store to this exact project, make sure the token exists in Production, then redeploy.
