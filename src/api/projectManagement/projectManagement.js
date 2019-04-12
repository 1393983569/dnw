import axios from '@/libs/api.request'

/**
 * @param data 数据
 * @desc 获取项目列表
 */
export const getProlistByPage = (data) => {
  let params = new URLSearchParams()
  // for (let name in data) {
  //   if (data[name]) params.append(name + '', data[name])
  // }
  if (data.title) params.append('title', data.title)
  params.append('pageNum', data.pageNum)
  return axios.request({
    url: 'getPageTsProject',
    data: params,
    method: 'post'
  })
}

/**
 *
 * @param data 查询数据
 * @description 查询全部的项目列表
 */
export const getAllProList = (data, obj) => {
  let params = new URLSearchParams()
  let name
  for (name in data) {
    params.append(name, data[name])
  }
  params.append('status', 0)
  if (obj.length !== 0) {
    params.append('obj', JSON.stringify(obj))
  }
  return axios.request({
    url: 'getPageTsProject',
    // url: 'getPageAllProject',
    data: params,
    method: 'post'
  })
}

/**
 *
 * @param data 数据
 * @desc 添加项目
 */
export const addProject = (data) => {
  let params = new URLSearchParams()
  params.append('content', data)
  return axios.request({
    url: 'addTsProject',
    data: params,
    method: 'post'
  })
}

/**
 *
 * @param id id
 * @param data 数据
 * @description 修改项目
 */
export const modifyProject = (id, data) => {
  let params = new URLSearchParams()
  params.append('id', id)
  params.append('content', data)
  return axios.request({
    url: 'updateTsProject',
    data: params,
    method: 'post'
  })
}

/**
 *
 * @param id 项目id
 * @description 获取项目详情
 */
export const getProDetail = (id) => {
  let params = new URLSearchParams()
  params.append('id', id)
  return axios.request({
    url: 'getTsProject',
    data: params,
    method: 'post'
  })
}

/**
 *
 * @param id 项目id
 * @description 删除项目
 */
export const deletePro = (id) => {
  let params = new URLSearchParams()
  params.append('ids', id)
  return axios.request({
    url: 'deleteTsProject',
    data: params,
    method: 'post'
  })
}

/**
 *
 * @param id id
 * @param status 状态 1 正常 2 下架
 * @description 修改状态
 */
export const modifyProStatus = (id, status) => {
  let params = new URLSearchParams()
  params.append('id', id)
  params.append('status', status)
  return axios.request({
    url: 'updateTsProjectStatus',
    data: params,
    method: 'post'
  })
}

/**
 * @description 获取项目分类
 */
export const getProCateList = () => {
  return axios.request({
    url: 'getPageTsProjectCategory',
    method: 'get'
  })
}

/**
 *
 * @param id
 * @returns 删除项目分类
 */
export const delProCateById = (id) => {
  let params = new URLSearchParams()
  params.append('ids', id)
  return axios.request({
    url: 'deleteTsProjectCategory',
    data: params,
    method: 'post'
  })
}

/**
 *
 * @param name
 * @returns 添加项目分类
 */
export const addProCate = (name) => {
  let params = new URLSearchParams()
  params.append('name', name)
  return axios.request({
    url: 'addTsProjectCategory',
    data: params,
    method: 'post'
  })
}

/**
 *
 * @param id id
 * @param name 名称
 * @description 修改项目分类
 */
export const modifyProCate = (id, name) => {
  let params = new URLSearchParams()
  params.append('id', id)
  params.append('name', name)
  return axios.request({
    url: 'updateTsProjectCategory',
    data: params,
    method: 'post'
  })
}

/**
 * 下载导入项目的模板
 */
export const downloadTemplateOfProject = () => {
  return axios.request({
    url: 'downloadTemplateOfProject',
    method: 'post'
  })
}
