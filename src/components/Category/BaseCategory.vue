<template>
  <el-card>
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <el-select
          :disabled="scene == 0 ? false : true"
          v-model="categoryStore.c1Id"
          @change="getC2"
          style="width: 240px"
        >
          <!-- label:为下拉选项的文字 value:为下拉选项对应的值 -->
          <el-option
            v-for="c1 in categoryStore.c1Arr"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          :disabled="scene == 0 ? false : true"
          v-model="categoryStore.c2Id"
          @change="getC3"
          style="width: 240px"
        >
          <el-option
            v-for="c2 in categoryStore.c2Arr"
            :key="c2.id"
            :label="c2.name"
            :value="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          :disabled="scene == 0 ? false : true"
          v-model="categoryStore.c3Id"
          style="width: 240px"
        >
          <el-option
            v-for="c3 in categoryStore.c3Arr"
            :key="c3.id"
            :label="c3.name"
            :value="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
// 引入组件挂载完毕方法
import { onMounted } from 'vue'
// 引入分类相关的仓库
import useCategoryStore from '@/stores/modules/category'

const categoryStore = useCategoryStore()

// 接收父组件传递过来scene
defineProps(['scene'])

// 分类全局组件挂载完毕,通知仓库发请求获取一级分类的数据
onMounted(() => {
  categoryStore.getC1()
})

// 一级分类下拉菜单的change事件处理器(选中值的时候会触发,保证一级分类ID有了)
const getC2 = () => {
  // 需要将二级、三级分类的数据清空
  categoryStore.c2Id = ''
  categoryStore.c3Arr = []
  categoryStore.c3Id = ''
  // 通知仓库获取二级分类的数据
  categoryStore.getC2()
}

// 二级分类下拉菜单的change事件处理器(选中值的时候会触发,保证二级分类ID有了)
const getC3 = () => {
  // 清理三级分类的数据
  categoryStore.c3Id = ''
  categoryStore.getC3()
}
</script>

<style scoped lang="scss"></style>
