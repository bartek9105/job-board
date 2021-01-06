import axiosInstance from '../services/Api'

export default ({
  state: {
    offers: []
  },
  getters: {
    getOffersByUser(state) {
      return state.offers
    }
  },
  mutations: {
    SET_OFFERS_BY_USER(state, offers) {
      state.offers = offers
    }
  },
  actions: {
    async fetchOffersByUser({ commit }) {
      const userId = JSON.parse(window.localStorage.getItem('currentUser')).id
      try {
        const offers = await axiosInstance.get(`users/${userId}/offers`)
        commit('SET_OFFERS_BY_USER', offers.data)
      } catch (error) {
        console.log(error)
      }
    }
  }
})