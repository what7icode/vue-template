/* eslint-disable @typescript-eslint/no-explicit-any */
// 品牌管理接口
import service from '@/utils/service'
import type { ResponseData, Trademark, TrademarkResponseData } from './type'

// 品牌管理模块接口地址
enum API {
  // 获取已有品牌接口
  TRADEMARK_URL = '/admin/product/baseTrademark/',
  // 添加品牌接口
  ADD_TRADEMARK_URL = '/admin/product/baseTrademark/save',
  // 修改品牌接口
  UPDATE_TRADEMARK_URL = '/admin/product/baseTrademark/update',
  // 删除品牌接口
  DELETE_TRADEMARK_URL = '/admin/product/baseTrademark/remove/',
}

// 获取已有品牌接口
export const reqHasTrademark = (pageNo: number, limit: number) => {
  return service.get<any, TrademarkResponseData>(API.TRADEMARK_URL + `${pageNo}/${limit}`)
}

// 添加与修改品牌接口
export const reqAddOrUpdateTrademark = (data: Trademark) => {
  // 如果有id,则为修改品牌
  if (data.id) {
    return service.put<any, ResponseData>(API.UPDATE_TRADEMARK_URL, data)
  } else {
    // 否则为添加品牌
    return service.post<any, ResponseData>(API.ADD_TRADEMARK_URL, data)
  }
}

// 删除品牌接口
export const reqDeleteTrademark = (id: number) => {
  return service.delete<any, ResponseData>(API.DELETE_TRADEMARK_URL + id)
}
