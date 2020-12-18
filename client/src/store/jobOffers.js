import qs from 'qs'
import Api from '../services/Api'

export default ({
  state: {
    jobOffers: [],
    offer: {},
    products: [],
    sessionId: ''
  },
  getters: {
    getJobOffer(state) {
      return state.offer
    },
    getJobOffers(state) {
      return state.jobOffers
    },
    getProducts(state) {
      return state.products
    },
    getSessionId(state) {
      return state.sessionId
    },
    getTechnologies(state) {
      const offersTechnologies = new Set(state.jobOffers.data.map(offerObj => offerObj.technologies).flat())
      return [...offersTechnologies]
    }
  },
  mutations: {
    SET_JOB_OFFER(state, offer) {
      state.offer = offer
    },
    SET_JOB_OFFERS(state, offersPayload) {
      state.jobOffers = offersPayload
    },
    SET_PRODUCTS(state, productsPayload) {
      state.products = productsPayload
    },
    SET_SESSION_ID(state, sessionId) {
      state.sessionId = sessionId
    }
  },
  actions: {
    async fetchJobOffer({ commit }, offerId) {
      try {
        const offer = await Api().get(`offers/${offerId}`)
        commit('SET_JOB_OFFER', offer.data.data)
      } catch (error) {
        console.log(error)
      }
    },
    async fetchJobOffers({ commit }, queries) {
      try {
        const queriesFilter = Object.keys(queries)
          .filter(e => {
            return queries[e] !== null && queries[e] !== ''
          })
          .reduce((o, e) => {
            o[e] = queries[e]
            return o
          }, {})
        const offersData = await Api().get(`offers?page=${queriesFilter.page}`, {
          params: {
            technologies: { in: queriesFilter.technologies },
            seniority: queriesFilter.seniority,
            category: queriesFilter.category,
            q: queriesFilter.location,
            type: queriesFilter.type,
            salary: { lt: queriesFilter.salaryMax, gt: queriesFilter.salaryMin },
            contract: queriesFilter.contract

          },
          paramsSerializer: params => qs.stringify(params)
        })
        commit('SET_JOB_OFFERS', offersData.data)
      } catch (error) {
        console.log(error)
      }
    },
    async fetchProducts({ commit }) {
      try {
        const productsData = await Api().get('products')
        commit('SET_PRODUCTS', productsData.data)
      } catch (error) {
        console.log(error)
      }
    },
    async addJobOffer({ commit }, payload) {
      const { title, category, type, salaryMin, salaryMax, description, contract, technologies, location, productId } = payload
      try {
        const response = await Api().post('offers', {
          productId: productId,
          email: 'example@email.com',
          title: title,
          category: category,
          type: type,
          salaryMin: salaryMin,
          salaryMax: salaryMax,
          description: description,
          contract: contract,
          technologies: technologies,
          location: location
        })
        const sessionId = response.data.id
        commit('SET_SESSION_ID', sessionId)
      } catch (error) {
        console.log(error)
      }
    }
  }
})
