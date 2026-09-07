# Wholegacy Ratecard v4

Upgrade dari v3. Tidak perlu membuat database baru.

## Fitur baru
- CMS disusun mengikuti struktur rate card: Tentang Account, Rate Kerjasama, Hubungi Saya, Pengalaman Kolaborasi, Syarat & Ketentuan.
- Followers, engagement rate, average views dalam range minimum-maksimum, content style.
- Rate: Jenis Konten, Deskripsi, Harga.
- Kontak email + WhatsApp dengan icon.
- Pengalaman kolaborasi editable list.
- Syarat & ketentuan editable list.
- Theme baru **Editorial Beige**, terinspirasi struktur referensi yang diberikan, dengan layout detail berbeda dari Minimal, Creator, dan Dark Pro.
- Semua perubahan tampil di Live Preview.

## WAJIB sebelum deploy
Di Neon SQL Editor, jalankan `neon-v4-migration.sql` sekali menggunakan tombol Run.

Setelah migration berhasil, upload/replace project v4 ke GitHub dan commit ke `main`. Vercel akan redeploy otomatis.

Environment variables tetap:
- DATABASE_URL
- AUTH_SECRET
- NEXT_PUBLIC_SITE_URL
- BLOB_READ_WRITE_TOKEN
