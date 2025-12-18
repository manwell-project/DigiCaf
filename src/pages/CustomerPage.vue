<template>
  <f7-page name="customers">
    <f7-navbar title="Manajemen Pelanggan" />
    
    <f7-page-content>
      <!-- Search and Add Button -->
      <f7-block>
        <f7-row>
          <f7-col width="70">
            <f7-searchbar
              :custom-search="true"
              placeholder="Cari pelanggan..."
              :clear-button="true"
              @searchbar:search="onSearch"
            ></f7-searchbar>
          </f7-col>
          <f7-col width="30">
            <f7-button fill @click="openAddSheet">+ Tambah</f7-button>
          </f7-col>
        </f7-row>
      </f7-block>

      <!-- Customer Stats -->
      <div class="stats-grid" style="padding: 0 12px;">
        <div class="stats-card">
          <div class="stats-number">{{ customers.length }}</div>
          <div class="stats-label">Total Pelanggan</div>
        </div>
        <div class="stats-card">
          <div class="stats-number">{{ activeCustomers }}</div>
          <div class="stats-label">Pelanggan Aktif</div>
        </div>
        <div class="stats-card">
          <div class="stats-number">{{ vipCustomers }}</div>
          <div class="stats-label">Pelanggan VIP</div>
        </div>
      </div>

      <!-- Customer List -->
      <f7-block-title>Daftar Pelanggan</f7-block-title>
      <f7-card>
        <f7-card-content :padding="false">
          <f7-list media-list>
            <f7-list-item 
              v-for="customer in filteredCustomers" 
              :key="customer.id"
              :title="customer.name"
              :subtitle="customer.phone"
              :text="`${customer.email} | Total Transaksi: ${customer.totalOrders}`"
              swipeout
              @swipeout:deleted="deleteCustomer(customer.id)"
            >
              <template #media>
                <div style="width: 44px; height: 44px; border-radius: 50%; background: var(--coffee-light); display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; font-size: 18px;">
                  {{ customer.name.charAt(0).toUpperCase() }}
                </div>
              </template>
              <template #after>
                <f7-chip 
                  :text="customer.tier" 
                  :color="customer.tier === 'VIP' ? 'orange' : customer.tier === 'Gold' ? 'yellow' : 'blue'"
                ></f7-chip>
              </template>
              <f7-swipeout-actions right>
                <f7-swipeout-button color="blue" @click="editCustomer(customer)">Edit</f7-swipeout-button>
                <f7-swipeout-button color="green" @click="viewHistory(customer)">Riwayat</f7-swipeout-button>
                <f7-swipeout-button color="red" delete confirm-text="Hapus pelanggan ini?">Hapus</f7-swipeout-button>
              </f7-swipeout-actions>
            </f7-list-item>
          </f7-list>
        </f7-card-content>
      </f7-card>
    </f7-page-content>

    <!-- Add/Edit Customer Sheet -->
    <f7-sheet
      :opened="sheetOpened"
      @sheet:closed="sheetOpened = false"
      style="height: auto;"
      swipe-to-close
    >
      <f7-toolbar>
        <div class="left"></div>
        <div class="right">
          <f7-link sheet-close>Tutup</f7-link>
        </div>
      </f7-toolbar>
      <f7-page-content>
        <f7-block-title>{{ editMode ? 'Edit' : 'Tambah' }} Pelanggan</f7-block-title>
        <f7-list>
          <f7-list-input
            label="Nama Lengkap"
            type="text"
            placeholder="Masukkan nama lengkap"
            :value="currentCustomer.name"
            @input="currentCustomer.name = $event.target.value"
          ></f7-list-input>
          <f7-list-input
            label="Nomor Telepon"
            type="tel"
            placeholder="Contoh: 08123456789"
            :value="currentCustomer.phone"
            @input="currentCustomer.phone = $event.target.value"
          ></f7-list-input>
          <f7-list-input
            label="Email"
            type="email"
            placeholder="email@example.com"
            :value="currentCustomer.email"
            @input="currentCustomer.email = $event.target.value"
          ></f7-list-input>
          <f7-list-input
            label="Alamat"
            type="textarea"
            placeholder="Masukkan alamat lengkap"
            :value="currentCustomer.address"
            @input="currentCustomer.address = $event.target.value"
          ></f7-list-input>
          <f7-list-input
            label="Tier"
            type="select"
            :value="currentCustomer.tier"
            @input="currentCustomer.tier = $event.target.value"
          >
            <option value="Regular">Regular</option>
            <option value="Gold">Gold</option>
            <option value="VIP">VIP</option>
          </f7-list-input>
        </f7-list>
        <f7-block>
          <f7-button fill large @click="saveCustomer">Simpan</f7-button>
        </f7-block>
      </f7-page-content>
    </f7-sheet>

    <!-- Customer History Sheet -->
    <f7-sheet
      :opened="historySheetOpened"
      @sheet:closed="historySheetOpened = false"
      style="height: 70%;"
      swipe-to-close
    >
      <f7-toolbar>
        <div class="left"></div>
        <div class="right">
          <f7-link sheet-close>Tutup</f7-link>
        </div>
      </f7-toolbar>
      <f7-page-content>
        <f7-block-title v-if="selectedCustomer">Riwayat Transaksi - {{ selectedCustomer.name }}</f7-block-title>
        <f7-list>
          <f7-list-item 
            v-for="order in customerOrders" 
            :key="order.id"
            :title="`Order #${order.id}`"
            :subtitle="order.date"
            :after="`Rp ${order.total.toLocaleString('id-ID')}`"
          >
            <template #text>{{ order.items }}</template>
          </f7-list-item>
        </f7-list>
      </f7-page-content>
    </f7-sheet>

    <!-- Bottom Toolbar -->
    <f7-toolbar tabbar labels bottom>
      <f7-link tab-link="#tab-home" icon-f7="house_fill" text="Dashboard" href="/"></f7-link>
      <f7-link tab-link="#tab-stock" icon-f7="cube_box_fill" text="Stok" href="/stock"></f7-link>
      <f7-link tab-link="#tab-pos" icon-f7="money_dollar_circle_fill" text="POS" href="/pos"></f7-link>
      <f7-link tab-link="#tab-customers" tab-link-active icon-f7="person_2_fill" text="Pelanggan" href="/customers"></f7-link>
      <f7-link tab-link="#tab-employees" icon-f7="person_3_fill" text="Karyawan" href="/employees"></f7-link>
      <f7-link tab-link="#tab-reports" icon-f7="chart_bar_fill" text="Laporan" href="/reports"></f7-link>
    </f7-toolbar>
  </f7-page>
