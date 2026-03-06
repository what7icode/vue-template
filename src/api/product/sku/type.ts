export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// SKU 平台属性值的类型
export interface SkuAttrValue {
  attrId: string | number // 平台属性ID
  valueId: string | number // 属性值ID
  attrName: string
  id: number
  skuId: number
  valueName: string
}
// SKU 销售属性值的类型
export interface SkuSaleAttrValue {
  saleAttrId: string | number // 销售属性ID
  saleAttrValueId: string | number // 销售属性值ID
  id: number
  saleAttrName: string
  saleAttrValueName: string
  skuId: number
}

// SKU 图片的类型
export interface SkuImg {
  id: number
  skuId: number
  imgName: string
  imgUrl: string
  spuImgId: number
  isDefault: string
}

// Sku数据的类型
export interface SkuData {
  category3Id?: string | number //三级分类的ID
  spuId?: string | number //已有的SPU的ID
  tmId?: string | number //SPU品牌的ID
  skuName?: string //sku名字
  price?: string | number //sku价格
  weight?: string | number //sku重量
  skuDesc?: string //sku的描述
  skuAttrValueList?: SkuAttrValue[]
  skuSaleAttrValueList?: SkuSaleAttrValue[]
  skuDefaultImg?: string //sku图片地址
  isSale?: number //控制商品的上架与下架
  id?: number
  skuImageList?: SkuImg[]
}

//获取SKU接口返回数据的类型
export interface SkuResponseData extends ResponseData {
  data: {
    records: SkuData[]
    total: number
    size: number
    current: number
    orders: []
    optimizeCountSql: boolean
    hitCount: boolean
    countId: null
    maxLimit: null
    searchCount: boolean
    pages: number
  }
}

//获取SKU商品详情接口返回数据的类型
export interface SkuInfoData extends ResponseData {
  data: SkuData
}
