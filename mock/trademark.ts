import { MockMethod } from 'vite-plugin-mock'

// 使用 let 以便可以修改数据
let trademarks = [
  {
    id: 1,
    tmName: '华为',
    logoUrl: 'https://dummyimage.com/200x200/d63031/fff&text=Huawei',
  },
  {
    id: 2,
    tmName: '小米',
    logoUrl: 'https://dummyimage.com/200x200/fa8231/fff&text=Xiaomi',
  },
  {
    id: 3,
    tmName: '苹果',
    logoUrl: 'https://dummyimage.com/200x200/2d3436/fff&text=Apple',
  },
  {
    id: 4,
    tmName: 'OPPO',
    logoUrl: 'https://dummyimage.com/200x200/00b894/fff&text=OPPO',
  },
  {
    id: 5,
    tmName: 'VIVO',
    logoUrl: 'https://dummyimage.com/200x200/0984e3/fff&text=VIVO',
  },
  {
    id: 6,
    tmName: '三星',
    logoUrl: 'https://dummyimage.com/200x200/0c2461/fff&text=Samsung',
  },
  {
    id: 7,
    tmName: '索尼',
    logoUrl: 'https://dummyimage.com/200x200/1e272e/fff&text=Sony',
  },
  {
    id: 8,
    tmName: '诺基亚',
    logoUrl: 'https://dummyimage.com/200x200/0652dd/fff&text=Nokia',
  },
  {
    id: 9,
    tmName: '摩托罗拉',
    logoUrl: 'https://dummyimage.com/200x200/b33939/fff&text=Motorola',
  },
  {
    id: 10,
    tmName: '联想',
    logoUrl: 'https://dummyimage.com/200x200/e84393/fff&text=Lenovo',
  },
  {
    id: 11,
    tmName: '华硕',
    logoUrl: 'https://dummyimage.com/200x200/636e72/fff&text=Asus',
  },
  {
    id: 12,
    tmName: '戴尔',
    logoUrl: 'https://dummyimage.com/200x200/74b9ff/fff&text=Dell',
  },
  {
    id: 13,
    tmName: '惠普',
    logoUrl: 'https://dummyimage.com/200x200/0984e3/fff&text=HP',
  },
  {
    id: 14,
    tmName: '宏碁',
    logoUrl: 'https://dummyimage.com/200x200/55efc4/fff&text=Acer',
  },
  {
    id: 15,
    tmName: '微软',
    logoUrl: 'https://dummyimage.com/200x200/fdcb6e/fff&text=Microsoft',
  },
]

export default [
  // 获取品牌列表
  {
    url: '/api/admin/product/baseTrademark/:page/:limit',
    method: 'get',
    response: (config: { url: string; query: { page: string; limit: string } }) => {
      // 尝试解析 URL 中的参数
      const url = config.url
      const match = url.match(/\/baseTrademark\/(\d+)\/(\d+)/)

      let page = 1
      let limit = 10

      if (match) {
        page = parseInt(match[1])
        limit = parseInt(match[2])
      } else if (config.query) {
        page = parseInt(config.query.page as string) || 1
        limit = parseInt(config.query.limit as string) || 10
      }

      const total = trademarks.length
      const start = (page - 1) * limit
      const end = start + limit
      const records = trademarks.slice(start, end)
      const pages = Math.ceil(total / limit)

      return {
        code: 200,
        message: '成功',
        data: {
          records: records,
          total: total,
          size: limit,
          current: page,
          searchCount: true,
          pages: pages,
        },
        ok: true,
      }
    },
  },
  // 添加品牌
  {
    url: '/api/admin/product/baseTrademark/save',
    method: 'post',
    response: (config: { body: { tmName: string; logoUrl: string } }) => {
      const { tmName, logoUrl } = config.body
      trademarks.unshift({
        id: trademarks.length + 1,
        tmName,
        logoUrl,
      })
      return {
        code: 200,
        message: '添加品牌成功',
        ok: true,
      }
    },
  },
  // 修改品牌
  {
    url: '/api/admin/product/baseTrademark/update',
    method: 'put',
    response: (config: { body: { id: number; tmName: string; logoUrl: string } }) => {
      const { id, tmName, logoUrl } = config.body
      const trademark = trademarks.find((item) => item.id === id)
      if (trademark) {
        trademark.tmName = tmName
        trademark.logoUrl = logoUrl
        return {
          code: 200,
          message: '修改品牌成功',
          ok: true,
        }
      } else {
        return {
          code: 201,
          message: '修改品牌失败',
          ok: false,
        }
      }
    },
  },
  // 删除品牌
  {
    url: '/api/admin/product/baseTrademark/remove/:id',
    method: 'delete',
    response: (config: { url: string }) => {
      const url = config.url
      const match = url.match(/\/remove\/(\d+)/)
      if (match) {
        const id = parseInt(match[1])
        trademarks = trademarks.filter((item) => item.id !== id)
        return {
          code: 200,
          message: '删除品牌成功',
          ok: true,
        }
      } else {
        return {
          code: 201,
          message: '删除品牌失败',
          ok: false,
        }
      }
    },
  },
  // 文件上传
  {
    url: '/api/admin/product/fileUpload',
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: '上传成功',
        data: 'https://dummyimage.com/200x200/00b894/fff&text=NewLogo',
        ok: true,
      }
    },
  },
] as MockMethod[]