</template>

<script>
import { f7 } from 'framework7-vue';

export default {
  name: 'CustomerPage',
  data() {
    return {
      sheetOpened: false,
      historySheetOpened: false,
      editMode: false,
      searchQuery: '',
      customers: [
        { id: 1, name: 'Budi Santoso', phone: '081234567890', email: 'budi@email.com', address: 'Jl. Merdeka No. 123', tier: 'VIP', totalOrders: 45 },
        { id: 2, name: 'Siti Nurhaliza', phone: '082345678901', email: 'siti@email.com', address: 'Jl. Sudirman No. 45', tier: 'Gold', totalOrders: 28 },
        { id: 3, name: 'Ahmad Rizki', phone: '083456789012', email: 'ahmad@email.com', address: 'Jl. Gatot Subroto No. 67', tier: 'Regular', totalOrders: 12 },
        { id: 4, name: 'Dewi Lestari', phone: '084567890123', email: 'dewi@email.com', address: 'Jl. Diponegoro No. 89', tier: 'Gold', totalOrders: 32 },
        { id: 5, name: 'Rudi Hermawan', phone: '085678901234', email: 'rudi@email.com', address: 'Jl. Ahmad Yani No. 12', tier: 'Regular', totalOrders: 8 },
        { id: 6, name: 'Maya Susanti', phone: '086789012345', email: 'maya@email.com', address: 'Jl. Pahlawan No. 34', tier: 'VIP', totalOrders: 56 },
      ],
      currentCustomer: {
        name: '',
        phone: '',
        email: '',
        address: '',
        tier: 'Regular',
        totalOrders: 0,
      },
      selectedCustomer: null,
      customerOrders: [],
    };
  },
  computed: {
    filteredCustomers() {
      if (!this.searchQuery) {
        return this.customers;
      }
      return this.customers.filter(customer => 
        customer.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        customer.phone.includes(this.searchQuery) ||
        customer.email.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    activeCustomers() {
      return this.customers.filter(c => c.totalOrders > 0).length;
    },
    vipCustomers() {
      return this.customers.filter(c => c.tier === 'VIP').length;
    },
  },
  methods: {
    onSearch(sb, query) {
      this.searchQuery = query;
    },
    openAddSheet() {
      this.editMode = false;
      this.currentCustomer = {
        name: '',
        phone: '',
        email: '',
        address: '',
        tier: 'Regular',
        totalOrders: 0,
      };
      this.sheetOpened = true;
    },
    editCustomer(customer) {
      this.editMode = true;
      this.currentCustomer = { ...customer };
      this.sheetOpened = true;
    },
    saveCustomer() {
      if (!this.currentCustomer.name || !this.currentCustomer.phone) {
        f7.dialog.alert('Harap isi nama dan nomor telepon!', 'DigiCaf');
        return;
      }

      if (this.editMode) {
        const index = this.customers.findIndex(c => c.id === this.currentCustomer.id);
        if (index !== -1) {
          this.customers[index] = { ...this.currentCustomer };
        }
      } else {
        this.currentCustomer.id = Date.now();
        this.customers.push({ ...this.currentCustomer });
      }

      this.sheetOpened = false;
      f7.toast.create({
        text: this.editMode ? 'Pelanggan berhasil diupdate!' : 'Pelanggan berhasil ditambahkan!',
        position: 'center',
        closeTimeout: 2000,
      }).open();
    },
    deleteCustomer(id) {
      this.customers = this.customers.filter(c => c.id !== id);
      f7.toast.create({
        text: 'Pelanggan berhasil dihapus!',
        position: 'center',
        closeTimeout: 2000,
      }).open();
    },
    viewHistory(customer) {
      this.selectedCustomer = customer;
      // Generate sample order history
      this.customerOrders = [
        { id: 1001, date: '2024-01-15 10:30', items: '2x Cappuccino, 1x Croissant', total: 80000 },
        { id: 1002, date: '2024-01-18 14:20', items: '1x Latte, 2x Sandwich', total: 102000 },
        { id: 1003, date: '2024-01-20 09:15', items: '3x Espresso', total: 75000 },
      ];
      this.historySheetOpened = true;
    },
  },
};
</script>
