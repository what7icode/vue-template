/* eslint-disable @typescript-eslint/no-explicit-any */
import { MockMethod } from 'vite-plugin-mock'

// Define interfaces locally to avoid import issues in mock files if ts-node is not set up for alias
interface AttrValue {
  id?: number
  value: string
  attrId?: number
  flag?: boolean
}

interface Attr {
  id?: number
  attrName: string
  categoryId: number | string
  categoryLevel: number
  attrValueList: AttrValue[]
}

const category1 = [
  { id: 1, name: '图书、音像、电子书刊' },
  { id: 2, name: '手机' },
  { id: 3, name: '家用电器' },
  { id: 4, name: '电脑、办公' },
  { id: 5, name: '家居、家具、家装、厨具' },
  { id: 6, name: '服饰内衣' },
]

const category2: any = {
  1: [
    { id: 11, name: '电子书刊', category1Id: 1 },
    { id: 12, name: '音像', category1Id: 1 },
    { id: 13, name: '英文原版', category1Id: 1 },
  ],
  2: [
    { id: 21, name: '手机通讯', category1Id: 2 },
    { id: 22, name: '运营商', category1Id: 2 },
    { id: 23, name: '手机配件', category1Id: 2 },
  ],
  3: [
    { id: 31, name: '大家电', category1Id: 3 },
    { id: 32, name: '生活电器', category1Id: 3 },
    { id: 33, name: '厨房小电', category1Id: 3 },
  ],
  4: [
    { id: 41, name: '电脑整机', category1Id: 4 },
    { id: 42, name: '电脑配件', category1Id: 4 },
  ],
  5: [
    { id: 51, name: '厨具', category1Id: 5 },
    { id: 52, name: '家纺', category1Id: 5 },
  ],
  6: [
    { id: 61, name: '女装', category1Id: 6 },
    { id: 62, name: '男装', category1Id: 6 },
  ],
}

const category3: any = {
  11: [
    { id: 111, name: '电子书', category2Id: 11 },
    { id: 112, name: '网络原创', category2Id: 11 },
    { id: 113, name: '数字杂志', category2Id: 11 },
  ],
  21: [
    { id: 211, name: '移动手机', category2Id: 21 },
    { id: 212, name: '对讲机', category2Id: 21 },
    { id: 213, name: '老人机', category2Id: 21 },
  ],
  31: [
    { id: 311, name: '平板电视', category2Id: 31 },
    { id: 312, name: '空调', category2Id: 31 },
    { id: 313, name: '冰箱', category2Id: 31 },
  ],
  32: [
    { id: 321, name: '电风扇', category2Id: 32 },
    { id: 322, name: '吸尘器', category2Id: 32 },
    { id: 323, name: '加湿器', category2Id: 32 },
  ],
  41: [
    { id: 411, name: '笔记本', category2Id: 41 },
    { id: 412, name: '台式机', category2Id: 41 },
  ],
  42: [
    { id: 421, name: 'CPU', category2Id: 42 },
    { id: 422, name: '显卡', category2Id: 42 },
    { id: 423, name: '主板', category2Id: 42 },
  ],
  61: [
    { id: 611, name: '连衣裙', category2Id: 61 },
    { id: 612, name: 'T恤', category2Id: 61 },
  ],
}

