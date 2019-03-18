import axios from '@/libs/api.request'

/**
 * @description 获取单位列表
 */
export const getUnitList = () => {
  return axios.request({
    url: 'getPageGoodsUnit',
    method: 'post'
  })
}

/**
 *
 * @param name 名称
 * @description 添加单位
 */
export const addUnit = (name) => {
  let params = new URLSearchParams()
  params.append('unityname', name)

  return axios.request({
    url: 'addGoodsUnit',
    data: params,
    method: 'post'
  })
}

/**
 *
 * @param id 单位id
 * @description 删除单位
 */
export const deleteUnit = (id) => {
  let params = new URLSearchParams()
  params.append('ids', id)

  return axios.request({
    url: 'deleteGoodsUnit',
    data: params,
    method: 'post'
  })
}
