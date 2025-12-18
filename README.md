# DigiCaf
Aplikasi Sistem Informasi Cafe berbasis Framework7 dan Vue.js

## 📱 Deskripsi

DigiCaf adalah aplikasi sistem informasi cafe yang modern dan responsif, dibangun dengan Framework7 dan Vue.js. Aplikasi ini dirancang khusus untuk resolusi tablet dengan tema warna mocha/coklat kopi yang elegan dan font modern-klasik yang enak dilihat.

## ✨ Fitur Utama

### 1. 📊 Dashboard
- Statistik penjualan harian
- Total pesanan dan item stok
- Aksi cepat untuk navigasi
- Pesanan terbaru
- Peringatan stok rendah

### 2. 📦 Kelola Stok
- CRUD lengkap untuk manajemen stok
- Pencarian item stok
- Filter berdasarkan kategori (Bahan, Minuman, Makanan)
- Peringatan stok minimum
- Swipe actions untuk edit dan hapus

### 3. 💰 Transaksi POS (Point of Sale)
- Grid menu interaktif dengan emoji
- Keranjang belanja dengan quantity control
- Filter kategori menu
- Kalkulasi pajak otomatis (10%)
- Input nama pelanggan
- Proses pembayaran

### 4. 👥 Manajemen Pelanggan
- Database pelanggan lengkap
- Tier pelanggan (Regular, Gold, VIP)
- Riwayat transaksi pelanggan
- Pencarian pelanggan
- Total transaksi tracking

### 5. 👨‍💼 Manajemen Karyawan
- Data karyawan lengkap
- Filter berdasarkan departemen
- Jadwal kerja karyawan
- Status karyawan (Aktif, Bertugas, Cuti, Nonaktif)
- Informasi gaji

### 6. 📈 Laporan
- Filter laporan (Harian, Mingguan, Bulanan)
- Statistik pendapatan dan transaksi
- Produk terlaris
- Penjualan per kategori dengan visualisasi
- Chart penjualan per jam
- Metode pembayaran
- Performa karyawan
- Export PDF dan Excel (coming soon)

## 🎨 Desain

### Tema Warna
- **Background**: Warna Mocha (#D4C4B0)
- **Primary**: Coklat Kopi (#8B7355)
- **Dark**: Coklat Tua (#4A3526, #6F5B43)
- **Accent**: Cream (#F5EFE7)

### Typography
- **Heading**: Playfair Display (serif, elegant)
- **Body**: Inter (sans-serif, modern)

### Responsif
- Dioptimalkan untuk resolusi tablet (768px+)
- Layout grid responsif untuk statistik
- Mobile-friendly dengan Framework7

## 🚀 Instalasi dan Menjalankan

### Prasyarat
- Node.js (v14 atau lebih tinggi)
- npm atau yarn

### Langkah Instalasi

1. Clone repository
```bash
git clone https://github.com/manwell-project/DigiCaf.git
cd DigiCaf
```

2. Install dependencies
```bash
npm install
```

3. Jalankan development server
```bash
npm run dev
```

4. Buka browser dan akses `http://localhost:3000`

### Build untuk Production

```bash
npm run build
```

File production akan tersedia di folder `dist/`

## 📦 Teknologi yang Digunakan

- **Framework7** 8.3.3 - Mobile-first UI framework
- **Vue.js** 3.3.4 - Progressive JavaScript framework
- **Vite** 5.0.0 - Next generation frontend tooling
- **Framework7 Icons** - Icon set
- **Google Fonts** - Playfair Display & Inter

## 📁 Struktur Folder

```
DigiCaf/
├── index.html              # Entry point HTML
├── package.json            # Dependencies
├── vite.config.js         # Vite configuration
├── src/
│   ├── main.js            # App initialization
│   ├── App.vue            # Main app component
│   ├── routes.js          # Route definitions
│   ├── css/
│   │   └── app.css        # Custom styles & theme
│   └── pages/
│       ├── HomePage.vue       # Dashboard
│       ├── StockPage.vue      # Stock management
│       ├── POSPage.vue        # POS transactions
│       ├── CustomerPage.vue   # Customer management
│       ├── EmployeePage.vue   # Employee management
│       └── ReportPage.vue     # Reports & analytics
```

## 🎯 Navigasi

Aplikasi menggunakan bottom navigation bar dengan 6 menu utama:
- 🏠 Dashboard
- 📦 Stok
- 💰 POS
- 👥 Pelanggan
- 👨‍💼 Karyawan
- 📊 Laporan

## 🔄 Status Pengembangan

✅ Dashboard - Completed
✅ Kelola Stok - Completed
✅ Transaksi POS - Completed
✅ Manajemen Pelanggan - Completed
✅ Manajemen Karyawan - Completed
✅ Laporan - Completed

### Future Enhancements
- 🔐 Authentication & Authorization
- 💾 Backend API integration
- 📤 Export PDF/Excel functionality
- 🖨️ Print receipt
- 📧 Email notifications
- 📱 Progressive Web App (PWA)
- 🌐 Multi-language support

## 📄 Lisensi

MIT License

## 👨‍💻 Developer

Dikembangkan untuk manwell-project

---

**DigiCaf** - Sistem Informasi Cafe Modern & Elegan

