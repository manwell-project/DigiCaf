# Panduan Instalasi dan Penggunaan DigiCaf

## 🚀 Cara Menjalankan Aplikasi

### 1. Persiapan
Pastikan sudah menginstall:
- Node.js (versi 14 atau lebih baru)
- npm (biasanya sudah include dengan Node.js)

### 2. Install Dependencies
Buka terminal/command prompt di folder project, lalu jalankan:
```bash
npm install
```

Tunggu hingga proses instalasi selesai (biasanya 1-2 menit).

### 3. Menjalankan Development Server
Setelah instalasi selesai, jalankan:
```bash
npm run dev
```

Server akan berjalan di `http://localhost:3000`

### 4. Membuka Aplikasi
- Buka browser (Chrome, Firefox, Edge, atau Safari)
- Akses `http://localhost:3000`
- Aplikasi DigiCaf akan terbuka!

## 📱 Cara Menggunakan Aplikasi

### Navigation
Gunakan bottom navigation bar untuk berpindah halaman:
- 🏠 **Dashboard**: Tampilan ringkasan dan statistik
- 📦 **Stok**: Kelola inventori barang
- 💰 **POS**: Transaksi penjualan
- 👥 **Pelanggan**: Kelola data pelanggan
- 👨‍💼 **Karyawan**: Kelola data karyawan
- 📊 **Laporan**: Lihat laporan dan analitik

### Fitur-Fitur

#### Dashboard
- Lihat statistik penjualan hari ini
- Quick actions untuk akses cepat
- Monitor pesanan terbaru
- Cek peringatan stok rendah

#### Kelola Stok
- **Tambah Item**: Klik tombol "+ Tambah Item"
- **Cari Item**: Gunakan search bar
- **Filter**: Pilih kategori (Semua, Bahan, Minuman, Makanan)
- **Edit**: Swipe item ke kiri, pilih "Edit"
- **Hapus**: Swipe item ke kiri, pilih "Hapus"

#### Transaksi POS
- **Pilih Menu**: Klik item menu untuk menambah ke keranjang
- **Filter Menu**: Pilih kategori (Semua, Minuman, Makanan)
- **Atur Jumlah**: Gunakan tombol + dan - di keranjang
- **Hapus Item**: Swipe item di keranjang ke kiri
- **Checkout**: Isi nama pelanggan (opsional), klik "Proses Pembayaran"

#### Manajemen Pelanggan
- **Tambah Pelanggan**: Klik tombol "+ Tambah"
- **Cari Pelanggan**: Gunakan search bar
- **Edit**: Swipe ke kiri, pilih "Edit"
- **Lihat Riwayat**: Swipe ke kiri, pilih "Riwayat"
- **Hapus**: Swipe ke kiri, pilih "Hapus"

#### Manajemen Karyawan
- **Tambah Karyawan**: Klik tombol "+ Tambah"
- **Cari Karyawan**: Gunakan search bar
- **Filter Departemen**: Pilih departemen (Semua, Kasir, Barista, Dapur)
- **Edit**: Swipe ke kiri, pilih "Edit"
- **Lihat Jadwal**: Swipe ke kiri, pilih "Jadwal"
- **Hapus**: Swipe ke kiri, pilih "Hapus"

#### Laporan
- **Pilih Jenis**: Harian, Mingguan, atau Bulanan
- **Filter Tanggal**: Pilih rentang tanggal
- **Generate**: Klik "Generate Laporan"
- **Export**: Klik "Export PDF" atau "Export Excel" (coming soon)

## 🛠️ Build untuk Production

Untuk membuat versi production:
```bash
npm run build
```

File hasil build akan tersimpan di folder `dist/`

## 💡 Tips Penggunaan

1. **Resolusi Optimal**: Aplikasi dioptimalkan untuk tablet (768px+)
2. **Swipe Actions**: Geser item ke kiri untuk aksi cepat (edit/hapus)
3. **Data Contoh**: Aplikasi sudah dilengkapi dengan data contoh
4. **Navigasi Cepat**: Gunakan quick actions di Dashboard untuk akses cepat

## ❓ Troubleshooting

### Port 3000 sudah digunakan
Jika port 3000 sudah terpakai, edit `vite.config.js` dan ubah port:
```javascript
server: {
  port: 3001, // ganti dengan port lain
}
```

### Error saat npm install
Coba hapus folder `node_modules` dan file `package-lock.json`, lalu:
```bash
npm install
```

### Aplikasi tidak muncul
- Pastikan server sudah running (cek terminal)
- Refresh browser (Ctrl/Cmd + R)
- Clear browser cache
- Coba browser lain

## 📞 Bantuan

Untuk pertanyaan atau masalah, silakan buat issue di GitHub repository.

---

Selamat menggunakan DigiCaf! ☕
