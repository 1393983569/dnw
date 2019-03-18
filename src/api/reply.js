import axios from '@/libs/api.request'
/**
 * @param {String} api 获得详情的接口
 */

// 分页查询案例信息
export const addReply = (reportId, replyContent) => {
  let params = new URLSearchParams()
  params.append('reportId', reportId)
  params.append('replyContent', replyContent)
  return axios.request({
    url: 'addReply',
    data: params,
    method: 'post'
  })
}

/**
 * @param {String} id 根据回复id获取回复详情
 */
export const getReplyById = (id) => {
  let params = new URLSearchParams()
  params.append('id', id)
  return axios.request({
    url: 'getReplyById',
    data: params,
    method: 'post'
  })
}
