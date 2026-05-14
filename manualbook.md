# HALAMAN JUDUL

**BUKU PANDUAN APLIKASI**
**SISTEM MANAJEMEN STOK DAN PEMBAYARAN**

Disusun Oleh: Tim Pengembang
Tanggal: 5 Mei 2026
Versi: 1.0

---

# HALAMAN REVISI

| Versi | Tanggal | Deskripsi Perubahan | Penulis |
|---|---|---|---|
| 1.0 | 5 Mei 2026 | Rilis Awal Buku Panduan | Tim Pengembang |

---

# DAFTAR ISI

HALAMAN JUDUL ..................................... i
HALAMAN REVISI .................................... ii
DAFTAR ISI ........................................ iii

BAB 1: PENDAHULUAN ................................ 1
   1.1 Tentang Aplikasi ....................... 1
   1.2 Pengguna Sistem ........................ 2
   1.3 Tujuan Manual .......................... 3
   1.4 Persyaratan Sistem ..................... 4

BAB 2: MEMULAI CEPAT .............................. 4
   2.1 Cara Login Pertama Kali ................ 4
   2.2 Navigasi Dasar ......................... 6

BAB 3: PANDUAN FITUR
   3.1 Dashboard ................................... 8
   3.2 Manajemen Data & Transaksi .................. 11
   3.3 Laporan ..................................... 18

BAB 4: ADMINISTRASI
   4.1 Manajemen Pengguna .......................... 35
   4.2 Backup & Restore ............................ 42

BAB 5: TROUBLESHOOTING & FAQ
   5.1 Troubleshooting ............................. 48
   5.2 FAQ ......................................... 52

BAB 6: LAMPIRAN
   6.1 Glosarium ................................... 55
   6.2 Kontak Dukungan ............................. 57

---

# BAB 1: PENDAHULUAN

## 1.1 Tentang Aplikasi
Sistem Manajemen Stok adalah aplikasi web yang dirancang untuk mempermudah Anda dalam mengatur barang di gudang, mendata produk, mencatat biaya harian, serta melakukan pembayaran ke suplier. Aplikasi ini dibuat dengan tampilan yang sederhana dan mudah dipahami agar pekerjaan bisnis Anda menjadi lebih cepat dan rapi.

Fitur utamanya antara lain:
- **Catatan Gudang**: Mencatat barang yang masuk dan keluar dari gudang.
- **Katalog Produk**: Melihat daftar semua produk beserta sisa stoknya.
- **Manajemen Suplier & Pembayaran**: Membayar tagihan suplier menggunakan Virtual Account (seperti BCA) dan langsung mengirim bukti pembayarannya lewat WhatsApp.
- **Biaya Harian**: Mencatat dan membayar pengeluaran sehari-hari (seperti listrik, internet, dll).
- **Dasbord**: Halaman utama yang menampilkan ringkasan data penting secara langsung.

## 1.2 Pengguna Sistem
Aplikasi ini dapat digunakan oleh:
- **Admin**: Memiliki akses penuh ke semua bagian aplikasi. Admin bisa mengatur keuangan, melakukan pembayaran, mencatat biaya harian, dan mengatur data suplier.
- **Gudang (Warehouse)**: Memiliki akses khusus untuk mengurus keluar-masuknya barang fisik di gudang dan melihat daftar produk yang ada.

## 1.3 Tujuan Manual
Buku panduan ini dibuat dengan tujuan yang jelas bagi setiap penggunanya:
- **Untuk Admin**: Menjadi buku petunjuk lengkap untuk mengawasi semua aktivitas, mengatur produk, melakukan pembayaran tagihan suplier melalui Virtual Account, serta mencatat pengeluaran harian.
- **Untuk Bagian Gudang**: Menjadi panduan kerja untuk mencatat barang yang masuk dan keluar. Tujuannya agar jumlah barang fisik di lapangan selalu pas dengan data di sistem.
- **Secara Umum**: Menjadi buku bantuan utama jika Anda menemukan kesulitan saat menggunakan aplikasi ini.

## 1.4 Persyaratan Sistem
Agar aplikasi berjalan lancar, Anda memerlukan:
- **Perangkat**: Komputer, Laptop, atau Tablet dengan koneksi internet yang stabil.
- **Browser (Peramban)**: Google Chrome, Mozilla Firefox, Microsoft Edge, atau Safari versi terbaru.
- **Akun**: Email dan password yang sudah didaftarkan oleh pimpinan atau administrator.

---

# BAB 2: MEMULAI CEPAT

## 2.1 Cara Login Pertama Kali
1. Buka browser Anda dan masukkan alamat (URL) web aplikasi.
2. Di halaman awal, ketikkan **Email** dan **Password** Anda.
3. Klik tombol **Login**.
4. Jika berhasil, Anda akan langsung masuk ke halaman utama (Dasbord) sesuai dengan posisi Anda (sebagai Admin atau Gudang).

