import { defineStore } from 'pinia'

const useSettingsStore = defineStore('settings', {
  state: () => {
    return {
      isCollapse: false,
      isRefresh: false,
      isMobile: false,
      sidebarOpen: false,
      dark: false,
      theme: '#409EFF',
    }
  },
  actions: {
    // 基础颜色算法
    getLightColor(color: string, level: number) {
      const rgbPattern = /^#?[0-9A-Fa-f]{6}$/
      if (!rgbPattern.test(color)) return color
      const r1 = 255,
        g1 = 255,
        b1 = 255
      const r2 = parseInt(color.substring(1, 3), 16)
      const g2 = parseInt(color.substring(3, 5), 16)
      const b2 = parseInt(color.substring(5, 7), 16)
      const r = Math.round(r1 * level + r2 * (1 - level))
      const g = Math.round(g1 * level + g2 * (1 - level))
      const b = Math.round(b1 * level + b2 * (1 - level))
      return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
    },
    getDarkColor(color: string, level: number) {
      const rgbPattern = /^#?[0-9A-Fa-f]{6}$/
      if (!rgbPattern.test(color)) return color
      const r1 = 0,
        g1 = 0,
        b1 = 0
      const r2 = parseInt(color.substring(1, 3), 16)
      const g2 = parseInt(color.substring(3, 5), 16)
      const b2 = parseInt(color.substring(5, 7), 16)
      const r = Math.round(r1 * level + r2 * (1 - level))
      const g = Math.round(g1 * level + g2 * (1 - level))
      const b = Math.round(b1 * level + b2 * (1 - level))
      return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
    },
    // 应用主题
    applyTheme() {
      const html = document.documentElement
      // 1. 应用暗黑模式
      if (this.dark) {
        html.setAttribute('class', 'dark')
      } else {
        html.removeAttribute('class')
      }
      // 2. 应用主题颜色
      if (this.theme) {
        html.style.setProperty('--el-color-primary', this.theme)
        for (let i = 1; i <= 9; i++) {
          html.style.setProperty(
            `--el-color-primary-light-${i}`,
            this.getLightColor(this.theme, i / 10),
          )
        }
        html.style.setProperty('--el-color-primary-dark-2', this.getDarkColor(this.theme, 0.2))
      }
    },
    // 根据用户初始化主题
    initUserTheme(username: string) {
      // 优先从用户特定的 key 获取，如果没有则尝试从全局获取（兼容旧数据）
      const userDark = localStorage.getItem(`DARK_MODE_${username}`)
      const globalDark = localStorage.getItem('DARK_MODE')
      this.dark = (userDark ?? globalDark) === 'true'

      const userTheme = localStorage.getItem(`THEME_COLOR_${username}`)
      const globalTheme = localStorage.getItem('THEME_COLOR')
      this.theme = userTheme || globalTheme || '#409EFF'

      this.applyTheme()
    },
    // 更新设置并保存
    updateDark(val: boolean, username?: string) {
      this.dark = val
      if (username) {
        localStorage.setItem(`DARK_MODE_${username}`, val ? 'true' : 'false')
      }
      this.applyTheme()
    },
    updateTheme(val: string | null, username?: string) {
      this.theme = val || '#409EFF'
      localStorage.setItem('THEME_COLOR', this.theme)
      if (username) {
        localStorage.setItem(`THEME_COLOR_${username}`, this.theme)
      }
      this.applyTheme()
    },
  },
})

export default useSettingsStore
