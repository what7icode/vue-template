/* eslint-disable @typescript-eslint/no-explicit-any */
import service from '@/utils/service'
import type {
  SpuResponseData,
  AllTrademark,
  SaleAttrResponseData,
  SpuData,
  SkuData,
  SkuInfoData,
  AllSaleAttrResponseData,
  SpuImgListResponseData,
  ResponseData,
} from './type'

enum API {
  // 获取SPU数据接口的路径，Ex：/admin/product/1/3?category3Id=61
  HASSPU_URL = '/admin/product/',
  // 获取全部品牌数据接口的路径
  ALLTRADEMARK_URL = '/admin/product/baseTrademark/getTrademarkList',
  // 获取某个SPU的商品的照片墙接口的路径
  IMAGE_URL = '/admin/product/spuImageList/',
  // 获取某个SPU的全部的已有的销售属性接口的路径
  SPUHASSALEATTR_URL = '/admin/product/spuSaleAttrList/',
  // 获取整个项目全部的销售属性接口的路径【颜色、版本、尺码】
  ALLSALE_URL = '/admin/product/baseSaleAttrList',
  // 追加一个新的SPU的接口的路径
  ADDSPU_URL = '/admin/product/saveSpuInfo',
  // 更新已有的SPU的接口的路径
  UPDATESPU_URL = '/admin/product/updateSpuInfo',
  // 追加一个新增的SKU的接口的路径
  ADDSKU_URL = '/admin/product/saveSkuInfo',
  // 查看某一个已有的SPU全部售卖的商品的接口的路径
  SKUINFO_URL = '/admin/product/findBySpuId/',
  // 删除已有的SPU的接口的路径
  REMOVESPU_URL = '/admin/product/deleteSpu/',
}

// 获取某一个三级分类下已有的SPU的接口
export const reqSpu = (page: number, limit: number, category3Id: string | number) =>
  service.get<any, SpuResponseData>(API.HASSPU_URL + `${page}/${limit}?category3Id=${category3Id}`)

// 获取全部的SPU的品牌数据的接口
export const reqAllTrademark = () => service.get<any, AllTrademark>(API.ALLTRADEMARK_URL)

// 获取某个SPU的图片墙的接口
export const reqSpuImageList = (spuId: number) =>
  service.get<any, SpuImgListResponseData>(API.IMAGE_URL + spuId)

// 获取某个SPU已有的销售属性的接口
export const reqSpuHasSaleAttr = (spuId: number) =>
  service.get<any, SaleAttrResponseData>(API.SPUHASSALEATTR_URL + spuId)

// 获取全部的销售属性的接口
export const reqAllSaleAttr = () => service.get<any, AllSaleAttrResponseData>(API.ALLSALE_URL)

// 添加一个新的SPU的接口
// 更新已有的SPU的接口
// data:即为新增的SPU或者已有的SPU对象
export const reqAddOrUpdateSpu = (data: SpuData) => {
  // 如果SPU对象拥有ID，更新已有的SPU
  if (data.id) {
    return service.post<any, ResponseData>(API.UPDATESPU_URL, data)
  } else {
    return service.post<any, ResponseData>(API.ADDSPU_URL, data)
  }
}

// 添加一个新的SKU的接口
export const reqAddSku = (data: SkuData) => service.post<any, ResponseData>(API.ADDSKU_URL, data)

// 获取SKU数据的接口
export const reqSkuList = (spuId: number | string) =>
  service.get<any, SkuInfoData>(API.SKUINFO_URL + spuId)

// 删除已有的SPU的接口
export const reqDeleteSpu = (spuId: number | string) =>
  service.delete<any, ResponseData>(API.REMOVESPU_URL + spuId)
