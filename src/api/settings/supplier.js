import axios from '@/libs/api.request'

/**
 *
 * @param name 名称
 * @description 添加客户来源
 */
export const addSupplier = (name, phone) => {
  let params = new URLSearchParams()
  params.append('name', name)
  params.append('phone', phone)
  return axios.request({
    url: 'addSupplier',
    data: params,
    method: 'post'
  })
}

/**
 * 删除供应商信息
 * @param id
 */
export const deleteSupplier = (id) => {
  let params = new URLSearchParams()
  params.append('id', id)
  return axios.request({
    url: 'deleteSupplier',
    data: params,
    method: 'post'
  })
}

/**
 * 查询供应商列表
 */
export const getListSupplier = () => {
  return axios.request({
    url: 'getListSupplier',
    method: 'post'
  })
}
