import Vue from 'vue'
import OfferService from '../../services/offer.service'
import UserService from '../../services/user.service'
import { v4 as uuidv4 } from 'uuid';
import router from '../../router/index'

export default {
  state: {
    offers: {},
    offersByUser: [],
    offer: {},
    sessionId: ''
  },
  getters: {
    getOffer: (state) => (id) => {
      return id ? state.offers.data.filter(offer => offer._id === id) : state.offer
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
      const offerByUserIndex = state.offersByUser.findIndex(offer => offer._id === offerId)
      state.offersByUser.splice(offerByUserIndex, 1)
      const offerIndex = state.offers.data.findIndex(offer => offer._id === offerId)
      state.offers.data.splice(offerIndex, 1)
    },
    SET_SESSION_ID(state, sessionId) {
      state.sessionId = sessionId
    },
    SET_PREVIEW_OFFER(state, offer) {
      state.offer = offer
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
        Vue.toasted.success('Offer added', { icon: 'check-circle' })
        const sessionId = addedOffer._id
        commit('SET_SESSION_ID', sessionId)
        return addedOffer
      } catch (error) {
        console.log(error)
      }
    },
    async editOffer(_, offerData) {
      try {
        await OfferService.editOffer(offerData)
        Vue.toasted.success('Offer edited', { icon: 'check-circle' })
        router.replace('/dashboard')
      } catch (error) {
        console.log(error)
      }
    },
    async removeOffer({ commit }, offerId) {
      try {
        await OfferService.deleteOffer(offerId)
        commit('DELETE_OFFER', offerId)
        Vue.toasted.success('Offer deleted', { icon: 'check-circle' })
      } catch (error) {
        console.log(error)
      }
    },
    async addPreviewOffer({ commit }, offerData) {
      try {
        const userData = await UserService.fetchUserInfo()
        const previewOffer = { _id: uuidv4(), creator: userData, ...offerData }
        commit('SET_PREVIEW_OFFER', previewOffer)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
