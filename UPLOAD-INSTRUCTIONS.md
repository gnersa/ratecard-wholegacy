# Upload v5 to GitHub

1. Run `neon-v5-migration.sql` once in Neon SQL Editor.
2. Confirm `BLOB_READ_WRITE_TOKEN` exists in Vercel Production environment.
3. Replace the repository contents with the contents of this folder. Do not upload the parent folder itself.
4. Commit to `main` and let Vercel deploy automatically.
5. Test `/dashboard`, image upload, `/preview`, then Publish and compare `/username`.
