// 此接口只用于详情
import axios from '@/libs/api.request'

/**
 * 成交项目分类统计
 */
export const proStatistic = (shopId, startTime, endTime) => {
  let params = new URLSearchParams()
  if (shopId) params.append('shopId', shopId)
  if (startTime) params.append('startTime', startTime)
  if (endTime) params.append('endTime', endTime)
  return axios.request({
    url: 'proStatistic',
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
