// 此接口只用于详情
import axios from '@/libs/api.request'

/**
 * 根据时间段和消费区间统计顾客信息
 */
export const statisticCus = (pageNum, shopId, startTime, endTime, startPrice, endPrice) => {
  let params = new URLSearchParams()
  if (shopId) params.append('shopId', shopId)
  if (pageNum) params.append('pageNum', pageNum)
  if (startTime) params.append('startTime', startTime)
  if (endTime) params.append('endTime', endTime)
  if (startPrice) params.append('startPrice', startPrice * 100)
  if (endPrice) params.append('endPrice', endPrice * 100)
  return axios.request({
    url: 'statisticCus',
    data: params,
    method: 'post'
  })
}

/**
 * 无分页查询店铺
 */
export const getListShop = () => {
  return axios.request({
    url: 'getListShop',
    method: 'post'
  })
}
