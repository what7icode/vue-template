<template>
  <div class="tabbar-container">
    <div class="tabbar-left">
      <BreadcrumbComp></BreadcrumbComp>
    </div>

    <div class="tabbar-right">
      <SettingsComp></SettingsComp>
    </div>
  </div>
</template>

<script setup lang="ts">
import BreadcrumbComp from './breadcrumb/BreadcrumbComp.vue'
import SettingsComp from './settings/SettingsComp.vue'
</script>

<style scoped lang="scss">
.tabbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 20px;
}
</style>
