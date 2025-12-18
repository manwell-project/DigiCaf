<template>
  <f7-page name="pos">
    <f7-navbar title="Transaksi POS" />
    
    <f7-page-content>
      <f7-block>
        <f7-row>
          <!-- Menu Items (Left Side) -->
          <f7-col width="100" tablet-width="60">
            <f7-block-title>Menu</f7-block-title>
            
            <!-- Category Filter -->
            <f7-block>
              <f7-segmented strong>
                <f7-button :active="activeCategory === 'all'" @click="filterCategory('all')">Semua</f7-button>
                <f7-button :active="activeCategory === 'minuman'" @click="filterCategory('minuman')">Minuman</f7-button>
                <f7-button :active="activeCategory === 'makanan'" @click="filterCategory('makanan')">Makanan</f7-button>
              </f7-segmented>
            </f7-block>

            <!-- Menu Grid -->
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 12px; padding: 0 12px;">
              <div 
                v-for="item in filteredMenuItems" 
                :key="item.id"
                @click="addToCart(item)"
                style="background: var(--cream); border-radius: 12px; padding: 16px; text-align: center; cursor: pointer; box-shadow: 0 2px 8px rgba(74, 53, 38, 0.1); transition: transform 0.2s;"
                @mouseenter="$event.currentTarget.style.transform = 'scale(1.05)'"
                @mouseleave="$event.currentTarget.style.transform = 'scale(1)'"
              >
                <div style="font-size: 40px; margin-bottom: 8px;">{{ item.icon }}</div>
                <div style="font-weight: 600; color: var(--coffee-dark); margin-bottom: 4px;">{{ item.name }}</div>
                <div style="color: var(--coffee-light); font-weight: 600;">Rp {{ item.price.toLocaleString('id-ID') }}</div>
              </div>
            </div>
          </f7-col>

          <!-- Cart (Right Side) -->
          <f7-col width="100" tablet-width="40">
            <f7-block-title>Keranjang</f7-block-title>
            <f7-card>
              <f7-card-content :padding="false">
                <f7-list v-if="cartItems.length > 0">
                  <f7-list-item 
                    v-for="item in cartItems" 
                    :key="item.cartId"
                    :title="item.name"
                    swipeout
                    @swipeout:deleted="removeFromCart(item.cartId)"
                  >
                    <template #after>
                      <div style="display: flex; align-items: center; gap: 8px;">
                        <f7-button small @click="decreaseQty(item.cartId)">-</f7-button>
                        <span style="min-width: 30px; text-align: center; font-weight: 600;">{{ item.qty }}</span>
                        <f7-button small @click="increaseQty(item.cartId)">+</f7-button>
                      </div>
                    </template>
                    <template #subtitle>
                      Rp {{ (item.price * item.qty).toLocaleString('id-ID') }}
                    </template>
                    <f7-swipeout-actions right>
                      <f7-swipeout-button color="red" delete>Hapus</f7-swipeout-button>
                    </f7-swipeout-actions>
                  </f7-list-item>
                </f7-list>
                <div v-else style="padding: 40px; text-align: center; color: var(--coffee-medium);">
                  Keranjang masih kosong
                </div>
              </f7-card-content>
            </f7-card>

            <!-- Cart Summary -->
            <f7-card v-if="cartItems.length > 0">
              <f7-card-content>
                <f7-list>
                  <f7-list-item title="Subtotal" :after="`Rp ${subtotal.toLocaleString('id-ID')}`"></f7-list-item>
                  <f7-list-item title="Pajak (10%)" :after="`Rp ${tax.toLocaleString('id-ID')}`"></f7-list-item>
                  <f7-list-item>
                    <template #title>
                      <strong style="font-size: 18px; color: var(--coffee-dark);">Total</strong>
                    </template>
                    <template #after>
                      <strong style="font-size: 18px; color: var(--coffee-dark);">Rp {{ total.toLocaleString('id-ID') }}</strong>
                    </template>
                  </f7-list-item>
                </f7-list>

                <f7-list>
                  <f7-list-input
                    label="Nama Pelanggan"
                    type="text"
                    placeholder="Opsional"
                    :value="customerName"
                    @input="customerName = $event.target.value"
                  ></f7-list-input>
                </f7-list>

                <f7-button fill large @click="processPayment">Proses Pembayaran</f7-button>
                <f7-button large @click="clearCart" style="margin-top: 8px;">Bersihkan Keranjang</f7-button>
              </f7-card-content>
            </f7-card>
          </f7-col>
        </f7-row>
      </f7-block>
    </f7-page-content>

    <!-- Bottom Toolbar -->
    <f7-toolbar tabbar labels bottom>
      <f7-link tab-link="#tab-home" icon-f7="house_fill" text="Dashboard" href="/"></f7-link>
      <f7-link tab-link="#tab-stock" icon-f7="cube_box_fill" text="Stok" href="/stock"></f7-link>
      <f7-link tab-link="#tab-pos" tab-link-active icon-f7="money_dollar_circle_fill" text="POS" href="/pos"></f7-link>
      <f7-link tab-link="#tab-customers" icon-f7="person_2_fill" text="Pelanggan" href="/customers"></f7-link>
      <f7-link tab-link="#tab-employees" icon-f7="person_3_fill" text="Karyawan" href="/employees"></f7-link>
      <f7-link tab-link="#tab-reports" icon-f7="chart_bar_fill" text="Laporan" href="/reports"></f7-link>
    </f7-toolbar>
  </f7-page>
