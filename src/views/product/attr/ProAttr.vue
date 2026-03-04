<template>
  <div>
    <!-- 三级分类全局组件 -->
    <BaseCategory :scene="scene" />
    <el-card style="margin: 10px 0">
      <!-- 场景 0 展示属性表格 -->
      <div v-show="scene == 0">
        <el-button
          @click="addAttr"
          type="primary"
          size="default"
          icon="Plus"
          :disabled="categoryStore.c3Id ? false : true"
        >
          添加平台属性
        </el-button>
        <el-table border style="margin: 10px 0" :data="attrArr">
          <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
          <el-table-column label="属性名称" width="120px" prop="attrName"></el-table-column>
          <el-table-column label="属性值">
            <template #default="{ row }">
              <el-tag style="margin: 5px" v-for="item in row.attrValueList" :key="item.id">
                {{ item.value }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120px">
            <template #default="{ row }">
              <el-button
                type="primary"
                size="small"
                icon="Edit"
                @click="updateAttr(row)"
              ></el-button>
              <el-popconfirm
                :title="`你确定删除${row.attrName}?`"
                width="200px"
                @confirm="deleteAttr(row.id)"
              >
                <template #reference>
                  <el-button type="primary" size="small" icon="Delete"></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 场景 1 展示添加属性与修改属性的表单 -->
      <div v-show="scene == 1">
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input placeholder="请你输入属性名称" v-model="attrParams.attrName"></el-input>
          </el-form-item>
        </el-form>
        <el-button
          :disabled="attrParams.attrName ? false : true"
          type="primary"
          size="default"
          icon="Plus"
          @click="addAttrValue"
        >
          添加属性值
        </el-button>
        <el-table border style="margin: 10px 0" :data="attrParams.attrValueList">
          <el-table-column label="序号" width="80px" type="index" align="center"></el-table-column>
          <el-table-column label="属性值">
            <template #default="{ row, $index }">
              <el-input
                :ref="(elInput: any) => (inputArr[$index] = elInput)"
                v-if="row.flag"
                @blur="toLook(row, $index)"
                size="small"
                placeholder="请输入属性值"
                v-model="row.value"
              ></el-input>
              <div v-else @click="toEdit(row, $index)">{{ row.value }}</div>
            </template>
          </el-table-column>
          <el-table-column label="属性值操作">
            <template #default="{ row, $index }">
              <el-button
                type="danger"
                size="small"
                icon="Delete"
                @click="deleteAttrValue(row.id, $index)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          size="default"
          @click="save"
          :disabled="attrParams.attrValueList.length > 0 ? false : true"
        >
          保存
        </el-button>
        <el-button type="primary" size="default" @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
// 组合式API函数watch
import { watch, ref, reactive, onBeforeUnmount, nextTick } from 'vue'
// 引入获取已有属性与属性值接口
import { reqAddOrUpdateAttr, reqAttr, reqDeleteAttr } from '@/api/product/attr'
import type { AttrResponseData, Attr, AttrValue, AttrList } from '@/api/product/attr/type'
// 获取分类的仓库
import useCategoryStore from '@/stores/modules/category'
import { ElMessage } from 'element-plus'

const categoryStore = useCategoryStore()

// 存储已有的属性与属性值
const attrArr = ref<AttrList>([])

// 定义卡片内容切换变量
const scene = ref<number>(0) // scene=0,显示table,scene=1,展示添加与修改属性结构

// 收集新增的属性
const attrParams = reactive<Attr>({
  attrName: '', // 新增的属性的名字
  attrValueList: [], // 新增的属性值数组
  categoryId: '', // 三级分类的ID
  categoryLevel: 3, // 代表的是三级分类
})

// el-input实例数组
const inputArr = ref<HTMLInputElement[]>([])

// 监听仓库三级分类ID变化
watch(
  () => categoryStore.c3Id,
  () => {
    // 清空上一次查询的属性对象数组
    attrArr.value = []
    // 保证三级分类得有才能发请求
    if (!categoryStore.c3Id) return
    // 获取分类的ID
    getAttr()
  },
)

// 获取已有的属性与属性值方法
const getAttr = async () => {
  const { c1Id, c2Id, c3Id } = categoryStore
  // 获取分类下的已有的属性与属性值，结果为属性对象数组
  const result: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id)
  if (result.code === 200) {
    attrArr.value = result.data
  }
}

