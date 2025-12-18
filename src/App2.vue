<template>
  <f7-app :params="f7params">
    <f7-view main class="safe-areas">
      <!-- HomePage -->
      <HomePage v-if="currentPage === 'home'" @navigate="navigateTo" />
      <!-- StockPage -->
      <StockPage v-else-if="currentPage === 'stock'" @navigate="navigateTo" />
      <!-- POSPage -->
      <POSPage v-else-if="currentPage === 'pos'" @navigate="navigateTo" />
      <!-- CustomerPage -->
      <CustomerPage v-else-if="currentPage === 'customers'" @navigate="navigateTo" />
      <!-- EmployeePage -->
      <EmployeePage v-else-if="currentPage === 'employees'" @navigate="navigateTo" />
      <!-- ReportPage -->
      <ReportPage v-else-if="currentPage === 'reports'" @navigate="navigateTo" />
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
      currentPage: 'home',
      f7params: {
        name: 'DigiCaf',
        theme: 'auto',
      },
    };
  },
  methods: {
    navigateTo(page) {
      this.currentPage = page;
    },
  },
  mounted() {
    f7ready(() => {
      console.log('DigiCaf App Ready - Manual Navigation');
    });
  },
};
</script>
