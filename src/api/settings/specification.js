import axios from '@/libs/api.request'

/**
 * 查询规格列表
 */
export const getListSpec = () => {
  return axios.request({
    url: 'getListSpec',
    method: 'get'
  })
}

/**
 * 删除规格
 * @id 规格id
 */
export const register = (id) => {
  let params = new URLSearchParams()
  params.append('id', id)
  return axios.request({
    url: 'deleteSpec',
    data: params,
    method: 'post'
  })
}

/**
 * 添加规格
 * @id 规格id
 */
export const addSpec = (specName) => {
  console.log(specName)
  let params = new URLSearchParams()
  params.append('specName', specName)
  return axios.request({
    url: 'addSpec',
    data: params,
    method: 'post'
  })
}
