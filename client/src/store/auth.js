import Vue from 'vue'
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
          email,
          password
        })
        const { id, name } = user.data.data
        router.push('/')
        window.localStorage.currentUser = JSON.stringify({ isLoggedIn: true, id, name })
        Vue.toasted.success('Successfuly logged in')
      } catch (error) {
        console.log(error)
      }
    },
    async register(_, credentials) {
      try {
        const { email, password } = credentials
        await axiosInstance.post('auth/register', {
          email,
          password
        })
        Vue.toasted.success('Successfuly registered')
        router.push('/login')
      } catch (error) {
        console.log(error)
      }
    },
    async logout() {
      try {
        await axiosInstance.post('auth/logout')
        window.localStorage.removeItem('currentUser')
        Vue.toasted.success('Successfuly logged out')
        window.location.reload()
      } catch (error) {
        console.log(error)
      }
    }
  }
})
