<template>
  <div class="layout-container">
    <!-- 桌面端：固定侧边栏 -->
    <div
      v-if="!settingsStore.isMobile"
      class="layout-sidebar"
      :class="{ 'is-collapse': settingsStore.isCollapse }"
    >
      <logo-comp></logo-comp>
      <el-scrollbar>
        <el-menu
          background-color="#001529"
          text-color="white"
          :default-active="$route.path"
          :collapse="settingsStore.isCollapse ? true : false"
        >
          <menu-comp :routes="userStore.menuRoutes"></menu-comp>
        </el-menu>
      </el-scrollbar>
    </div>

    <!-- 移动端：侧边栏作为抽屉 -->
    <el-drawer
      v-if="settingsStore.isMobile"
      v-model="settingsStore.sidebarOpen"
      direction="ltr"
      :size="drawerWidth"
      :with-header="false"
      :z-index="1001"
    >
      <div class="drawer-sidebar">
        <logo-comp></logo-comp>
        <el-scrollbar>
          <el-menu background-color="#001529" text-color="white" :default-active="$route.path">
            <menu-comp :routes="userStore.menuRoutes"></menu-comp>
          </el-menu>
        </el-scrollbar>
      </div>
    </el-drawer>

    <!-- 2. 顶部导航栏 -->
    <div
      class="layout-header"
      :class="{
        'is-collapse': !settingsStore.isMobile && settingsStore.isCollapse,
        'is-mobile': settingsStore.isMobile,
      }"
    >
      <tabbar-comp></tabbar-comp>
    </div>

    <!-- 3. 内容区域 -->
    <div
      class="layout-content"
      :class="{
        'is-collapse': !settingsStore.isMobile && settingsStore.isCollapse,
        'is-mobile': settingsStore.isMobile,
      }"
    >
      <main-comp></main-comp>
    </div>
  </div>
</template>

<script setup lang="ts">
import LogoComp from '@/layout/logo/LogoComp.vue'
import MainComp from '@/layout/main/MainComp.vue'
import useUserStore from '@/stores/modules/user'
import MenuComp from '@/layout/menu/MenuComp.vue'
import TabbarComp from '@/layout/tabbar/TabbarComp.vue'
import useSettingsStore from '@/stores/modules/settings'
import { onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute } from 'vue-router'

const userStore = useUserStore()
const settingsStore = useSettingsStore()
const route = useRoute()

const MOBILE_WIDTH = 768
const drawerWidth = '260px'

// 监听屏幕宽度，自动切换 isMobile
const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_WIDTH}px)`)

const handleMediaChange = (e: MediaQueryListEvent | MediaQueryList) => {
  settingsStore.isMobile = e.matches
  if (e.matches) {
    // 进入移动端时自动折叠并关闭抽屉
    settingsStore.isCollapse = true
    settingsStore.sidebarOpen = false
  }
}

onMounted(() => {
  handleMediaChange(mediaQuery)
  mediaQuery.addEventListener('change', handleMediaChange)
})

onBeforeUnmount(() => {
  mediaQuery.removeEventListener('change', handleMediaChange)
})

// 路由切换时自动关闭抽屉
watch(
  () => route.path,
  () => {
    if (settingsStore.isMobile) {
      settingsStore.sidebarOpen = false
    }
  },
)
</script>

<style scoped lang="scss">
.layout-container {
  width: 100%;
  height: 100vh;
}

/* 桌面端侧边栏 */
.layout-sidebar {
  width: $base-menu-width;
  height: 100vh;
  background-color: $base-menu-background;
  color: #fff;
  transition: all 0.3s ease;

  &.is-collapse {
    width: $base-menu-width-collapse;
  }

  .el-scrollbar {
    height: calc(100vh - #{$base-menu-logo-height});

    :deep(.el-menu) {
      border-right: none !important;
    }
  }
}

/* 抽屉内的侧边栏样式 */
.drawer-sidebar {
  width: 100%;
  height: 100%;
  background-color: $base-menu-background;
  color: #fff;

  .el-scrollbar {
    height: calc(100vh - #{$base-menu-logo-height});

    :deep(.el-menu) {
      border-right: none !important;
    }
  }
}

/* 顶部导航栏 */
.layout-header {
  position: fixed;
  top: 0;
  left: $base-menu-width;
  width: calc(100% - #{$base-menu-width});
  height: $base-tabbar-height;
  background-color: var(--el-bg-color, white);
  transition: all 0.3s ease;

  &.is-collapse {
    left: $base-menu-width-collapse;
    width: calc(100% - #{$base-menu-width-collapse});
  }

  &.is-mobile {
    left: 0;
    width: 100%;
  }
}

/* 内容区域 */
.layout-content {
  position: absolute;
  top: $base-tabbar-height;
  left: $base-menu-width;
  width: calc(100% - #{$base-menu-width});
  height: calc(100vh - #{$base-tabbar-height});
  padding: 20px;
  overflow: auto;
  transition: all 0.3s ease;
  background-color: var(--el-bg-color, white);

  &.is-collapse {
    left: $base-menu-width-collapse;
    width: calc(100% - #{$base-menu-width-collapse});
  }

  &.is-mobile {
    left: 0;
    width: 100%;
  }
}
</style>

<!-- 全局样式：覆盖 el-drawer 默认样式 -->
<style lang="scss">
.el-drawer {
  // 抽屉本身不需要 padding
  .el-drawer__body {
    padding: 0 !important;
  }
}
</style>
