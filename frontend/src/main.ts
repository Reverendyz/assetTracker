import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);

const vuetify = createVuetify({
  components,
  directives,
});

app.use(vuetify);
app.use(router);
app.mount('#app');
