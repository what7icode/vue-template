import { defineStore } from 'pinia'

const useSettingsStore = defineStore('settings', {
  state: () => {
    return {
      isCollapse: false,
      isRefresh: false,
      isMobile: false,
      sidebarOpen: false,
    }
  },
})

export default useSettingsStore
