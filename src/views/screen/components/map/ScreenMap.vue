<template>
  <div class="map-container" ref="mapChart"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import chinaMap from './china.json'

const mapChart = ref<HTMLDivElement | null>(null)
let myChart: echarts.ECharts | null = null

// Register China map
// eslint-disable-next-line @typescript-eslint/no-explicit-any
echarts.registerMap('china', chinaMap as any)

const initChart = () => {
  if (!mapChart.value) return
  myChart = echarts.init(mapChart.value)

  const geoCoordMap: Record<string, number[]> = {
    北京: [116.405285, 39.904989],
    上海: [121.472644, 31.231706],
    广州: [113.280637, 23.125178],
    成都: [104.065735, 30.659462],
    西安: [108.948024, 34.263161],
    乌鲁木齐: [87.617733, 43.792818],
    拉萨: [91.132212, 29.660361],
    昆明: [102.712251, 25.040609],
    沈阳: [123.429096, 41.796768],
    武汉: [114.305392, 30.593099],
  }

  const flightsData = [
    { fromName: '北京', toName: '上海', value: 95 },
    { fromName: '北京', toName: '广州', value: 90 },
    { fromName: '北京', toName: '成都', value: 80 },
    { fromName: '北京', toName: '西安', value: 70 },
    { fromName: '上海', toName: '乌鲁木齐', value: 60 },
    { fromName: '广州', toName: '拉萨', value: 50 },
    { fromName: '广州', toName: '昆明', value: 65 },
    { fromName: '西安', toName: '沈阳', value: 40 },
    { fromName: '成都', toName: '武汉', value: 75 },
    { fromName: '武汉', toName: '北京', value: 85 },
  ]

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const convertData = (data: any[]) => {
    const res = []
    for (let i = 0; i < data.length; i++) {
      const dataItem = data[i]
      const fromCoord = geoCoordMap[dataItem.fromName]
      const toCoord = geoCoordMap[dataItem.toName]
      if (fromCoord && toCoord) {
        res.push({
          fromName: dataItem.fromName,
          toName: dataItem.toName,
          coords: [fromCoord, toCoord],
          value: dataItem.value,
        })
      }
    }
    return res
  }

  const option: echarts.EChartsOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(12, 21, 48, 0.9)',
      borderColor: '#05c8ff',
      textStyle: {
        color: '#fff',
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formatter: (params: any) => {
        if (params.seriesType === 'lines') {
          return `${params.data.fromName} > ${params.data.toName}`
        } else if (params.seriesType === 'effectScatter') {
          return params.data.name
        }
        return ''
      },
    },
    geo: {
      map: 'china',
      // 是否开启缩放和拖动
      roam: false,
      zoom: 1.2,
      label: {
        show: false,
        color: '#fff',
      },
      itemStyle: {
        areaColor: {
          type: 'radial',
          x: 0.5,
          y: 0.5,
          r: 0.8,
          colorStops: [
            { offset: 0, color: 'rgba(147, 235, 248, 0)' },
            { offset: 1, color: 'rgba(147, 235, 248, .2)' },
          ],
        },
        borderColor: 'rgba(147, 235, 248, 1)',
        borderWidth: 1,
        shadowColor: 'rgba(147, 235, 248, 0.5)',
        shadowBlur: 10,
      },
      emphasis: {
        itemStyle: {
          areaColor: '#389BB7',
          borderWidth: 0,
        },
      },
    },
    series: [
      {
        name: 'Flights',
        type: 'lines',
        coordinateSystem: 'geo',
        zlevel: 1,
        effect: {
          show: true,
          period: 4,
          trailLength: 0.7,
          color: '#fff',
          symbolSize: 3,
        },
        lineStyle: {
          color: '#05c8ff',
          width: 0,
          curveness: 0.2,
        },
        data: convertData(flightsData),
      },
      {
        name: 'Lines Anim',
        type: 'lines',
        coordinateSystem: 'geo',
        zlevel: 2,
        symbol: ['none', 'arrow'],
        symbolSize: 10,
        effect: {
          show: true,
          period: 4,
          trailLength: 0,
          symbol: 'circle',
          symbolSize: 5,
        },
        lineStyle: {
          color: '#05c8ff',
          width: 1,
          opacity: 0.6,
          curveness: 0.2,
        },
        data: convertData(flightsData),
      },
      {
        name: 'Cities',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 3,
        rippleEffect: {
          brushType: 'stroke',
        },
        label: {
          show: true,
          position: 'right',
          formatter: '{b}',
          color: '#fff',
        },
        itemStyle: {
          color: '#05c8ff',
          shadowBlur: 10,
          shadowColor: '#333',
        },
        data: Object.keys(geoCoordMap).map((name) => ({
          name,
          value: geoCoordMap[name]?.concat(100),
        })),
      },
    ],
  }

  myChart.setOption(option)
}

// const handleResize = () => {
//   myChart?.resize()
// }

onMounted(() => {
  initChart()
  // window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  // window.removeEventListener('resize', handleResize)
  myChart?.dispose()
})
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
}
</style>
