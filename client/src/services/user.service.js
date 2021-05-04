import api from './api.service'
import StorageService from './storage.service'

const UserService = {
  fetchUserInfo: async function() {
    try {
      const userInfo = await api.get('auth/me')
      StorageService.saveUser(userInfo.data.data)
      return userInfo.data.data
    } catch (error) {
      console.log(error)
    }
  },
  updateUserInfo: async function(userInfo) {
    try {
      await api.patch('users', userInfo)
    } catch (error) {
      console.log(error)
    }
  },
  fetchUsers: async function(queries) {
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
  },
  fetchUser: async function(userId) {
    try {
      const user = await api.get(`users/${userId}`)
      return user.data
    } catch (error) {
      console.log(error)
    }
  }
}

export default UserService