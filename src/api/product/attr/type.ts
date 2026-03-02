// 服务器响应数据通用类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// 分类数据类型
export interface Category {
  id: number | string
  name: string
  category1Id?: number
  category2Id?: number
}

// 相应的分类接口返回数据的类型
export interface CategoryResponseData extends ResponseData {
  data: Category[]
}

// 属性值对象的类型，商品属性的值用对象来表示，因为要包含额外的信息
export interface AttrValue {
  id?: number
  value: string
  attrId?: number
  flag?: boolean
}

// 属性值对象数组
export type AttrValueList = AttrValue[]

// 属性对象，表示商品属性
export interface Attr {
  id?: number
  attrName: string
  categoryId: number | string
  categoryLevel: number
  attrValueList: AttrValueList
}

// 属性对象数组
export type AttrList = Attr[]

// 属性接口返回的数据 类型
export interface AttrResponseData extends ResponseData {
  data: AttrList
}
