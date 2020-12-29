import axiosInstance from '../services/Api'
import router from '../router'

export default ({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    async signIn(_, credentials) {
      try {
        const { email, password } = credentials
        const user = await axiosInstance.post('auth/login', {
          email: email,
          password: password
        })
        router.push('/')
        window.localStorage.currentUser = JSON.stringify({ isLoggedIn: true, name: user.data.data })
      } catch (error) {
        console.log(error)
      }
    },
    async logout() {
      try {
        await axiosInstance.post('auth/logout')
        window.localStorage.removeItem('currentUser')
      } catch (error) {
        console.log(error)
      }
    }
  }
})
