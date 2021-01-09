import Vue from 'vue'
import OfferService from '../../services/offer.service'

export default {
  state: {
    offers: [],
    offersByUser: [],
    offer: {},
    sessionId: ''
  },
  getters: {
    getOffer(state) {
      return state.offer
    },
    getOffers(state) {
      return state.offers
    },
    getOffersByUser(state) {
      return state.offersByUser
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
    SET_OFFERS_BY_USER(state, offersPayload) {
      state.offersByUser = offersPayload
    },
    DELETE_OFFER(state, offerId) {
      const offerIndex = state.offersByUser.findIndex(offer => offer._id === offerId)
      state.offersByUser.splice(offerIndex, 1)
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
    async fetchOffersByUser({ commit }) {
      try {
        const offers = await OfferService.fetchOffersByUser()
        commit('SET_OFFERS_BY_USER', offers)
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
    },
    async editOffer(_, offerData) {
      try {
        await OfferService.editOffer(offerData)
      } catch (error) {
        console.log(error)
      }
    },
    async removeOffer({ commit }, offerId) {
      try {
        await OfferService.deleteOffer(offerId)
        commit('DELETE_OFFER', offerId)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
