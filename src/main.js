import { createApp } from 'vue';
import Framework7 from 'framework7/lite-bundle';
import Framework7Vue, { registerComponents } from 'framework7-vue/bundle';

// Import Framework7 Styles
import 'framework7/css/bundle';

// Import Framework7-Icons
import 'framework7-icons';

// Import App Component
import App from './App.vue';

// Import custom styles
import './css/app.css';

// Init Framework7 Vue Plugin
Framework7.use(Framework7Vue);

// Init App
const app = createApp(App);

// Register Framework7 Vue components
registerComponents(app);

// Mount the app
app.mount('#app');
