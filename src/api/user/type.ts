// 登录参数的类型
export interface loginForm {
  username: string
  password: string
}

// 业务数据的类型
interface dataType {
  token?: string
  message?: string
}

// 服务器返回数据的类型
export interface loginResponse {
  code: number
  data: dataType
}

// 用户信息类型
interface userInfo {
  userId: number
  avatar: string
  username: string
  password: string
  roles: string[]
  buttons: string[]
  routes: string[]
  token: string
}

// 获取用户信息响应数据的类型
export interface userInfoResponse {
  code: number
  data: userInfo
}
