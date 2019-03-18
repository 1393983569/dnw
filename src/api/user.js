import axios from '@/libs/api.request'

export const login = ({ userName, password }) => {
  let params = new URLSearchParams()
  params.append('accountName', userName)
  params.append('accountPass', password)
  return axios.request({
    url: 'login',
    data: params,
    method: 'post'
  })
}

export const getUserInfo = (token) => {
  return axios.request({
    url: 'getAccountInfo',
    params: {
      token
    },
    method: 'get'
  })
}

export const logout = (token) => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}

/**
 * 统计回访人数
 * @param people
 */
export const getCusVisitCount = (people) => {
  return axios.request({
    url: 'getCusVisitCount',
    method: 'post'
  })
}
