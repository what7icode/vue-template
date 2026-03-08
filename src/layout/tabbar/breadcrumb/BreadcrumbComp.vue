<template>
  <div class="breadcrumb-container">
    <!-- 移动端：汉堡菜单按钮 -->
    <el-icon
      v-if="settingsStore.isMobile"
      class="collapse-icon"
      @click="settingsStore.sidebarOpen = true"
    >
      <Operation />
    </el-icon>
    <!-- 桌面端：折叠按钮 -->
    <el-icon
      v-else
      class="collapse-icon"
      @click="settingsStore.isCollapse = !settingsStore.isCollapse"
    >
      <component :is="settingsStore.isCollapse ? 'Expand' : 'Fold'"></component>
    </el-icon>
    <!-- 面包屑（移动端隐藏） -->
    <el-breadcrumb v-if="!settingsStore.isMobile" separator-icon="ArrowRight">
      <el-breadcrumb-item
        v-for="item in route.matched"
        :key="item.path"
        v-show="item.meta.title"
        :to="item.path"
      >
        <span>{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 移动端：显示当前页面标题 -->
    <span v-else class="mobile-title">{{ currentTitle }}</span>
  </div>
</template>

<script setup lang="ts">
import useSettingsStore from '@/stores/modules/settings'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const settingsStore = useSettingsStore()
const route = useRoute()

// 取最后一个匹配路由的 title 作为移动端页面标题
const currentTitle = computed(() => {
  const matched = route.matched
  for (let i = matched.length - 1; i >= 0; i--) {
    if (matched[i]?.meta?.title) {
      return matched[i]!.meta.title as string
    }
  }
  return ''
})
</script>

<style scoped lang="scss">
.breadcrumb-container {
  display: flex;
  align-items: center;
  height: 100%;

  .collapse-icon {
    font-size: 20px;
    cursor: pointer;
    margin-right: 15px;
  }

  .mobile-title {
    font-size: 16px;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
