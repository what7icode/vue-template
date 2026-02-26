import { defineStore } from 'pinia'

const useSettingsStore = defineStore('settings', {
  state: () => {
    return {
      isCollapse: false,
      isRefresh: false,
    }
  },
})

export default useSettingsStore
