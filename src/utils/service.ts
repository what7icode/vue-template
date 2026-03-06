import axios from 'axios'
import type { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import useUserStore from '@/stores/modules/user'

const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
})

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useUserStore().token
    if (token) {
      config.headers.token = token
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // response是响应对象，response.data 是后端返回的内容，response.data.data是业务数据
    const code = response.data.code
    if (code !== 200) {
      // 提示错误信息
      ElMessage({
        type: 'error',
        message: response.data.message || '请求失败',
      })
      // 抛出错误
      return Promise.reject(new Error(response.data.message || '请求失败'))
    }

    // 简化数据
    return response.data
  },
  (error: AxiosError) => {
    //处理网络错误
    let msg = ''
    const status = error.response?.status

    switch (status) {
      case 401:
        msg = 'token过期'
        break
      case 403:
        msg = '无权访问'
        break
      case 404:
        msg = '请求地址错误'
        break
      case 500:
        msg = '服务器出现问题'
        break
      default:
        msg = '无网络'
    }
    ElMessage({
      type: 'error',
      message: msg,
    })
    return Promise.reject(error)
  },
)

export default service
