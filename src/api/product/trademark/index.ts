/* eslint-disable @typescript-eslint/no-explicit-any */
// 统一管理品牌管理模块接口
import service from '@/utils/service'
import type { ResponseData, Trademark, TrademarkResponseData } from './type'

// 品牌管理模块接口地址
enum API {
  // 获取已有品牌数据接口路径
  TRADEMARK_URL = '/admin/product/baseTrademark/',
  // 新增品牌数据接口路径
  ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
  // 修改品牌数据接口路径
  UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update',
  // 删除已有品牌数据接口路径
  DELTETRADEMARK_URL = '/admin/product/baseTrademark/remove/',
}

// 获取已有品牌数据接口
export const reqHasTrademark = (pageNo: number, limit: number) => {
  return service.get<any, TrademarkResponseData>(API.TRADEMARK_URL + `${pageNo}/${limit}`)
}

// 添加与修改品牌数据接口
export const reqAddOrUpdateTrademark = (data: Trademark) => {
  // 如果有id,则为修改品牌数据
  if (data.id) {
    return service.put<any, ResponseData>(API.UPDATETRADEMARK_URL, data)
  } else {
    // 否则为添加品牌数据
    return service.post<any, ResponseData>(API.ADDTRADEMARK_URL, data)
  }
}

// 删除品牌数据接口
export const reqDeleteTrademark = (id: number) => {
  return service.delete<any, ResponseData>(API.DELTETRADEMARK_URL + id)
}
