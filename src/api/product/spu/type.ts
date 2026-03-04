// 服务器返回数据的通用类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// SPU数据的类型
export interface SpuData {
  id?: number
  spuName: string
  description: string
  category3Id: string | number
  tmId: number | string
  spuSaleAttrList: null | SaleAttr[]
  spuImageList: null | SpuImage[]
}

// SPU数据数组
export type SpuRecords = SpuData[]

// 获取已有的SPU接口返回的数据类型
export interface SpuResponseData extends ResponseData {
  data: {
    records: SpuRecords
    total: number
    size: number
    current: number
    searchCount: boolean
    pages: number
  }
}

// 品牌数据的类型
export interface Trademark {
  id: number
  tmName: string
  logoUrl: string
}

// 品牌接口返回的数据类型
export interface AllTrademark extends ResponseData {
  data: Trademark[]
}

// SPU图片的类型
export interface SpuImage {
  id?: number
  createTime?: string
  updateTime?: string
  spuId?: number
  imgName?: string
  imgUrl?: string
  name?: string
  url?: string
}

// 获取已有的SPU的照片墙接口返回数据的类型
export interface SpuImgListResponseData extends ResponseData {
  data: SpuImage[]
}

// 已有的销售属性值对象的类型
export interface SaleAttrValue {
  id?: number
  createTime?: string | null
  updateTime?: string | null
  spuId?: number
  baseSaleAttrId: number | string
  saleAttrValue: string
  saleAttrName?: string
  isChecked?: boolean | null
}

// 销售属性值对象数组
export type SpuSaleAttrValueList = SaleAttrValue[]

// 销售属性对象的类型
export interface SaleAttr {
  id?: number
  createTime?: string | null
  updateTime?: string | null
  spuId?: number
  baseSaleAttrId: number | string
  saleAttrName: string
  spuSaleAttrValueList: SpuSaleAttrValueList
  flag?: boolean
  saleAttrValue?: string
  saleAttrIdAndValueId?: string
}

// 获取已有的SPU的销售属性接口返回数据的类型
export interface SaleAttrResponseData extends ResponseData {
  data: SaleAttr[]
}

// 销售属性对象的简单类型
export interface BaseSaleAttr {
  id: number
  name: string
}

// 获取全部的销售属性接口返回数据的类型
export interface AllSaleAttrResponseData extends ResponseData {
  data: BaseSaleAttr[]
}

// 销售属性与其值的id
export interface SaleAttrAndValueID {
  saleAttrId: number | string // 属性ID
  saleAttrValueId: number | string // 属性值的ID
}

// 平台属性与其值的id
export interface AttrAndValueID {
  attrId: number | string // 属性的ID
  valueId: number | string // 属性值的ID
}

export interface SkuData {
  category3Id: string | number // 三级分类的ID
  spuId: string | number // 已有的SPU的ID
  tmId: string | number // SPU品牌的ID
  skuName: string // sku名字
  price: string | number // sku价格
  weight: string | number // sku重量
  skuDesc: string // sku的描述
  skuAttrValueList?: AttrAndValueID[] // 平台属性
  skuSaleAttrValueList?: SaleAttrAndValueID[]
  skuDefaultImg: string // sku图片地址
}

// 获取SKU数据接口返回数据的类型
export interface SkuInfoData extends ResponseData {
  data: SkuData[]
}
