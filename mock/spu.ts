/* eslint-disable @typescript-eslint/no-explicit-any */
import { MockMethod } from 'vite-plugin-mock'

// 模拟SPU数据
let spuList = [
  // 手机分类 (category3Id: 211)
  {
    id: 1,
    spuName: 'iPhone 14',
    description: 'Apple iPhone 14 Pro Max 256GB 暗紫色 支持移动联通电信5G 双卡双待手机',
    category3Id: 211,
    tmId: 1,
    spuSaleAttrList: null,
    spuImageList: null,
  },
  {
    id: 2,
    spuName: 'Huawei Mate 50',
    description: '华为Mate 50 Pro 256GB 昆仑霞光 支持北斗卫星消息 鸿蒙操作系统3.0',
    category3Id: 211,
    tmId: 2,
    spuSaleAttrList: null,
    spuImageList: null,
  },
  {
    id: 3,
    spuName: 'Xiaomi 13',
    description: '小米13 LEICA影像 第二代骁龙8 67W秒充 120Hz高刷 12GB+256GB 黑色 5G手机',
    category3Id: 211,
    tmId: 3,
    spuSaleAttrList: null,
    spuImageList: null,
  },
  {
    id: 4,
    spuName: 'OPPO Find X6',
    description: 'OPPO Find X6 Pro 超光影三主摄 哈苏影像 100W闪充 16GB+512GB 大漠银月 5G手机',
    category3Id: 211,
    tmId: 4,
    spuSaleAttrList: null,
    spuImageList: null,
  },
  {
    id: 5,
    spuName: 'Vivo X90',
    description: 'vivo X90 蔡司影像 天玑9200旗舰芯片 120W双芯闪充 8GB+256GB 冰蓝 5G手机',
    category3Id: 211,
    tmId: 5,
    spuSaleAttrList: null,
    spuImageList: null,
  },
  // 平板电视分类 (category3Id: 311)
  {
    id: 6,
    spuName: 'Sony XR-65X90K',
    description: '索尼（SONY）XR-65X90K 65英寸 全面屏 4K超高清HDR XR认知芯片 游戏电视',
    category3Id: 311,
    tmId: 6,
    spuSaleAttrList: null,
    spuImageList: null,
  },
  {
    id: 7,
    spuName: 'Samsung QN85B',
    description: '三星（SAMSUNG）QA65QN85BAJXXZ 65英寸 Neo QLED 4K超高清 智能电视',
    category3Id: 311,
    tmId: 7,
    spuSaleAttrList: null,
    spuImageList: null,
  },
  {
    id: 8,
    spuName: 'Hisense 75E3F',
    description: '海信（Hisense）75E3F 75英寸 4K HDR 超薄悬浮全面屏 远场语音 智能液晶电视',
    category3Id: 311,
    tmId: 8,
    spuSaleAttrList: null,
    spuImageList: null,
  },
  {
    id: 9,
    spuName: 'TCL 65T8E',
    description: 'TCL 65T8E Max 65英寸 QLED原色量子点 4K超高清 120Hz高刷 游戏电视',
    category3Id: 311,
    tmId: 9,
    spuSaleAttrList: null,
    spuImageList: null,
  },
  // 笔记本分类 (category3Id: 411)
  {
    id: 10,
    spuName: 'MacBook Pro 14',
    description:
      'Apple MacBook Pro 14英寸 M2 Pro芯片(10核中央处理器 16核图形处理器) 16G 512G 深空灰',
    category3Id: 411,
    tmId: 1,
    spuSaleAttrList: null,
    spuImageList: null,
  },
  {
    id: 11,
    spuName: 'Dell XPS 13',
    description: '戴尔(DELL)XPS13-9315 13.4英寸全面屏轻薄笔记本电脑(i7-1250U 16G 512G 墨蓝)',
    category3Id: 411,
    tmId: 10,
    spuSaleAttrList: null,
    spuImageList: null,
  },
  {
    id: 12,
    spuName: 'Lenovo ThinkPad X1',
    description:
      '联想ThinkPad X1 Carbon 2022款 14英寸轻薄商务办公笔记本电脑(i7-1260P 16G 512G 4K屏)',
    category3Id: 411,
    tmId: 11,
    spuSaleAttrList: null,
    spuImageList: null,
  },
]

