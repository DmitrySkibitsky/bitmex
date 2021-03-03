import Vue from 'vue'
import Dayjs from 'vue-dayjs'
import Vuelidate from 'vuelidate'
import axios from 'axios'
import VueAxios from 'vue-axios'

import router from './router'
import vuetify from './plugins/vuetify'
import store from './store'
import DefaultLayout from '@/layouts/Default'

Vue.use(Vuelidate)
Vue.use(Dayjs, {
  lang: 'en',
})

Vue.use(VueAxios, axios)

const ws = process.env.VUE_APP_API_WS
Vue.prototype.$socket = new WebSocket(`wss://${ws}`)

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
