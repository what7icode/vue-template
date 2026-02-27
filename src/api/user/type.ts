// 登录参数的类型
export interface loginFormData {
  username: string
  password: string
}

// 服务器响应数据的通用类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// 登录接口服务器返回数据的类型
export interface loginResponseData extends ResponseData {
  data: string
}

// 获取用户信息响应数据的类型
export interface userInfoResponseData extends ResponseData {
  data: {
    routes: string[]
    buttons: string[]
    roles: string[]
    username: string
    avatar: string
  }
}