// 模拟品牌数据
const trademarks = [
  {
    id: 1,
    tmName: 'Apple',
    logoUrl: 'https://dummyimage.com/100x100/000/fff&text=Apple',
  },
  {
    id: 2,
    tmName: 'Huawei',
    logoUrl: 'https://dummyimage.com/100x100/d00/fff&text=Huawei',
  },
  {
    id: 3,
    tmName: 'Xiaomi',
    logoUrl: 'https://dummyimage.com/100x100/f60/fff&text=Xiaomi',
  },
  {
    id: 4,
    tmName: 'OPPO',
    logoUrl: 'https://dummyimage.com/100x100/0f0/fff&text=OPPO',
  },
  {
    id: 5,
    tmName: 'Vivo',
    logoUrl: 'https://dummyimage.com/100x100/00f/fff&text=Vivo',
  },
  {
    id: 6,
    tmName: 'Sony',
    logoUrl: 'https://dummyimage.com/100x100/000/fff&text=Sony',
  },
  {
    id: 7,
    tmName: 'Samsung',
    logoUrl: 'https://dummyimage.com/100x100/009/fff&text=Samsung',
  },
  {
    id: 8,
    tmName: 'Hisense',
    logoUrl: 'https://dummyimage.com/100x100/0aa/fff&text=Hisense',
  },
  {
    id: 9,
    tmName: 'TCL',
    logoUrl: 'https://dummyimage.com/100x100/f00/fff&text=TCL',
  },
  {
    id: 10,
    tmName: 'Dell',
    logoUrl: 'https://dummyimage.com/100x100/007/fff&text=Dell',
  },
  {
    id: 11,
    tmName: 'Lenovo',
    logoUrl: 'https://dummyimage.com/100x100/f00/fff&text=Lenovo',
  },
]

// 模拟图片数据
const spuImages = [
  {
    id: 1,
    imgName: 'front.jpg',
    imgUrl:
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=400&auto=format&fit=crop',
    spuId: 1,
    name: 'front.jpg',
    url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 2,
    imgName: 'back.jpg',
    imgUrl:
      'https://images.unsplash.com/photo-1592899677712-a5a254503327?q=80&w=400&auto=format&fit=crop',
    spuId: 1,
    name: 'back.jpg',
    url: 'https://images.unsplash.com/photo-1592899677712-a5a254503327?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 3,
    imgName: 'side.jpg',
    imgUrl:
      'https://images.unsplash.com/photo-1580910051074-3eb6948d3aa0?q=80&w=400&auto=format&fit=crop',
    spuId: 1,
    name: 'side.jpg',
    url: 'https://images.unsplash.com/photo-1580910051074-3eb6948d3aa0?q=80&w=400&auto=format&fit=crop',
  },
]

// 模拟销售属性
const saleAttrs = [
  {
    id: 1,
    spuId: 1,
    baseSaleAttrId: 1,
    saleAttrName: '颜色',
    spuSaleAttrValueList: [
      {
        id: 1,
        spuId: 1,
        baseSaleAttrId: 1,
        saleAttrValueName: '暗紫色',
        saleAttrName: '颜色',
        isChecked: null,
      },
      {
        id: 2,
        spuId: 1,
        baseSaleAttrId: 1,
        saleAttrValueName: '深空黑色',
        saleAttrName: '颜色',
        isChecked: null,
      },
      {
        id: 3,
        spuId: 1,
        baseSaleAttrId: 1,
        saleAttrValueName: '银色',
        saleAttrName: '颜色',
        isChecked: null,
      },
      {
        id: 4,
        spuId: 1,
        baseSaleAttrId: 1,
        saleAttrValueName: '金色',
        saleAttrName: '颜色',
        isChecked: null,
      },
    ],
  },
  {
    id: 2,
    spuId: 1,
    baseSaleAttrId: 2,
    saleAttrName: '版本',
    spuSaleAttrValueList: [
      {
        id: 5,
        spuId: 1,
        baseSaleAttrId: 2,
        saleAttrValueName: '128GB',
        saleAttrName: '版本',
        isChecked: null,
      },
      {
        id: 6,
        spuId: 1,
        baseSaleAttrId: 2,
        saleAttrValueName: '256GB',
        saleAttrName: '版本',
        isChecked: null,
      },
      {
        id: 7,
        spuId: 1,
        baseSaleAttrId: 2,
        saleAttrValueName: '512GB',
        saleAttrName: '版本',
        isChecked: null,
      },
      {
        id: 8,
        spuId: 1,
        baseSaleAttrId: 2,
        saleAttrValueName: '1TB',
        saleAttrName: '版本',
        isChecked: null,
      },
    ],
  },
]

