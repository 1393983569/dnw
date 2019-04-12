// 此接口只用于详情
import axios from '@/libs/api.request'

/**
 * 查询店铺日结和月结单
 */
export const statisticScale = (shopId) => {
  let params = new URLSearchParams()
  if (shopId) params.append('shopId', shopId)
  return axios.request({
    url: 'statisticScale',
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
