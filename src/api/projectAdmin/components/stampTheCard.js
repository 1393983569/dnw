import axios from '@/libs/api.request'

/**
 * @param data 数据
 * @desc 获取项目列表
 */
export const getProlistByPage = (data) => {
  let params = new URLSearchParams()
  let name
  for (name in data) {
    params.append(name, data[name])
  }

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
export const getAllProList = (data) => {
  let params = new URLSearchParams()
  let name
  for (name in data) {
    params.append(name, data[name])
  }

  return axios.request({
    url: 'getPageAllProject',
    data: params,
    method: 'post'
  })
}

/**
 * 根据id查询项目信息
 * @param id 项目id
 */
export const getTsProject = (id) => {
  let params = new URLSearchParams()
  params.append('id', id)
  return axios.request({
    url: 'getCusProSteps',
    data: params,
    method: 'post'
  })
}

/**
 * 查询套餐详情
 * @param id	套餐id
 */
export const getSetMeal = (id) => {
  let params = new URLSearchParams()
  params.append('id', id)
  return axios.request({
    url: 'getCusMealPro',
    data: params,
    method: 'post'
  })
}

export const getAdminsInfo = () => {
  return axios.request({
    url: 'getAdminsInfo',
    method: 'post'
  })
}

/**
 * 查询顾客套餐项目中的步骤和次数
 * @param csmId 顾客套餐id
 * @param pId	项目id
 */
export const getCusSetMealProSteps = (csmId, pId) => {
  let params = new URLSearchParams()
  params.append('csmId', csmId)
  params.append('pId', pId)
  return axios.request({
    url: 'getCusSetMealProSteps',
    data: params,
    method: 'post'
  })
}

/**
 * 划卡，分配美容师
 * @param steps obj
 */
export const addCreatorToStep = (steps) => {
  let params = new URLSearchParams()
  console.log(steps)
  params.append('steps', JSON.stringify({steps: steps}))
  return axios.request({
    url: 'addCreatorToStep',
    data: params,
    method: 'post'
  })
}

/**
 *  分页获取用户信息
 * @param {String} pageNum 页码
 * @param {String} cusName 名字
 * @param {String} cusPhone1 电话
 */
export const getPageCus = (pageNum, cusName, cusPhone1) => {
  let params = new URLSearchParams()
  if (cusName) params.append('cusName', cusName)
  if (cusPhone1) params.append('cusPhone1', cusPhone1)
  params.append('pageNum', pageNum)
  params.append('hkState', 1)
  return axios.request({
    url: 'getPageCus',
    data: params,
    method: 'post'
  })
}
