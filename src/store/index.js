
import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import bitmexOrder from './modules/bitmexOrder'
import bitmexInstrument from './modules/bitmexInstrument'
import bitmexTradeBucketed from './modules/bitmaxTradeBucketed'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    app,
    bitmexOrder,
    bitmexInstrument,
    bitmexTradeBucketed,
  },
  strict: debug
})
