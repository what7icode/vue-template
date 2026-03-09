<template>
  <div class="line-box">
    <div class="title">
      <p>未来七天游客数量趋势图</p>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>
    <div class="charts" ref="lineChart"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

const lineChart = ref<HTMLDivElement | null>(null)
let myChart: echarts.ECharts | null = null

const initChart = () => {
  if (!lineChart.value) return
  myChart = echarts.init(lineChart.value)

  const option: echarts.EChartsOption = {
    title: {
      text: '访问量',
      textStyle: {
        color: '#fff',
        fontSize: 14,
      },
      top: '5%',
      left: '10',
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(12, 21, 48, 0.9)',
      borderColor: '#05c8ff',
      textStyle: {
        color: '#fff',
      },
      axisPointer: {
        type: 'line',
        lineStyle: {
          color: '#05c8ff',
        },
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '20%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      axisLine: {
        show: true,
        lineStyle: {
          color: '#05c8ff',
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: '#fff',
      },
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgba(5, 200, 255, 0.1)',
        },
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#05c8ff',
        },
      },
      axisLabel: {
        color: '#fff',
      },
    },
    series: [
      {
        name: '游客人数',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        showSymbol: false,
        lineStyle: {
          color: '#05c8ff',
          width: 3,
        },
        itemStyle: {
          color: '#05c8ff',
          borderColor: '#fff',
          borderWidth: 2,
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: 'rgba(5, 200, 255, 0.4)',
              },
              {
                offset: 1,
                color: 'rgba(5, 200, 255, 0)',
              },
            ],
            false,
          ),
          shadowColor: 'rgba(5, 200, 255, 0.1)',
          shadowBlur: 10,
        },
        emphasis: {
          focus: 'series',
        },
        data: [1200, 3200, 2400, 5600, 4800, 7200, 6800],
      },
    ],
  }

  myChart.setOption(option)
}

const handleResize = () => {
  myChart?.resize()
}

onMounted(() => {
  initChart()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  myChart?.dispose()
})
</script>

<style scoped lang="scss">
.line-box {
  width: 90%;
  height: 100%;
  background: url('../../images/dataScreen-main-cb.png') no-repeat;
  background-size: 100% 100%;
  margin: 0 auto;

  .title {
    margin-left: 10px;

    p {
      color: white;
      font-size: 20px;
    }

    img {
      margin-top: 10px;
    }
  }

  .charts {
    height: calc(100% - 40px);
    width: 100%;
  }
}
</style>
