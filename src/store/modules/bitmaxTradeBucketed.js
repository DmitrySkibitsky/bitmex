import apiBitmex from '@/api/bitmex'

function getTradeBuckedObject(item) {
  return {
    symbol: item.symbol,
    timestamp: item.timestamp,
    open: item.open,
    high: item.high,
    low: item.low,
    close: item.close,
    grossValue: item.value,
  }
}

const state = {
  tradeBucketed: [],
}

const getters = {
  tradeBucketed: state => state.tradeBucketed,
}

const mutations = {
  set(store, items) {
    store.tradeBucketed = []

    items.forEach((item) => {
      store.tradeBucketed.push(getTradeBuckedObject(item))
    })
  },
  insert(state, items) {
    items.forEach((item) => {
      state.tradeBucketed.unshift(getTradeBuckedObject(item))
    })
  },
}

const actions = {
  async get({ commit }, symbol) {
    return await apiBitmex.tradeBucketed(symbol).then((res) => {
      commit('set', res.data)
    })
  },
  insert({ commit }, items) {
    commit('insert', items)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
