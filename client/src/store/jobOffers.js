import axios from 'axios'

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
    async fetchJobOffers ({ commit }) {
      try {
        const offersData = await axios.get('http://localhost:5000/api/v1/offers')
        commit('SET_JOB_OFFERS', offersData.data.data)
      } catch (error) {
        console.log(error)
      }
    }
  }
})
