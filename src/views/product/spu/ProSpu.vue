<template>
  <div>
    <!-- 三级分类 -->
    <BaseCategory :scene="scene"></BaseCategory>
    <el-card style="margin: 10px 0">
      <!-- v-if|v-show:都可以实现显示与隐藏 -->
      <div v-show="scene == 0">
        <el-button
          @click="addSpu"
          type="primary"
          size="default"
          icon="Plus"
          :disabled="categoryStore.c3Id ? false : true"
        >
          添加SPU
        </el-button>
        <!-- 展示SPU数据 -->
        <el-table style="margin: 10px 0" border :data="records">
          <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
          <el-table-column label="SPU名称" prop="spuName"></el-table-column>
          <el-table-column
            label="SPU描述"
            prop="description"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="SPU操作">
            <!-- row:SPU对象 -->
            <template #default="{ row }">
              <el-button
                type="primary"
                size="small"
                icon="Plus"
                title="添加SKU"
                @click="addSku(row)"
              ></el-button>
              <el-button
                type="warning"
                size="small"
                icon="Edit"
                title="修改SPU"
                @click="updateSpu(row)"
              ></el-button>
              <el-button
                type="info"
                size="small"
                icon="View"
                title="查看SKU"
                @click="findSku(row)"
              ></el-button>
              <el-popconfirm
                :title="`你确定删除${row.spuName}?`"
                width="200px"
                @confirm="deleteSpu(row)"
              >
                <!-- 气泡确认框的触发模板，点击触发气泡确认框 -->
                <template #reference>
                  <el-button type="danger" size="small" icon="Delete" title="删除SPU"></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 pager -->
        <el-pagination
          v-model:current-page="pageNo"
          v-model:page-size="pageSize"
          :page-sizes="[3, 5, 7, 9]"
          :background="true"
          layout="prev, pager, next, jumper,->,sizes,total"
          :total="total"
          @current-change="getSpu"
          @size-change="changeSize"
        />
      </div>
      <!-- 添加SPU|修改SPU子组件 -->
      <SpuForm ref="spuForm" v-show="scene == 1" @changeScene="changeScene"></SpuForm>
      <!-- 添加SKU的子组件 -->
      <SkuForm ref="skuForm" v-show="scene == 2" @changeScene="changeScene"></SkuForm>
      <!-- dialog对话框:展示已有的SKU数据 -->
      <el-dialog v-model="show" title="SKU列表">
        <el-table border :data="skuArr">
          <el-table-column label="SKU名字" prop="skuName"></el-table-column>
          <el-table-column label="SKU价格" prop="price"></el-table-column>
          <el-table-column label="SKU重量" prop="weight"></el-table-column>
          <el-table-column label="SKU图片">
            <template #default="{ row }">
              <img :src="row.skuDefaultImg" style="width: 100px; height: 100px" />
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted, ref, watch } from 'vue'
import { reqSpu, reqDeleteSpu, reqSkuList } from '@/api/product/spu'
import type {
  SpuResponseData,
  SpuRecords,
  SpuData,
  ResponseData,
  SkuInfoData,
  SkuData,
} from '@/api/product/spu/type'
import useCategoryStore from '@/stores/modules/category'
import { ElMessage } from 'element-plus'
import BaseCategory from '@/components/Category/BaseCategory.vue'
import SpuForm from './SpuForm.vue'
import SkuForm from './SkuForm.vue'

// 场景的数据
const scene = ref<number>(0) // 0:显示已有SPU  1:添加或者修改已有SPU  2:添加SKU的结构
// 分页器默认页码
const pageNo = ref<number>(1)
// 每一页展示几条数据
const pageSize = ref<number>(3)
// 存储已有的SPU数据
const records = ref<SpuRecords>([])
// 存储已有SPU总个数
const total = ref<number>(0)
// 获取分类的仓库
const categoryStore = useCategoryStore()
// 获取子组件实例SpuForm
const spuForm = ref()
// 获取子组件实例SkuForm
const skuForm = ref()
// 存储全部的SKU数据
const skuArr = ref<SkuData[]>([])
const show = ref<boolean>(false)

// 监听三级分类ID变化
watch(
  () => categoryStore.c3Id,
  () => {
    records.value = []
    // 保证有三级分类ID，ID消失也是变化
    if (!categoryStore.c3Id) return
    getSpu()
  },
)

// 获取某一个三级分类下全部的已有的SPU
const getSpu = async (pagerNo = 1) => {
  // 修改当前页码
  pageNo.value = pagerNo
  const result: SpuResponseData = await reqSpu(pageNo.value, pageSize.value, categoryStore.c3Id)
  if (result.code == 200) {
    records.value = result.data.records
    total.value = result.data.total
  }
}

// 分页器下拉菜单发生变化的时候触发
const changeSize = () => {
  getSpu()
}

// 添加SPU按钮的回调
const addSpu = () => {
  // 切换为场景1:添加与修改已有SPU结构->SpuForm
  scene.value = 1
  // 点击添加SPU按钮,调用子组件的方法初始化数据
  spuForm.value.initAddSpu(categoryStore.c3Id)
}

// 修改已有的SPU的按钮的回调
const updateSpu = (row: SpuData) => {
  // 切换为场景1:添加与修改已有SPU结构->SpuForm
  scene.value = 1
  // 调用子组件实例方法获取完整已有的SPU的数据
  spuForm.value.initHasSpuData(row)
}

// 添加SKU按钮的回调
const addSku = (row: SpuData) => {
  // 切换为场景2:添加SKU结构->SkuForm
  scene.value = 2
  // 调用子组件实例方法初始化添加SKU的数据
  skuForm.value.initSkuData(categoryStore.c1Id, categoryStore.c2Id, row)
}

// 查看SKU列表按钮的回调
const findSku = async (row: SpuData) => {
  const result: SkuInfoData = await reqSkuList(row.id as number)
  if (result.code == 200) {
    skuArr.value = result.data
    show.value = true
  }
}

// 删除已有的SPU按钮的回调
const deleteSpu = async (row: SpuData) => {
  const result: ResponseData = await reqDeleteSpu(row.id as number)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    // 获取剩余SPU数据
    getSpu(records.value.length > 1 ? pageNo.value : pageNo.value - 1)
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}

// 子组件SpuForm绑定自定义事件:目前是让子组件通知父组件切换场景为0
const changeScene = (throwing: { flag: number; params: string }) => {
  // 子组件SpuForm点击取消变为场景0:展示已有的SPU
  scene.value = throwing.flag
  if (throwing.params == 'update') {
    // 更新留在当前页
    getSpu(pageNo.value)
  } else {
    // 添加留在第一页
    getSpu()
  }
}

onUnmounted(() => {
  categoryStore.$reset()
})
</script>

<style lang="scss" scoped>
/* 移除照片墙所有过渡效果 */
:deep(.el-upload-list__item) {
  transition: none !important;
}

/* 隐藏照片墙 "press delete to remove" 文本 */
:deep(.el-icon--close-tip) {
  display: none !important;
}
</style>
