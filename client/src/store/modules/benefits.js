import BenefitService from '../../services/benefit.service'

export default ({
  state: {
    benefits: []
  },
  getters: {
    getBenefits(state) {
      return state.benefits
    }
  },
  mutations: {
    SET_BENEFITS(state, benefits) {
      state.benefits = benefits
    }
  },
  actions: {
    async fetchBenefits({ commit }) {
      try {
        const benefits = await BenefitService.fetchBenefits()
        commit('SET_BENEFITS', benefits)
      } catch (error) {
        console.log(error)
      }
    }
  }
})