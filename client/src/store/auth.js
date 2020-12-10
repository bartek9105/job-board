import axios from 'axios'

export default ({
  state: {
    isLoggedIn: false
  },
  getters: {

  },
  mutations: {
    SET_LOGIN_STATUS (state) {
      state.isLoggedIn = true
    }
  },
  actions: {
    async signIn ({ commit }, credentials) {
      try {
        const { email, password } = credentials
        const req = await axios.post('http://localhost:5000/api/v1/auth/login', {
          email: email,
          password: password
        }, { withCredentials: true })
        console.log(req.cookie)
        commit('SET_LOGIN_STATUS')
      } catch (error) {
        console.log(error)
      }
    }
  }
})
