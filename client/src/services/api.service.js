import axios from 'axios'
import store from '../store/index'

const api = axios.create({
  baseURL: 'http://localhost:5000/api/v1/',
  withCredentials: true
})

const axiosInterceptor = instance => {
  instance.interceptors.request.use(request => {
    store.dispatch('setIsLoading', true)
    return request
  })
  const interceptor = instance.interceptors.response.use(response => {
    store.dispatch('setIsLoading', false)
    return response
  }, error => {
    if (error.response.status !== 401) {
      return Promise.reject(error)
    }
    instance.interceptors.response.eject(interceptor)
    const originalRequest = error.response.config
    return api.post('auth/refresh_token').then(() => {
      return axios(originalRequest)
    }).catch(error => {
      return Promise.reject(error)
    })
  })
}

axiosInterceptor(api)

export default api