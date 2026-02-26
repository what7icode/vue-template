<template>
  <div class="breadcrumb-container">
    <!-- 控制折叠的图标 -->
    <el-icon class="collapse-icon" @click="settingsStore.isCollapse = !settingsStore.isCollapse">
      <component :is="settingsStore.isCollapse ? 'Expand' : 'Fold'"></component>
    </el-icon>
    <!-- 面包屑 -->
    <el-breadcrumb separator-icon="ArrowRight">
      <el-breadcrumb-item
        v-for="item in route.matched"
        :key="item.path"
        v-show="item.meta.title"
        :to="item.path"
      >
        <span>{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import useSettingsStore from '@/stores/modules/settings'
import { useRoute } from 'vue-router'

const settingsStore = useSettingsStore()
const route = useRoute()
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
}
</style>
