/* eslint-disable @typescript-eslint/no-explicit-any */
// 统一管理用户相关的接口
import service from '@/utils/service'
import type { loginForm, loginResponse, userInfoResponse } from './type'

// 统一管理接口路径
enum API {
  LOGIN_URL = '/user/login',
  USERINFO_URL = '/user/info',
}

// 登录API
export const reqLogin = (data: loginForm) => {
  return service.post<any, loginResponse>(API.LOGIN_URL, data)
}

// 获取用户信息的 API
export const reqUserInfo = () => {
  return service.get<any, userInfoResponse>(API.USERINFO_URL)
}
