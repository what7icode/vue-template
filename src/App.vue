<script setup lang="ts">
import { ref, onMounted } from 'vue'

const msg = ref('')
onMounted(async () => {
  const res = await fetch('/api/hello')
  const data = await res.json()
  msg.value = data.message
})
</script>

<template>
  <h1>You did it!</h1>
  <p>
    Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
    documentation
  </p>
  <div style="margin-top: 16px">
    <el-button type="primary">
      <el-icon style="margin-right: 8px"><i-ep-edit /></el-icon>
      Primary Button
    </el-button>
  </div>
  <div style="margin-top: 16px">
    <SvgIcon name="home" size="24" color="#409EFF" />
    <span style="margin-left: 8px">SVG 图标（home）</span>
  </div>
  <p style="margin-top: 16px">Mock: {{ msg }}</p>
</template>

<style scoped lang="scss">
h1 {
  color: $primary-color;
}
</style>
