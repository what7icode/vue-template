/* eslint-disable @typescript-eslint/no-explicit-any */
// 属性相关的接口
import service from '@/utils/service'
import type { CategoryResponseData, AttrResponseData, ResponseData, Attr } from './type'

// 属性管理模块接口地址
enum API {
  // 获取一级分类接口地址
  C1_URL = '/admin/product/getCategory1',
  // 获取二级分类接口地址
  C2_URL = '/admin/product/getCategory2/',
  // 获取三级分类接口地址
  C3_URL = '/admin/product/getCategory3/',
  // 获取指定分类下已有的属性与属性值接口地址
  ATTR_URL = '/admin/product/attrInfoList/',
  // 添加或更新属性接口地址
  ADDORUPDATEATTR_URL = '/admin/product/saveAttrInfo',
  // 删除属性接口地址
  DELETEATTR_URL = '/admin/product/deleteAttr/',
}

// 获取一级分类的接口方法
export const reqC1 = () => service.get<any, CategoryResponseData>(API.C1_URL)

// 获取二级分类的接口方法
export const reqC2 = (category1Id: number | string) =>
  service.get<any, CategoryResponseData>(API.C2_URL + category1Id)

// 获取三级分类的接口方法
export const reqC3 = (category2Id: number | string) =>
  service.get<any, CategoryResponseData>(API.C3_URL + category2Id)

// 获取属性与属性值接口
export const reqAttr = (
  category1Id: number | string,
  category2Id: number | string,
  category3Id: number | string,
) =>
  service.get<any, AttrResponseData>(API.ATTR_URL + `${category1Id}/${category2Id}/${category3Id}`)

// 添加或更新属性接口
export const reqAddOrUpdateAttr = (data: Attr) =>
  service.post<any, ResponseData>(API.ADDORUPDATEATTR_URL, data)

// 删除属性接口
export const reqDeleteAttr = (attrId: number | string) =>
  service.delete<any, ResponseData>(API.DELETEATTR_URL + attrId)
