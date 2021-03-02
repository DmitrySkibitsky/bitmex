import Vue from 'vue'

import Dayjs from 'vue-dayjs'
Vue.use(Dayjs, {
  lang: 'en',
})

import DefaultLayout from '@/layouts/Default'

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

import router from './router'
import vuetify from './plugins/vuetify'
import store from './store'

Vue.config.productionTip = false

Vue.axios.interceptors.request.use((request) => {
  return request
})

new Vue({
  router,
  vuetify,
  store,
  render: h => h(DefaultLayout)
}).$mount('#app')
