import UserService from '@/services/user.service'

export default ({
  state: {
    userInfo: {}
  },
  getters: {
    getUserInfo(state) {
      return state.userInfo
    }
  },
  mutations: {
    SET_USER_INFO(state, userInfoPayload) {
      state.userInfo = userInfoPayload
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
    }
  }
})