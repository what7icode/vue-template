<template>
  <el-form label-width="100px">
    <el-form-item label="SPU名称">
      <el-input placeholder="请你输入SPU名称" v-model="spuParams.spuName"></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select placeholder="请你选择品牌" v-model="spuParams.tmId">
        <el-option
          v-for="item in allTrademark"
          :key="item.id"
          :label="item.tmName"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input
        type="textarea"
        placeholder="请你输入SPU描述"
        v-model="spuParams.description"
      ></el-input>
    </el-form-item>
    <el-form-item label="SPU图片">
      <!-- v-model:fileList->展示默认图片  action:上传图片的接口地址  list-type:文件列表的显示类型 -->
      <el-upload
        v-model:file-list="imgList as UploadUserFile[]"
        action="/api/admin/product/fileUpload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :before-upload="handlerUpload"
      >
        <el-icon>
          <Plus />
        </el-icon>
      </el-upload>
      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" style="width: 100%; height: 100%" />
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <!-- 展示销售属性的下拉菜单 -->
      <el-select
        v-model="saleAttrIdAndName"
        :placeholder="unSelectSaleAttr.length > 0 ? `还有${unSelectSaleAttr.length}个未选择` : '无'"
        :style="{ width: '200px' }"
      >
        <el-option
          v-for="item in unSelectSaleAttr"
          :key="item.id"
          :label="item.name"
          :value="`${item.id}:${item.name}`"
        ></el-option>
      </el-select>
      <el-button
        @click="addSaleAttr"
        :disabled="saleAttrIdAndName ? false : true"
        style="margin-left: 10px"
        type="primary"
        icon="Plus"
      >
        添加销售属性
      </el-button>
      <!-- table展示销售属性与属性值的地方 -->
      <el-table border style="margin: 10px 0" :data="saleAttr">
        <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
        <el-table-column label="销售属性名" width="120px" prop="saleAttrName"></el-table-column>
        <el-table-column label="销售属性值">
          <!-- row:即为当前SPU已有的销售属性对象 -->
          <template #default="{ row }">
            <el-tag
              style="margin: 0 5px"
              @close="row.spuSaleAttrValueList.splice(index, 1)"
              v-for="(item, index) in row.spuSaleAttrValueList"
              :key="item.id"
              closable
            >
              {{ item.saleAttrValue }}
            </el-tag>
            <el-input
              @blur="toLook(row)"
              v-model="row.saleAttrValue"
              v-if="row.flag == true"
              placeholder="请你输入属性值"
              size="small"
              style="width: 100px"
              ref="inputEl"
            ></el-input>
            <el-button
              @click="toEdit(row)"
              v-else
              type="primary"
              size="small"
              icon="Plus"
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template #default="{ $index }">
            <el-button
              type="danger"
              size="small"
              icon="Delete"
              @click="saleAttr.splice($index, 1)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button :disabled="saleAttr.length > 0 ? false : true" type="primary" @click="save">
        保存
      </el-button>
      <el-button type="primary" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import type {
  SpuData,
  AllTrademark,
  SaleAttrResponseData,
  SpuImage,
  Trademark,
  SaleAttr,
  SaleAttrValue,
  BaseSaleAttr,
  AllSaleAttrResponseData,
  SpuImgListResponseData,
} from '@/api/product/spu/type'
import {
  reqAllTrademark,
  reqSpuImageList,
  reqSpuHasSaleAttr,
  reqAllSaleAttr,
  reqAddOrUpdateSpu,
} from '@/api/product/spu'
import { ref, computed, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import type { UploadFile, UploadUserFile } from 'element-plus'

const $emit = defineEmits(['changeScene'])

const inputEl = ref<HTMLInputElement>()

// 存储已有的SPU这些数据
const allTrademark = ref<Trademark[]>([])
const imgList = ref<SpuImage[]>([])
const saleAttr = ref<SaleAttr[]>([])
const allSaleAttr = ref<BaseSaleAttr[]>([])
// 收集SPU表单数据
const spuParams = ref<SpuData>({
  category3Id: '', // 收集三级分类的ID
  spuName: '', // SPU的名字
  description: '', // SPU的描述
  tmId: '', // 品牌的ID
  spuImageList: [],
  spuSaleAttrList: [],
})

// 控制对话框的显示与隐藏
const dialogVisible = ref<boolean>(false)
// 存储预览图片的地址
const dialogImageUrl = ref<string>('')

// 初始化SPU数据，暴露给父组件访问
const initHasSpuData = async (spu: SpuData) => {
  // 存储已有的SPU对象，将来在模板中展示
  // spu:即为父组件传递过来的已有的SPU对象[不完整]

  spuParams.value = { ...spu }
  // 获取全部品牌的数据
  const trademarkList: AllTrademark = await reqAllTrademark()
  // 获取当前SPU对应的全部图片
  const spuHasImgList: SpuImgListResponseData = await reqSpuImageList(spuParams.value.id as number)
  // 获取已有的SPU销售属性的数据
  const spuHasSaleAttrList: SaleAttrResponseData = await reqSpuHasSaleAttr(
    spuParams.value.id as number,
  )
  // 获取全部SPU的销售属性
  const allSaleAttrList: AllSaleAttrResponseData = await reqAllSaleAttr()

  // 存储全部品牌的数据
  allTrademark.value = trademarkList.data
  // SPU对应商品图片
  imgList.value = spuHasImgList.data.map((item) => {
    return {
      name: item.imgName as string,
      url: item.imgUrl as string,
    }
  })
  // 存储已有的SPU的销售属性
  saleAttr.value = spuHasSaleAttrList.data
  // 存储全部的销售属性
  allSaleAttr.value = allSaleAttrList.data
}

// 照片墙点击预览按钮的时候触发的钩子
const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url as string
  dialogVisible.value = true
}

