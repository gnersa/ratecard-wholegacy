# Wholegacy Ratecard v10 upload

1. Replace the existing GitHub repository files with the contents of this folder.
2. Keep existing Vercel environment variables and Neon schema. No database migration is required for v10.
3. Commit to `main`; Vercel will deploy automatically.
4. Test `/preview`, a published `/<username>` page, the Print / Download PDF button, and the DANA support link.

## PDF behavior
The Print / Download PDF button opens the browser print dialog. Users can print normally or choose **Save as PDF**. Print CSS hides the web-only toolbar/footer and keeps the selected rate-card design.
