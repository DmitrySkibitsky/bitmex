const state = {
  appName: process.env.VUE_APP_NAME,
}

const getters = {
  appName: state => state.appName,
}

const mutations = {
}

const actions = {
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
