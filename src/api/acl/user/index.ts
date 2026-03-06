/* eslint-disable @typescript-eslint/no-explicit-any */
//用户管理模块的接口
import service from '@/utils/service'
import type { UserResponseData, User, AllRoleResponseData, SetRoleData } from './type'

enum API {
  // 获取全部已有用户接口的路径
  ALLUSER_URL = '/admin/acl/user/',
  // 添加一个新的用户接口的路径
  ADDUSER_URL = '/admin/acl/user/save',
  // 更新已有用户账号接口的路径
  UPDATEUSER_URL = '/admin/acl/user/update',
  // 获取全部角色，当前账号拥有的角色接口的路径
  ALLROLEURL = '/admin/acl/user/toAssign/',
  // 已有用户分配角色接口的路径
  SETROLE_URL = '/admin/acl/user/doAssignRole',
  // 删除某一个账号接口的路径
  DELETEUSER_URL = '/admin/acl/user/remove/',
  // 批量删除用户接口的路径
  DELETEALLUSER_URL = '/admin/acl/user/batchRemove',
}
//获取用户账号信息的接口
export const reqUserInfo = (page: number, limit: number, username: string) =>
  service.get<any, UserResponseData>(API.ALLUSER_URL + `${page}/${limit}?username=${username}`)
//添加用户与更新已有用户的接口
export const reqAddOrUpdateUser = (data: User) => {
  //携带参数ID更新
  if (data.id) {
    return service.put<any, any>(API.UPDATEUSER_URL, data)
  } else {
    return service.post<any, any>(API.ADDUSER_URL, data)
  }
}
//获取全部职位以及包含当前用户的已有的职位
export const reqAllRole = (userId: number) =>
  service.get<any, AllRoleResponseData>(API.ALLROLEURL + userId)
//分配职位
export const reqSetUserRole = (data: SetRoleData) => service.post<any, any>(API.SETROLE_URL, data)
//删除某一个账号的信息
export const reqRemoveUser = (userId: number) =>
  service.delete<any, any>(API.DELETEUSER_URL + userId)
//批量删除的接口
export const reqSelectUser = (idList: number[]) =>
  service.delete<any, any>(API.DELETEALLUSER_URL, { data: idList })
