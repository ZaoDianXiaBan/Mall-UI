import axios from 'axios'
import { ElMessage } from 'element-plus'
import { hideLoading, showLoading } from './loading'
import { useUserStore } from '../stores/user'

const request = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

request.interceptors.request.use(
  (config) => {
    if (!config.hideLoading) {
      showLoading()
    }

    const userStore = useUserStore()
    if (userStore.token) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${userStore.token}`
    }

    return config
  },
  (error) => {
    hideLoading()
    ElMessage.error('请求发送失败')
    return Promise.reject(error)
  },
)

request.interceptors.response.use(
  (response) => {
    if (!response.config.hideLoading) {
      hideLoading()
    }

    const payload = response.data

    // 兼容 { code, message, data } 与直接返回数据两种格式
    if (payload && typeof payload === 'object' && 'code' in payload) {
      if (payload.code === 0 || payload.code === 200) {
        return payload.data
      }
      if (!response.config.silentError) {
        ElMessage.error(payload.message || '请求失败')
      }
      return Promise.reject(payload)
    }

    return payload
  },
  (error) => {
    if (!error.config?.hideLoading) {
      hideLoading()
    }

    const status = error.response?.status
    const message =
      error.response?.data?.message ||
      error.message ||
      '网络异常，请稍后重试'

    if (status === 401) {
      const userStore = useUserStore()
      userStore.logout()
      if (!error.config?.silentError) {
        ElMessage.error('登录已过期，请重新登录')
      }
      if (window.location.pathname !== '/login') {
        window.location.href = `/login?redirect=${encodeURIComponent(
          window.location.pathname + window.location.search,
        )}`
      }
    } else if (!error.config?.silentError) {
      if (status === 403) {
        ElMessage.error('没有权限访问')
      } else if (status === 404) {
        ElMessage.error('请求资源不存在')
      } else if (status >= 500) {
        ElMessage.error('服务器错误，请稍后重试')
      } else {
        ElMessage.error(message)
      }
    }

    return Promise.reject(error)
  },
)

export default request
