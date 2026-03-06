/* eslint-disable @typescript-eslint/no-explicit-any */
// 统一管理用户模块相关的接口
import service from '@/utils/service'
import type { loginFormData, loginResponseData, ResponseData, userInfoResponseData } from './type'

// 统一管理用户模块接口路径
enum API {
  // 用户登录接口路径
  LOGIN_URL = '/admin/acl/index/login',
  // 获取用户信息接口路径
  USERINFO_URL = '/admin/acl/index/info',
  // 用户退出登录接口路径
  LOGOUT_URL = '/admin/acl/index/logout',
}

// 登录API
export const reqLogin = (data: loginFormData) => {
  return service.post<any, loginResponseData>(API.LOGIN_URL, data)
}

// 获取用户信息API
export const reqUserInfo = () => {
  return service.get<any, userInfoResponseData>(API.USERINFO_URL)
}

// 退出登录API
export const reqLogout = () => {
  return service.post<any, ResponseData>(API.LOGOUT_URL)
}
