import api from './api.service'

const UserService = {
  fetchUserInfo: async function () {
    try {
      const userInfo = await api.get('auth/me')
      return userInfo.data
    } catch (error) {
      console.log(error)
    }
  },
  updateUserInfo: async function (userInfo) {
    try {
      await api.patch('users/about', userInfo)
    } catch (error) {
      console.log(error)
    }
  },
  fetchUsers: async function () {
    try {
      const users = await api.get('users')
      return users.data
    } catch (error) {
      console.log(error)
    }
  }
}

export default UserService