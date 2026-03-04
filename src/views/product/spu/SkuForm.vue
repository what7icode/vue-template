<template>
  <el-form label-width="100px">
    <el-form-item label="SKU名称">
      <el-input placeholder="SKU名称" v-model="skuParams.skuName"></el-input>
    </el-form-item>
    <el-form-item label="价格(元)">
      <el-input placeholder="价格(元)" type="number" v-model="skuParams.price"></el-input>
    </el-form-item>
    <el-form-item label="重量(g)">
      <el-input placeholder="重量(g)" type="number" v-model="skuParams.weight"></el-input>
    </el-form-item>
    <el-form-item label="SKU描述">
      <el-input placeholder="SKU描述" type="textarea" v-model="skuParams.skuDesc"></el-input>
    </el-form-item>
    <el-form-item label="平台属性">
      <el-form :inline="true">
        <el-form-item v-for="item in attrArr" :key="item.id" :label="item.attrName">
          <el-select v-model="item.attrIdAndValueId" style="width: 150px">
            <el-option
              v-for="attrValue in item.attrValueList"
              :key="attrValue.id"
              :label="attrValue.value"
              :value="`${item.id}:${attrValue.id}`"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-form :inline="true">
        <el-form-item v-for="item in saleArr" :key="item.id" :label="item.saleAttrName">
          <el-select v-model="item.saleAttrIdAndValueId" style="width: 240px">
            <el-option
              v-for="saleAttrValue in item.spuSaleAttrValueList"
              :key="saleAttrValue.id"
              :label="saleAttrValue.saleAttrValue"
              :value="`${item.id}:${saleAttrValue.id}`"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="图片名称">
      <el-table border :data="imgArr" ref="table">
        <el-table-column type="selection" width="80px" align="center"></el-table-column>
        <el-table-column label="图片">
          <template #default="{ row }">
            <img :src="row.imgUrl" alt="" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="imgName"></el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="handler(row)"> 设置默认 </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="default" @click="save">保存</el-button>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { reqAttr } from '@/api/product/attr'
import { reqSpuImageList, reqSpuHasSaleAttr, reqAddSku } from '@/api/product/spu'
import type {
  AttrAndValueID,
  ResponseData,
  SaleAttr,
  SaleAttrAndValueID,
  SaleAttrResponseData,
  SkuData,
  SpuData,
  SpuImage,
  SpuImgListResponseData,
} from '@/api/product/spu/type'
import { ElMessage } from 'element-plus'
import type { AttrList, AttrResponseData, Attr } from '@/api/product/attr/type'

// 自定义事件的方法
const $emit = defineEmits(['changeScene'])

// 平台属性
const attrArr = ref<AttrList>([])
// 销售属性
const saleArr = ref<SaleAttr[]>([])
// 照片的数据
const imgArr = ref<SpuImage[]>([])
// 收集SKU的参数
const skuParams = ref<SkuData>({
  // 父组件传递过来的数据
  category3Id: '', // 三级分类的ID
  spuId: '', // 已有的SPU的ID
  tmId: '', // SPU品牌的ID
  // v-model收集
  skuName: '', // sku名字
  price: '', // sku价格
  weight: '', // sku重量
  skuDesc: '', // sku的描述
  skuAttrValueList: [], // 平台属性的收集
  skuSaleAttrValueList: [], // 销售属性
  skuDefaultImg: '', // sku图片地址
})
// 获取table组件实例
const table = ref()

// 取消按钮的回调
const cancel = () => {
  $emit('changeScene', { flag: 0, params: '' })
}

// 当前子组件暴露一个方法:初始化数据
const initSkuData = async (c1Id: number | string, c2Id: number | string, spu: SpuData) => {
  // 收集数据
  skuParams.value.category3Id = spu.category3Id
  skuParams.value.spuId = spu.id as number
  skuParams.value.tmId = spu.tmId

  // 获取平台属性
  const attrList: AttrResponseData = await reqAttr(c1Id, c2Id, spu.category3Id)
  // 获取对应的销售属性
  const saleAttrList: SaleAttrResponseData = await reqSpuHasSaleAttr(spu.id as number)
  // 获取照片墙的数据
  const spuImgList: SpuImgListResponseData = await reqSpuImageList(spu.id as number)

  // 平台属性
  attrArr.value = attrList.data
  // 销售属性
  saleArr.value = saleAttrList.data
  // 图片
  imgArr.value = spuImgList.data
}

// 设置默认图片的方法回调
const handler = (row: SpuImage) => {
  // 点击的时候,全部图片的复选框不勾选
  imgArr.value.forEach((item: SpuImage) => {
    table.value.toggleRowSelection(item, false)
  })
  // 选中的图片复选框选中
  table.value.toggleRowSelection(row, true)
  // 收集图片地址
  skuParams.value.skuDefaultImg = row.imgUrl as string
}

// 保存按钮的方法
const save = async () => {
  // 整理参数
  // 1.平台属性
  skuParams.value.skuAttrValueList = attrArr.value.reduce((prev: AttrAndValueID[], next: Attr) => {
    if (next.attrIdAndValueId) {
      const [attrId, valueId] = next.attrIdAndValueId.split(':')
      prev.push({
        attrId: Number(attrId),
        valueId: Number(valueId),
      })
    }
    return prev
  }, [])
  // 2.销售属性
  skuParams.value.skuSaleAttrValueList = saleArr.value.reduce(
    (prev: SaleAttrAndValueID[], next: SaleAttr) => {
      if (next.saleAttrIdAndValueId) {
        const [saleAttrId, saleAttrValueId] = next.saleAttrIdAndValueId.split(':')
        prev.push({
          saleAttrId: Number(saleAttrId),
          saleAttrValueId: Number(saleAttrValueId),
        })
      }
      return prev
    },
    [],
  )
  // 发请求
  const result: ResponseData = await reqAddSku(skuParams.value)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '添加SKU成功',
    })
    // 通知父组件切换场景为0
    $emit('changeScene', { flag: 0, params: '' })
  } else {
    ElMessage({
      type: 'error',
      message: '添加SKU失败',
    })
  }
}

// 对外暴露
defineExpose({ initSkuData })
</script>

<style scoped></style>
