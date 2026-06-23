# Sistem Manajemen Stok dan Pembayaran 📦💰

Sistem Manajemen Stok adalah aplikasi web (berbasis React, Node.js, Express, dan Supabase) yang dirancang untuk mempermudah pengelolaan barang di gudang, mendata produk, mencatat biaya pengeluaran operasional harian, serta melakukan pelacakan dan pembayaran ke suplier.

Aplikasi ini dibuat dengan antarmuka yang modern, responsif, dan mudah digunakan untuk mengoptimalkan alur kerja bisnis secara efektif dan rapi.

## 🌟 Fitur Utama

- **📦 Katalog Produk**: Mengelola daftar seluruh produk beserta stok dan *Stock Keeping Unit* (SKU).
- **🏭 Update Stok Gudang**: Pembaruan stok secara *real-time* untuk barang masuk (Stock In) dan barang keluar (Stock Out).
- **🤝 Manajemen Suplier**: Mendata mitra/suplier lengkap dengan integrasi tombol pintas WhatsApp.
- **💸 Pembayaran Suplier**: Mengelola hutang/tagihan pembelian produk dari suplier yang bisa dilunasi melalui sistem *Virtual Account*.
- **📊 Pengeluaran Operasional**: Mencatat dan melacak biaya operasional perusahaan sehari-hari (listrik, internet, gaji, dll).
- **📋 Log Aktivitas**: Memantau seluruh riwayat pergerakan (keluar/masuk) barang secara transparan.

## 👥 Hak Akses Pengguna

Sistem ini membagi akses menjadi 2 *role* utama:
1. **Admin**: Memiliki akses penuh ke semua halaman (Dasbor, Produk, Suplier, Keuangan, Operasional, Laporan).
2. **Gudang (Warehouse)**: Memiliki antarmuka ringkas yang hanya difokuskan untuk tugas pembaruan stok (barang masuk & keluar).

## 🛠️ Teknologi yang Digunakan

- **Frontend**: React.js, TypeScript, Vite, Tailwind CSS (Atau sejenisnya)
- **Backend**: Node.js, Express.js, TypeScript
- **Database**: Supabase (PostgreSQL)

## 🚀 Panduan Instalasi dan Pengaturan (Setup)

Ikuti langkah-langkah di bawah ini untuk menjalankan aplikasi di lingkungan lokal Anda.

### 1. Persyaratan Sistem
- Node.js (versi 16 atau lebih baru)
- Akun [Supabase](https://supabase.com) (Untuk Database)

### 2. Kloning Repositori
```bash
git clone https://github.com/nailulsaadah86/SistemStok.git
cd SistemStok
```

### 3. Pengaturan Supabase Database
1. Buat project baru di Supabase.
2. Buka menu **SQL Editor** > **New Query**.
3. *Copy* seluruh isi kode dari file `setup_supabase.sql` yang ada di dalam *root* direktori.
4. *Paste* dan klik **Run**. Ini akan otomatis membuat seluruh tabel beserta akun default pengguna.

### 4. Pengaturan Backend
1. Masuk ke *folder* backend dan instal dependensi.
```bash
cd backend
npm install
```
2. Buat atau sesuaikan file `.env` di dalam folder `backend`:
```env
PORT=5000
JWT_SECRET=rahasia_super_aman_untuk_stok_123

# Ganti dengan URL dan Service Role API Key dari Supabase Anda
SUPABASE_URL=https://[PROJECT-ID].supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1... (Gunakan service_role secret key)
```
3. Jalankan server backend:
```bash
npm run dev
# Server akan berjalan di port 5000
```

### 5. Pengaturan Frontend
1. Buka terminal baru, masuk ke *folder* frontend dan instal dependensi.
```bash
cd frontend
npm install
```
2. Jalankan server pengembangan *frontend*:
```bash
npm run dev
# Aplikasi dapat diakses di http://localhost:5173 (atau port lain sesuai konfigurasi Vite)
```

## 🔐 Akun Login Default

Setelah database berhasil disiapkan melalui script SQL, Anda dapat menggunakan akun bawaan berikut:

- **Akun Admin:** 
  - Username: `admin` 
  - Password: `admin123`
- **Akun Gudang:** 
  - Username: `gudang` 
  - Password: `gudang123`

---
*Dokumentasi lengkap dan manual operasional bagi pengguna dapat dilihat di file `manualbook.md`.*
