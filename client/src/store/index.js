import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import jobOffers from './jobOffers'
import users from './users'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    jobOffers,
    users
  }
})
