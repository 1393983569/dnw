import axios from '@/libs/api.request'

/**
 * 分页查询订单详情
 * @param { String } pageNum 页码
 * @param { String } orderNum  订单号
 * @param { String } createTime  开单时间
 * @param { String } cusName  顾客姓名
 * @param { String } cusGender  性别
 * @param { String } cusPhone1 电话
 */
export const getPageOrder = (pageNum, orderNum, createTime, cusName, cusGender, cusPhone1) => {
  let params = new URLSearchParams()
  if (cusName) params.append('cusName', cusName)
  if (createTime) params.append('createTime', createTime)
  if (cusGender) params.append('cusGender', cusGender)
  if (cusPhone1) params.append('cusPhone1', cusPhone1)
  if (orderNum) params.append('orderNum', orderNum)
  params.append('pageNum', pageNum)
  return axios.request({
    url: 'getPageOrder',
    data: params,
    method: 'post'
  })
}

/**
 * 获取订单详情
 * @param {String } id 订单ID
 * @param {String } cusId 顾客ID
 */
export const getOrder = (id, cusId) => {
  let params = new URLSearchParams()
  if (cusId) params.append('cusId', cusId)
  params.append('id', id)
  return axios.request({
    url: 'getOrder',
    data: params,
    method: 'post'
  })
}
/**
 * 查询退单
 * @param { String } id 退单id
 * @param { String } type
 */
export const getOrderType = (id, type) => {
  let params = new URLSearchParams()
  if (type) params.append('type', type)
  params.append('id', id)
  return axios.request({
    url: 'getOrder',
    data: params,
    method: 'post'
  })
}

/**
 * 获取顾客预存信息
 * @param { String } id 预存表ID
 */
export const getCusPrestore = (cusId, sign) => {
  let params = new URLSearchParams()
  params.append('cusId', cusId)
  params.append('sign', sign)
  return axios.request({
    url: 'getCusPrestore',
    data: params,
    method: 'post'
  })
}

/**
 * 查询顾客的还款单详情
 * @param { String } cusId 顾客id
 * @param { String } sign 还款单号
 */
export const getCusRePayMent = (cusId, sign) => {
  let params = new URLSearchParams()
  params.append('cusId', cusId)
  params.append('sign', sign)
  return axios.request({
    url: 'getCusRePayMent',
    data: params,
    method: 'post'
  })
}
