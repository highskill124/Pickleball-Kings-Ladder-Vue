import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'
import router from "./routes"
import axios from 'axios'
import ValidationErrors from './components/common/ValidationErrors';
import store from './store';

Vue.use(VueRouter);
Vue.config.devtools = true
// Vue.use(axios)
Vue.prototype.$axios = axios
axios.defaults.withCredentials = true;
Vue.component("v-errors", ValidationErrors);
Vue.component('pagination', require('laravel-vue-pagination'));

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
