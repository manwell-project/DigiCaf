<template>
  <f7-app :params="f7params">
    <f7-view main class="safe-areas">
      <f7-page name="app">
        <f7-tabs>
          <!-- Tab 1: Home/Dashboard -->
          <f7-tab id="tab-home" tab-active>
            <HomePage />
          </f7-tab>

          <!-- Tab 2: Stock -->
          <f7-tab id="tab-stock">
            <StockPage />
          </f7-tab>

          <!-- Tab 3: POS -->
          <f7-tab id="tab-pos">
            <POSPage />
          </f7-tab>

          <!-- Tab 4: Customers -->
          <f7-tab id="tab-customers">
            <CustomerPage />
          </f7-tab>

          <!-- Tab 5: Employees -->
          <f7-tab id="tab-employees">
            <EmployeePage />
          </f7-tab>

          <!-- Tab 6: Reports -->
          <f7-tab id="tab-reports">
            <ReportPage />
          </f7-tab>
        </f7-tabs>

        <!-- Bottom Toolbar -->
        <f7-toolbar tabbar labels bottom>
          <f7-link tab-link="#tab-home" tab-link-active icon-f7="house_fill" text="Dashboard"></f7-link>
          <f7-link tab-link="#tab-stock" icon-f7="cube_box_fill" text="Stok"></f7-link>
          <f7-link tab-link="#tab-pos" icon-f7="money_dollar_circle_fill" text="POS"></f7-link>
          <f7-link tab-link="#tab-customers" icon-f7="person_2_fill" text="Pelanggan"></f7-link>
          <f7-link tab-link="#tab-employees" icon-f7="person_3_fill" text="Karyawan"></f7-link>
          <f7-link tab-link="#tab-reports" icon-f7="chart_bar_fill" text="Laporan"></f7-link>
        </f7-toolbar>
      </f7-page>
    </f7-view>
  </f7-app>
</template>

<script>
import { f7ready } from 'framework7-vue';

// Import pages
import HomePage from './pages/HomePage.vue';
import StockPage from './pages/StockPage.vue';
import POSPage from './pages/POSPage.vue';
import CustomerPage from './pages/CustomerPage.vue';
import EmployeePage from './pages/EmployeePage.vue';
import ReportPage from './pages/ReportPage.vue';

export default {
  name: 'App',
  components: {
    HomePage,
    StockPage,
    POSPage,
    CustomerPage,
    EmployeePage,
    ReportPage,
  },
  data() {
    return {
      f7params: {
        name: 'DigiCaf',
        theme: 'auto',
      },
    };
  },
  mounted() {
    f7ready(() => {
      console.log('DigiCaf App Ready - Tab Based Navigation');
    });
  },
};
</script>

