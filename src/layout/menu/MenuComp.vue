<template>
  <template v-for="item in routes">
    <template v-if="!item.children">
      <el-menu-item v-if="!item.meta?.hidden" :index="item.path" :key="item.path" @click="goRoute">
        <el-icon><component :is="item.meta?.icon"></component></el-icon>
        <template #title>
          <span>{{ item.meta?.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <template v-if="item.children && item.children.length == 1">
      <el-menu-item
        v-if="!item.children[0].meta?.hidden"
        :index="item.children[0].path"
        :key="item.children[0].path"
        @click="goRoute"
      >
        <el-icon><component :is="item.children[0].meta?.icon"></component></el-icon>
        <template #title>
          <span>{{ item.children[0].meta?.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <template v-if="item.children && item.children.length > 1">
      <el-sub-menu v-if="!item.meta?.hidden" :index="item.path" :key="item.path">
        <template #title>
          <el-icon><component :is="item.meta?.icon"></component></el-icon>
          <span>{{ item.meta?.title }}</span>
        </template>
        <menu-comp :routes="item.children"></menu-comp>
      </el-sub-menu>
    </template>
  </template>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { MenuItemRegistered } from 'element-plus/es/components/menu'

defineProps(['routes'])
const router = useRouter()
const goRoute = (item: MenuItemRegistered) => {
  router.push(item.index)
}
</script>

<style scoped lang="scss"></style>
