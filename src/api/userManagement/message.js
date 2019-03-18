import axios from '@/libs/api.request'

// 管理员添加
export const addAdmin = (data) => {
  let params = new URLSearchParams()
  params.append('accountName', data.accountName)
  params.append('accountPass', data.accountPass)
  params.append('accountTitle', data.accountTitle)
  params.append('accountPhone', data.accountPhone)
  params.append('accountJob', data.accountJob)
  params.append('roleId', data.roleId)
  return axios.request({
    url: 'addAdmin',
    data: params,
    method: 'post'
  })
}

// 根据id删除案例信息
export const getAdmins = (pageNum, accountTitle, accountJob, shopId) => {
  let params = new URLSearchParams()
  params.append('pageNum', pageNum)
  if (accountTitle) params.append('accountTitle', accountTitle)
  if (accountJob) params.append('accountJob', accountJob)
  if (shopId) params.append('shopId', shopId)
  return axios.request({
    url: 'getAdmins',
    data: params,
    method: 'post'
  })
}

/**
 *  删除管理员
 * @param {String} id
 */
export const changeAdminState = (id) => {
  let params = new URLSearchParams()
  params.append('id', id)
  return axios.request({
    url: 'changeAdminState',
    data: params,
    method: 'post'
  })
}
/**
 * 不分页获取所有管理员信息
 */
export const getAdminsInfo = () => {
  let params = new URLSearchParams()
  return axios.request({
    url: 'getAdminsInfo',
    data: params,
    method: 'post'
  })
}

/**
 * 无分页获取未拥有角色信息
 */
export const getRoles = () => {
  return axios.request({
    url: 'getRoles',
    method: 'post'
  })
}

/**
 * 无分页查询店铺
 */
export const getListShop = () => {
  return axios.request({
    url: 'getListShop',
    method: 'post'
  })
}

/**
 * 分配管理员店铺
 * @param accountId 管理员id
 * @param shopId 店铺id
 */
export const changeAdminShop = (accountId, shopId) => {
  let params = new URLSearchParams()
  params.append('accountId', accountId)
  params.append('shopId', shopId)
  return axios.request({
    url: 'changeAdminShop',
    data: params,
    method: 'post'
  })
}

/**
 * 查询咨询
 */
export const getZiXunOfShop = () => {
  return axios.request({
    url: 'getZiXunOfShop',
    method: 'post'
  })
}

/**
 * 修改密码
 * @param id 管理员id
 * @param newPassword 新密码
 */
export const changePassword = (id, newPassword) => {
  let params = new URLSearchParams()
  params.append('id', id)
  params.append('newPassword', newPassword)
  return axios.request({
    url: 'changePassword',
    data: params,
    method: 'post'
  })
}
