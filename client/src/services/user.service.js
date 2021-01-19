import api from './api.service'

const UserService = {
  updateUserInfo: async function (userInfo) {
    try {
      await api.patch('users/about', userInfo)
    } catch (error) {
      console.log(error)
    }
  }
}

export default UserService