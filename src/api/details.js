// 此接口只用于详情
import axios from '@/libs/api.request'

/**
 * @param {String} api 获得详情的接口
 */
export const getDetails = (api, id) => {
  let params = new URLSearchParams()
  params.append('id', id)
  return axios.request({
    url: api,
    data: params,
    method: 'post'
  })
}

/**
 * @param {String} api 提交详情的接口
 */
export const setDetails = (api, title, content, id) => {
  let params = new URLSearchParams()
  params.append('content', content)
  params.append('title', title)
  params.append('id', id)
  return axios.request({
    url: api,
    data: params,
    method: 'post'
  })
}
/**
 *  导出
 * @param {*} id 唯一标识
 */
export const downloadDoc = (id) => {
  let params = new URLSearchParams()
  params.append('id', id)
  return axios.request({
    url: 'downloadDoc',
    data: params,
    method: 'post'
  })
}
