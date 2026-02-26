<template>
  <div>home</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import useUserStore from '@/stores/modules/user'
const userStore = useUserStore()

// 组件挂载完成后保存用户信息到用户仓库
onMounted(() => {
  userStore.setUserInfo()
})
</script>

<style lang="scss" scoped></style>
