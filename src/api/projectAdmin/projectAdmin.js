import axios from '@/libs/api.request'

/**
 * @param data 数据
 * @desc 获取项目列表
 */
export const getPageCus = (data) => {
  let params = new URLSearchParams()
  params.append('pageNum', 1)
  return axios.request({
    url: 'getPageCus',
    data: params,
    method: 'post'
  })
}

/**
 * 查询与改顾客订单有关的所有项目
 * @param cusId	顾客id
 */
export const getCusProject = (cusId) => {
  let params = new URLSearchParams()
  params.append('cusId', cusId)
  return axios.request({
    url: 'getCusProject',
    data: params,
    method: 'post'
  })
}

/**
 * 查询与改顾客订单有关的所有套餐
 * @param cusId
 */
export const getCusSetMeal = (cusId) => {
  let params = new URLSearchParams()
  params.append('cusId', cusId)
  return axios.request({
    url: 'getCusSetMeal',
    data: params,
    method: 'post'
  })
}
