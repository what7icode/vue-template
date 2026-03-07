export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// 全部数据类型
export interface RoleData {
  id?: number
  createTime?: string
  updateTime?: string
  roleName: string
  remark?: string
}

// 全部角色的数组类型
export type Records = RoleData[]
// 全部角色数据接口响应数据的类型
export interface RoleResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    pages: 1
    searchCount: boolean
  }
}

// 菜单与按钮权限数据的类型
export interface MenuData {
  id: number
  createTime: string
  updateTime: string
  pid: number
  name: string
  code: string
  toCode: string
  type: number
  status: string
  level: number
  children: MenuList
  select: boolean
}

export type MenuList = MenuData[]

// 菜单权限与按钮权限数据接口响应数据的类型
export interface MenuResponseData extends ResponseData {
  data: MenuList
}
