import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'
import router from "./routes"
import axios from 'axios'
import ValidationErrors from './components/common/ValidationErrors';
import store from './store';
import users from './Apis/users';
import { logOut} from "../src/utils/auth";

const VueUploadComponent = require('vue-upload-component');

Vue.use(VueRouter);
// Vue.config.devtools = true
// Vue.use(axios)
Vue.prototype.$axios = axios
axios.defaults.withCredentials = true;
Vue.component("v-errors", ValidationErrors);
Vue.component('pagination', require('laravel-vue-pagination'));
Vue.component('file-upload', VueUploadComponent)

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});

axios.interceptors.response.use(
  response => {
    console.log("Within interceptor response");
    return response
  },
  error => {
    console.log("Within interceptor error");
    if (401 == error.response.status) {
      console.log("Within interceptor error -");

      this.$store.dispatch('islogut', []);
      logOut();
      users.logout();
      const logoutError = "Your session was expired. Please login again.";
      router.push({ name: 'home', params: { logoutError: logoutError } });
    }

    return Promise.reject(error);
  });