> **Catatan**: Kalau Anda lupa password atau tidak bisa login, jangan ragu untuk menghubungi tim IT atau Admin.

## 2.2 Navigasi Dasar
Aplikasi ini memiliki menu navigasi di sebelah kiri layar untuk berpindah halaman. Menu yang muncul akan menyesuaikan dengan posisi (peran) Anda saat login:

**1. Navigasi untuk Admin**
Sebagai Admin, Anda memiliki akses penuh ke seluruh menu yang ada:
- **Dasbord Utama**: Halaman utama untuk melihat ringkasan singkat seluruh aktivitas.
- **Katalog Produk**: Tempat melihat daftar barang dan jumlah stok terbarunya.
- **Pembayaran Produk kepada Suplier**: Tempat mengelola dan melunasi tagihan produk dari pemasok.
- **Manajemen Suplier**: Tempat mendata dan mengelola informasi para pemasok.
- **Pengeluaran Operasional**: Tempat mencatat dan membayar biaya operasional sehari-hari.
- **Log Aktivitas Barang Masuk dan Keluar**: Tempat melihat riwayat pergerakan stok barang di gudang.

**2. Navigasi untuk Gudang (Warehouse)**
Sebagai tim Gudang, menu Anda sangat terfokus dan hanya memiliki 1 (satu) akses utama:
- **Update Stok di Gudang**: Halaman khusus di mana Anda dapat mencari nama produk, lalu mengisi jumlah stok barang yang keluar maupun yang masuk.

---

# BAB 3: PANDUAN FITUR

Bagian ini akan menjelaskan secara rinci tombol-tombol yang tersedia dan panduan langkah demi langkah (step-by-step) untuk mengoperasikan setiap halaman aplikasi.

## 3.1 Dashboard
Halaman yang pertama kali tampil saat Anda login. Berisi menu ringkasan operasional harian.

### A. Dasbord Utama (Khusus Admin)
Halaman pertama yang menyambut Anda. Di sini Anda bisa melihat ringkasan status bisnis dengan cepat.

**Tombol yang Tersedia:**
- **Kotak Katalog Produk**: Untuk melompat langsung ke halaman pendataan barang.
- **Kotak Pembayaran Produk kepada Suplier**: Untuk melompat langsung ke halaman tagihan suplier.
- **Kotak Manajemen Suplier**: Untuk melompat langsung ke halaman daftar pemasok.
- **Kotak Pengeluaran Operasional**: Untuk melompat langsung ke halaman biaya harian.

**Langkah-langkah Penggunaan:**
1. Masuk ke aplikasi menggunakan akun Admin Anda.
2. Anda otomatis berada di halaman Dasbord Utama.
3. Arahkan *mouse* dan klik salah satu **Kotak Ringkasan** yang besar di layar untuk berpindah secara instan ke halaman yang Anda tuju, tanpa perlu mencari di menu samping.

### B. Update Stok di Gudang (Khusus Gudang/Warehouse)
Halaman ini adalah satu-satunya halaman kerja (operasional) utama bagi tim Gudang. Fokusnya sangat spesifik: menghitung dan mencatat perpindahan fisik barang.

**Kolom dan Tombol yang Tersedia:**
- Kolom **Pencarian Produk**: Kotak tempat mengetik dan mencari nama barang dengan cepat.
- Kolom **Barang Masuk (Stock In)**: Tempat untuk memasukkan angka jumlah barang yang baru datang (bertambah).
- Kolom **Barang Keluar (Stock Out)**: Tempat untuk memasukkan angka jumlah barang yang diambil/dikirim (berkurang).
- Tombol **Simpan/Update**: Untuk menyimpan perubahan angka ke dalam *database* sistem.

**Langkah-langkah Penggunaan:**
1. Buka halaman utama Anda: **Update Stok di Gudang**.
2. Pada kolom **Pencarian**, ketiklah nama barang atau produk yang saat ini sedang Anda pegang fisiknya.
3. **Jika ada pengiriman dari suplier (Barang Masuk):** Klik kolom barang masuk dan ketik angka jumlah barang yang baru datang.
4. **Jika ada pesanan/barang keluar (Barang Keluar):** Klik kolom barang keluar dan ketik angka jumlah barang yang diambil dari rak.
5. Klik tombol **Simpan/Update**. 
6. Sukses! Jumlah total ketersediaan barang di gudang akan langsung menyesuaikan secara otomatis di seluruh sistem.

---

## 3.2 Manajemen Data & Transaksi
Bagian ini khusus digunakan oleh **Admin** untuk mengelola data produk, mitra, dan arus transaksi harian.

