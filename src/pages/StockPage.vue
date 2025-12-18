<template>
  <f7-page name="stock">
    <f7-navbar title="Kelola Stok" />
    
    <f7-page-content>
      <!-- Search and Add Button -->
      <f7-block>
        <f7-row>
          <f7-col width="70">
            <f7-searchbar
              :custom-search="true"
              placeholder="Cari item stok..."
              :clear-button="true"
              @searchbar:search="onSearch"
            ></f7-searchbar>
          </f7-col>
          <f7-col width="30">
            <f7-button fill @click="openAddSheet">+ Tambah Item</f7-button>
          </f7-col>
        </f7-row>
      </f7-block>

      <!-- Stock Categories -->
      <f7-block-title>Kategori</f7-block-title>
      <f7-block>
        <f7-segmented strong>
          <f7-button :active="activeCategory === 'all'" @click="filterCategory('all')">Semua</f7-button>
          <f7-button :active="activeCategory === 'bahan'" @click="filterCategory('bahan')">Bahan</f7-button>
          <f7-button :active="activeCategory === 'minuman'" @click="filterCategory('minuman')">Minuman</f7-button>
          <f7-button :active="activeCategory === 'makanan'" @click="filterCategory('makanan')">Makanan</f7-button>
        </f7-segmented>
      </f7-block>

      <!-- Stock Items List -->
      <f7-card>
        <f7-card-header>Daftar Stok</f7-card-header>
        <f7-card-content :padding="false">
          <f7-list media-list>
            <f7-list-item 
              v-for="item in filteredStockItems" 
              :key="item.id"
              :title="item.name"
              :subtitle="item.category"
              :text="`Harga: Rp ${item.price.toLocaleString('id-ID')}`"
              swipeout
              @swipeout:deleted="deleteItem(item.id)"
            >
              <template #after>
                <div style="text-align: right;">
                  <div :style="{ color: item.stock < item.minStock ? 'red' : 'inherit', fontWeight: 'bold' }">
                    {{ item.stock }} {{ item.unit }}
                  </div>
                  <div style="font-size: 12px; color: var(--coffee-medium);">
                    Min: {{ item.minStock }} {{ item.unit }}
                  </div>
                </div>
              </template>
              <f7-swipeout-actions right>
                <f7-swipeout-button color="blue" @click="editItem(item)">Edit</f7-swipeout-button>
                <f7-swipeout-button color="red" delete confirm-text="Hapus item ini?">Hapus</f7-swipeout-button>
              </f7-swipeout-actions>
            </f7-list-item>
          </f7-list>
        </f7-card-content>
      </f7-card>
    </f7-page-content>

    <!-- Add/Edit Item Sheet -->
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
        <f7-block-title>{{ editMode ? 'Edit' : 'Tambah' }} Item Stok</f7-block-title>
        <f7-list>
          <f7-list-input
            label="Nama Item"
            type="text"
            placeholder="Masukkan nama item"
            :value="currentItem.name"
            @input="currentItem.name = $event.target.value"
          ></f7-list-input>
          <f7-list-input
            label="Kategori"
            type="select"
            :value="currentItem.category"
            @input="currentItem.category = $event.target.value"
          >
            <option value="bahan">Bahan Baku</option>
            <option value="minuman">Minuman</option>
            <option value="makanan">Makanan</option>
          </f7-list-input>
          <f7-list-input
            label="Stok"
            type="number"
            placeholder="Jumlah stok"
            :value="currentItem.stock"
            @input="currentItem.stock = parseFloat($event.target.value)"
          ></f7-list-input>
          <f7-list-input
            label="Stok Minimum"
            type="number"
            placeholder="Stok minimum"
            :value="currentItem.minStock"
            @input="currentItem.minStock = parseFloat($event.target.value)"
          ></f7-list-input>
          <f7-list-input
            label="Satuan"
            type="text"
            placeholder="kg, liter, pcs, dll"
            :value="currentItem.unit"
            @input="currentItem.unit = $event.target.value"
          ></f7-list-input>
          <f7-list-input
            label="Harga"
            type="number"
            placeholder="Harga per satuan"
            :value="currentItem.price"
            @input="currentItem.price = parseFloat($event.target.value)"
          ></f7-list-input>
        </f7-list>
        <f7-block>
          <f7-button fill large @click="saveItem">Simpan</f7-button>
        </f7-block>
      </f7-page-content>
    </f7-sheet>

    <!-- Bottom Toolbar -->
    <f7-toolbar tabbar labels bottom>
      <f7-link tab-link="#tab-home" icon-f7="house_fill" text="Dashboard" href="/"></f7-link>
      <f7-link tab-link="#tab-stock" tab-link-active icon-f7="cube_box_fill" text="Stok" href="/stock"></f7-link>
      <f7-link tab-link="#tab-pos" icon-f7="money_dollar_circle_fill" text="POS" href="/pos"></f7-link>
      <f7-link tab-link="#tab-customers" icon-f7="person_2_fill" text="Pelanggan" href="/customers"></f7-link>
      <f7-link tab-link="#tab-employees" icon-f7="person_3_fill" text="Karyawan" href="/employees"></f7-link>
      <f7-link tab-link="#tab-reports" icon-f7="chart_bar_fill" text="Laporan" href="/reports"></f7-link>
    </f7-toolbar>
  </f7-page>
