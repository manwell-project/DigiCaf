import HomePage from './pages/HomePage.vue';
import StockPage from './pages/StockPage.vue';
import POSPage from './pages/POSPage.vue';
import CustomerPage from './pages/CustomerPage.vue';
import EmployeePage from './pages/EmployeePage.vue';
import ReportPage from './pages/ReportPage.vue';

export default [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/stock',
    component: StockPage,
  },
  {
    path: '/pos',
    component: POSPage,
  },
  {
    path: '/customers',
    component: CustomerPage,
  },
  {
    path: '/employees',
    component: EmployeePage,
  },
  {
    path: '/reports',
    component: ReportPage,
  },
];
