import UserService from '@/services/user.service'

export default ({
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async updateUserInfo(_, userInfo) {
      console.log(userInfo)
      try {
        await UserService.updateUserInfo(userInfo)
      } catch (error) {
        console.log(error)
      }
    }
  }
})