</template>

<script>
import { f7 } from 'framework7-vue';

export default {
  name: 'POSPage',
  data() {
    return {
      activeCategory: 'all',
      customerName: '',
      menuItems: [
        { id: 1, name: 'Espresso', category: 'minuman', price: 25000, icon: '☕' },
        { id: 2, name: 'Cappuccino', category: 'minuman', price: 30000, icon: '☕' },
        { id: 3, name: 'Latte', category: 'minuman', price: 32000, icon: '☕' },
        { id: 4, name: 'Americano', category: 'minuman', price: 28000, icon: '☕' },
        { id: 5, name: 'Mocha', category: 'minuman', price: 35000, icon: '☕' },
        { id: 6, name: 'Teh Hijau', category: 'minuman', price: 20000, icon: '🍵' },
        { id: 7, name: 'Jus Jeruk', category: 'minuman', price: 22000, icon: '🍊' },
        { id: 8, name: 'Croissant', category: 'makanan', price: 20000, icon: '🥐' },
        { id: 9, name: 'Sandwich', category: 'makanan', price: 35000, icon: '🥪' },
        { id: 10, name: 'Cake', category: 'makanan', price: 30000, icon: '🍰' },
        { id: 11, name: 'Donut', category: 'makanan', price: 15000, icon: '🍩' },
        { id: 12, name: 'Waffle', category: 'makanan', price: 32000, icon: '🧇' },
      ],
      cartItems: [],
    };
  },
  computed: {
    filteredMenuItems() {
      if (this.activeCategory === 'all') {
        return this.menuItems;
      }
      return this.menuItems.filter(item => item.category === this.activeCategory);
    },
    subtotal() {
      return this.cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
    },
    tax() {
      return Math.round(this.subtotal * 0.1);
    },
    total() {
      return this.subtotal + this.tax;
    },
  },
  methods: {
    filterCategory(category) {
      this.activeCategory = category;
    },
    addToCart(item) {
      const existingItem = this.cartItems.find(ci => ci.id === item.id);
      if (existingItem) {
        existingItem.qty++;
      } else {
        this.cartItems.push({
          ...item,
          cartId: Date.now() + Math.random(),
          qty: 1,
        });
      }
    },
    removeFromCart(cartId) {
      this.cartItems = this.cartItems.filter(item => item.cartId !== cartId);
    },
    increaseQty(cartId) {
      const item = this.cartItems.find(item => item.cartId === cartId);
      if (item) {
        item.qty++;
      }
    },
    decreaseQty(cartId) {
      const item = this.cartItems.find(item => item.cartId === cartId);
      if (item && item.qty > 1) {
        item.qty--;
      }
    },
    clearCart() {
      f7.dialog.confirm('Hapus semua item dari keranjang?', 'DigiCaf', () => {
        this.cartItems = [];
        this.customerName = '';
      });
    },
    processPayment() {
      if (this.cartItems.length === 0) {
        f7.dialog.alert('Keranjang masih kosong!', 'DigiCaf');
        return;
      }

      const customer = this.customerName || 'Pelanggan Umum';
      
      f7.dialog.confirm(
        `Proses pembayaran untuk ${customer}?\nTotal: Rp ${this.total.toLocaleString('id-ID')}`,
        'Konfirmasi Pembayaran',
        () => {
          // Process payment here
          f7.dialog.alert('Pembayaran berhasil!', 'DigiCaf', () => {
            this.cartItems = [];
            this.customerName = '';
          });
        }
      );
    },
  },
};
</script>
