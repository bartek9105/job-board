import Vue from 'vue'
import router from '../../router'
import AuthService from '../../services/auth.service'

export default ({
  state: {
    error: ''
  },
  getters: {
  },
  mutations: {
    SET_ERROR(state, error) {
      state.error = error
    }
  },
  actions: {
    async signIn({ dispatch }, credentials) {
      try {
        await AuthService.login(credentials)
        await dispatch('fetchUserInfo')
        router.push('/')
        Vue.toasted.success('Successfuly logged in', { icon: 'check-circle' })
      } catch (error) {
        Vue.toasted.error(error)
      }
    },
    async register(_, credentials) {
      try {
        await AuthService.register(credentials)
        Vue.toasted.success('Successfuly registered', { icon: 'check-circle' })
        router.push('/login')
      } catch (error) {
        Vue.toasted.error(error)
      }
    },
    async logout() {
      try {
        await AuthService.logout()
        Vue.toasted.success('Successfuly logged out', { icon: 'check-circle' })
        window.location.reload()
      } catch (error) {
        console.log(error)
      }
    },
    async reset(_, email) {
      try {
        await AuthService.reset(email)
        Vue.toasted.success(`Password reset link sent to ${email} `, { icon: 'check-circle' })
      } catch (error) {
        Vue.toasted.error(error)
      }
    },
    async newPassword(_, credentials) {
      try {
        await AuthService.setNewPassword(credentials)
      } catch (error) {
        Vue.toasted.error(error)
      }
    }
  }
})
