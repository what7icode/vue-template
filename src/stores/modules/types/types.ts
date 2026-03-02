import type { Category } from '@/api/product/attr/type'
import type { RouteRecordRaw } from 'vue-router'

// 定义用户仓库状态对象的类型
export interface UserState {
  token: string | null
  menuRoutes: RouteRecordRaw[]
  username: string
  avatar: string
}

// 定义分类仓库状态对象的类型
export interface CategoryState {
  // 存储一级分类的id
  c1Id: string
  // 存储二级分类的id
  c2Id: string
  // 存储三级分类的id
  c3Id: string
  // 存储一级分类的数据
  c1Arr: Category[]
  // 存储二级分类的数据
  c2Arr: Category[]
  // 存储三级分类的数据
  c3Arr: Category[]
}
