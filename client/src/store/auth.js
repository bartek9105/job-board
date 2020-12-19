import Api from '../services/Api'
import router from '../router'

export default ({
  state: {
  },
  getters: {
  },
  mutations: {
    SET_CURRENT_USER(_, userName) {
      window.localStorage.currentUser = JSON.stringify({ isLoggedIn: true, name: userName })
    }
  },
  actions: {
    async signIn({ commit }, credentials) {
      try {
        const { email, password } = credentials
        const user = await Api().post('auth/login', {
          email: email,
          password: password
        }, { withCredentials: true })
        router.push('/post-offer')
        commit('SET_CURRENT_USER', user.data.data)
      } catch (error) {
        console.log(error)
      }
    }
  }
})
