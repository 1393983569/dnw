// 此接口只用于详情
import axios from '@/libs/api.request'

/**
 * 查询店铺日结和月结单
 */
export const statisticStatement = (shopId, dayTime, sign) => {
  let params = new URLSearchParams()
  if (dayTime) params.append('dayTime', dayTime)
  if (shopId) params.append('shopId', shopId)
  if (sign) params.append('sign', 1)
  return axios.request({
    url: 'statisticStatement',
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