// 模拟基础销售属性
const baseSaleAttrs = [
  { id: 1, name: '颜色' },
  { id: 2, name: '版本' },
  { id: 3, name: '尺码' },
  { id: 4, name: '套装' },
]

// 模拟SKU数据
const skuList = [
  {
    id: 1,
    spuId: 1,
    skuName: 'iPhone 14 Pro Max 256GB 暗紫色',
    price: 9899,
    weight: '240',
    skuDesc: 'A16芯片，4800万像素主摄',
    skuDefaultImg:
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 2,
    spuId: 1,
    skuName: 'iPhone 14 Pro Max 512GB 深空黑色',
    price: 11699,
    weight: '240',
    skuDesc: 'A16芯片，4800万像素主摄',
    skuDefaultImg:
      'https://images.unsplash.com/photo-1592899677712-a5a254503327?q=80&w=400&auto=format&fit=crop',
  },
]

export default [
  // 获取SPU列表
  {
    url: '/api/admin/product/:page(\\d+)/:limit(\\d+)',
    method: 'get',
    response: (config: any) => {
      const url = config.url
      const match = url.match(/\/product\/(\d+)\/(\d+)/)
      const page = match ? parseInt(match[1]) : 1
      const limit = match ? parseInt(match[2]) : 10
      const category3Id = config.query.category3Id ? parseInt(config.query.category3Id) : 0

      const filteredSpu = spuList.filter((item) => !category3Id || item.category3Id == category3Id)

      // 分页逻辑
      const start = (page - 1) * limit
      const end = start + limit
      const records = filteredSpu.slice(start, end)

      return {
        code: 200,
        message: '成功',
        data: {
          records: records,
          total: filteredSpu.length,
          size: limit,
          current: page,
          searchCount: true,
          pages: Math.ceil(filteredSpu.length / limit),
        },
        ok: true,
      }
    },
  },
  // 获取全部品牌
  {
    url: '/api/admin/product/baseTrademark/getTrademarkList',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: '成功',
        data: trademarks,
        ok: true,
      }
    },
  },
  // 获取SPU图片
  {
    url: '/api/admin/product/spuImageList/:spuId',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: '成功',
        data: spuImages,
        ok: true,
      }
    },
  },
  // 获取SPU销售属性
  {
    url: '/api/admin/product/spuSaleAttrList/:spuId',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: '成功',
        data: saleAttrs,
        ok: true,
      }
    },
  },
  // 获取基础销售属性
  {
    url: '/api/admin/product/baseSaleAttrList',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: '成功',
        data: baseSaleAttrs,
        ok: true,
      }
    },
  },
  // 添加SPU
  {
    url: '/api/admin/product/saveSpuInfo',
    method: 'post',
    response: ({ body }: any) => {
      spuList.push({ ...body, id: new Date().getTime() })
      return {
        code: 200,
        message: '成功',
        ok: true,
      }
    },
  },
  // 更新SPU
  {
    url: '/api/admin/product/updateSpuInfo',
    method: 'post',
    response: ({ body }: any) => {
      spuList = spuList.map((item) => (item.id === body.id ? body : item))
      return {
        code: 200,
        message: '成功',
        ok: true,
      }
    },
  },
  // 删除SPU
  {
    url: '/api/admin/product/deleteSpu/:spuId',
    method: 'delete',
    response: (config: any) => {
      const url = config.url
      const match = url.match(/\/deleteSpu\/(\d+)/)
      const spuId = match ? parseInt(match[1]) : 0
      spuList = spuList.filter((item) => item.id !== spuId)
      return {
        code: 200,
        message: '成功',
        ok: true,
      }
    },
  },
  // 添加SKU
  {
    url: '/api/admin/product/saveSkuInfo',
    method: 'post',
    response: ({ body }: any) => {
      skuList.push({ ...body, id: new Date().getTime() })
      return {
        code: 200,
        message: '成功',
        ok: true,
      }
    },
  },
  // 获取SKU列表
  {
    url: '/api/admin/product/findBySpuId/:spuId',
    method: 'get',
    response: (config: any) => {
      const url = config.url
      const match = url.match(/\/findBySpuId\/(\d+)/)
      const spuId = match ? parseInt(match[1]) : 0
      const data = skuList.filter((item) => item.spuId === spuId)
      return {
        code: 200,
        message: '成功',
        data: data,
        ok: true,
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
        message: '成功',
        data: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=400&auto=format&fit=crop',
        ok: true,
      }
    },
  },
] as MockMethod[]
