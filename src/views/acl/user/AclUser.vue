<template>
  <div class="user-container">
    <!-- 顶部搜索卡片 -->
    <el-card class="search-card">
      <el-form :inline="true" class="search-form">
        <el-form-item label="用户名：">
          <el-input placeholder="请输入搜索用户名" v-model="keyword" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="!keyword" @click="search">搜索</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 底部数据展示卡片 -->
    <el-card class="table-card">
      <!-- 按钮操作区 -->
      <div class="action-btn-group">
        <el-button type="primary" @click="addUser">添加用户</el-button>
        <el-button type="danger" :disabled="selectedUsers.length === 0" @click="deleteSelectUsers"
          >批量删除</el-button
        >
      </div>
      <!-- 数据表格 -->
      <el-table
        border
        :data="userList"
        style="width: 100%; margin: 15px 0"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column type="index" label="#" width="60" align="center"></el-table-column>
        <el-table-column prop="id" label="ID" width="80" align="center"></el-table-column>
        <el-table-column
          prop="username"
          label="用户名"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="用户昵称"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column
          prop="roleName"
          label="用户角色"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column
          prop="updateTime"
          label="更新时间"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column label="操作" width="260" align="center" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" size="small" plain @click="assignRole(row)"
              >分配角色</el-button
            >
            <el-button type="warning" size="small" plain @click="updateUser(row)">编辑</el-button>
            <el-popconfirm
              :title="`确定要删除用户 ${row.username} 吗?`"
              @confirm="deleteUser(row.id)"
            >
              <template #reference>
                <el-button type="danger" size="small" plain>删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        :background="true"
        layout="prev, pager, next, jumper, ->, sizes, total"
        :total="total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </el-card>
    <el-drawer v-model="drawerVisible">
      <template #header>
        <span>{{ userParams.id ? '编辑用户' : '添加用户' }}</span>
      </template>
      <template #default>
        <el-form ref="userForm" label-width="120px" :model="userParams" :rules="rules">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="userParams.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="name">
            <el-input v-model="userParams.name" placeholder="请输入用户昵称"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" v-if="!userParams.id">
            <el-input v-model="userParams.password" placeholder="请输入密码"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <el-button type="primary" @click="submitForm">确定</el-button>
        <el-button @click="cancel">取消</el-button>
      </template>
    </el-drawer>
    <el-drawer v-model="roleDrawerVisible" title="分配角色" :width="400">
      <template #default>
        <el-form>
          <el-form-item label="用户名" prop="username" label-width="70px">
            <el-input v-model="userParams.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="角色" prop="roleIds" label-width="70px">
            <el-checkbox
              v-model="checkAll"
              :indeterminate="isIndeterminate"
              @change="handleCheckAllChange"
              label="全选"
            >
            </el-checkbox>
          </el-form-item>
          <el-form-item label-width="70px">
            <el-checkbox-group v-model="userRoleIds" @change="handleCheckedRolesChange">
              <el-checkbox
                v-for="role in allRoles"
                :key="role.id"
                :value="role.id"
                :label="role.roleName"
              >
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <el-button type="primary" @click="submitRoleForm">确定</el-button>
        <el-button @click="roleDrawerVisible = false">取消</el-button>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import {
  reqAddOrUpdateUser,
  reqAllRole,
  reqRemoveUser,
  reqSelectUser,
  reqSetUserRole,
  reqUserInfo,
} from '@/api/acl/user'
import type {
  AllRoleResponseData,
  Records,
  ResponseData,
  Role,
  SetRoleData,
  User,
} from '@/api/acl/user/type'
import { onMounted, ref, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'

// 搜索框的关键字
const keyword = ref<string>('')
// 分页相关数据
const pageNo = ref<number>(1)
// 每页展示条数
const pageSize = ref<number>(3)
// 总记录数
const total = ref<number>(0)
// 选中的记录列表
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const selectedUsers = ref<any[]>([])
// 模拟表格数据
const userList = ref<Records>([])
// 用户抽屉是否可见
const drawerVisible = ref<boolean>(false)
// 角色抽屉是否可见
const roleDrawerVisible = ref<boolean>(false)

const userForm = ref<FormInstance>()
const userParams = ref<User>({
  username: '',
  name: '',
  password: '',
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validateUsername = (rule: any, value: any, callback: any) => {
  if (value.trim().length >= 5) {
    callback()
  } else {
    callback(new Error('请输入用户名，至少5位'))
  }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validatePassword = (rule: any, value: any, callback: any) => {
  if (value.trim().length >= 6) {
    callback()
  } else {
    callback(new Error('请输入密码，至少6位'))
  }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validateName = (rule: any, value: any, callback: any) => {
  if (value.trim().length >= 2) {
    callback()
  } else {
    callback(new Error('请输入用户昵称，至少2位'))
  }
}
const rules = ref({
  username: [{ required: true, validator: validateUsername, trigger: 'blur' }],
  password: [{ required: true, validator: validatePassword, trigger: 'blur' }],
  name: [{ required: true, validator: validateName, trigger: 'blur' }],
})

onMounted(() => {
  getUserList()
})
const getUserList = async (pagerNo = 1) => {
  pageNo.value = pagerNo
  const result = await reqUserInfo(pageNo.value, pageSize.value, keyword.value)
  total.value = result.data.total
  userList.value = result.data.records
}
// 搜索用户
const search = () => {
  getUserList(1)
}
// resetSearch 重置搜索
const resetSearch = () => {
  keyword.value = ''
  getUserList(1)
}
// 切换页码
const handleCurrentChange = (page: number) => {
  pageNo.value = page
  getUserList(page)
}
// 切换每页展示条数
const handleSizeChange = (size: number) => {
  pageSize.value = size
  getUserList(1)
}
// 表格多选发生改变
const handleSelectionChange = (val: User[]) => {
  selectedUsers.value = val
}
// 批量删除选中的用户
const deleteSelectUsers = async () => {
  const idsList: number[] = selectedUsers.value.map((item) => {
    return item.id
  })

  const result: ResponseData = await reqSelectUser(idsList)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '批量删除成功',
    })
    getUserList(userList.value.length > 1 ? pageNo.value : pageNo.value - 1)
  }
}
const addUser = () => {
  userForm.value?.resetFields()
  userParams.value = {
    username: '',
    name: '',
    password: '',
    id: 0,
  }
  drawerVisible.value = true
}

const updateUser = (row: User) => {
  drawerVisible.value = true
  userParams.value = Object.assign({}, row)
  nextTick(() => {
    userForm.value?.clearValidate('username')
    userForm.value?.clearValidate('name')
  })
}

const submitForm = async () => {
  // 校验表单
  await userForm.value?.validate()
  const result = await reqAddOrUpdateUser(userParams.value)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: userParams.value.id ? '更新成功' : '添加成功',
    })

    // 登录时会用token，token不过期就不会重新登录
    // window.location.reload()
    if (userParams.value.id) {
      getUserList(pageNo.value)
    } else {
      getUserList()
    }
  } else {
    ElMessage({
      type: 'error',
      message: userParams.value.id ? '更新失败' : '添加失败',
    })
  }

  drawerVisible.value = false
}
const cancel = () => {
  drawerVisible.value = false
}

