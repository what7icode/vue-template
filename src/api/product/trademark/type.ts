export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// 品牌数据的类型
export interface Trademark {
  id?: number
  tmName: string
  logoUrl: string
}

// 品牌数据数组
export type Records = Trademark[]

// 获取品牌数据接口返回数据的类型
export interface TrademarkResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    searchCount: boolean
    pages: number
  }
}
