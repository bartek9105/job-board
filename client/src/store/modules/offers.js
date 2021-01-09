import Vue from 'vue'
import qs from 'qs'
import axiosInstance from '../../services/Api'

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
        const offer = await axiosInstance.get(`offers/${offerId}`)
        commit('SET_OFFER', offer.data.data)
      } catch (error) {
        console.log(error)
      }
    },
    async fetchOffers({ commit }, queries) {
      try {
        const queriesFilter = Object.keys(queries)
          .filter(e => {
            return queries[e] !== null && queries[e] !== ''
          })
          .reduce((o, e) => {
            o[e] = queries[e]
            return o
          }, {})
        const offersData = await axiosInstance.get(
          `offers?page=${queriesFilter.page}`,
          {
            params: {
              technologies: { in: queriesFilter.technologies },
              seniority: queriesFilter.seniority,
              category: queriesFilter.category,
              q: queriesFilter.location,
              type: queriesFilter.type,
              salary: {
                lt: queriesFilter.salaryMax,
                gt: queriesFilter.salaryMin
              },
              contract: queriesFilter.contract
            },
            paramsSerializer: params => qs.stringify(params)
          }
        )
        commit('SET_OFFERS', offersData.data)
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
      const {
        title,
        isRemote,
        category,
        type,
        seniority,
        salaryMin,
        salaryMax,
        description,
        contract,
        technologies,
        location,
        productId
      } = payload
      try {
        const response = await axiosInstance.post('offers', {
          productId,
          email: 'example@email.com',
          title,
          isRemote,
          category,
          type,
          seniority,
          salaryMin,
          salaryMax,
          description,
          contract,
          technologies,
          location
        })
        Vue.toasted.success('Added job offer')
        const sessionId = response.data.id
        commit('SET_SESSION_ID', sessionId)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
