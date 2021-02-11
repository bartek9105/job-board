import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import offers from './modules/offers'
import products from './modules/products'
import benefits from './modules/benefits'
import users from './modules/users'

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
    products,
    benefits,
    users
  }
})
