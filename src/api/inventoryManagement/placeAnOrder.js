import axios from '@/libs/api.request'
// 下单
export const getPageGoods = (pageNum, obj) => {
  let params = new URLSearchParams()
  params.append('pageNum', pageNum)
  if (obj.length !== 0) params.append('obj', JSON.stringify(obj))
  return axios.request({
    url: 'getPageGoods',
    data: params,
    method: 'post'
  })
}

/**
 * 分店下单
 * @param gId 商品id
 * @param amount 商品数量
 * @param gPrice 单价
 * @param catName 类别名称
 */
export const addTsGoodsOut = (stockObj, obj) => {
  let params = new URLSearchParams()
  params.append('stockObj', JSON.stringify(stockObj))
  return axios.request({
    url: 'addTsGoodsOut',
    data: params,
    method: 'post'
  })
}
