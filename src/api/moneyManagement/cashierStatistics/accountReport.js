import axios from '@/libs/api.request'
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
 * 导出结算报表
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
 * 统计结算报表
 * @param { String } startTime 开始统计时间
 * @param { String } endTime  统计结束时间
 */
export const getSummary = (startTime, endTime) => {
  let params = new URLSearchParams()
  params.append('startTime', startTime)
  params.append('endTime', endTime)
  return axios.request({
    url: 'getSummary',
    data: params,
    method: 'post'
  })
}
