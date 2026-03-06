<template>
  <el-card>
    <el-table border :data="skuList" style="margin: 10px 0">
      <el-table-column label="序号" type="index" width="70px" align="center" />
      <el-table-column label="名称" prop="skuName" show-overflow-tooltip width="150px" />
      <el-table-column label="描述" prop="skuDesc" show-overflow-tooltip width="150px" />
      <el-table-column label="图片" prop="image" width="150px">
        <template #default="{ row }">
          <img :src="row.skuDefaultImg" alt="图片" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column label="价格" prop="price" width="150px" />
      <el-table-column label="重量" prop="weight" width="150px" />
      <el-table-column label="操作" width="250px" fixed="right">
        <template #default="{ row }">
          <el-button
            type="primary"
            size="small"
            :icon="row.isSale == 1 ? 'Top' : 'Bottom'"
            @click="updateSale(row)"
          ></el-button>
          <el-button type="primary" size="small" icon="Edit"></el-button>
          <el-button
            type="primary"
            size="small"
            icon="InfoFilled"
            @click="findSku(row)"
          ></el-button>
          <el-button type="primary" size="small" icon="Delete" @click="deleteSku(row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[3, 5, 7, 9]"
      :background="true"
      layout="prev, pager, next, jumper,->,sizes,total"
      :total="total"
      @current-change="getSkuList"
      @size-change="handleSizeChange"
    />
    <!-- 抽屉组件 -->
    <el-drawer v-model="drawer">
      <template #header>
        <h4>查看商品详情</h4>
      </template>
      <template #default>
        <el-row style="margin: 10px 0">
          <el-col :span="6">名称</el-col>
          <el-col :span="18">{{ skuInfo.skuName }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">描述</el-col>
          <el-col :span="18">{{ skuInfo.skuDesc }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">价格</el-col>
          <el-col :span="18">{{ skuInfo.price }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">平台属性</el-col>
          <el-col :span="18">
            <el-tag style="margin: 5px" v-for="item in skuInfo.skuAttrValueList" :key="item.id">{{
              item.valueName
            }}</el-tag>
          </el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">销售属性</el-col>
          <el-col :span="18">
            <el-tag
              style="margin: 5px"
              v-for="item in skuInfo.skuSaleAttrValueList"
              :key="item.id"
              >{{ item.saleAttrValueName }}</el-tag
            >
          </el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">商品图片</el-col>
          <el-col :span="18">
            <el-carousel :interval="4000" type="card" height="200px">
              <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
                <img :src="item.imgUrl" alt="" style="width: 100%; height: 100%" />
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </template>
    </el-drawer>
  </el-card>
</template>

<script setup lang="ts">
import { reqCancelSale, reqRemoveSku, reqSaleSku, reqSkuInfo, reqSkuList } from '@/api/product/sku'
import type { SkuInfoData, SkuResponseData } from '@/api/product/sku/type'
import type { SkuData } from '@/api/product/sku/type'
import { onMounted, ref } from 'vue'

// 分页器默认页码
const pageNo = ref<number>(1)
// 每一页展示几条数据
const pageSize = ref<number>(3)
// 总数
const total = ref<number>(0)
// sku列表
const skuList = ref<SkuData[]>([])

const drawer = ref<boolean>(false)

onMounted(() => {
  getSkuList()
})

const getSkuList = async (pagerNo = 1) => {
  pageNo.value = pagerNo
  const result: SkuResponseData = await reqSkuList(pageNo.value, pageSize.value)
  if (result.code === 200) {
    total.value = result.data.total
    skuList.value = result.data.records
  }
}

const handleSizeChange = (newSize: number) => {
  pageSize.value = newSize
  getSkuList()
}

const updateSale = async (row: SkuData) => {
  if (row.isSale == 1) {
    const result = await reqCancelSale(row.id as number)
    if (result.code === 200) {
      ElMessage.success('下架成功')
      getSkuList(pageNo.value)
    }
  } else {
    const result = await reqSaleSku(row.id as number)
    if (result.code === 200) {
      ElMessage.success('上架成功')
      getSkuList(pageNo.value)
    }
  }
}

const skuInfo = ref<SkuData>({})
const findSku = async (row: SkuData) => {
  // 清空旧数据，防止显示上一次的数据
  skuInfo.value = {}
  drawer.value = true
  const result: SkuInfoData = await reqSkuInfo(row.id as number)
  skuInfo.value = result.data
  console.log(skuInfo.value)
}

const deleteSku = async (row: SkuData) => {
  const result = await reqRemoveSku(row.id as number)
  if (result.code === 200) {
    ElMessage.success('删除成功')
    // 如果当前页只有一条数据且页码大于1，则页码减1
    if (skuList.value.length === 1 && pageNo.value > 1) {
      getSkuList(pageNo.value - 1)
    } else {
      getSkuList(pageNo.value)
    }
  } else {
    ElMessage.error('删除失败')
  }
}
</script>

<style lang="scss" scoped></style>
