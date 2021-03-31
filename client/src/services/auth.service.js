import api from './api.service'
import StorageService from './storage.service'

const AuthService = {
  login: async function (userCredentials) {
    try {
      const user = await api.post('auth/login', { ...userCredentials })
      const { id, name } = user.data.data
      StorageService.saveUser({ id, name })
    } catch (error) {
      console.log(error)
    }
  },
  register: async function (userCredentials) {
    try {
      await api.post('auth/register', {
        ...userCredentials
      })
    } catch (error) {
      console.log(error)
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
      console.log(error)
    }
  },
  setNewPassword: async function (userCredentials) {
    try {
      await api.post('auth/setnewpassword', { ...userCredentials })
    } catch (error) {
      console.log(error)
    }
  }
}

export default AuthService