<template>
  <div class="top">
    <div class="left">
      <span class="leftBtn" @click="goHome">首页</span>
    </div>
    <div class="center"><div class="title">可视化大数据平台</div></div>
    <div class="right">
      <span class="statistics">统计数据</span>
      <span class="time">当前时间:{{ time }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import moment from 'moment'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const router = useRouter()
const goHome = () => {
  router.push('/home')
}

const time = ref(moment().format('YYYY年MM月DD日 hh:mm:ss'))
const timer = ref(0)
onMounted(() => {
  timer.value = setInterval(() => {
    time.value = moment().format('YYYY年MM月DD日 hh:mm:ss')
  }, 1000)
})
onBeforeUnmount(() => {
  clearInterval(timer.value)
})
</script>

<style lang="scss" scoped>
.top {
  width: 100%;
  height: 40px;
  display: flex;

  .left {
    flex: 1.5;
    background: url('../../images/dataScreen-header-left-bg.png') no-repeat;
    background-size: 100% 100%;

    .leftBtn {
      width: 120px;
      height: 40px;
      float: right;
      background: url('../../images/dataScreen-header-btn-bg-l.png') no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 40px;
      color: white;
      font-size: 20px;
    }
  }

  .center {
    flex: 2;

    .title {
      width: 100%;
      height: 74px;
      background: url('../../images/dataScreen-header-center-bg.png') no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 74px;
      color: white;
      font-size: 30px;
    }
  }

  .right {
    flex: 1.5;
    background: url('../../images/dataScreen-header-right-bg.png') no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .statistics {
      width: 120px;
      height: 40px;
      background: url('../../images/dataScreen-header-btn-bg-r.png') no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 40px;
      color: white;
      font-size: 20px;
    }

    .time {
      text-align: center;
      line-height: 40px;
      color: white;
      font-size: 16px;
      margin-right: 10px;
    }
  }
}
</style>
