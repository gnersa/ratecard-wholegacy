# Wholegacy Ratecard v2

Next.js + Neon PostgreSQL starter untuk `ratecard.wholegacy.com`.

## Yang sudah bekerja
- Register email + password
- Login + session cookie HTTP-only
- Logout
- Onboarding creator
- Cek username unik
- CMS profile
- Social media stats
- Rate card items
- 3 theme: Minimal, Creator, Dark Pro
- Publish / unlisted draft logic
- Public URL `/username`
- Dynamic metadata + canonical

## Setup TANPA project lokal

### 1. Neon SQL
Buka Neon > SQL Editor, paste seluruh isi `neon-schema.sql`, lalu Run.

### 2. Vercel Environment Variables
Neon integration biasanya sudah membuat `DATABASE_URL`.
Tambahkan manual:

`AUTH_SECRET` = string acak panjang minimal 32 karakter.

`NEXT_PUBLIC_SITE_URL` = `https://ratecard.wholegacy.com`

Environment: Production + Preview.

### 3. Upload ke GitHub
Upload/replace file repository dengan isi folder project ini, commit ke `main`.
Vercel akan redeploy otomatis.

### 4. Test
- `/register`
- selesai register -> `/onboarding`
- isi username -> `/dashboard`
- tambahkan minimal satu rate
- pilih design
- Publish
- buka `/{username}`

## Catatan v2
Untuk keamanan dan deployment sederhana, v2 ini memakai auth credential sendiri dengan password bcrypt + JWT cookie. Email verification, Google OAuth, dan upload file langsung belum diaktifkan. Field avatar/cover menerima URL gambar untuk sementara. Fitur itu ideal ditambahkan setelah core flow di atas berhasil diuji.
