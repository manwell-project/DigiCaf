import { createApp } from 'vue';
import Framework7 from 'framework7/lite-bundle';
import Framework7Vue, { registerComponents } from 'framework7-vue/bundle';
import 'framework7/css/bundle';
import 'framework7-icons';

import App from './App.vue';
import './css/app.css';

Framework7.use(Framework7Vue);

const app = createApp(App);
registerComponents(app);
app.mount('#app');
