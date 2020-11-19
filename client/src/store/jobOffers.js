import axios from 'axios'
import qs from 'qs'

export default ({
  state: {
    jobOffers: [],
    products: [],
    sessionId: ''
  },
  getters: {
    getJobOffers (state) {
      return state.jobOffers
    },
    getProducts (state) {
      return state.products
    },
    getSessionId (state) {
      return state.sessionId
    },
    getTechnologies (state) {
      const offersTechnologies = new Set(state.jobOffers.data.map(offerObj => offerObj.technologies).flat())
      return [...offersTechnologies]
    }
  },
  mutations: {
    SET_JOB_OFFERS (state, offersPayload) {
      state.jobOffers = offersPayload
    },
    SET_PRODUCTS (state, productsPayload) {
      state.products = productsPayload
    },
    SET_SESSION_ID (state, sessionId) {
      state.sessionId = sessionId
    }
  },
  actions: {
    async fetchJobOffers ({ commit }, queries) {
      try {
        const queriesFilter = Object.keys(queries)
          .filter(e => {
            return queries[e] !== null && queries[e] !== ''
          })
          .reduce((o, e) => {
            o[e] = queries[e]
            return o
          }, {})
        const offersData = await axios.get(`http://localhost:5000/api/v1/offers?page=${queriesFilter.page}`, {
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
    async fetchProducts ({ commit }) {
      try {
        const productsData = await axios.get('http://localhost:5000/api/v1/products')
        commit('SET_PRODUCTS', productsData.data)
      } catch (error) {
        console.log(error)
      }
    },
    async postJobOffer (_, payload) {
      const { title, category, type, salaryMin, salaryMax, description, contract, technologies, location } = payload
      try {
        await axios.post('http://localhost:5000/api/v1/offers', {
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
      } catch (error) {
        console.log(error)
      }
    },
    async createPaymentSession ({ commit }, payload) {
      const { title, category, type, salaryMin, salaryMax, description, contract, technologies, location, productId } = payload
      try {
        const response = await axios.post('http://localhost:5000/api/v1/payments', {
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
