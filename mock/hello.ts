import type { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/hello',
    method: 'get',
    response: () => {
      return { message: 'hello' }
    },
  },
] as MockMethod[]
