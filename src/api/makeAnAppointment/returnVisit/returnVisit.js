import axios from '@/libs/api.request'

/**
 * 分页查询回访计划
 * @param {String} cusId 顾客id
 * @param {String} pageNum 页码
 */
export const getPageCusVisit = (cusId, pageNum, getPageCusVisit) => {
  let params = new URLSearchParams()
  params.append('cusId', cusId)
  params.append('pageNum', pageNum)
  params.append('visitState', getPageCusVisit)
  return axios.request({
    url: 'getPageCusVisit',
    data: params,
    method: 'post'
  })
}
/**
 * 添加回访计划
 * @param {String} cusId 顾客id
 * @param {String} purpose 回访目的
 * @param {String} createTime 回访时间
 */
export const addCusVisit = (cusId, purpose, createTime) => {
  let params = new URLSearchParams()
  params.append('cusId', cusId)
  params.append('purpose', purpose)
  params.append('createTime', createTime)
  return axios.request({
    url: 'addCusVisit',
    data: params,
    method: 'post'
  })
}
/**
 * 删除回访计划
  * @param {String} ids 回访表id
 */
export const deleteCusVisit = (ids) => {
  let params = new URLSearchParams()
  params.append('ids', ids)
  return axios.request({
    url: 'deleteCusVisit',
    data: params,
    method: 'post'
  })
}

/**
 *
 * @param {String} id 回访表id
 * @param {String} result 回访结果
 */
export const updateCusVisit = (id, result) => {
  let params = new URLSearchParams()
  params.append('id', id)
  params.append('result', result)
  return axios.request({
    url: 'updateCusVisit',
    data: params,
    method: 'post'
  })
}

/**
 * 顾客转移
 * @param {String} id 顾客id
 * @param {String} accountId 管理员id
 */
export const updateCustomer = (accountId, startTime, endTime, isShop, cusName, cusPhone1) => {
  let params = new URLSearchParams()
  params.append('accountId', accountId)
  if (startTime) params.append('startTime', startTime)
  if (endTime) params.append('endTime', endTime)
  if (isShop) params.append('isShop', isShop)
  if (cusName) params.append('cusName', cusName)
  if (cusPhone1) params.append('cusPhone1', cusPhone1)
  return axios.request({
    url: 'customerMove',
    data: params,
    method: 'post'
  })
}

/**
 *  分页获取用户信息
 * @param {String} pageNum 页码
 * @param {String} cusName 名字
 * @param {String} cusPhone1 电话
 */
export const getPageCus2 = (pageNum, cusName, cusPhone1, vTime, allState) => {
  let api = ''
  if (allState) {
    api = 'getAllCus'
  } else {
    api = 'getPageCus2'
  }
  let params = new URLSearchParams()
  if (cusName) params.append('cusName', cusName)
  if (cusPhone1) params.append('cusPhone1', cusPhone1)
  if (vTime) params.append('vTime', 1)
  params.append('pageNum', pageNum)
  return axios.request({
    url: api,
    data: params,
    method: 'post'
  })
}

/**
 *  分页获取用户信息 顾客转移专用
 * @param {String} pageNum 页码
 * @param {String} cusName 名字
 * @param {String} cusPhone1 电话
 */
export const getPageCusTransfer = (pageNum, cusName, cusPhone1, vTime, startTime, endTime, isShop) => {
  let api = ''
  let params = new URLSearchParams()
  if (cusName) params.append('cusName', cusName)
  if (cusPhone1) params.append('cusPhone1', cusPhone1)
  if (startTime) params.append('startTime', startTime)
  if (endTime) params.append('endTime', endTime)
  if (isShop) params.append('isShop', isShop)
  if (vTime) params.append('vTime', 1)
  params.append('pageNum', pageNum)
  return axios.request({
    url: 'getPageCus2',
    data: params,
    method: 'post'
  })
}
