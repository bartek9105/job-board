import Vue from 'vue'
import router from '../../router'
import AuthService from '../../services/auth.service'

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
        await AuthService.login(credentials)
        router.push('/')
        Vue.toasted.success('Successfuly logged in')
      } catch (error) {
        console.log(error)
      }
    },
    async register(_, credentials) {
      try {
        await AuthService.register(credentials)
        Vue.toasted.success('Successfuly registered')
        router.push('/login')
      } catch (error) {
        console.log(error)
      }
    },
    async logout() {
      try {
        await AuthService.logout()
        Vue.toasted.success('Successfuly logged out')
        window.location.reload()
      } catch (error) {
        console.log(error)
      }
    }
  }
})
