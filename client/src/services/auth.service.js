import api from './api.service'
import StorageService from './storage.service'

const AuthService = {
  login: async function (userCredentials) {
    try {
      await api.post('auth/login', { ...userCredentials })
    } catch (error) {
      throw new Error(error.response.data.error)
    }
  },
  register: async function (userCredentials) {
    try {
      await api.post('auth/register', {
        ...userCredentials
      })
    } catch (error) {
      throw new Error(error.response.data.error)
    }
  },
  logout: async function () {
    try {
      await api.post('auth/logout')
      StorageService.removeUser()
    } catch (error) {
      console.log(error)
    }
  },
  reset: async function (email) {
    try {
      await api.post('auth/resetpassword', { email })
    } catch (error) {
      throw new Error(error.response.data.error)
    }
  },
  setNewPassword: async function (userCredentials) {
    try {
      await api.post('auth/setnewpassword', { ...userCredentials })
    } catch (error) {
      throw new Error(error.response.data.error)
    }
  }
}

export default AuthService