<template>
  <div class="logo">
    <img :src="settings.logo" alt="logo" />
    <p>{{ settings.title }}</p>
  </div>
</template>

<script setup lang="ts">
import settings from '@/settings'
</script>

<style lang="scss" scoped>
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  color: white;
  display: flex;
  align-items: center;
  padding: 20px 20px 20px 12px;

  img {
    width: 40px;
    height: 40px;
  }

  p {
    font-size: $base-logo-title-font-size;
    font-weight: bold;
    margin-left: 10px;
  }
}
</style>
