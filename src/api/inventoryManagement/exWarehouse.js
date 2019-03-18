import axios from '@/libs/api.request'

/**
 * 总店，分页查询所有下单信息
 * @param pageNum 当前页数
 * @param shopId 要查询的店铺id
 */
export const getPageTsGoodsOutOfInfoMain = (pageNum, shopName) => {
  let params = new URLSearchParams()
  params.append('pageNum', pageNum)
  params.append('shopName', shopName)
  return axios.request({
    url: 'getPageTsGoodsOutOfInfoMain',
    data: params,
    method: 'post'
  })
}

/**
 * 总库确认出库
 * @param id 订单id
 */
export const confirmOutStock = (id) => {
  let params = new URLSearchParams()
  params.append('id', id)
  return axios.request({
    url: 'confirmOutStock',
    data: params,
    method: 'post'
  })
}

/**
 * 查询详情
 * @param pageNum 页数
 * @param id 订单id
 */
export const getTsGoodsOutOfInfo = (pageNum, id) => {
  let params = new URLSearchParams()
  params.append('pageNum', pageNum)
  params.append('id', id)
  return axios.request({
    url: 'getTsGoodsOutOfInfo',
    data: params,
    method: 'post'
  })
}