// 照片墙删除钩子
const handleRemove = () => {}

// 照片墙上传成功之前的钩子：约束文件的大小与类型
const handlerUpload = (file: File) => {
  if (file.type == 'image/png' || file.type == 'image/jpeg' || file.type == 'image/gif') {
    if (file.size / 1024 / 1024 < 3) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '上传文件务必小于3M',
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传文件务必PNG|JPG|GIF',
    })
    return false
  }
}

// 计算出当前SPU还未拥有的销售属性
const unSelectSaleAttr = computed(() => {
  // 全部销售属性:颜色、版本、尺码
  // 已有的销售属性:颜色、版本
  const unSelectArr = allSaleAttr.value.filter((item) => {
    return saleAttr.value.every((hasItem) => {
      return item.name != hasItem.saleAttrName
    })
  })
  return unSelectArr
})

// 收集还未选择的销售属性的ID与名字
const saleAttrIdAndName = ref<string>('')

// 添加销售属性的方法
const addSaleAttr = () => {
  /*
    "baseSaleAttrId": number,
    "saleAttrName": string,
    "spuSaleAttrValueList": SpuSaleAttrValueList
    */
  const [baseSaleAttrId, saleAttrName] = saleAttrIdAndName.value.split(':')

  const newSaleAttr: SaleAttr = {
    baseSaleAttrId: baseSaleAttrId as string,
    saleAttrName: saleAttrName as string,
    spuSaleAttrValueList: [],
  }
  // 追加到数组当中
  saleAttr.value.push(newSaleAttr)
  // 清空收集的销售属性的ID与名字
  saleAttrIdAndName.value = ''
}

// 属性值“+”按钮的点击事件回调
const toEdit = (row: SaleAttr) => {
  // 点击按钮的时候,input组件出来->编辑模式
  row.flag = true
  row.saleAttrValue = ''
  nextTick(() => inputEl.value?.focus())
}

// 表单元素失却焦点的事件回调
const toLook = (row: SaleAttr) => {
  // 整理收集的属性ID与具体的属性值
  const { baseSaleAttrId, saleAttrValue } = row
  // 整理成服务器需要的属性值对象
  const newSaleAttrValue: SaleAttrValue = {
    baseSaleAttrId,
    saleAttrValue: saleAttrValue as string,
  }

  // 非空判断
  if ((saleAttrValue as string).trim() == '') {
    ElMessage({
      type: 'error',
      message: '属性值不能为空的',
    })
    row.flag = false
    return
  }
  // 判断属性值是否重复
  const repeat = row.spuSaleAttrValueList.find((item) => {
    return item.saleAttrValue == saleAttrValue
  })
  if (repeat) {
    ElMessage({
      type: 'error',
      message: '属性值重复',
    })
    return
  }

  // 追加新的属性值对象
  row.spuSaleAttrValueList.push(newSaleAttrValue)
  // 切换为查看模式
  row.flag = false
}

// 保存按钮的回调
const save = async () => {
  // 整理参数
  // 1.照片墙的数据
  spuParams.value.spuImageList = imgList.value.map(
    (item: SpuImage & { response?: { data: string } }) => {
      return {
        imgName: item.name, // 图片的名字
        imgUrl: (item.response && item.response.data) || item.url,
      }
    },
  )
  // 2.整理销售属性的数据
  spuParams.value.spuSaleAttrList = saleAttr.value
  // 发请求:添加SPU|更新已有的SPU
  const result = await reqAddOrUpdateSpu(spuParams.value)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: spuParams.value.id ? '更新成功' : '添加成功',
    })
    // 通知父组件切换场景为0
    $emit('changeScene', {
      flag: 0,
      params: spuParams.value.id ? 'update' : 'add',
    })
  } else {
    ElMessage({
      type: 'error',
      message: spuParams.value.id ? '更新失败' : '添加失败',
    })
  }
}

// 添加一个新的SPU的初始化方法
const initAddSpu = async (c3Id: number | string) => {
  // 清空数据
  Object.assign(spuParams.value, {
    category3Id: '', // 收集三级分类的ID
    spuName: '', // SPU的名字
    description: '', // SPU的描述
    tmId: '', // 品牌的ID
    spuImageList: [],
    spuSaleAttrList: [],
    id: undefined, // 关键：必须显式清空id，否则Object.assign会保留上次操作的id，导致添加变成更新
  })
  // 清空照片
  imgList.value = []
  // 清空销售属性
  saleAttr.value = []
  // 清空下拉菜单收集的销售属性的ID与名字
  saleAttrIdAndName.value = ''
  // 存储三级分类的ID
  spuParams.value.category3Id = c3Id
  // 获取全部品牌的数据
  const allTrademarkList: AllTrademark = await reqAllTrademark()
  // 获取整个项目全部SPU的销售属性
  const allSaleAttrList: AllSaleAttrResponseData = await reqAllSaleAttr()
  // 存储数据
  allTrademark.value = allTrademarkList.data
  allSaleAttr.value = allSaleAttrList.data
}

// 点击取消按钮:通知父组件切换场景为0,展示已有的SPU
const cancel = () => {
  $emit('changeScene', { flag: 0, params: 'update' })
}

// 对外暴露
defineExpose({ initHasSpuData, initAddSpu })
</script>

<style scoped lang="scss"></style>
