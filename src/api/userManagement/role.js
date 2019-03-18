import axios from '@/libs/api.request'

// 分页获取角色信息
export const getPageRoles = (pageNum, roleTitle) => {
  let params = new URLSearchParams()
  params.append('pageNum', pageNum)
  if (roleTitle) params.append('roleTitle', roleTitle)
  return axios.request({
    url: 'getPageRoles',
    data: params,
    method: 'post'
  })
}

/**
 * 无分页获取已拥有角色信息 管理员
 * @param {String} accountId
 */
export const getRoles = (accountId) => {
  let params = new URLSearchParams()
  params.append('accountId', accountId)
  return axios.request({
    url: 'getRoles',
    data: params,
    method: 'post'
  })
}

/**
 * 分页获取全部角色信息 管理员
 */
export const getRolesAlreadyHave = () => {
  let params = new URLSearchParams()
  params.append('available', 1)
  return axios.request({
    url: 'getRoles',
    data: params,
    method: 'post'
  })
}

/**
 * 分页获取角色已有权限 角色
 * @param {String} roleId
 */
export const getNotPermissionsNoPage = (roleId) => {
  let params = new URLSearchParams()
  params.append('roleId', roleId)
  return axios.request({
    url: 'getPermissionsNoPage',
    data: params,
    method: 'post'
  })
}

/**
 * 分页获取角色所有权限 角色
 */
export const getPermissionsNoPage = () => {
  let params = new URLSearchParams()
  params.append('available', 1)
  params.append('name', '权限')
  return axios.request({
    url: 'getPermissionsNoPage',
    data: params,
    method: 'post'
  })
}

// 角色添加
export const addRole = (roleTitle, roleMark) => {
  let params = new URLSearchParams()
  params.append('roleTitle', roleTitle)
  params.append('available', 1)
  params.append('roleMark', roleMark)
  return axios.request({
    url: 'addRole',
    data: params,
    method: 'post'
  })
}

// 角色删除
export const changeRoleState = (id) => {
  let params = new URLSearchParams()
  params.append('id', id)
  return axios.request({
    url: 'changeRoleState',
    data: params,
    method: 'post'
  })
}

/**
 *  添加角色权限
 * @param {String} id
 * @param {String} ids
 */
export const updateRole = (id, ids) => {
  let params = new URLSearchParams()
  params.append('id', id)
  params.append('ids', ids)
  return axios.request({
    url: 'updateRole',
    data: params,
    method: 'post'
  })
}
/**
 * 添加管理员角色
 * @param {String} id
 * @param {String} ids
 */
export const updateAdmin = (id, ids) => {
  let params = new URLSearchParams()
  params.append('id', id)
  params.append('ids', ids)
  return axios.request({
    url: 'updateAdmin',
    data: params,
    method: 'post'
  })
}

/**
 * 查询所有模块
 */
export const getModuleNoPage = () => {
  return axios.request({
    url: 'getModuleNoPage',
    method: 'post'
  })
}

/**
 * 查询所有模块
 */
export const getModuleNoPageRoleId = (roleId) => {
  let params = new URLSearchParams()
  if (roleId) params.append('roleId', roleId)
  return axios.request({
    url: 'getModuleNoPage',
    data: params,
    method: 'post'
  })
}

/**
 * 给角色分配模块
 * @param id 角色id
 * @param ids 模块ids
 */
export const updateRoleModule = (id, ids) => {
  let params = new URLSearchParams()
  params.append('id', id)
  params.append('ids', ids)
  return axios.request({
    url: 'updateRoleModule',
    data: params,
    method: 'post'
  })
}

/**
 * 权限设置
 * @param obj
 * @param id
 */
export const getModuleTree = (id, obj) => {
  let params = new URLSearchParams()
  params.append('obj', JSON.stringify(obj))
  params.append('roleId', id)
  return axios.request({
    url: 'updateRoleMenu',
    data: params,
    method: 'post'
  })
}

/**
 * 查询角色的菜单
 * @param id 	角色id
 */
export const getRoleMenu = (id) => {
  let params = new URLSearchParams()
  params.append('roleId', id)
  return axios.request({
    url: 'getRoleMenu',
    data: params,
    method: 'post'
  })
}
