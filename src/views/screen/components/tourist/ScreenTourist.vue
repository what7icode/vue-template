<template>
  <div class="box">
    <div class="top">
      <p class="title">实时游客统计</p>
      <p class="bg"></p>
      <p class="right">
        可预约总量
        <span>72793</span>
        人
      </p>
    </div>
    <div class="number">
      <span v-for="(item, index) in people" :key="index">{{ item }}</span>
    </div>
    <!-- echarts展示图表 -->
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
// 扩展水球图
import 'echarts-liquidfill'

const people = ref('215908人')

// 获取节点
const charts = ref()
onMounted(() => {
  // 初始化echarts
  const myCharts = echarts.init(charts.value)
  // 设置配置项
  myCharts.setOption({
    // 标题
    title: {
      text: '预约人数占比',
      left: 'center',
      top: '0',
      textStyle: {
        color: 'white',
        fontSize: 16,
      },
    },
    // 系列
    series: [
      {
        type: 'liquidFill', // 系列类型
        data: [0.6, 0.4, 0.2], // 数据
        waveAnimation: true, // 动画
        animationDuration: 3, // 持续时间
        animationDurationUpdate: 0,
        radius: '80%', // 半径
        outline: {
          // 外层轮廓设置
          show: true,
          borderDistance: 8,
          itemStyle: {
            color: 'none',
            borderColor: '#294D99',
            borderWidth: 8,
            shadowBlur: 20,
            shadowColor: 'rgba(0, 0, 0, 0.25)',
          },
        },
      },
    ],
    // 布局
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
  })
})
</script>

<style scoped lang="scss">
.box {
  background: url('../../images/dataScreen-main-lb.png') no-repeat;
  background-size: 100% 100%;
  margin-top: 10px;

  .number {
    margin-top: 30px;
    display: flex;
    padding: 10px;

    span {
      flex: 1;
      height: 40px;
      text-align: center;
      line-height: 40px;
      background: url('../../images/total.png') no-repeat;
      background-size: 100% 100%;
      color: white;
      font-size: 22px;
      margin: 0 5px;
    }
  }

  .top {
    margin-left: 20px;

    .title {
      color: white;
      font-size: 20px;
    }

    .bg {
      width: 68px;
      height: 7px;
      background: url('../../images/dataScreen-title.png') no-repeat;
      background-size: 100% 100%;
      margin-top: 10px;
    }

    .right {
      float: right;
      color: white;
      font-size: 16px;
      margin-right: 20px;

      span {
        color: rgb(12 198 227);
      }
    }
  }

  .charts {
    width: 100%;
    height: 250px;
    margin-top: 20px;
  }
}
</style>