</template>

<script>
import { f7 } from 'framework7-vue';

export default {
  name: 'StockPage',
  data() {
    return {
      sheetOpened: false,
      editMode: false,
      activeCategory: 'all',
      searchQuery: '',
      stockItems: [
        { id: 1, name: 'Kopi Arabica', category: 'bahan', stock: 2, minStock: 5, unit: 'kg', price: 150000 },
        { id: 2, name: 'Kopi Robusta', category: 'bahan', stock: 8, minStock: 5, unit: 'kg', price: 120000 },
        { id: 3, name: 'Susu UHT', category: 'bahan', stock: 5, minStock: 10, unit: 'liter', price: 15000 },
        { id: 4, name: 'Gula Pasir', category: 'bahan', stock: 3, minStock: 5, unit: 'kg', price: 12000 },
        { id: 5, name: 'Espresso', category: 'minuman', stock: 50, minStock: 20, unit: 'cup', price: 25000 },
        { id: 6, name: 'Cappuccino', category: 'minuman', stock: 45, minStock: 20, unit: 'cup', price: 30000 },
        { id: 7, name: 'Latte', category: 'minuman', stock: 40, minStock: 20, unit: 'cup', price: 32000 },
        { id: 8, name: 'Croissant', category: 'makanan', stock: 20, minStock: 10, unit: 'pcs', price: 20000 },
        { id: 9, name: 'Sandwich', category: 'makanan', stock: 15, minStock: 10, unit: 'pcs', price: 35000 },
      ],
      currentItem: {
        name: '',
        category: 'bahan',
        stock: 0,
        minStock: 0,
        unit: '',
        price: 0,
      },
    };
  },
  computed: {
    filteredStockItems() {
      let items = this.stockItems;
      
      if (this.activeCategory !== 'all') {
        items = items.filter(item => item.category === this.activeCategory);
      }
      
      if (this.searchQuery) {
        items = items.filter(item => 
          item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      
      return items;
    },
  },
  methods: {
    filterCategory(category) {
      this.activeCategory = category;
    },
    onSearch(sb, query) {
      this.searchQuery = query;
    },
    openAddSheet() {
      this.editMode = false;
      this.currentItem = {
        name: '',
        category: 'bahan',
        stock: 0,
        minStock: 0,
        unit: '',
        price: 0,
      };
      this.sheetOpened = true;
    },
    editItem(item) {
      this.editMode = true;
      this.currentItem = { ...item };
      this.sheetOpened = true;
    },
    saveItem() {
      if (!this.currentItem.name || !this.currentItem.unit) {
        f7.dialog.alert('Harap isi semua field yang wajib!', 'DigiCaf');
        return;
      }

      if (this.editMode) {
        const index = this.stockItems.findIndex(item => item.id === this.currentItem.id);
        if (index !== -1) {
          this.stockItems[index] = { ...this.currentItem };
        }
      } else {
        this.currentItem.id = Date.now();
        this.stockItems.push({ ...this.currentItem });
      }

      this.sheetOpened = false;
      f7.toast.create({
        text: this.editMode ? 'Item berhasil diupdate!' : 'Item berhasil ditambahkan!',
        position: 'center',
        closeTimeout: 2000,
      }).open();
    },
    deleteItem(id) {
      this.stockItems = this.stockItems.filter(item => item.id !== id);
      f7.toast.create({
        text: 'Item berhasil dihapus!',
        position: 'center',
        closeTimeout: 2000,
      }).open();
    },
  },
};
</script>
