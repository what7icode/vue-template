import { reqLogin, reqLogout } from '@/api/user'
import type {
  loginFormData,
  loginResponseData,
  ResponseData,
  userInfoResponseData,
} from '@/api/user/type'
import { defineStore } from 'pinia'
import type { UserState } from './types/types'
import { constantRoutes } from '@/router/routes'
import { reqUserInfo } from '@/api/user'

// 用户存储单元
const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: localStorage.getItem('TOKEN'),
    menuRoutes: constantRoutes,
    username: '',
    avatar: '',
  }),
  actions: {
    // 用户登录时保存token
    async userLogin(data: loginFormData) {
      const result: loginResponseData = await reqLogin(data)

      if (result.code === 200) {
        // pinia使用 js 对象存储数据并非持久化存储
        this.token = result.data as string
        // 本地持久化存储
        localStorage.setItem('TOKEN', result.data as string)
        // 保证返回的 promise 成功
        return 'ok'
      } else {
        // 保证返回的 promise 失败
        return Promise.reject(new Error(result.data))
      }
    },
    // 设置用户信息
    async setUserInfo() {
      const result: userInfoResponseData = await reqUserInfo()
      if (result.code === 200) {
        this.username = result.data.username
        this.avatar = result.data.avatar
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    // 用户退出登录
    async userLogout() {
      const result: ResponseData = await reqLogout()
      if (result.code === 200) {
        this.token = ''
        this.username = ''
        this.avatar = ''
        localStorage.removeItem('TOKEN')
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
})
export default useUserStore
