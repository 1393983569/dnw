import axios from '@/libs/api.request'

// 统计各年龄段的人数
export const getCountByAge = () => {
  return axios.request({
    url: 'getCountByAge',
    method: 'post'
  })
}

// 统计各个来源渠道的人数
export const getCusCount = () => {
  let params = new URLSearchParams()
  params.append('param', 'cusFrom')
  return axios.request({
    url: 'getCusCount',
    data: params,
    method: 'post'
  })
}
