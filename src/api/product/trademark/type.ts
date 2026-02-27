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

// 全部品牌数据的类型
export type Records = Trademark[]

// 获取全部已有品牌接口返回的数据类型
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