// 添加属性按钮的回调
const addAttr = () => {
  // 每一次点击的时候,先清空一下数据再收集数据
  Object.assign(attrParams, {
    attrName: '', // 新增的属性的名字
    attrValueList: [], // 新增的属性值数组
    categoryId: categoryStore.c3Id, // 三级分类的ID
    categoryLevel: 3, // 代表的是三级分类
  })
  // 切换为添加与修改属性的结构
  scene.value = 1
}

// 修改属性按钮的回调
const updateAttr = (row: Attr) => {
  scene.value = 1
  // 将已有的属性对象赋值给attrParams对象即为
  // ES6->Object.assign进行对象的合并
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
}

// 取消按钮的回调
const cancel = () => {
  scene.value = 0
}

// 添加属性值按钮的回调
const addAttrValue = () => {
  // 点击添加属性值按钮的时候,向数组添加一个属性值对象
  attrParams.attrValueList.push({
    value: '',
    flag: true, // 控制编辑或查看模式的切换
  })
  nextTick(() => {
    // 聚焦到最后一个input组件
    inputArr.value[inputArr.value.length - 1]?.focus()
  })
}

// 保存按钮的回调
const save = async () => {
  const res = await reqAddOrUpdateAttr(attrParams)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: attrParams.id ? '更新成功' : '添加成功',
    })
    // 切换为展示table结构
    scene.value = 0
    // 重新获取分类下的属性与属性值
    getAttr()
  } else {
    ElMessage({
      type: 'error',
      message: attrParams.id ? '更新失败' : '添加失败',
    })
  }
}

// 属性值表单元素失却焦点事件回调
const toLook = (row: AttrValue, $index: number) => {
  // 非法情况1
  if (row.value.trim() === '') {
    // 删除属性值为空的元素（点击添加属性值按钮时添加的）
    attrParams.attrValueList.splice($index, 1)
    // 提示信息
    ElMessage({
      type: 'error',
      message: '属性值不能为空',
    })
    return
  }
  // 非法情况2 - 属性值重复
  const isRepeat = attrParams.attrValueList.find((item) => {
    // 排除失却焦点时的属性值对象
    if (item !== row) {
      return item.value === row.value
    }
  })

  if (isRepeat) {
    // 删除属性值重复的元素（点击添加属性值按钮时添加的）
    attrParams.attrValueList.splice($index, 1)
    // 提示信息
    ElMessage({
      type: 'error',
      message: '属性值不能重复',
    })
    return
  }
  // 相应的属性值对象flag:变为false,展示div
  row.flag = false
}

// 属性值div点击事件回调
const toEdit = (row: AttrValue, $index: number) => {
  // 相应的属性值对象flag:变为true,展示input

  row.flag = true
  nextTick(() => {
    // 聚焦到input组件
    // nextTick 只保证 DOM 更新完成，不保证元素存在
    inputArr.value[$index]?.focus()
  })
}

// 删除属性按钮回调
const deleteAttr = async (attrId: number) => {
  const res = await reqDeleteAttr(attrId)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    // 重新获取分类下的属性与属性值
    getAttr()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}

// 删除属性值按钮回调
const deleteAttrValue = (attrValueId: number, $index: number) => {
  // 删除属性值对象
  attrParams.attrValueList.splice($index, 1)
}

// 路由组件销毁的时候，把仓库分类数据清空
onBeforeUnmount(() => {
  categoryStore.$reset()
})
</script>

<style scoped></style>
