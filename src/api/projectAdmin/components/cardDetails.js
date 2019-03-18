import axios from '@/libs/api.request'

/**
 * 单项目划卡的日志
 * @param pId 顾客的项目id
 * @param pageNum
 */
export const getCusHkInfo = (pageNum, pId, csmId) => {
  let params = new URLSearchParams()
  params.append('pageNum', pageNum)
  if (csmId) {
    params.append('type', 2)
    params.append('csmId', pId)
    params.append('proId', csmId)
  } else {
    params.append('type', 1)
    params.append('pId', pId)
  }
  return axios.request({
    url: 'getCusHkInfo',
    data: params,
    method: 'post'
  })
}
