import axios from 'axios'
import { app } from '@/main'

const axiosInstance = axios.create({
  baseURL: 'https://api.jikan.moe/v4'
})

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.error('HTTP error occurred:', error)
    if (error?.response?.status === 429) return Promise.reject(error)
    app.config.globalProperties.$toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error.message,
      life: 3000
    })

    return Promise.reject(error)
  }
)

export default axiosInstance
