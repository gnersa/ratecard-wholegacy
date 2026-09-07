# Wholegacy Ratecard

Starter Next.js project for **ratecard.wholegacy.com**, a creator media kit, portfolio, and social media rate-card platform.

## Included in this starter

- Responsive dark landing page
- `/login` UI
- `/register` UI
- `/dashboard` starter CMS UI
- Dynamic creator route: `/[username]`
- Example creator page: `/maira`
- Dynamic creator metadata/title/description
- Canonical URL support
- Ready for GitHub + Vercel deployment

> Authentication, database, uploads, Google login, and email verification are intentionally not connected yet. The recommended next phase is Supabase/PostgreSQL + Supabase Auth or Auth.js.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Environment

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

For production:

```env
NEXT_PUBLIC_SITE_URL=https://ratecard.wholegacy.com
```

## Push to GitHub

Create an empty GitHub repository named `ratecard-wholegacy`, then run:

```bash
git init
git add .
git commit -m "Initial Wholegacy Ratecard starter"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ratecard-wholegacy.git
git push -u origin main
```

## Deploy to Vercel

1. Sign in to Vercel.
2. Add New → Project.
3. Import `ratecard-wholegacy` from GitHub.
4. Vercel should detect Next.js automatically.
5. Add environment variable `NEXT_PUBLIC_SITE_URL=https://ratecard.wholegacy.com`.
6. Deploy.
7. In Project → Settings → Domains, add `ratecard.wholegacy.com`.
8. Add the DNS record shown by Vercel to Hostinger DNS Zone Editor.

## Recommended next development phase

1. PostgreSQL/Supabase database
2. Email/password auth
3. Google login
4. Email verification
5. Reserved + unique usernames
6. Creator profile editor
7. Social account editor
8. Rate-card CRUD
9. Portfolio upload/storage
10. Publish/unpublish controls
11. Dynamic sitemap and structured data
12. Analytics and brand inquiry
