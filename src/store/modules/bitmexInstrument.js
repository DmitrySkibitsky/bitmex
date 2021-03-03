import apiBitmex from '@/api/bitmex'

function getInstrumentObject(item) {
  return {
    symbol: item.symbol,
    lastPrice: item.lastPrice,
  }
}

const state = {
  activeSymbol: null,
  oldActiveSymbol: null,
  instrument: [],
}

const getters = {
  instrument: state => state.instrument,
  activeSymbol: state => state.activeSymbol,
  oldActiveSymbol: state => state.oldActiveSymbol,
}

const mutations = {
  setActiveSymbol(state, activeSymbol) {
    state.activeSymbol = activeSymbol
  },
  setInstrument(store, items) {
    store.instrument = []

    items.forEach((item) => {
      store.instrument.push(getInstrumentObject(item))
    })
  },
  updateOrPushInstrument(store, item) {
    const index = store.instrument.findIndex(i => i.symbol === item.symbol)

    const instrumentObject = getInstrumentObject(item)

    if (index !== -1) {
      state.instrument.splice(index, 1, instrumentObject)
    } else {
      state.instrument.push(instrumentObject)
    }
  },
  updateOldActiveSymbol(state, value) {
    state.oldActiveSymbol = value
  },
}

const actions = {
  handlerWsInstrument({ commit }, items) {
    items.forEach(item => commit('updateOrPushInstrument', item))
  },
  async get({ commit }) {
    return await apiBitmex.instrument().then((res) => {
      commit('setInstrument', res.data)
    })
  },
  setActiveSymbol({ commit }, value) {
    commit('setActiveSymbol', value)
  },
  updateOldActiveSymbol({ commit }, value) {
    commit('updateOldActiveSymbol', value)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
