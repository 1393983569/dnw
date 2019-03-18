import axios from '@/libs/api.request'

/**
 * 导出收银统计表
 * @param { String } startTime 开始时间
 * @param { String } endTime 结束时间
 * @param { String } cusName 姓名
 * @param { String } cusGender 性别
 * @param { String } phone 电话
 */
export const shopStatisticExport = (startTime, endTime, cusName, cusGender, phone) => {
  let params = new URLSearchParams()
  if (startTime) params.append('startTime', startTime)
  if (endTime) params.append('endTime', endTime)
  if (cusName) params.append('cusName', cusName)
  if (cusGender) params.append('cusGender', cusGender)
  if (phone) params.append('phone', phone)
  return axios.request({
    url: 'shopStatisticExport',
    data: params,
    method: 'post'
  })
}

/**
 * 分页获取收银信息
 * @param { String } pageNum 页码
 * @param { String } cusName  顾客姓名
 * @param { String } cusGender  性别
 * @param { String } cusPhone  联系方式
 */
export const getPageCus = (pageNum, cusName, cusGender, cusPhone) => {
  let params = new URLSearchParams()
  if (cusName) params.append('cusName', cusName)
  if (cusGender) params.append('cusGender', cusGender)
  if (cusPhone) params.append('cusPhone', cusPhone)
  params.append('pageNum', pageNum)
  return axios.request({
    url: 'getPageCus',
    data: params,
    method: 'post'
  })
}

/**
 * 店铺统计
 * @param { String } pageNum 页码
 * @param { String } cusName  顾客姓名
 * @param { String } cusGender  性别
 * @param { String } cusPhone  联系方式
 * @param { String } startTime 开始时间
 * @param { String } endTime 结束时间
 */
export const shopStatistic = (pageNum, startTime, endTime, cusName, cusGender, phone) => {
  let params = new URLSearchParams()
  if (startTime) params.append('startTime', startTime)
  if (endTime) params.append('endTime', endTime)
  if (cusName) params.append('cusName', cusName)
  if (cusGender) params.append('cusGender', cusGender)
  if (phone) params.append('phone', phone)
  params.append('pageNum', pageNum)
  return axios.request({
    url: 'shopStatistic',
    data: params,
    method: 'post'
  })
}
