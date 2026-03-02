<template>
  <div>
    <el-card class="box-card">
      <!-- 卡片顶部添加品牌按钮 -->
      <el-button type="primary" size="default" icon="Plus" @click="addTrademark"
        >添加品牌</el-button
      >
      <!-- 表格组件:展示已有品牌数据 -->
      <!-- table:
          ---border:可以设置表格纵向是否有边框
         table-column:
          ---label:某一个表头
          ---width:设置这列宽度
          ---align:设置这一列对齐方式
    -->
      <el-table style="margin: 10px 0" border :data="trademarkArr">
        <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
        <!-- table-column:默认展示数据用div，prop:列的标识，用于指定展示数组元素中对应的属性数据 -->
        <el-table-column label="品牌名称" prop="tmName"></el-table-column>
        <el-table-column label="品牌LOGO">
          <!-- row:表示当前行数据对象 -->
          <template #default="{ row }">
            <img :src="row.logoUrl" alt="未上传" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
        <el-table-column label="品牌操作">
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="updateTrademark(row)"
            ></el-button>
            <el-popconfirm
              :title="`确认删除“${row.tmName}”品牌吗？`"
              @confirm="deleteTrademark(row.id)"
              icon="Delete"
              icon-color="red"
              confirm-button-text="确定"
              cancel-button-text="取消"
            >
              <!-- 点击按钮弹出气泡确认框 -->
              <template #reference>
                <el-button type="danger" size="small" icon="Delete"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器组件
        pagination
           v-model:current-page:设置分页器当前页码
           v-model:page-size:设置每一个展示数据条数
           page-sizes:用于设置下拉菜单数据
           background:设置分页器按钮的背景颜色
           layout:可以设置分页器六个子组件布局调整
           page-sizes：每页显示数据个数的可选值
    -->
      <el-config-provider :locale="zhCn">
        <el-pagination
          @size-change="sizeChange"
          @current-change="getHasTrademark"
          :pager-count="9"
          v-model:current-page="pageNo"
          v-model:page-size="limit"
          :page-sizes="[3, 5, 10]"
          :background="true"
          layout="prev, pager, next, jumper,->,sizes,total"
          :total="total"
        >
        </el-pagination>
      </el-config-provider>
    </el-card>
    <!-- dialog:品牌添加/修改弹窗 -->
    <el-dialog v-model="dialogFormVisible" :title="trademarkParams.id ? '修改品牌' : '添加品牌'">
      <el-form style="width: 80%" :model="trademarkParams" :rules="rules" ref="formRef">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input placeholder="请您输入品牌名称" v-model="trademarkParams.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <!-- el-upload：
          - action：指定上传文件的接口地址，要手动添加baseURL -->
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <!-- 具名插槽:footer -->
      <template #footer>
        <el-button type="primary" size="default" @click="cancel">取消</el-button>
        <el-button type="primary" size="default" @click="confirm">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { reqDeleteTrademark, reqHasTrademark } from '@/api/product/trademark'
import type { Records, Trademark, TrademarkResponseData } from '@/api/product/trademark/type'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import type { UploadProps } from 'element-plus'
import { reqAddOrUpdateTrademark } from '@/api/product/trademark'
import { ElMessage } from 'element-plus'

// 当前页码
const pageNo = ref<number>(1)
// 每一页展示多少条数据
const limit = ref<number>(3)
// 存储已有品牌数据总数
const total = ref<number>(0)
// 存储已有品牌的数据
const trademarkArr = ref<Records>([])
// 控制对话框显示与隐藏
const dialogFormVisible = ref<boolean>(false)
// 定义收集新增品牌数据
const trademarkParams = reactive<Trademark>({
  tmName: '',
  logoUrl: '',
})
// 获取el-form组件实例
const formRef = ref()

// 获取已有品牌的接口封装为一个函数:在任何情况下向获取数据,调用次函数即可
const getHasTrademark = async (pageNumber = 1) => {
  // 当前页码赋值
  pageNo.value = pageNumber
  const result: TrademarkResponseData = await reqHasTrademark(pageNo.value, limit.value)
  if (result.code === 200) {
    // 存储已有品牌总个数
    total.value = result.data.total
    // 存储已有品牌的数据
    trademarkArr.value = result.data.records
  }
}

// 组件挂载完毕 --- 发一次请求,获取第一页的三个已有品牌数据
onMounted(() => {
  getHasTrademark()
})

