<template>
  <div>
    <el-card>
      <div class="box">
        <img :src="userStore.avatar" alt="" />
        <div class="welcome">
          <h2 class="title">欢迎 {{ userStore.username }}</h2>
          <p class="subtitle">zhenxuan后台管理系统</p>
        </div>
      </div>
    </el-card>
    <div class="bottom-img">
      <svg-icon name="welcome" width="500px" height="500px"></svg-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import useUserStore from '@/stores/modules/user'

const userStore = useUserStore()
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  align-items: center;

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }

  .welcome {
    margin-left: 20px;

    .title {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .subtitle {
      font-size: 16px;
      color: skyblue;
    }
  }
}

.bottom-img {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
</style>
