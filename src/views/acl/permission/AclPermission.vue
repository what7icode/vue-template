<template>
  <div>
    <el-card>
      <el-table :data="permissionList" style="width: 100%; margin-bottom: 20px" row-key="id" border>
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="code" label="权限值" />
        <el-table-column prop="updateTime" label="修改时间" />
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              :disabled="row.level >= 4"
              @click="handleAdd(row)"
              icon="Plus"
            >
              {{ row.level === 3 ? '添加功能' : '添加菜单' }}
            </el-button>
            <el-button
              type="primary"
              size="small"
              :disabled="row.level === 1"
              @click="handleEdit(row)"
              icon="Edit"
            >
              编辑
            </el-button>
            <el-popconfirm title="确定要删除该项吗?" @confirm="handleDelete(row)" width="200px">
              <template #reference>
                <el-button type="danger" size="small" :disabled="row.level === 1" icon="Delete">
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <!-- Dialog 用于添加和更新菜单 -->
      <el-dialog v-model="dialogVisible" :title="menuParams.id ? '更新菜单' : '添加菜单'">
        <el-form :model="menuParams" :rules="rules" ref="formRef" label-width="80px">
          <el-form-item label="名称" prop="name">
            <el-input v-model="menuParams.name" placeholder="请你输入菜单名称" />
          </el-form-item>
          <el-form-item label="权限数值" prop="code">
            <el-input v-model="menuParams.code" placeholder="请你输入权限数值" />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="submitForm">确定</el-button>
          </span>
        </template>
      </el-dialog>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { reqAllPermisson, reqAddOrUpdateMenu, reqRemoveMenu } from '@/api/acl/menu'
import type {
  Permission,
  PermissionList,
  MenuParams,
  PermissionResponsData,
} from '@/api/acl/menu/type'
import { ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'

const permissionList = ref<PermissionList>([])
const dialogVisible = ref(false)
const formRef = ref<FormInstance>()

const menuParams = ref<MenuParams>({
  id: undefined,
  pid: 0,
  level: 0,
  name: '',
  code: '',
})

const rules = {
  name: [{ required: true, message: '请你输入菜单名称', trigger: 'blur' }],
  code: [{ required: true, message: '请你输入权限数值', trigger: 'blur' }],
}

// 获取菜单权限数据
const fetchPermissionList = async () => {
  const res: PermissionResponsData = await reqAllPermisson()
  if (res.code === 200) {
    permissionList.value = res.data
  }
}

onMounted(() => {
  fetchPermissionList()
})

// 添加菜单权限
const handleAdd = (row: Permission) => {
  dialogVisible.value = true
  menuParams.value = {
    id: undefined,
    pid: row.id,
    level: row.level + 1,
    name: '',
    code: '',
  }
  nextTick(() => {
    formRef.value?.clearValidate()
  })
}

// 编辑菜单权限
const handleEdit = (row: Permission) => {
  dialogVisible.value = true
  menuParams.value = {
    id: row.id,
    pid: row.pid,
    level: row.level,
    name: row.name,
    code: row.code,
  }
  nextTick(() => {
    formRef.value?.clearValidate()
  })
}

// 删除菜单
const handleDelete = async (row: Permission) => {
  const res = await reqRemoveMenu(row.id)
  if (res.code === 200) {
    ElMessage.success('删除成功')
    fetchPermissionList()
  } else {
    ElMessage.error('删除失败')
  }
}

// 提交表单
const submitForm = async () => {
  if (!formRef.value) return
  await formRef.value.validate()

  const res = await reqAddOrUpdateMenu(menuParams.value)
  if (res.code === 200) {
    ElMessage.success(menuParams.value.id ? '更新成功' : '添加成功')
    dialogVisible.value = false
    fetchPermissionList()
  } else {
    ElMessage.error(menuParams.value.id ? '更新失败' : '添加失败')
  }
}
</script>

<style lang="scss" scoped></style>
