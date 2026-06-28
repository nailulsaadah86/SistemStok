# Agent Development Rules

## 1. Plan
- Analisis requirements sebelum menulis kode
- Buat daftar tugas (todo list) untuk setiap fitur
- Tentukan arsitektur dan file yang akan dimodifikasi

## 2. Build
- Ikuti konvensi kode yang ada (gaya, library, pattern)
- Jangan tambah komentar kecuali diminta
- Jalankan lint/typecheck setelah perubahan

## 3. Test
- Jalankan test suite lokal sebelum commit
- Pastikan tidak ada test yang broken

## 4. Code & Git Commit
- Stage hanya file yang relevan (`git add`)
- Gunakan pesan commit yang deskriptif dan ringkas
- Jangan commit secrets atau file tidak terkait

## 5. Push to GitHub
- Push ke branch yang sesuai (`git push`)
- Pastikan remote `origin` sudah benar

## 6. Test Code di GitHub
- Pantau CI/CD pipeline (jika ada)
- Jika test gagal, fix dan commit ulang
