<template>
  <f7-page name="reports">
    <f7-navbar title="Laporan" />
    
    <f7-page-content>
      <!-- Report Type Selection -->
      <f7-block-title>Jenis Laporan</f7-block-title>
      <f7-block>
        <f7-segmented strong>
          <f7-button :active="reportType === 'daily'" @click="reportType = 'daily'">Harian</f7-button>
          <f7-button :active="reportType === 'weekly'" @click="reportType = 'weekly'">Mingguan</f7-button>
          <f7-button :active="reportType === 'monthly'" @click="reportType = 'monthly'">Bulanan</f7-button>
        </f7-segmented>
      </f7-block>

      <!-- Date Filter -->
      <f7-card>
        <f7-card-content>
          <f7-list>
            <f7-list-input
              label="Dari Tanggal"
              type="date"
              :value="dateFrom"
              @input="dateFrom = $event.target.value"
            ></f7-list-input>
            <f7-list-input
              label="Sampai Tanggal"
              type="date"
              :value="dateTo"
              @input="dateTo = $event.target.value"
            ></f7-list-input>
          </f7-list>
          <f7-button fill @click="generateReport">Generate Laporan</f7-button>
        </f7-card-content>
      </f7-card>

      <!-- Summary Statistics -->
      <f7-block-title>Ringkasan {{ reportType === 'daily' ? 'Harian' : reportType === 'weekly' ? 'Mingguan' : 'Bulanan' }}</f7-block-title>
      <div class="stats-grid" style="padding: 0 12px;">
        <div class="stats-card">
          <div class="stats-number">Rp {{ summary.revenue.toLocaleString('id-ID') }}</div>
          <div class="stats-label">Total Pendapatan</div>
        </div>
        <div class="stats-card">
          <div class="stats-number">{{ summary.transactions }}</div>
          <div class="stats-label">Total Transaksi</div>
        </div>
        <div class="stats-card">
          <div class="stats-number">Rp {{ summary.avgTransaction.toLocaleString('id-ID') }}</div>
          <div class="stats-label">Rata-rata Transaksi</div>
        </div>
        <div class="stats-card">
          <div class="stats-number">{{ summary.customers }}</div>
          <div class="stats-label">Pelanggan Unik</div>
        </div>
      </div>

      <!-- Best Selling Products -->
      <f7-block-title>Produk Terlaris</f7-block-title>
      <f7-card>
        <f7-card-content :padding="false">
          <f7-list>
            <f7-list-item 
              v-for="(product, index) in bestSellingProducts" 
              :key="product.id"
              :title="product.name"
              :after="`${product.sold} terjual`"
            >
              <template #media>
                <div style="width: 36px; height: 36px; border-radius: 50%; background: var(--coffee-light); display: flex; align-items: center; justify-content: center; color: white; font-weight: 600;">
                  {{ index + 1 }}
                </div>
              </template>
              <template #subtitle>
                Pendapatan: Rp {{ (product.sold * product.price).toLocaleString('id-ID') }}
              </template>
            </f7-list-item>
          </f7-list>
        </f7-card-content>
      </f7-card>

      <!-- Sales by Category -->
      <f7-block-title>Penjualan per Kategori</f7-block-title>
      <f7-card>
        <f7-card-content>
          <div v-for="category in salesByCategory" :key="category.name" style="margin-bottom: 16px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
              <span style="font-weight: 600; color: var(--coffee-dark);">{{ category.name }}</span>
              <span style="color: var(--coffee-medium);">Rp {{ category.amount.toLocaleString('id-ID') }} ({{ category.percentage }}%)</span>
            </div>
            <div style="width: 100%; height: 8px; background: var(--mocha-lighter); border-radius: 4px; overflow: hidden;">
              <div :style="{ width: category.percentage + '%', height: '100%', background: 'var(--coffee-light)', transition: 'width 0.3s ease' }"></div>
            </div>
          </div>
        </f7-card-content>
      </f7-card>

      <!-- Hourly Sales Chart (Visual representation) -->
      <f7-block-title>Penjualan per Jam</f7-block-title>
      <f7-card>
        <f7-card-content>
          <div style="display: flex; align-items: flex-end; justify-content: space-between; height: 200px; gap: 4px;">
            <div 
              v-for="hour in hourlySales" 
              :key="hour.time"
              style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: flex-end;"
            >
              <div 
                :style="{
                  width: '100%',
                  height: (hour.sales / maxHourlySales * 100) + '%',
                  background: 'linear-gradient(to top, var(--coffee-dark), var(--coffee-light))',
                  borderRadius: '4px 4px 0 0',
                  transition: 'height 0.3s ease',
                  minHeight: '5px'
                }"
                :title="`Rp ${hour.sales.toLocaleString('id-ID')}`"
              ></div>
              <div style="margin-top: 8px; font-size: 11px; color: var(--coffee-medium);">{{ hour.time }}</div>
            </div>
          </div>
        </f7-card-content>
      </f7-card>

      <!-- Payment Methods -->
      <f7-block-title>Metode Pembayaran</f7-block-title>
      <f7-card>
        <f7-card-content :padding="false">
          <f7-list>
            <f7-list-item 
              v-for="method in paymentMethods" 
              :key="method.name"
              :title="method.name"
              :after="`Rp ${method.amount.toLocaleString('id-ID')}`"
            >
              <template #subtitle>{{ method.count }} transaksi ({{ method.percentage }}%)</template>
            </f7-list-item>
          </f7-list>
        </f7-card-content>
      </f7-card>

      <!-- Employee Performance -->
      <f7-block-title>Performa Karyawan</f7-block-title>
      <f7-card>
        <f7-card-content :padding="false">
          <f7-list>
            <f7-list-item 
              v-for="employee in employeePerformance" 
              :key="employee.id"
              :title="employee.name"
              :after="`${employee.transactions} transaksi`"
            >
              <template #subtitle>Total: Rp {{ employee.total.toLocaleString('id-ID') }}</template>
              <template #media>
                <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--coffee-light); display: flex; align-items: center; justify-content: center; color: white; font-weight: 600;">
                  {{ employee.name.charAt(0).toUpperCase() }}
                </div>
              </template>
            </f7-list-item>
          </f7-list>
        </f7-card-content>
      </f7-card>

      <!-- Export Actions -->
      <f7-block>
        <f7-row>
          <f7-col width="50">
            <f7-button fill @click="exportPDF">Export PDF</f7-button>
          </f7-col>
          <f7-col width="50">
            <f7-button fill @click="exportExcel">Export Excel</f7-button>
          </f7-col>
        </f7-row>
      </f7-block>
    </f7-page-content>

    <!-- Bottom Toolbar -->
    <f7-toolbar tabbar labels bottom>
      <f7-link tab-link="#tab-home" icon-f7="house_fill" text="Dashboard" href="/"></f7-link>
      <f7-link tab-link="#tab-stock" icon-f7="cube_box_fill" text="Stok" href="/stock"></f7-link>
      <f7-link tab-link="#tab-pos" icon-f7="money_dollar_circle_fill" text="POS" href="/pos"></f7-link>
      <f7-link tab-link="#tab-customers" icon-f7="person_2_fill" text="Pelanggan" href="/customers"></f7-link>
      <f7-link tab-link="#tab-employees" icon-f7="person_3_fill" text="Karyawan" href="/employees"></f7-link>
      <f7-link tab-link="#tab-reports" tab-link-active icon-f7="chart_bar_fill" text="Laporan" href="/reports"></f7-link>
    </f7-toolbar>
  </f7-page>
