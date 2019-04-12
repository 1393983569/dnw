// 此接口只用于详情
import axios from '@/libs/api.request'

/**
 * 根据时间段和消费区间统计顾客信息
 */
export const statisticCusRecord = (id) => {
  let params = new URLSearchParams()
  params.append('id', id)
  return axios.request({
    url: 'statisticCusRecord',
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
