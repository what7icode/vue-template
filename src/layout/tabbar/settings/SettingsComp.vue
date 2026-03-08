<template>
  <div class="settings-container">
    <el-button circle icon="Refresh" @click="handleRefresh"></el-button>
    <el-button circle icon="FullScreen" @click="handleFullScreen"></el-button>
    <el-popover placement="bottom" trigger="click" title="主题设置">
      <el-form>
        <el-form-item label="主题颜色">
          <el-color-picker v-model="theme" @change="handleThemeChange" />
        </el-form-item>
        <el-form-item label="暗黑模式">
          <el-switch
            v-model="dark"
            active-icon="Moon"
            inactive-icon="Sunny"
            inline-prompt
            @change="handleDarkChange"
          />
        </el-form-item>
      </el-form>
      <template #reference>
        <el-button circle icon="Setting"></el-button>
      </template>
    </el-popover>
    <!-- 用户头像和下拉菜单 -->
    <img :src="userStore.avatar" class="avatar" />
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ userStore.username }}
        <el-icon class="el-icon--right"><ArrowDown /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import useSettingsStore from '@/stores/modules/settings'
import useUserStore from '@/stores/modules/user'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const userStore = useUserStore()

// 内容区刷新逻辑
const settingsStore = useSettingsStore()
const handleRefresh = () => {
  settingsStore.isRefresh = !settingsStore.isRefresh
}

// 全屏逻辑
const handleFullScreen = () => {
  // DOM对象有一个属性可以判断是否全屏模式
  const isFullscreen = document.fullscreenElement
  if (!isFullscreen) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

// 退出登录逻辑
const handleLogout = async () => {
  // 向服务器发送请求退出登录
  // 清空用户仓库的登录信息，以及本地的token
  await userStore.userLogout()
  // 退出登录后，跳转到登录页面，并携带当前页面的路径作为查询参数
  router.push({ path: '/login', query: { redirect: router.currentRoute.value.path } })
}

const dark = ref(false)
const handleDarkChange = () => {
  const html = document.documentElement
  if (dark.value) {
    html.setAttribute('class', 'dark')
  } else {
    html.removeAttribute('class')
  }
}
const theme = ref('#409EFF')

// 计算更亮的颜色
const getLightColor = (color: string, level: number) => {
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
}

// 计算更暗的颜色
const getDarkColor = (color: string, level: number) => {
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
}

const handleThemeChange = () => {
  const html = document.documentElement
  // 如果选择了空（清除），恢复默认
  if (!theme.value) {
    html.style.setProperty('--el-color-primary', '')
    for (let i = 1; i <= 9; i++) {
      html.style.setProperty(`--el-color-primary-light-${i}`, '')
    }
    html.style.setProperty('--el-color-primary-dark-2', '')
    return
  }

  // 设置基本颜色
  html.style.setProperty('--el-color-primary', theme.value)

  // 设置悬停等更亮的颜色 (light-1 到 light-9)
  for (let i = 1; i <= 9; i++) {
    html.style.setProperty(`--el-color-primary-light-${i}`, getLightColor(theme.value, i / 10))
  }

  // 设置点击时等更暗的颜色 (dark-2)
  html.style.setProperty('--el-color-primary-dark-2', getDarkColor(theme.value, 0.2))
}
</script>

<style scoped lang="scss">
.settings-container {
  display: flex;
  align-items: center;

  .el-button {
    margin-left: 10px;
  }

  .avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin-left: 10px;
    margin-right: 10px;
  }

  .el-dropdown-link {
    cursor: pointer;
    display: flex;
    align-items: center;
    outline: none;
  }
}
</style>

<style lang="scss">
// 已添加全局样式来禁用颜色选择器面板关闭时的过渡动画
// 颜色选择器面板是通过 teleport 挂载到 body 上的，scoped 样式无法作用到它

/* 去掉颜色选择器面板关闭时的残留动画 */
.el-color-picker__panel {
  transition: none !important;
}

.el-zoom-in-top-leave-active.el-color-picker__panel {
  transition: none !important;
  animation: none !important;
}
</style>
