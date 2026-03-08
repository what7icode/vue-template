<template>
  <div class="logo">
    <img :src="settings.logo" alt="logo" />
    <p :class="{ 'is-hidden': settingsStore.isCollapse }">{{ settings.title }}</p>
  </div>
</template>

<script setup lang="ts">
import settings from '@/settings'
import useSettingsStore from '@/stores/modules/settings'

const settingsStore = useSettingsStore()
</script>

<style lang="scss" scoped>
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  color: white;
  display: flex;
  align-items: center;
  padding: 20px 20px 20px 12px;
  overflow: hidden;

  img {
    width: 40px;
    height: 40px;
    flex-shrink: 0;
  }

  p {
    font-size: $base-logo-title-font-size;
    font-weight: bold;
    margin-left: 10px;
    white-space: nowrap;
    opacity: 1;
    transition:
      opacity 0.3s ease,
      margin-left 0.3s ease;

    &.is-hidden {
      opacity: 0;
      margin-left: 0;
      width: 0;
      overflow: hidden;
    }
  }
}
</style>
