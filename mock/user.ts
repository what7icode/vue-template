import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/user/login',
    method: 'post',
    // 解构时给body添加类型注解
    response: ({ body }: { body: { username: string; password: string } }) => {
      const { username, password } = body
      if (username === 'admin' && password === '123456') {
        return {
          code: 200,
          data: {
            token: 'token-admin',
          },
          message: '登录成功',
        }
      } else {
        return {
          code: 201,
          data: {
            message: '账号或密码错误',
          },
          message: '账号或密码错误',
        }
      }
    },
  },
  {
    url: '/api/user/info',
    method: 'get',
    response: (request) => {
      // 获取请求头中的 token
      const token = request.headers.token
      // 简单判断是否有 token
      if (token) {
        return {
          code: 200,
          data: {
            userId: 1,
            avatar:
              'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80',
            username: 'admin',
            password: '',
            roles: ['admin'],
            buttons: ['btn.User.add', 'btn.User.remove'],
            routes: ['home', 'acl', 'product'],
            token: 'token-admin',
          },
          message: '获取用户信息成功',
        }
      } else {
        return {
          code: 201,
          data: {
            message: '请先登录',
          },
          message: '请先登录',
        }
      }
    },
  },
] as MockMethod[]
