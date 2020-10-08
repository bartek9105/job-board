import axios from 'axios'
import qs from 'qs'

export default ({
  state: {
    jobOffers: []
  },
  getters: {
    getJobOffers (state) {
      return state.jobOffers
    },
    getTechnologies (state) {
      const offersTechnologies = new Set(state.jobOffers.map(offerObj => offerObj.technologies).flat())
      return [...offersTechnologies]
    }
  },
  mutations: {
    SET_JOB_OFFERS (state, offersPayload) {
      state.jobOffers = offersPayload
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
        const offersData = await axios.get('http://localhost:5000/api/v1/offers', {
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
        commit('SET_JOB_OFFERS', offersData.data.data)
      } catch (error) {
        console.log(error)
      }
    }
  }
})
