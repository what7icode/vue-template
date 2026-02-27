/* eslint-disable @typescript-eslint/no-explicit-any */
// 统一管理用户相关的接口
import service from '@/utils/service'
import type { loginFormData, loginResponseData, ResponseData, userInfoResponseData } from './type'

// 统一管理接口路径
enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINFO_URL = '/admin/acl/index/userinfo',
  LOGOUT_URL = '/admin/acl/index/logout',
}

// 登录API
export const reqLogin = (data: loginFormData) => {
  return service.post<any, loginResponseData>(API.LOGIN_URL, data)
}

// 获取用户信息的 API
export const reqUserInfo = () => {
  return service.get<any, userInfoResponseData>(API.USERINFO_URL)
}

// 退出登录的 API
export const reqLogout = () => {
  return service.post<any, ResponseData>(API.LOGOUT_URL)
}