// 所有角色列表
const allRoles = ref<Role[]>([])
const userRoleIds = ref<number[]>([])
const assignRole = async (row: User) => {
  userParams.value = Object.assign({}, row)
  roleDrawerVisible.value = true
  const result: AllRoleResponseData = await reqAllRole(userParams.value.id as number)
  if (result.code === 200) {
    allRoles.value = result.data.allRolesList
    userRoleIds.value = result.data.assignRoles.map((item) => {
      return item.id as number
    })
    checkAll.value = allRoles.value.length === userRoleIds.value.length
    isIndeterminate.value =
      userRoleIds.value.length > 0 && userRoleIds.value.length < allRoles.value.length
  }
}
// 全选/取消全选
const checkAll = ref<boolean>(false)
// 半选状态，仅用于控制全选框的样式
const isIndeterminate = ref<boolean>(false)
// 全选/取消全选时，更新选中的角色列表

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleCheckAllChange = (val: any) => {
  checkAll.value = val
  isIndeterminate.value = false
  userRoleIds.value = val ? allRoles.value.map((item) => item.id as number) : []
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleCheckedRolesChange = (val: any) => {
  checkAll.value = val.length === allRoles.value.length
  isIndeterminate.value = val.length > 0 && val.length < allRoles.value.length
}
const submitRoleForm = async () => {
  // 收集参数
  const data: SetRoleData = {
    userId: userParams.value.id as number,
    roleIdList: userRoleIds.value.map((item) => {
      return item
    }),
  }
  const result = await reqSetUserRole(data)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '分配角色成功',
    })
    roleDrawerVisible.value = false
    getUserList(pageNo.value)
  } else {
    ElMessage({
      type: 'error',
      message: '分配角色失败',
    })
  }
}
// 删除用户
const deleteUser = async (userId: number) => {
  const result = await reqRemoveUser(userId)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除用户成功',
    })
    getUserList(userList.value.length > 1 ? pageNo.value : pageNo.value > 1 ? pageNo.value - 1 : 1)
  } else {
    ElMessage({
      type: 'error',
      message: '删除用户失败',
    })
  }
}
</script>
<style lang="scss" scoped>
.user-container {
  .search-card {
    height: auto;
    margin-bottom: 20px;

    /* 让表单元素在卡片中垂直居中并合理分布 */
    ::v-deep(.el-card__body) {
      padding-bottom: 0;
    }

    .search-form {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: wrap;
    }
  }

  .table-card {
    .action-btn-group {
      margin-bottom: 15px;
    }
  }
}
</style>
