<template>
  <f7-page name="home">
    <f7-navbar title="Dashboard" />
    
    <f7-page-content>
      <!-- Welcome Section -->
      <f7-block class="text-align-center" style="margin-top: 20px;">
        <h1 style="font-family: var(--font-heading); color: var(--coffee-dark); font-size: 28px; margin: 0;">
          DigiCaf
        </h1>
        <p style="color: var(--coffee-medium); margin-top: 8px;">Sistem Informasi Cafe</p>
      </f7-block>

      <!-- Statistics Cards -->
      <div class="stats-grid" style="padding: 0 12px;">
        <div class="stats-card">
          <div class="stats-number">{{ stats.totalSales }}</div>
          <div class="stats-label">Total Penjualan Hari Ini</div>
        </div>
        <div class="stats-card">
          <div class="stats-number">{{ stats.totalOrders }}</div>
          <div class="stats-label">Total Pesanan</div>
        </div>
        <div class="stats-card">
          <div class="stats-number">{{ stats.stockItems }}</div>
          <div class="stats-label">Item Stok</div>
        </div>
        <div class="stats-card">
          <div class="stats-number">{{ stats.totalCustomers }}</div>
          <div class="stats-label">Total Pelanggan</div>
        </div>
      </div>

      <!-- Quick Actions -->
      <f7-block-title>Aksi Cepat</f7-block-title>
      <f7-card>
        <f7-card-content :padding="false">
          <f7-list>
            <f7-list-item link="/pos" title="Transaksi Baru">
              <template #media>
                <f7-icon f7="money_dollar_circle_fill" color="green"></f7-icon>
              </template>
            </f7-list-item>
            <f7-list-item link="/stock" title="Kelola Stok">
              <template #media>
                <f7-icon f7="cube_box_fill" color="blue"></f7-icon>
              </template>
            </f7-list-item>
            <f7-list-item link="/customers" title="Tambah Pelanggan">
              <template #media>
                <f7-icon f7="person_add_fill" color="orange"></f7-icon>
              </template>
            </f7-list-item>
            <f7-list-item link="/reports" title="Lihat Laporan">
              <template #media>
                <f7-icon f7="chart_bar_fill" color="purple"></f7-icon>
              </template>
            </f7-list-item>
          </f7-list>
        </f7-card-content>
      </f7-card>

      <!-- Recent Orders -->
      <f7-block-title>Pesanan Terbaru</f7-block-title>
      <f7-card>
        <f7-card-content :padding="false">
          <f7-list>
            <f7-list-item 
              v-for="order in recentOrders" 
              :key="order.id"
              :title="order.customer"
              :after="`Rp ${order.total.toLocaleString('id-ID')}`"
            >
              <template #subtitle>{{ order.items }} items - {{ order.time }}</template>
              <template #media>
                <f7-badge :color="order.status === 'Selesai' ? 'green' : 'orange'">
                  {{ order.status }}
                </f7-badge>
              </template>
            </f7-list-item>
          </f7-list>
        </f7-card-content>
      </f7-card>

      <!-- Low Stock Alert -->
      <f7-block-title>Peringatan Stok Rendah</f7-block-title>
      <f7-card>
        <f7-card-content :padding="false">
          <f7-list>
            <f7-list-item 
              v-for="item in lowStockItems" 
              :key="item.id"
              :title="item.name"
              :after="`${item.stock} ${item.unit}`"
            >
              <template #media>
                <f7-icon f7="exclamationmark_triangle_fill" color="red"></f7-icon>
              </template>
            </f7-list-item>
          </f7-list>
        </f7-card-content>
      </f7-card>
    </f7-page-content>

    <!-- Bottom Toolbar -->
    <f7-toolbar tabbar labels bottom>
      <f7-link tab-link="#tab-home" tab-link-active icon-f7="house_fill" text="Dashboard" href="/"></f7-link>
      <f7-link tab-link="#tab-stock" icon-f7="cube_box_fill" text="Stok" href="/stock"></f7-link>
      <f7-link tab-link="#tab-pos" icon-f7="money_dollar_circle_fill" text="POS" href="/pos"></f7-link>
      <f7-link tab-link="#tab-customers" icon-f7="person_2_fill" text="Pelanggan" href="/customers"></f7-link>
      <f7-link tab-link="#tab-employees" icon-f7="person_3_fill" text="Karyawan" href="/employees"></f7-link>
      <f7-link tab-link="#tab-reports" icon-f7="chart_bar_fill" text="Laporan" href="/reports"></f7-link>
    </f7-toolbar>
  </f7-page>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      stats: {
        totalSales: 'Rp 2.450.000',
        totalOrders: 45,
        stockItems: 128,
        totalCustomers: 234,
      },
      recentOrders: [
        { id: 1, customer: 'Budi Santoso', items: 3, total: 75000, time: '10:30', status: 'Selesai' },
        { id: 2, customer: 'Siti Nurhaliza', items: 2, total: 50000, time: '10:45', status: 'Proses' },
        { id: 3, customer: 'Ahmad Rizki', items: 5, total: 120000, time: '11:00', status: 'Selesai' },
        { id: 4, customer: 'Dewi Lestari', items: 1, total: 25000, time: '11:15', status: 'Proses' },
      ],
      lowStockItems: [
        { id: 1, name: 'Kopi Arabica', stock: 2, unit: 'kg' },
        { id: 2, name: 'Susu UHT', stock: 5, unit: 'liter' },
        { id: 3, name: 'Gula Pasir', stock: 3, unit: 'kg' },
      ],
    };
  },
};
</script>
