import axios from '@/libs/api.requestQiniu'

export const getKey = () => {
  return axios.request({
    url: 'admin/getQiNiuToken',
    method: 'post'
  })
}
