import useUserStore from '@/stores/modules/user'
import type { App } from 'vue'
export const isHasButton = (app: App) => {
  app.directive('has', {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mounted(el: any, options: any) {
      // 获取按钮上的值
      const value = options.value
      // 获取用户按钮权限数据
      const userStore = useUserStore()
      const buttons = userStore.buttons
      // 如果用户没有这个按钮权限，就删除这个按钮
      if (!buttons.includes('btn.all')) {
        el.parentNode.removeChild(el)
      }
    },
  })
}
