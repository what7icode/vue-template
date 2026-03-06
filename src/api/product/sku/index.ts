/* eslint-disable @typescript-eslint/no-explicit-any */
//SKU模块接口管理
import service from '@/utils/service'
import type { SkuResponseData, SkuInfoData } from './type'
//枚举地址
enum API {
  //获取已有SKU接口的路径
  SKU_URL = '/admin/product/list/',
  //上架接口的路径
  SALE_URL = '/admin/product/onSale/',
  //下架接口的路径
  CANCELSALE_URL = '/admin/product/cancelSale/',
  //获取商品详情接口的路径
  SKUINFO_URL = '/admin/product/getSkuInfo/',
  //删除已有的商品接口的路径
  DELETESKU_URL = '/admin/product/deleteSku/',
}
//获取商品SKU的接口
export const reqSkuList = (page: number, limit: number) =>
  service.get<any, SkuResponseData>(API.SKU_URL + `${page}/${limit}`)
//已有商品上架的接口
export const reqSaleSku = (skuId: number) => service.get<any, any>(API.SALE_URL + skuId)
//已有商品下架的接口
export const reqCancelSale = (skuId: number) => service.get<any, any>(API.CANCELSALE_URL + skuId)
//获取商品详情的接口
export const reqSkuInfo = (skuId: number) => service.get<any, SkuInfoData>(API.SKUINFO_URL + skuId)
//删除某一个已有的商品的接口
export const reqRemoveSku = (skuId: number) => service.delete<any, any>(API.DELETESKU_URL + skuId)
