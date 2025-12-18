<template>
  <f7-app :params="f7params">
    <f7-view main url="/" :push-state="true" :push-state-separator=""></f7-view>
  </f7-app>
</template>

<script>
import { f7, f7ready } from 'framework7-vue';
import routes from './routes';

export default {
  name: 'App',
  data() {
    return {
      f7params: {
        name: 'DigiCaf',
        theme: 'auto',
        routes: routes,
        view: {
          pushState: true,
          pushStateSeparator: '',
        },
      },
    };
  },
  mounted() {
    f7ready(() => {
      // App initialization
      console.log('DigiCaf App Ready');
    });
  },
};
</script>
