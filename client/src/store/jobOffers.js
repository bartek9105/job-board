import axios from 'axios'
import qs from 'qs'

export default ({
  state: {
    jobOffers: []
  },
  getters: {
    getJobOffers (state) {
      return state.jobOffers
    }
  },
  mutations: {
    SET_JOB_OFFERS (state, offersPayload) {
      state.jobOffers = offersPayload
    }
  },
  actions: {
    async fetchJobOffers ({ commit }, { technologies, seniority, category, location, type, salaryMin, salaryMax }) {
      try {
        const offersData = await axios.get('http://localhost:5000/api/v1/offers', {
          params: {
            technologies: { in: technologies },
            seniority: seniority,
            category: category,
            location: location,
            type: type,
            salary: { lt: salaryMax, gt: salaryMin }
          },
          paramsSerializer: params => qs.stringify(params)
        })
        commit('SET_JOB_OFFERS', offersData.data.data)
      } catch (error) {
        console.log(error)
      }
    },
    async fetchJobOffersSearch ({ commit }, titleQuery) {
      try {
        const offersData = await axios.get('http://localhost:5000/api/v1/offers/search', {
          params: {
            title: titleQuery
          }
        })
        commit('SET_JOB_OFFERS', offersData.data.data)
      } catch (error) {
        console.log(error)
      }
    }
  }
})
