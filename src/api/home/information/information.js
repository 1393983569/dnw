import axios from '@/libs/api.request'

// 统计各个总人数
export const getCusCount = () => {
  return axios.request({
    url: 'getCusCount',
    method: 'post'
  })
}
