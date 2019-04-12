import axios from '@/libs/api.request'

/**
 * 根据条件统计顾客数量
 */
export const getCusCount = (shopId, startTime, endTime) => {
  let params = new URLSearchParams()
  if (shopId) params.append('shopId', shopId)
  if (startTime) params.append('startTime', startTime)
  if (endTime) params.append('endTime', endTime)
  return axios.request({
    url: 'getCusCount2',
    data: params,
    method: 'post'
  })
}

/**
 * 查询店铺日结和月结单
 */
export const getSummary = (shopId, startTime, endTime) => {
  let params = new URLSearchParams()
  if (shopId) params.append('shopId', shopId)
  if (startTime) params.append('startTime', startTime)
  if (endTime) params.append('endTime', endTime)
  return axios.request({
    url: 'getSummary',
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
