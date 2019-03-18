import axios from '@/libs/api.request'

// 得到一级
export const getProvinceList = () => {
  return axios.request({
    url: 'getProvinceList',
    method: 'post'
  })
}

/**
 * 得到市
 * @param {String} 省id
 */
export const getCityList = (value) => {
  let params = new URLSearchParams()
  params.append('provinceId', value)
  return axios.request({
    url: 'getCityList',
    data: params,
    method: 'post'
  })
}

/**
 * 得到区
 * @param {String} 市id
 */
export const getAreaList = (cityId) => {
  let params = new URLSearchParams()
  params.append('cityId', cityId)
  return axios.request({
    url: 'getAreaList',
    data: params,
    method: 'post'
  })
}
