import UserService from '@/services/user.service'

export default ({
  state: {
    userInfo: {},
    users: []
  },
  getters: {
    getUserInfo(state) {
      return state.userInfo
    },
    getUsers(state) {
      return state.users
    }
  },
  mutations: {
    SET_USER_INFO(state, userInfoPayload) {
      state.userInfo = userInfoPayload
    },
    SET_USERS(state, usersPayload) {
      state.users = usersPayload
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
      } catch (error) {
        console.log(error)
      }
    },
    async fetchUsers({ commit }) {
      try {
        const users = await UserService.fetchUsers()
        commit('SET_USERS', users)
      } catch (error) {
        console.log(error)
      }
    }
  }
})