### Katalog Produk
Halaman untuk menambah, melihat, dan mengelola semua produk dagangan Anda.

**Kolom dan Tombol yang Tersedia di Halaman Ini:**
- Tombol **+ DAFTARKAN PRODUK**: Untuk membuka lembar isian pembuatan produk baru.
- Kolom **SKU (Kode Barang)**: Menampilkan kode identitas unik dari barang.
- Kolom **NAMA PRODUK**: Menampilkan nama barang.
- Kolom **KATEGORI**: Menampilkan jenis pengelompokan barang tersebut.
- Kolom **STOK**: Menampilkan ketersediaan jumlah barang.
- Kolom **AKSI**: Menyediakan dua tombol, yaitu tombol **EDIT** (untuk mengubah data produk) dan tombol ikon **Sampah** (untuk menghapus produk).

**Langkah-langkah Mendaftarkan Produk:**
1. Klik menu **Katalog Produk** di navigasi sebelah kiri.
2. Klik tombol **+ DAFTARKAN PRODUK** di bagian atas halaman.
3. Isikan data yang diperlukan pada kotak yang muncul (seperti SKU, Nama Produk, Kategori, dll).
4. Simpan data tersebut. Produk Anda akan langsung muncul di tabel dengan sisa stok awal sesuai yang dimasukkan atau 0.

### Pembayaran Produk kepada Suplier
Halaman khusus untuk melunasi tagihan atas barang yang sudah dikirim suplier ke gudang.

**Tombol yang Tersedia:**
- Tombol **Bayar Tagihan**: Untuk menyelesaikan dan mencatat bukti pelunasan tagihan tertentu.

**Langkah-langkah Penggunaan:**
1. Buka menu **Pembayaran Produk kepada Suplier**.
2. Cari nama suplier atau produk yang ingin dibayar pada tabel yang tersedia.
3. Klik tombol **Bayar Tagihan** di samping data tagihan tersebut.
4. Status tagihan otomatis akan berubah menjadi lunas (PAID) di sistem.

### Manajemen Suplier
Halaman untuk mendata informasi perusahaan pemasok Anda.

**Kolom dan Tombol yang Tersedia di Halaman Ini:**
- Tombol **+ TAMBAH SUPLIYER**: Untuk mendaftarkan pemasok baru.
- Kolom **NAMA MITRA**: Menampilkan nama perusahaan atau perorangan pemasok.
- Kolom **KONTAK WA**: Menampilkan nomor WhatsApp dari suplier.
- Kolom **AKSI**: Menyediakan tiga tombol kontrol utama, yaitu:
  - Tombol **BAYAR**: Untuk memproses pembayaran atau pelunasan tagihan ke suplier tersebut.
  - Tombol **EDIT**: Untuk mengubah atau memperbarui informasi kontak suplier.
  - Tombol ikon **Sampah (Hapus)**: Untuk menghapus data suplier dari sistem.

**Langkah-langkah Mendaftarkan Suplier Baru:**
1. Buka menu **Manajemen Suplier** di sebelah kiri.
2. Klik tombol **+ TAMBAH SUPLIYER**.
3. Isi data yang diminta berupa: **Nama Mitra**, **Nomor WA**, **Email**, dan **Alamat/Lokasi**.
4. Simpan data tersebut. Suplier baru akan otomatis ditambahkan ke dalam tabel daftar mitra.

### Pengeluaran Operasional
Halaman untuk mencatat biaya sehari-hari perusahaan (seperti listrik, gaji, internet, dll).

**Kolom dan Tombol yang Tersedia di Halaman Ini:**
- Tombol **+ CATATAN PENGELUARAN**: Untuk mulai mencatat biaya pengeluaran baru.
- Kolom **TANGGAL**: Menampilkan tanggal pencatatan pengeluaran.
- Kolom **KATEGORI**: Menampilkan jenis pengeluaran yang dibayar (misalnya: Listrik, Gaji, dll).
- Kolom **KETERANGAN**: Menampilkan detail atau deskripsi dari biaya tersebut.
- Kolom **NOMINAL**: Menampilkan jumlah uang (Rupiah) yang dikeluarkan.
- Kolom **AKSI**: Menyediakan tombol ikon **Sampah (Hapus)** untuk menghapus riwayat data pengeluaran.

**Langkah-langkah Mencatat Pengeluaran:**
1. Buka menu **Pengeluaran Operasional** di sebelah kiri.
2. Klik tombol **+ CATATAN PENGELUARAN**.
3. Isikan formulir pengeluaran berupa **Tanggal**, **Kategori**, **Keterangan**, dan **Nominal**.
4. Simpan data tersebut. Data biaya operasional baru akan langsung tercatat dan tampil di tabel.

---

