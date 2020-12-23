import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api/v1/',
  withCredentials: true
})

const axiosInterceptor = instance => {
  const interceptor = instance.interceptors.response.use(response => {
    return response
  }, error => {
    if (error.response.status !== 401) {
      return Promise.reject(error)
    }
    instance.interceptors.response.eject(interceptor)
    const originalRequest = error.response.config
    return axiosInstance.post('auth/refresh_token').then(() => {
      return axios(originalRequest)
    }).catch(error => {
      return Promise.reject(error)
    })
  })
}

axiosInterceptor(axiosInstance)

export default axiosInstance