</template>

<script>
import { f7 } from 'framework7-vue';

export default {
  name: 'ReportPage',
  data() {
    const today = new Date().toISOString().split('T')[0];
    return {
      reportType: 'daily',
      dateFrom: today,
      dateTo: today,
      summary: {
        revenue: 2450000,
        transactions: 45,
        avgTransaction: 54444,
        customers: 38,
      },
      bestSellingProducts: [
        { id: 1, name: 'Cappuccino', sold: 25, price: 30000 },
        { id: 2, name: 'Latte', sold: 22, price: 32000 },
        { id: 3, name: 'Espresso', sold: 18, price: 25000 },
        { id: 4, name: 'Americano', sold: 15, price: 28000 },
        { id: 5, name: 'Mocha', sold: 12, price: 35000 },
      ],
      salesByCategory: [
        { name: 'Minuman', amount: 1750000, percentage: 71 },
        { name: 'Makanan', amount: 700000, percentage: 29 },
      ],
      hourlySales: [
        { time: '08:00', sales: 150000 },
        { time: '09:00', sales: 280000 },
        { time: '10:00', sales: 420000 },
        { time: '11:00', sales: 380000 },
        { time: '12:00', sales: 450000 },
        { time: '13:00', sales: 320000 },
        { time: '14:00', sales: 180000 },
        { time: '15:00', sales: 270000 },
      ],
      paymentMethods: [
        { name: 'Tunai', amount: 1200000, count: 25, percentage: 49 },
        { name: 'Kartu Debit', amount: 800000, count: 12, percentage: 33 },
        { name: 'E-Wallet', amount: 450000, count: 8, percentage: 18 },
      ],
      employeePerformance: [
        { id: 1, name: 'Rina Wijaya', transactions: 18, total: 980000 },
        { id: 2, name: 'Lina Marlina', transactions: 15, total: 820000 },
        { id: 3, name: 'Agus Setiawan', transactions: 12, total: 650000 },
      ],
    };
  },
  computed: {
    maxHourlySales() {
      return Math.max(...this.hourlySales.map(h => h.sales));
    },
  },
  methods: {
    generateReport() {
      f7.toast.create({
        text: 'Laporan berhasil di-generate!',
        position: 'center',
        closeTimeout: 2000,
      }).open();
    },
    exportPDF() {
      f7.dialog.alert('Fitur export PDF akan segera tersedia', 'DigiCaf');
    },
    exportExcel() {
      f7.dialog.alert('Fitur export Excel akan segera tersedia', 'DigiCaf');
    },
  },
};
</script>
