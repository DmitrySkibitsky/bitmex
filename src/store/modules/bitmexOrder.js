import apiBitmex from '@/api/bitmex'

const state = {
  orders: [],
}

const getters = {
  orders: state => state.orders,
}

const mutations = {
  putOrder(store, order) {
    store.orders.unshift(order)
  },
  setOrders(state, items) {
    state.orders = items
  }
}

const actions = {
  async create({ commit }, { qty, side, activeSymbol}) {
    return await apiBitmex.createOrder(
      activeSymbol,
      qty,
      side
    ).then((res) => {
      commit('putOrder', res.data)
    })
  },
  async get({ commit }) {
    await apiBitmex.getOrders().then((res) => {
      commit('setOrders', res.data)
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
