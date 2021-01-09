import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import offers from './modules/offers'
import users from './modules/users'
import technologies from './modules/technologies'

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
    offers,
    users,
    technologies
  }
})
