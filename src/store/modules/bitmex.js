import apiBitmex from '@/api/bitmex'

const state = {
  activeSymbol: null,
  instrument: [],
  tradeBucketed: [],
}

const getters = {
  instrument: state => state.instrument,
  tradeBucketed: state => state.tradeBucketed,
  activeSymbol: state => state.activeSymbol,
}

const mutations = {
  setActiveSymbol(state, activeSymbol) {
    state.activeSymbol = activeSymbol
  },
  setInstrument(store, items) {
    store.instrument = []

    items.forEach((item) => {
      store.instrument.push({
        symbol: item.symbol,
        lastPrice: item.lastPrice,
      })
    })
  },
  setTradeBucketed(store, items) {
    store.tradeBucketed = []

    items.forEach((item) => {
      store.tradeBucketed.push({
        symbol: item.symbol,
        timestamp: item.timestamp,
        open: item.open,
        high: item.high,
        low: item.low,
        close: item.close,
        grossValue: item.value,
      })
    })
  }
}

const actions = {
  async getInstrument({ commit }) {
    return await apiBitmex.instrument().then((res) => {
      commit('setInstrument', res.data)
    })
  },
  async tradeBucketed({ commit }, symbol) {
    return await apiBitmex.tradeBucketed(symbol).then((res) => {
      commit('setActiveSymbol', symbol)
      commit('setTradeBucketed', res.data)
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