let attrs: Attr[] = [
  // 手机 (211)
  {
    id: 1,
    attrName: '价格',
    categoryId: 211,
    categoryLevel: 3,
    attrValueList: [
      { id: 1, value: '500-999', attrId: 1 },
      { id: 2, value: '1000-1999', attrId: 1 },
      { id: 3, value: '2000-2999', attrId: 1 },
      { id: 4, value: '3000以上', attrId: 1 },
    ],
  },
  {
    id: 2,
    attrName: '颜色',
    categoryId: 211,
    categoryLevel: 3,
    attrValueList: [
      { id: 5, value: '红色', attrId: 2 },
      { id: 6, value: '蓝色', attrId: 2 },
      { id: 7, value: '黑色', attrId: 2 },
      { id: 8, value: '白色', attrId: 2 },
    ],
  },
  {
    id: 3,
    attrName: '运行内存',
    categoryId: 211,
    categoryLevel: 3,
    attrValueList: [
      { id: 9, value: '8G', attrId: 3 },
      { id: 10, value: '12G', attrId: 3 },
      { id: 11, value: '16G', attrId: 3 },
    ],
  },
  // 平板电视 (311)
  {
    id: 4,
    attrName: '电视屏幕尺寸',
    categoryId: 311,
    categoryLevel: 3,
    attrValueList: [
      { id: 12, value: '55英寸', attrId: 4 },
      { id: 13, value: '65英寸', attrId: 4 },
      { id: 14, value: '75英寸', attrId: 4 },
      { id: 15, value: '85英寸', attrId: 4 },
    ],
  },
  {
    id: 5,
    attrName: '能效等级',
    categoryId: 311,
    categoryLevel: 3,
    attrValueList: [
      { id: 16, value: '一级能效', attrId: 5 },
      { id: 17, value: '二级能效', attrId: 5 },
      { id: 18, value: '三级能效', attrId: 5 },
    ],
  },
  // 空调 (312)
  {
    id: 6,
    attrName: '匹数',
    categoryId: 312,
    categoryLevel: 3,
    attrValueList: [
      { id: 19, value: '1匹', attrId: 6 },
      { id: 20, value: '1.5匹', attrId: 6 },
      { id: 21, value: '2匹', attrId: 6 },
      { id: 22, value: '3匹', attrId: 6 },
    ],
  },
  {
    id: 7,
    attrName: '类型',
    categoryId: 312,
    categoryLevel: 3,
    attrValueList: [
      { id: 23, value: '壁挂式', attrId: 7 },
      { id: 24, value: '立柜式', attrId: 7 },
    ],
  },
  // 笔记本 (411)
  {
    id: 8,
    attrName: '处理器',
    categoryId: 411,
    categoryLevel: 3,
    attrValueList: [
      { id: 25, value: 'Intel i5', attrId: 8 },
      { id: 26, value: 'Intel i7', attrId: 8 },
      { id: 27, value: 'Intel i9', attrId: 8 },
      { id: 28, value: 'AMD R7', attrId: 8 },
    ],
  },
  {
    id: 9,
    attrName: '显卡',
    categoryId: 411,
    categoryLevel: 3,
    attrValueList: [
      { id: 29, value: '集成显卡', attrId: 9 },
      { id: 30, value: 'RTX 3060', attrId: 9 },
      { id: 31, value: 'RTX 4060', attrId: 9 },
    ],
  },
  // 连衣裙 (611)
  {
    id: 10,
    attrName: '材质',
    categoryId: 611,
    categoryLevel: 3,
    attrValueList: [
      { id: 32, value: '纯棉', attrId: 10 },
      { id: 33, value: '真丝', attrId: 10 },
      { id: 34, value: '雪纺', attrId: 10 },
    ],
  },
  {
    id: 11,
    attrName: '尺码',
    categoryId: 611,
    categoryLevel: 3,
    attrValueList: [
      { id: 35, value: 'S', attrId: 11 },
      { id: 36, value: 'M', attrId: 11 },
      { id: 37, value: 'L', attrId: 11 },
      { id: 38, value: 'XL', attrId: 11 },
    ],
  },
]

export default [
  // 获取一级分类
  {
    url: '/api/admin/product/getCategory1',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: '成功',
        data: category1,
        ok: true,
      }
    },
  },
  // 获取二级分类
  {
    url: '/api/admin/product/getCategory2/:category1Id',
    method: 'get',
    response: (config: any) => {
      const url = config.url
      // Match /getCategory2/123 or /getCategory2/123?param=...
      const match = url.match(/\/getCategory2\/(\d+)/)
      const category1Id = match ? parseInt(match[1]) : 0
      return {
        code: 200,
        message: '成功',
        data: category2[category1Id] || [],
        ok: true,
      }
    },
  },
  // 获取三级分类
  {
    url: '/api/admin/product/getCategory3/:category2Id',
    method: 'get',
    response: (config: any) => {
      const url = config.url
      const match = url.match(/\/getCategory3\/(\d+)/)
      const category2Id = match ? parseInt(match[1]) : 0
      return {
        code: 200,
        message: '成功',
        data: category3[category2Id] || [],
        ok: true,
      }
    },
  },
  // 获取分类下已有的属性与属性值
  {
    url: '/api/admin/product/attrInfoList/:category1Id/:category2Id/:category3Id',
    method: 'get',
    response: (config: any) => {
      const url = config.url
      const match = url.match(/\/attrInfoList\/(\d+)\/(\d+)\/(\d+)/)
      const category3Id = match ? parseInt(match[3]) : 0

      const data = attrs.filter((item) => item.categoryId === category3Id)

      return {
        code: 200,
        message: '成功',
        data: data,
        ok: true,
      }
    },
  },
  // 添加或更新属性
  {
    url: '/api/admin/product/saveAttrInfo',
    method: 'post',
    response: ({ body }: { body: Attr }) => {
      if (body.id) {
        // Update
        attrs = attrs.map((item) => {
          if (item.id === body.id) {
            return body
          }
          return item
        })
      } else {
        // Add
        const newAttr: Attr = {
          ...body,
          id: new Date().getTime(),
          attrValueList: body.attrValueList.map((item) => ({
            ...item,
            id: new Date().getTime() + Math.random(),
          })),
        }
        attrs.push(newAttr)
      }
      return {
        code: 200,
        message: '保存成功',
        data: null,
        ok: true,
      }
    },
  },
  // 删除属性
  {
    url: '/api/admin/product/deleteAttr/:attrId',
    method: 'delete',
    response: (config: any) => {
      const url = config.url
      const match = url.match(/\/deleteAttr\/(\d+)/)
      const attrId = match ? parseInt(match[1]) : 0
      attrs = attrs.filter((item) => item.id !== attrId)
      return {
        code: 200,
        message: '删除成功',
        data: null,
        ok: true,
      }
    },
  },
] as MockMethod[]
