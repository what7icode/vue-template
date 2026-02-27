import { MockMethod } from 'vite-plugin-mock'

const tokens = {
  admin: {
    token: 'admin-token',
    password: '123456',
  },
  editor: {
    token: 'editor-token',
    password: 'asdfgh',
  },
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    username: 'tian',
    buttons: ['btn.User.add', 'btn.User.remove'],
    routes: ['User', 'Role'],
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    username: 'x',
    buttons: ['btn.User.add'],
    routes: ['User'],
  },
}

export default [
  // user login
  {
    url: '/api/admin/acl/index/login',
    method: 'post',
    response: (config) => {
      const { username, password } = config.body
      const checkUser = tokens[username]
      if (!checkUser || checkUser.password !== password) {
        return {
          code: 201,
          message: '账号或密码不正确',
          data: null,
          ok: false,
        }
      }
      return {
        code: 200,
        message: '登录成功',
        data: checkUser.token,
        ok: true,
      }
    },
  },
  // get user info
  {
    url: '/api/admin/acl/index/userinfo',
    method: 'get',
    response: (config) => {
      const { token } = config.headers
      const info = users[token]
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.',
          data: null,
          ok: false,
        }
      }
      return {
        code: 200,
        message: '获取用户信息成功',
        data: info,
        ok: true,
      }
    },
  },
  // user logout
  {
    url: '/api/admin/acl/index/logout',
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: 'success',
        ok: true,
      }
    },
  },
] as MockMethod[]
