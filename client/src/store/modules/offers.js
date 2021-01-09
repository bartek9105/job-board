import Vue from 'vue'
import axiosInstance from '../../services/Api'
import OfferService from '../../services/offer.service'

export default {
  state: {
    offers: [],
    offer: {},
    products: [],
    sessionId: ''
  },
  getters: {
    getOffer(state) {
      return state.offer
    },
    getOffers(state) {
      return state.offers
    },
    getProducts(state) {
      return state.products
    },
    getSessionId(state) {
      return state.sessionId
    }
  },
  mutations: {
    SET_OFFER(state, offer) {
      state.offer = offer
    },
    SET_OFFERS(state, offersPayload) {
      state.offers = offersPayload
    },
    SET_PRODUCTS(state, productsPayload) {
      state.products = productsPayload
    },
    SET_SESSION_ID(state, sessionId) {
      state.sessionId = sessionId
    }
  },
  actions: {
    async fetchOffer({ commit }, offerId) {
      try {
        const offer = await OfferService.fetchOffer(offerId)
        commit('SET_OFFER', offer)
      } catch (error) {
        console.log(error)
      }
    },
    async fetchOffers({ commit }, offersQueries) {
      try {
        const offers = await OfferService.fetchOffers(offersQueries)
        commit('SET_OFFERS', offers)
      } catch (error) {
        console.log(error)
      }
    },
    async fetchProducts({ commit }) {
      try {
        const productsData = await axiosInstance.get('products')
        commit('SET_PRODUCTS', productsData.data)
      } catch (error) {
        console.log(error)
      }
    },
    async addOffer({ commit }, payload) {
      try {
        const addedOffer = await OfferService.addOffer(payload)
        Vue.toasted.success('Added job offer')
        const sessionId = addedOffer.id
        commit('SET_SESSION_ID', sessionId)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
