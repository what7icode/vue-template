import { reqLogin, reqLogout } from '@/api/user'
import type {
  loginFormData,
  loginResponseData,
  ResponseData,
  userInfoResponseData,
} from '@/api/user/type'
import { defineStore } from 'pinia'
import type { UserState } from './types/types'
import { constantRoutes, asyncRoutes, anyRoutes } from '@/router/routes'
import { reqUserInfo } from '@/api/user'
import type { RouteRecordRaw } from 'vue-router'
import router from '@/router'
import { cloneDeep } from 'lodash-es'
import useSettingsStore from './settings'

// 过滤异步路由
function filterAsyncRoutes(asyncRoute: RouteRecordRaw[], routes: string[]) {
  return asyncRoute.filter((item: RouteRecordRaw) => {
    if (routes.includes(item.name as string)) {
      if (item.children && item.children.length > 0) {
        item.children = filterAsyncRoutes(item.children, routes)
      }
      return true
    }
  })
}

// 用户存储单元
const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: localStorage.getItem('TOKEN'),
    menuRoutes: constantRoutes,
    username: '',
    avatar: '',
    buttons: [],
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
        this.username = result.data.name
        this.avatar =
          result.data.avatar ||
          'https://q8.itc.cn/q_70/images03/20250114/d9d8d1106f454c2b83ea395927bfc020.jpeg'

        this.buttons = result.data.buttons
        const userAsyncRoutes = filterAsyncRoutes(cloneDeep(asyncRoutes), result.data.routes)
        this.menuRoutes = [...constantRoutes, ...userAsyncRoutes, ...anyRoutes]
        const newRoutes = [...userAsyncRoutes, ...anyRoutes]
        newRoutes.forEach((route: RouteRecordRaw) => {
          router.addRoute(route)
        })

        // 用户信息获取成功后，初始化该用户的个性化主题设置
        const settingsStore = useSettingsStore()
        settingsStore.initUserTheme(this.username)

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
        this.buttons = []
        this.menuRoutes = constantRoutes
        localStorage.removeItem('TOKEN')
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
})
export default useUserStore
