<template>
  <div class="settings-container">
    <el-button
      v-if="!settingsStore.isMobile"
      circle
      icon="Refresh"
      @click="handleRefresh"
    ></el-button>
    <el-button
      v-if="!settingsStore.isMobile"
      circle
      icon="FullScreen"
      @click="handleFullScreen"
    ></el-button>
    <el-popover placement="bottom" trigger="click" title="主题设置">
      <el-form>
        <el-form-item label="主题颜色" for="theme-picker">
          <el-color-picker
            id="theme-picker"
            v-model="settingsStore.theme"
            @change="handleThemeChange"
            class="setting-theme-picker"
          />
        </el-form-item>
        <el-form-item label="暗黑模式" for="dark-switch">
          <el-switch
            id="dark-switch"
            v-model="settingsStore.dark"
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
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()
const settingsStore = useSettingsStore()

// 内容区刷新逻辑
const handleRefresh = () => {
  settingsStore.isRefresh = !settingsStore.isRefresh
}

// 全屏逻辑
const handleFullScreen = () => {
  const isFullscreen = document.fullscreenElement
  if (!isFullscreen) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

// 退出登录逻辑
const handleLogout = async () => {
  await userStore.userLogout()
  router.push({ path: '/login', query: { redirect: router.currentRoute.value.path } })
}

const handleDarkChange = () => {
  settingsStore.updateDark(settingsStore.dark, userStore.username)
}

const handleThemeChange = () => {
  settingsStore.updateTheme(settingsStore.theme, userStore.username)
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
.setting-theme-picker .el-color-picker__panel {
  transition: none !important;
}

.setting-theme-picker .el-zoom-in-top-leave-active.el-color-picker__panel {
  transition: none !important;
  animation: none !important;
}

.el-button.el-button--small.is-text.el-color-footer__link-btn {
  border: 1px solid #dcdfe6;
  width: 50px;
  padding: 5px;
  text-align: center;

  span {
    display: none;
  }

  &::after {
    content: '重置';
  }
}
</style>
