<template>
  <div class="settings-container">
    <el-button circle icon="Refresh" @click="handleRefresh"></el-button>
    <el-button circle icon="FullScreen" @click="handleFullScreen"></el-button>
    <el-button circle icon="Setting"></el-button>

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
const handleLogout = () => {
  // 向服务器发送请求退出登录
  // 清空用户仓库的登录信息，以及本地的token
  userStore.userLogout()
  // 退出登录后，跳转到登录页面，并携带当前页面的路径作为查询参数
  router.push({ path: '/login', query: { redirect: router.currentRoute.value.path } })
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
