import api from './api.service'

const TechnologyService = {
  fetchTechnologies: async function () {
    try {
      const technologies = await api.get('technologies')
      return technologies.data
    } catch (error) {
      console.log(error)
    }
  }
}

export default TechnologyService