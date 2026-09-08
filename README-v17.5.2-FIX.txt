Wholegacy Ratecard v17.5.2

Fix utama:
- Save & Publish sekarang memberi error database yang spesifik bila schema Neon belum kompatibel.
- Tambahan migration idempotent: neon-v17.5.2-fix.sql
- Base neon-schema.sql diselaraskan untuk fresh install (theme 40, color_pattern 80, language).

WAJIB untuk kasus "Gagal menyimpan profile":
1. Buka Neon > SQL Editor.
2. Jalankan seluruh isi neon-v17.5.2-fix.sql.
3. Deploy source v17.5.2.
4. Login ulang bila perlu, buka Design, lalu Save & Publish.
