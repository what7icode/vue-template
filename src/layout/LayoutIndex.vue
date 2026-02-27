<template>
  <div class="layout-container">
    <!-- 1. 左侧菜单栏 -->
    <div class="layout-sidebar">
      <!--  logo -->
      <logo-comp></logo-comp>
      <!-- 滚动条形组件 -->
      <el-scrollbar>
        <!-- 菜单组件 -->
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

    <!-- 2. 顶部导航栏 (采用固定定位) -->
    <div class="layout-header" :class="{ 'is-collapse': settingsStore.isCollapse }">
      <tabbar-comp></tabbar-comp>
    </div>

    <!-- 3. 剩下的内容区域 (二级路由组件) -->
    <div class="layout-content" :class="{ 'is-collapse': settingsStore.isCollapse }">
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

const userStore = useUserStore()
const settingsStore = useSettingsStore()
</script>

<style scoped lang="scss">
.layout-container {
  width: 100%;
  height: 100vh;
}

/* 侧边栏：固定宽度，在 flex 容器中占位 */
.layout-sidebar {
  width: $base-menu-width;
  height: 100vh;
  background-color: $base-menu-background;
  color: #fff;
  transition: all 0.3s ease;

  /* 滚动条菜单栏 */
  .el-scrollbar {
    height: calc(100vh - #{$base-menu-logo-height});

    /* 去掉菜单组件右侧的边框 */
    :deep(.el-menu) {
      border-right: none !important;
    }
  }
}

/* 顶部导航栏：采用绝对固定定位，使其脱离标准流 */
.layout-header {
  position: fixed;
  top: 0;
  left: $base-menu-width; /* 让在侧边栏的右侧开始 */
  width: calc(100% - #{$base-menu-width}); /* 宽度扣除侧边栏的宽度 */
  height: $base-tabbar-height;
  background-color: #fff;
  transition: all 0.3s ease;

  &.is-collapse {
    left: $base-menu-width-collapse;
    width: calc(100% - #{$base-menu-width-collapse});
  }
}

/* 右侧内容包裹区域：在 flex 中自适应拉伸占满其余空间 */
.layout-content {
  position: absolute;
  top: $base-tabbar-height;
  left: $base-menu-width;
  width: calc(100% - #{$base-menu-width});
  height: calc(100vh - #{$base-tabbar-height});
  padding: 20px;
  overflow: auto;
  transition: all 0.3s ease;

  &.is-collapse {
    left: $base-menu-width-collapse;
    width: calc(100% - #{$base-menu-width-collapse});
  }
}
</style>
