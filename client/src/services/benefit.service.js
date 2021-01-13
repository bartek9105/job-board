import api from './api.service'

const BenefitService = {
  fetchBenefits: async function () {
    try {
      const benefits = await api.get(`benefits`)
      return benefits.data
    } catch (error) {

    }
  }
}

export default BenefitService