// 当下拉菜单发生变化的时候触发方法
// 这个自定义事件，分页器组件会将下拉菜单选中数据返回，page-size会改变，limit随之改变
const sizeChange = () => {
  // 每页显示个数发生变化的时候，当前页码归1
  getHasTrademark()
}

// 添加品牌按钮的回调
const addTrademark = () => {
  // 对话框显示
  dialogFormVisible.value = true
  // 清空之前数据
  trademarkParams.id = 0
  trademarkParams.tmName = ''
  trademarkParams.logoUrl = ''

  // 第一次点击时，form组件不存在，等组件挂载完毕后，再调用clearValidate方法
  formRef.value?.clearValidate()
}

// 存储修改前的品牌数据，用于比较是否发生变化
const originalTrademarkParams = reactive<Trademark>({
  tmName: '',
  logoUrl: '',
})
const isUpdate = computed(() => {
  return (
    trademarkParams.tmName !== originalTrademarkParams.tmName ||
    trademarkParams.logoUrl !== originalTrademarkParams.logoUrl
  )
})

// 修改品牌按钮的回调
const updateTrademark = (row: Trademark) => {
  // 清空校验规则错误提示信息
  formRef.value?.clearValidate()
  // ES6语法合并对象
  Object.assign(trademarkParams, row)
  // 保存原始数据
  Object.assign(originalTrademarkParams, row)
  // 对话框显示
  dialogFormVisible.value = true
}

// 对话框底部取消按钮
const cancel = () => {
  // 对话框隐藏
  dialogFormVisible.value = false
}

// 对话框底部确定按钮
const confirm = async () => {
  // 在发请求之前,要对于整个表单进行校验
  // 调用这个方法进行全部表单项校验,如果校验全部通过,在执行后面的语法
  await formRef.value.validate()

  // TODO: 没有修改操作，是否该直接禁用‘确定’按钮
  // 判断是否是修改操作，且数据没有变化
  if (trademarkParams.id && !isUpdate.value) {
    ElMessage({
      type: 'info',
      message: '未作任何修改',
    })
    return
  }

  const result = await reqAddOrUpdateTrademark(trademarkParams)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: trademarkParams.id ? '修改品牌成功' : '添加品牌成功',
    })
    // 获取最新品牌数据，添加回到首页，修改回到当前页
    getHasTrademark(trademarkParams.id ? pageNo.value : 1)
  } else {
    ElMessage({
      type: 'error',
      message: trademarkParams.id ? '修改品牌失败' : '添加品牌失败',
    })
  }

  // 对话框隐藏
  dialogFormVisible.value = false
}

// 品牌自定义校验规则方法
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validatorTmName = (rule: any, value: any, callBack: any) => {
  // 是当表单元素触发blur时候,会触发此方法
  // 自定义校验规则
  if (value.trim().length >= 2) {
    callBack()
  } else {
    // 校验未通过返回的错误提示信息
    callBack(new Error('品牌名称位数大于等于两位'))
  }
}

// 品牌LOGO图片的自定义校验规则方法
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validatorLogoUrl = (rule: any, value: any, callBack: any) => {
  // 如果图片上传
  if (value) {
    callBack()
  } else {
    callBack(new Error('LOGO图片未上传'))
  }
}

// 表单校验规则对象
const rules = {
  tmName: [{ required: true, trigger: 'blur', validator: validatorTmName }],
  logoUrl: [{ required: true, validator: validatorLogoUrl }],
}

// 上传图片组件->上传图片之前触发的钩子函数
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  // 钩子是在图片上传成功之前触发,上传文件之前可以约束文件类型与大小
  // 要求:上传文件格式png|jpg|gif 4M
  if (rawFile.type == 'image/png' || rawFile.type == 'image/jpeg' || rawFile.type == 'image/gif') {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '上传文件大小小于4M',
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传文件格式务必PNG | JPG | GIF',
    })
    return false
  }
}

// 图片上传成功钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
  // response:即为当前这次上传图片post请求服务器返回的数据
  // 收集上传图片的地址,添加一个新的品牌的时候带给服务器
  trademarkParams.logoUrl = response.data
  // 图片上传成功,清除掉对应图片校验结果
  formRef.value.clearValidate('logoUrl')
}

// 删除品牌按钮的回调
const deleteTrademark = async (id: number) => {
  const result = await reqDeleteTrademark(id)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除品牌成功',
    })
    // 删除成功后，刷新当前页品牌数据
    getHasTrademark(trademarkArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
  } else {
    ElMessage({
      type: 'error',
      message: '删除品牌失败',
    })
  }
}
</script>

<style scoped>
.box-card {
  width: 100%;
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
