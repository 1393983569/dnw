import axios from '@/libs/api.request'

/**
 * @description 获取客户来源列表
 */
export const getCustomerSourceList = () => {
  return axios.request({
    url: 'getPageCusFrom',
    method: 'get'
  })
}

/**
 *
 * @param name 名称
 * @description 添加客户来源
 */
export const addCustomerSource = (name) => {
  let params = new URLSearchParams()
  params.append('name', name)

  return axios.request({
    url: 'addCusFrom',
    data: params,
    method: 'post'
  })
}

/**
 *
 * @param id id
 * @description 删除客户来源
 */
export const deleteCustomerSource = (id) => {
  let params = new URLSearchParams()
  params.append('ids', id)

  return axios.request({
    url: 'deleteCusFrom',
    data: params,
    method: 'post'
  })
}

/**
 * @description 获取折扣列表
 */
export const getDiscountList = () => {
  return axios.request({
    url: 'getListDiscount',
    method: 'get'
  })
}

/**
 * @param num 折扣数
 * @description 添加折扣
 */
export const addDiscount = (num) => {
  let params = new URLSearchParams()
  params.append('discountNum', num)

  return axios.request({
    url: 'addDiscount',
    data: params,
    method: 'post'
  })
}

/**
 *
 * @param id id
 * @description 删除折扣
 */
export const deleteDiscount = (id) => {
  let params = new URLSearchParams()
  params.append('id', id)

  return axios.request({
    url: 'deleteDiscount',
    data: params,
    method: 'post'
  })
}

/**
 * @description 获取支付方式
 */
export const getPayWayList = () => {
  return axios.request({
    url: 'getPagePayFrom',
    method: 'get'
  })
}

/**
 *
 * @param name 支付方式
 * @description 添加支付方式
 */
export const addPayWay = (name) => {
  let params = new URLSearchParams()
  params.append('name', name)

  return axios.request({
    url: 'addPayFrom',
    data: params,
    method: 'post'
  })
}

/**
 *
 * @param id id
 * @description 删除支付方式
 */
export const deletePawWay = (id) => {
  let params = new URLSearchParams()
  params.append('ids', id)

  return axios.request({
    url: 'deletePayFrom',
    data: params,
    method: 'post'
  })
}

/**
 * @description 获取资讯类型
 */
export const getCosultingList = () => {
  return axios.request({
    url: 'getPageConsult',
    method: 'get'
  })
}

/**
 * @description 添加咨询类型
 * @param name 名字
 */
export const addCosulting = (name) => {
  let params = new URLSearchParams()
  params.append('name', name)

  return axios.request({
    url: 'addConsult',
    data: params,
    method: 'post'
  })
}

/**
 * @param id id
 * @description 删除咨询
 */
export const deleteCosulting = (id) => {
  let params = new URLSearchParams()
  params.append('ids', id)

  return axios.request({
    url: 'deleteConsult',
    data: params,
    method: 'post'
  })
}

/**
 * @description 获取预存方式
 */
export const getPreStoreList = (pageNum) => {
  let params = new URLSearchParams()
  params.append('pageNum', pageNum)
  return axios.request({
    url: 'getPagePrestore',
    data: params,
    method: 'post'
  })
}

/**
 * @description 添加预存方式
 * @param data 数据
 */
export const addPreStore = (data) => {
  let params = new URLSearchParams()
  let x
  for (x in data) {
    params.append(x, data[x])
  }

  return axios.request({
    url: 'addPrestore',
    data: params,
    method: 'post'
  })
}

/**
 * @param id id
 * @description 删除预存方式
 */
export const deletePreStore = (id) => {
  let params = new URLSearchParams()
  params.append('id', id)

  return axios.request({
    url: 'deletePrestore',
    data: params,
    method: 'post'
  })
}

/**
 * @param id id
 * @param data 数据
 * @description 删除预存方式
 */
export const modifyPreStore = (id, data) => {
  let params = new URLSearchParams()
  let x
  for (x in data) {
    params.append(x, data[x])
  }
  return axios.request({
    url: 'updatePrestore',
    data: params,
    method: 'post'
  })
}
