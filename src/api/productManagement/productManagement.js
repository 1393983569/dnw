import axios from '@/libs/api.request'

/**
 *
 * @param {Number} page
 * @description 分页查询产品列表
 */
export const getProductListByPage = (data) => {
  let params = new URLSearchParams()
  let name
  for (name in data) {
    params.append(name, data[name])
  }

  return axios.request({
    url: 'getPageGoods',
    data: params,
    method: 'post'
  })
}

/**
 * @param id id
 * @description 获取商品详情
 */
export const getProduct = (id) => {
  let params = new URLSearchParams()
  params.append('id', id)

  return axios.request({
    url: 'getGoods',
    data: params,
    method: 'post'
  })
}

/**
 *
 * @param id 产品id
 * @description 删除产品
 */
export const deleteProductById = (id) => {
  let params = new URLSearchParams()
  params.append('ids', id)

  return axios.request({
    url: 'deleteGoods',
    data: params,
    method: 'post'
  })
}

/**
 * @param data 数据
 * @description 添加商品
 */
export const addProduct = (data) => {
  let params = new URLSearchParams()
  let name
  for (name in data) {
    if (data[name]) params.append(name.toString(), data[name])
  }

  return axios.request({
    url: 'addGoods',
    data: params,
    method: 'post'
  })
}

/**
 *
 * @param id id
 * @param data 数据
 * @description 修改商品
 */
export const modifyProductById = (id, data) => {
  let params = new URLSearchParams()
  let name
  for (name in data) {
    if (data[name]) params.append(name.toString(), data[name])
  }
  params.append('id', id)
  return axios.request({
    url: 'updateGoods',
    data: params,
    method: 'post'
  })
}

/**
 *
 * @param id
 * @param status 状态 1上线 2下线
 * @returns
 */
export const openOrClosePro = (id, status) => {
  let params = new URLSearchParams()
  params.append('id', id)
  params.append('status', status)
  return axios.request({
    url: 'updateGoodsStatus',
    data: params,
    method: 'post'
  })
}

/**
 *@description 查询分类列表
 */
export const getCateList = () => {
  return axios.request({
    url: 'getPageGoodsCategory',
    method: 'get'
  })
}

/**
 * @param name
 * @description 添加类别
 */
export const addCate = (name) => {
  let params = new URLSearchParams()
  params.append('name', name)
  return axios.request({
    url: 'addGoodsCategory',
    data: params,
    method: 'post'
  })
}

/**
 * @param id
 * @description 删除类别
 */
export const deleteCate = (id) => {
  let params = new URLSearchParams()
  params.append('ids', id)
  return axios.request({
    url: 'deleteGoodsCategory',
    data: params,
    method: 'post'
  })
}

/**
 * @param id
 * @param name
 * @description 修改类别
 */
export const modifyCate = (id, name) => {
  let params = new URLSearchParams()
  params.append('id', id)
  params.append('name', name)
  return axios.request({
    url: 'updateGoodsCategory',
    data: params,
    method: 'post'
  })
}
