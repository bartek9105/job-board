import Vue from 'vue'
import UserService from '@/services/user.service'

export default ({
  state: {
    users: [],
    user: {},
    userInfo: {}
  },
  getters: {
    getUsers(state) {
      return state.users
    },
    getUser(state) {
      return state.user
    },
    getUserInfo(state) {
      return state.userInfo
    }
  },
  mutations: {
    SET_USERS(state, usersPayload) {
      state.users = usersPayload
    },
    SET_USER(state, userPayload) {
      state.user = userPayload
    },
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    async fetchUserInfo({ commit }) {
      try {
        const userInfo = await UserService.fetchUserInfo()
        commit('SET_USER_INFO', userInfo)
      } catch (error) {
        console.log(error)
      }
    },
    async updateUserInfo(_, userInfo) {
      try {
        await UserService.updateUserInfo(userInfo)
        Vue.toasted.success('User info updated', { icon: 'check-circle' })
      } catch (error) {
        console.log(error)
      }
    },
    async fetchUsers({ commit }, queries) {
      try {
        const users = await UserService.fetchUsers(queries)
        commit('SET_USERS', users)
      } catch (error) {
        console.log(error)
      }
    },
    async fetchUser({ commit }, userId) {
      try {
        const user = await UserService.fetchUser(userId)
        commit('SET_USER', user)
      } catch (error) {
        console.log(error)
      }
    }
  }
})