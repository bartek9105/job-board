import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import offers from './modules/offers'
import products from './modules/products'
import users from './modules/users'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: null,
    windowWidth: null
  },
  getters: {
    getIsLoading(state) {
      return state.isLoading
    },
    isMedium(state) {
      return state.windowWidth <= 768
    },
    isSmall(state) {
      return state.windowWidth <= 576
    }
  },
  mutations: {
    SET_IS_LOADING(state, isLoading) {
      state.isLoading = isLoading
    },
    SET_WINDOW_WIDTH(state, windowWidth) {
      state.windowWidth = windowWidth
    }
  },
  actions: {
    setIsLoading({ commit }, isLoading) {
      commit('SET_IS_LOADING', isLoading)
    }
  },
  modules: {
    auth,
    offers,
    products,
    users
  }
})
