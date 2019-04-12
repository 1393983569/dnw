import axios from '@/libs/api.request'

export const getLogs = (pageNum, startTime, endTime) => {
  let params = new URLSearchParams()
  params.append('pageNum', pageNum)
  if (startTime) params.append('startTime', startTime)
  if (endTime) params.append('endTime', endTime)
  return axios.request({
    url: 'getLogs',
    data: params,
    method: 'post'
  })
}
