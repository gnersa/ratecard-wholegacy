# Wholegacy Ratecard v6

Upgrade dari v5 dengan arsitektur informasi yang konsisten untuk semua template.

## Perubahan utama
- Semua template menampilkan minimum information yang sama: profil creator, semua akun social media + followers/engagement/view range/content style, rate kerja sama, Contact Me, pengalaman kolaborasi, serta syarat & ketentuan.
- Empat struktur template tetap berbeda tetapi semuanya minimalis, informatif, responsive, dan web/mobile friendly.
- `editorial` kini tampil sebagai **Modern**, menggantikan gaya beige lama dengan layout netral modern.
- `creator` kini tampil sebagai **Creator Pro**.
- Contact Me memiliki direct `mailto:` dan `https://wa.me/...` link.
- CMS/editor menggunakan font stack `Roboto, Arial, Helvetica, sans-serif` tanpa ketergantungan font eksternal.
- Tidak membutuhkan migration database baru dari v5.

## Template
- Modern (`editorial`)
- Minimal (`minimal`)
- Creator Pro (`creator`)
- Dark Pro (`dark-pro`)

## Deploy
Replace source repo dengan isi ZIP ini lalu commit ke `main`. Vercel akan auto deploy. Neon v5 schema/migration tetap digunakan.
