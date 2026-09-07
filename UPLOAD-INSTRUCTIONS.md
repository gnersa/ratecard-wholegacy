# v4.1 Upload Notes

1. Replace the existing repository files with the contents of this folder.
2. In GitHub, delete any stale duplicate TypeScript files whose names contain parentheses, for example `page (15).tsx`, `page (2).tsx`, `DashboardClient (1).tsx`.
3. Ensure these files exist exactly with these names:
   - `src/components/DashboardClient.tsx`
   - `src/components/ratecard-templates.tsx`
   - `src/app/dashboard/page.tsx`
   - `src/app/[username]/page.tsx`
4. Commit to `main`. Vercel will redeploy automatically.
5. No new Neon migration is required if v4 migration was already run.
