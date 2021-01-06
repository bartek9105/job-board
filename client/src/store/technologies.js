import axiosInstance from '../services/Api'

export default ({
  state: {
    technologies: []
  },
  getters: {
    getTechnologies(state) {
      return state.technologies
    }
  },
  mutations: {
    SET_TECHNOLOGIES(state, technologies) {
      state.technologies = technologies
    }
  },
  actions: {
    async fetchTechnologies({ commit }) {
      try {
        const technologies = await axiosInstance.get('technologies')
        commit('SET_TECHNOLOGIES', technologies)
      } catch (error) {
        console.log(error)
      }
    }
  }
})