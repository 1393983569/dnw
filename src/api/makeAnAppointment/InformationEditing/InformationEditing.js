import axios from '@/libs/api.request'

// 管理员添加
export const addCustomer = (data) => {
  let params = new URLSearchParams()
  if (data.cusAge) params.append('cusAge', data.cusAge)
  if (data.cusName) params.append('cusName', data.cusName)
  if (data.cusBirthday) params.append('cusBirthday', data.cusBirthday)
  if (data.cusPhone1) params.append('cusPhone1', data.cusPhone1)
  if (data.cusPhone2) params.append('cusPhone2', data.cusPhone2)
  if (data.cusGender) params.append('cusGender', data.cusGender)
  if (data.constellation) params.append('cusConstellation', data.constellation)
  if (data.cusWechat) params.append('cusWechat', data.cusWechat)
  if (data.cusQq) params.append('cusQq', data.cusQq)
  if (data.cusFrom) params.append('cusFrom', data.cusFrom)
  if (data.client) params.append('client', data.client)
  if (data.orderNum) params.append('orderNum', data.orderNum)
  if (data.consultType) params.append('consultType', data.consultType)
  if (data.orderState) params.append('orderState', data.orderState)
  if (data.dealState) params.append('dealState', data.dealState)
  if (data.city) params.append('city', data.city)
  if (data.accountId) params.append('accountId', data.accountId)
  if (data.shopId) params.append('shopId', data.shopId)
  if (data.remark) params.append('remark', data.remark)
  if (data.vip) params.append('vip', data.vip)
  if (data.pay) params.append('pay', data.pay)
  if (data.cusId) params.append('cusId', data.cusId)
  if (data.remark) params.append('remark', data.remark)
  if (data.rePic) params.append('rePic', data.rePic)
  if (data.isMessage) params.append('isMessage', data.isMessage)
  if (data.appointTime) params.append('appointTime', data.appointTime)
  if (data.visitTime) params.append('visitTime', data.visitTime)
  if (data.isShop) params.append('isShop', data.isShop)
  if (data.consumeState) params.append('consumeState', data.consumeState)
  return axios.request({
    url: 'addCustomer',
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
export const getPageCus = (pageNum, cusName, cusPhone1, vTime, allState) => {
  let api = ''
  if (allState) {
    api = 'getAllCus'
  } else {
    api = 'getPageCus'
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
 *  分页获取用户信息
 * @param {String} pageNum 页码
 * @param {String} cusName 名字
 * @param {String} cusPhone1 电话
 * @param {Array} selecList 查询对象
 */
export const getPageCusSelect = (pageNum, cusName, cusPhone1, selecList) => {
  let api = 'getPageCus'
  let params = new URLSearchParams()
  if (cusName) params.append('cusName', cusName)
  if (cusPhone1) params.append('cusPhone1', cusPhone1)
  if (selecList.length !== 0) params.append('obj', JSON.stringify(selecList))
  // if (selecList.length !== 0) params.append('obj', selecList)
  params.append('pageNum', pageNum)
  return axios.request({
    url: api,
    data: params,
    method: 'post'
  })
}

/**
 * 查询顾客详情
 * @param {String} id 顾客id
 */
export const getCustomer = (id) => {
  let params = new URLSearchParams()
  params.append('id', id)
  return axios.request({
    url: 'getCustomer',
    data: params,
    method: 'post'
  })
}

/**
 *  修改顾客信息
 * @param {String} id
 */
export const updateCustomer = (data, id) => {
  let params = new URLSearchParams()
  if (data.cusAge) params.append('cusAge', data.cusAge)
  if (data.cusName) params.append('cusName', data.cusName)
  if (data.cusBirthday) params.append('cusBirthday', data.cusBirthday)
  if (data.cusPhone1) params.append('cusPhone1', data.cusPhone1)
  if (data.cusPhone2) params.append('cusPhone2', data.cusPhone2)
  if (data.cusGender) params.append('cusGender', data.cusGender)
  if (data.constellation) params.append('cusConstellation', data.constellation)
  if (data.cusWechat) params.append('cusWechat', data.cusWechat)
  if (data.cusQq) params.append('cusQq', data.cusQq)
  if (data.cusFrom) params.append('cusFrom', data.cusFrom)
  if (data.client) params.append('client', data.client)
  if (data.orderNum) params.append('orderNum', data.orderNum)
  if (data.consultType) params.append('consultType', data.consultType)
  if (data.orderState) params.append('orderState', data.orderState)
  if (data.dealState) params.append('dealState', data.dealState)
  if (data.city) params.append('city', data.city)
  if (data.accountId) params.append('accountId', data.accountId)
  if (data.shopId) params.append('shopId', data.shopId)
  if (data.remark) params.append('remark', data.remark)
  if (data.vip) params.append('vip', data.vip)
  if (data.pay) params.append('pay', data.pay)
  if (data.cusId) params.append('cusId', data.cusId)
  if (data.remark) params.append('remark', data.remark)
  if (data.rePic) params.append('rePic', data.rePic)
  if (data.isMessage) params.append('isMessage', data.isMessage)
  if (data.appointTime) params.append('appointTime', data.appointTime)
  if (data.visitTime) params.append('visitTime', data.visitTime)
  params.append('id', id)
  return axios.request({
    url: 'updateCustomer',
    data: params,
    method: 'post'
  })
}

/**
 * 签到
 * @param {String} cusId 顾客id
 */
export const addRecord = (cusId) => {
  let params = new URLSearchParams()
  params.append('cusId', cusId)
  return axios.request({
    url: 'addRecord',
    data: params,
    method: 'post'
  })
}

/**
 * 顾客预约
 * @param {String} id 顾客id
 * @param {String} appointTime 预约时间
 */
export const appointCus = (id, appointTime) => {
  let params = new URLSearchParams()
  params.append('id', id)
  params.append('appointTime', appointTime)
  return axios.request({
    url: 'appointCus',
    data: params,
    method: 'post'
  })
}

/**
 *
 * @param {String} id 顾客id
 */
export const appointDelCus = (id) => {
  let params = new URLSearchParams()
  params.append('id', id)
  return axios.request({
    url: 'appointDelCus',
    data: params,
    method: 'post'
  })
}

/**
 * 导出顾客信息
 * @param {Array} param
 */
export const cusExport = (param) => {
  let params = new URLSearchParams()
  params.append('param', param)
  return axios.request({
    url: 'cusExport',
    data: params,
    method: 'post'
  })
}
/**
 * 获取导出字段
 */
export const exportParam = () => {
  return axios.request({
    url: 'exportParam',
    method: 'post'
  })
}
/**
 * 分页查询与改顾客有关的所有备注
 * @param pageNum 当前页
 * @param cusId 顾客id
 */
export const getPageCusRemark = (pageNum, cusId) => {
  let params = new URLSearchParams()
  params.append('pageNum', pageNum)
  params.append('cusId', cusId)
  return axios.request({
    url: 'getPageCusRemark',
    data: params,
    method: 'post'
  })
}

/**
 * 添加备注
 * @param cusId 顾客id
 * @param remark 备注
 * @param rePic 图片
 */
export const addCusRemark = (cusId, remark, rePic) => {
  let params = new URLSearchParams()
  params.append('remark', remark)
  params.append('cusId', cusId)
  params.append('rePic', rePic)
  return axios.request({
    url: 'addCusRemark',
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

/**
 * 查询咨讯类别列表
 */
export const getPageConsult = () => {
  return axios.request({
    url: 'getPageConsult',
    method: 'post'
  })
}

/**
 * 查询顾客来源列表
 */
export const getPageCusFrom = () => {
  return axios.request({
    url: 'getPageCusFrom',
    method: 'post'
  })
}

/**
 * 分配美颜顾问
 * @param id 顾客id
 * @param accountId 美颜是id
 */
export const editCus = (id, accountId) => {
  let params = new URLSearchParams()
  params.append('id', id)
  params.append('accountId', accountId)
  return axios.request({
    url: 'editCus',
    data: params,
    method: 'post'
  })
}

/**
 * 不分页获取所有管理员信息
 */
export const getAdminsInfo = () => {
  return axios.request({
    url: 'getAdminsInfo',
    method: 'post'
  })
}
