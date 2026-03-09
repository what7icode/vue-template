<template>
  <div class="container">
    <div class="screen" ref="screenRef">
      <div class="top">
        <ScreenTop></ScreenTop>
      </div>
      <div class="bottom">
        <div class="left">
          <ScreenTourist class="tourist"></ScreenTourist>
          <ScreenSex class="sex"></ScreenSex>
          <ScreenAge class="age"></ScreenAge>
        </div>
        <div class="center">
          <ScreenMap class="map"></ScreenMap>
          <ScreenLine class="line"></ScreenLine>
        </div>
        <div class="right"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ScreenTop from './components/top/ScreenTop.vue'
import ScreenTourist from './components/tourist/ScreenTourist.vue'
import ScreenSex from './components/sex/ScreenSex.vue'
import ScreenAge from './components/age/ScreenAge.vue'
import ScreenMap from './components/map/ScreenMap.vue'
import ScreenLine from './components/line/ScreenLine.vue'
const screenRef = ref<HTMLDivElement | null>(null)
onMounted(() => {
  if (screenRef.value) {
    screenRef.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
  }
})

function getScale() {
  return Math.min(window.innerWidth / 1920, window.innerHeight / 1080)
}

window.onresize = () => {
  if (!screenRef.value) return
  screenRef.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
}
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  background: url('./images/bg.png') no-repeat;
  background-size: cover;

  .screen {
    position: fixed;
    width: 1920px;
    height: 1080px;
    left: 50%;
    top: 50%;
    transform-origin: left top;

    .top {
      width: 100%;
      height: 40px;
    }

    .bottom {
      display: flex;

      .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 40px;

        .rank {
          flex: 1.5;
        }

        .year {
          flex: 1;
        }

        .count {
          flex: 1;
        }
      }

      .left {
        flex: 1;
        height: 1040px;
        display: flex;
        flex-direction: column;

        .tourist {
          flex: 1.2;
        }

        .sex {
          flex: 1;
        }

        .age {
          flex: 1;
        }
      }

      .center {
        flex: 1.5;
        display: flex;
        flex-direction: column;

        .map {
          flex: 4;
          margin-top: 20px;
        }

        .line {
          flex: 1;
        }
      }
    }
  }
}
</style>
