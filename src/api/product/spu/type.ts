import type { Attr } from '../attr/type'

// 服务器返回数据的类型
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

// 获取已有的SPU接口返回数据的类型
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

// 品牌接口返回数据的类型
export interface AllTrademark extends ResponseData {
  data: Trademark[]
}

// SPU图片的类型
export interface SpuImage {
  id?: number
  spuId?: number
  imgName?: string
  imgUrl?: string
  name?: string
  url?: string
  createTime?: string
  updateTime?: string
}

// 获取已有的SPU的照片墙接口返回数据的类型
export interface SpuImgListResponseData extends ResponseData {
  data: SpuImage[]
}

// 已有的销售属性值对象的类型
export interface SaleAttrValue {
  id?: number
  spuId?: number
  baseSaleAttrId: number | string
  saleAttrValueName: string
  saleAttrName?: string
  isChecked?: boolean | null
  createTime?: string | null
  updateTime?: string | null
}

// 销售属性值对象数组
export type SpuSaleAttrValueList = SaleAttrValue[]

// 销售属性对象的类型
export interface SaleAttr {
  id?: number
  spuId?: number
  baseSaleAttrId: number | string
  saleAttrName: string
  spuSaleAttrValueList: SpuSaleAttrValueList
  flag?: boolean
  saleAttrValueName?: string
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

// SKU 平台属性
export interface SkuAttrValue {
  attrId: string | number // 平台属性ID
  valueId: string | number // 属性值ID
}

// SKU 销售属性
export interface SkuSaleAttrValue {
  saleAttrId: string | number // 销售属性ID
  saleAttrValueId: string | number // 销售属性值ID
}

// SKU 数据的类型
export interface SkuData {
  category3Id: string | number // 三级分类的ID
  spuId: string | number // 已有的SPU的ID
  tmId: string | number // SPU品牌的ID
  skuName: string // sku名字
  price: string | number // sku价格
  weight: string | number // sku重量
  skuDesc: string // sku的描述
  skuAttrValueList?: SkuAttrValue[] // 平台属性
  skuSaleAttrValueList?: SkuSaleAttrValue[]
  skuDefaultImg: string // sku图片地址
}

// 获取SKU数据接口返回数据的类型
export interface SkuInfoData extends ResponseData {
  data: SkuData[]
}

// 平台属性加个字段用于获取SKU平台属性
export interface SkuAttr extends Attr {
  attrIdAndValueId?: string
}

// SPU 销售属性加个字段用于获取SKU销售属性
export interface SkuSaleAttr extends SaleAttr {
  saleIdAndValueId?: string
}
