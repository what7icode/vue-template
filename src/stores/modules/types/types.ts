import type { RouteRecordRaw } from 'vue-router'

// 定义存储单元的类型
export interface userState {
  token: string | null
  menuRoutes: RouteRecordRaw[]
  username: string
  avatar: string
}
