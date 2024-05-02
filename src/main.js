import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import 'sweetalert2/dist/sweetalert2.min.css'
import OtpInput from "@bachdgvn/vue-otp-input";// Import the functions you need from the SDKs you need
import Multiselect from 'vue-multiselect'
import './services/hotTable'
import './services/formatNumber'

// TODO: Add SDKs for Firebase products that you want to use

// require styles
Vue.component('multiselect', Multiselect)
Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueSweetalert2)
Vue.component("v-otp-input", OtpInput);

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from './store'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
