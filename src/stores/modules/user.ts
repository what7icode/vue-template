import { reqLogin } from '@/api/user'
import type { loginForm, loginResponse } from '@/api/user/type'
import { defineStore } from 'pinia'
import type { userState } from './types/types'
import { constantRoutes } from '@/router/routes'
import { reqUserInfo } from '@/api/user'

// 用户存储单元
const useUserStore = defineStore('user', {
  state: (): userState => ({
    token: localStorage.getItem('TOKEN'),
    menuRoutes: constantRoutes,
    username: '',
    avatar: '',
  }),
  actions: {
    // 用户登录时保存token
    async userLogin(data: loginForm) {
      const result: loginResponse = await reqLogin(data)

      if (result.code === 200) {
        // pinia使用 js 对象存储数据并非持久化存储
        this.token = result.data.token as string
        // 本地持久化存储
        localStorage.setItem('TOKEN', result.data.token as string)
        // 保证返回的 promise 成功
        return 'ok'
      } else {
        // 保证返回的 promise 失败
        return Promise.reject(new Error(result.data.message))
      }
    },
    // 设置用户信息
    async setUserInfo() {
      const result = await reqUserInfo()
      if (result.code === 200) {
        this.username = result.data.username
        this.avatar = result.data.avatar
        return 'ok'
      } else {
        return Promise.reject('获取用户信息失败')
      }
    },
    // 用户退出登录
    userLogout() {
      this.token = ''
      this.username = ''
      this.avatar = ''
      localStorage.removeItem('TOKEN')
    },
  },
})
export default useUserStore
