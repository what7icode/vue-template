import router from '@/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import useUserStore from '@/stores/modules/user'
import pinia from './stores'
import settings from './settings'

// 在组件外使用仓库，要保证pinia已初始化
const userStore = useUserStore(pinia)

// nprogress 配置不用加载时的转圈
NProgress.configure({ showSpinner: false })

// 路由前置守卫
router.beforeEach(async (to) => {
  document.title = `${settings.title} - ${to.meta.title}`

  NProgress.start()

  if (userStore.token) {
    // 已登录，不能访问登录页
    if (to.path === '/login') {
      return { path: '/' }
    } else {
      const username = userStore.username
      if (username) {
        return true
      } else {
        try {
          await userStore.setUserInfo()
          console.log('获取用户信息')
          // 刷新异步路由，有可能获取到用户信息但异步路由还没有加载完毕，出现空白的效果
          return { ...to }
        } catch {
          await userStore.userLogout()
          return { path: '/login', query: { redirect: to.path } }
        }
      }
    }
  } else {
    if (to.path === '/login') {
      return true
    } else {
      return { path: '/login', query: { redirect: to.path } }
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
