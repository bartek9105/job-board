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
  fetchUsers: async function (queries) {
    try {
      const users = await api.get('users', {
        params: {
          ...queries
        }
      })
      return users.data
    } catch (error) {
      console.log(error)
    }
  }
}

export default UserService