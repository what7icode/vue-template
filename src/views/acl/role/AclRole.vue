<template>
  <div>
    <el-card class="card">
      <el-form :inline="true" class="search">
        <el-form-item label="搜索职位：">
          <el-input placeholder="请输入职位名称" v-model="roleName"></el-input>
        </el-form-item>
        <el-form-item>
          <template #default>
            <el-button type="primary" :disabled="roleName ? false : true" @click="search"
              >查询</el-button
            >
            <el-button type="primary" @click="reset">重置</el-button>
          </template>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin: 10px 0">
      <el-button type="primary" size="default" icon="Plus" @click="addRole">添加职位</el-button>
      <el-table :data="allRoles" style="margin: 10px 0" border>
        <el-table-column type="index" label="#" />
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="roleName" label="职位名称" />
        <el-table-column prop="createTime" label="创建时间" align="center" />
        <el-table-column prop="updateTime" label="更新时间" align="center" />
        <el-table-column label="操作" width="280px">
          <!-- row:当前行的职位对象 -->
          <template #default="{ row }">
            <el-button type="primary" size="small" icon="User" @click="assignPermission(row)"
              >权限分配</el-button
            >
            <el-button type="primary" size="small" icon="Edit" @click="editRole(row)"
              >编辑</el-button
            >
            <el-button type="danger" size="small" icon="Delete" @click="deleteRole(row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[1, 3, 5, 7]"
        :background="true"
        layout="prev, pager, next, jumper, ->, sizes, total"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
    <el-dialog :title="roleParams.id ? '编辑职位' : '添加职位'" v-model="dialogVisible" width="50%">
      <el-form :model="roleParams" :rules="roleFormRules" ref="roleFormRef">
        <el-form-item label="职位名称" prop="roleName">
          <el-input v-model="roleParams.roleName" placeholder="请输入职位名称" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="submitForm">确定</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </template>
    </el-dialog>
    <!-- 权限抽屉 -->
    <el-drawer title="权限分配" v-model="drawerVisible">
      <el-tree
        :data="permissionList"
        default-expanded-all
        :default-checked-keys="checkedList"
        show-checkbox
        node-key="id"
        :props="defaultProps"
        ref="treeRef"
      />
      <template #footer>
        <el-button type="primary" @click="submitPermission">确定</el-button>
        <el-button @click="drawerVisible = false">取消</el-button>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import {
  reqAddOrUpdateRole,
  reqAllMenuList,
  reqAllRoleList,
  reqRemoveRole,
  reqSetPermission,
} from '@/api/acl/role'
import { nextTick, onMounted, ref } from 'vue'
import type { MenuData, MenuResponseData, RoleData, RoleResponseData } from '@/api/acl/role/type'
import { ElMessage } from 'element-plus'

onMounted(() => {
  getRole()
})

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const allRoles = ref<RoleData[]>([])
const roleName = ref<string>('')
const getRole = async (pagerNo = 1) => {
  currentPage.value = pagerNo
  const result: RoleResponseData = await reqAllRoleList(
    currentPage.value,
    pageSize.value,
    roleName.value,
  )
  allRoles.value = result.data.records
  total.value = result.data.total
}
const handleSizeChange = (val: number) => {
  pageSize.value = val
  getRole()
}
const handleCurrentChange = (val: number) => {
  currentPage.value = val
  getRole(currentPage.value)
}

const search = () => {
  getRole()
}
const reset = () => {
  roleName.value = ''
  getRole()
}

const dialogVisible = ref(false)
const roleParams = ref<RoleData>({
  roleName: '',
})
const addRole = () => {
  dialogVisible.value = true
  roleParams.value = {
    roleName: '',
    id: 0,
  }
  nextTick(() => {
    roleFormRef.value?.clearValidate('roleName')
  })
}
const editRole = (row: RoleData) => {
  dialogVisible.value = true
  roleParams.value = Object.assign({}, row)
  nextTick(() => {
    roleFormRef.value?.clearValidate('roleName')
  })
}
const roleFormRef = ref()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validateRoleName = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入职位名称'))
  } else if (value.trim().length < 2) {
    callback(new Error('职位名称长度不能小于2个字符'))
  } else {
    callback()
  }
}
const roleFormRules = {
  roleName: [
    {
      required: true,
      message: '请输入职位名称',
      trigger: ['blur'],
      validator: validateRoleName,
    },
  ],
}

const submitForm = async () => {
  await roleFormRef.value?.validate()
  const result: RoleResponseData = await reqAddOrUpdateRole(roleParams.value)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: roleParams.value.id ? '更新成功' : '添加成功',
    })
    dialogVisible.value = false
    getRole(roleParams.value.id ? currentPage.value : 1)
  }
}

const drawerVisible = ref(false)
// 树形组件的配置对象
const defaultProps = {
  // 节点的子节点是数组元素的哪个属性
  children: 'children',
  // 节点的显示标签是数组元素的哪个属性
  label: 'name',
}
const permissionList = ref<MenuData[]>([])
const checkedList = ref<number[]>([])
const treeRef = ref()
const assignPermission = async (row: RoleData) => {
  drawerVisible.value = true
  roleParams.value = {
    ...row,
  }
  const result: MenuResponseData = await reqAllMenuList(roleParams.value.id as number)
  if (result.code === 200) {
    permissionList.value = result.data
    checkedList.value = filterSelectList(result.data, [])
  }
}
const submitPermission = async () => {
  const roleId = roleParams.value.id as number
  const checkedKeys1 = treeRef.value?.getCheckedKeys()
  const checkedKeys2 = treeRef.value.getHalfCheckedKeys()
  const result = await reqSetPermission(roleId, checkedKeys1.concat(checkedKeys2))
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '权限分配成功',
    })
    // 如果后端没做token失效，那么刷新页面也不用重新登录，但是会重新获取用户信息
    window.location.reload()
    drawerVisible.value = false
    getRole(currentPage.value)
  }
}
const deleteRole = async (row: RoleData) => {
  const result = await reqRemoveRole(row.id as number)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getRole(allRoles.value.length > 1 ? currentPage.value : currentPage.value - 1)
  }
}

const filterSelectList = (allData: MenuData[], checkedList: number[]) => {
  allData.forEach((item) => {
    if (item.select && item.level == 4) {
      checkedList.push(item.id as number)
    }
    if (item.children && item.children.length > 0) {
      filterSelectList(item.children, checkedList)
    }
  })
  return checkedList
}
</script>

<style lang="scss" scoped>
.card {
  /* 让表单元素在卡片中垂直居中并合理分布 */
  ::v-deep(.el-card__body) {
    padding-bottom: 0;
  }

  .search {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
}
</style>