## 3.3 Laporan
Bagian ini khusus digunakan untuk melihat rekapitulasi data dan sejarah aktivitas.

### Log Aktivitas Barang Masuk dan Keluar
Halaman catatan sejarah lengkap pergerakan stok barang Anda.

**Yang Tersedia di Halaman Ini:**
- **Tabel Laporan**: Menunjukkan informasi detail waktu, nama produk, jumlah barang, suplier, dan jenis pergerakannya (masuk atau keluar).

**Langkah-langkah Penggunaan:**
1. Buka menu **Log Aktivitas Barang Masuk dan Keluar**.
2. Anda bisa membaca dan memeriksa seluruh sejarah pergerakan barang. 
3. *Perhatian*: Halaman ini murni sebagai laporan catatan sejarah. Anda tidak akan menemukan tombol edit atau hapus di sini untuk memastikan semua data perpindahan barang aman dan dapat dipertanggungjawabkan kebenarannya.

---

# BAB 4: ADMINISTRASI
Bagian ini berisi manajemen akses pengguna dan konfigurasi sistem (Khusus untuk Admin).

## 4.1 Manajemen Pengguna
Aplikasi ini membagi hak akses penggunanya:
- **Admin**: Bisa membuka dan mengedit semua halaman, termasuk urusan uang, pembayaran, pengeluaran harian, dan suplier.
- **Gudang (Warehouse)**: Hanya bisa membuka halaman operasional gudang (mencatat barang masuk/keluar) dan melihat daftar produk.

## 4.2 Backup & Restore
Aplikasi ini menyimpan datanya di penyimpanan aman berbasis awan (cloud) bernama **Supabase**:
- **Penyimpanan Otomatis (Backup)**: Data Anda akan dicadangkan secara otomatis setiap saat, jadi Anda tidak perlu khawatir kehilangan data.
- **Pemulihan Data (Restore)**: Kalau terjadi masalah besar, tim teknis bisa mengembalikan data Anda lewat sistem ini.

---

# BAB 5: TROUBLESHOOTING & FAQ

## 5.1 Troubleshooting

**Masalah**: Tidak bisa login / Username salah.
**Solusi**: Pastikan Anda mengetik username dan password dengan huruf kecil. Jika masih gagal lapor ke admin.

**Masalah**: Tombol "Bayar Sekarang" tidak bisa ditekan atau error.
**Solusi**: Pastikan koneksi internet Anda lancar. Coba muat ulang (refresh) halaman dengan menekan tombol F5. Pastikan juga Anda sudah menekan tombol "Generate" untuk membuat nomor rekening Virtual Account supliernya terlebih dahulu.

**Masalah**: Jumlah stok barang kok tidak berubah setelah dicatat?
**Solusi**: Pastikan Anda sudah mengeklik tombol Simpan dan muncul pesan "Berhasil". Coba muat ulang halamannya untuk melihat angka terbarunya.

## 5.2 FAQ

**Tanya: Bagaimana cara mengirim bukti transfer ke suplier?**
Jawab: Buka menu Manajemen Suplier, lalu klik tombol **WhatsApp** di sebelah nama suplier. Aplikasi WhatsApp akan langsung terbuka dan Anda bisa langsung melampirkan fotonya.

**Tanya: Apakah saya bisa mencetak nota pembelian?**
Jawab: Saat ini kami menggunakan pencatatan digital dan langsung mengirim buktinya lewat WhatsApp. Namun, jika Anda butuh cetakan kertas, Anda bisa mencetak halaman langsung dari browser (tekan Ctrl+P di keyboard).

**Tanya: Boleh tidak aplikasinya dibuka lewat HP?**
Jawab: Boleh, tampilannya akan menyesuaikan layar HP Anda. Tetapi, agar lebih lega dan nyaman saat melihat banyak data, kami menyarankan Anda membukanya lewat Laptop atau Komputer.

---

# BAB 6: LAMPIRAN

## 6.1 Glosarium
- **SKU (Stock Keeping Unit)**: Kode unik atau nomor seri untuk setiap jenis barang.
- **Stock In**: Barang yang masuk ke dalam gudang (biasanya dari suplier).
- **Stock Out**: Barang yang keluar dari gudang.
- **Virtual Account (VA)**: Nomor rekening khusus yang dibuat agar Anda gampang membayar tagihan langsung ke suplier.
- **Supabase**: Tempat penyimpanan data yang sangat aman di internet.

## 6.2 Kontak Dukungan
Kalau Anda masih bingung, ingin fitur baru, atau lupa password, jangan sungkan untuk menghubungi kami:
- **Email**: support@sistemstok.local
- **WhatsApp/Telepon**: +62 812-XXXX-XXXX
- **Jam Buka**: Senin - Jumat, 08:00 - 17:00 WIB
