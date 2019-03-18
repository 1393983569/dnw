  import axios from '@/libs/api.request'

  /**
   * 分页查询套餐
   * @param pageNum 页码
   */
  export const getPageSetMeal = (pageNum, select) => {
    let params = new URLSearchParams()
    params.append('pageNum', pageNum)
    params.append(select.key, select.value)
    return axios.request({
      url: 'getPageSetMeal',
      data: params,
      method: 'post'
    })
  }

  // 查询折扣列表（无分页）
  export const getListDiscount = () => {
    return axios.request({
      url: 'getListDiscount',
      method: 'post'
    })
  }

  /**
   * 开套餐
   * @param obj 对象
   */
  export const addCusSetMeal = (obj) => {
    let params = new URLSearchParams()
    params.append('obj', JSON.stringify(obj))
    return axios.request({
      url: 'addOrder',
      data: params,
      method: 'post',
      // headers: {'Content-Type': 'application/json;charset=utf-8'}
    })
  }

  /**
   * 根据条件分页查询项目信息
   * @param pageNum 页码
   */
  export const getPageTsProject = (pageNum, select) => {
    let params = new URLSearchParams()
    params.append('pageNum', pageNum)
    if (select) params.append(select.key, select.value)
    return axios.request({
      url: 'getPageTsProject',
      data: params,
      method: 'post'
    })
  }

  /**
   * 根据条件分页查询商品信息
   * @param pageNum 页码
   */
  export const getPageGoods = (pageNum, select) => {
    let params = new URLSearchParams()
    params.append('pageNum', pageNum)
    if (select) params.append(select.key, select.value)
    return axios.request({
      url: 'getPageGoods',
      data: params,
      method: 'post'
    })
  }


  /**
   * 查询商品分类列表信息
   */
  export const getPageGoodsCategory = () => {
    return axios.request({
      url: 'getPageGoodsCategory',
      method: 'post'
    })
  }

  /**
   * 查询项目分类列表信息
   */
  export const getPageTsProjectCategory = () => {
    return axios.request({
      url: 'getPageTsProjectCategory',
      method: 'post'
    })
  }
  /**
   * 查询单位列表信息
   */
  export const getPageGoodsUnit = () => {
    return axios.request({
      url: 'getPageGoodsUnit',
      method: 'post'
    })
  }

  export const getPageOrder = (pageNum) => {
    let params = new URLSearchParams()
    params.append('pageNum', pageNum)
    return axios.request({
      url: 'getPageOrder',
      data: params,
      method: 'post'
    })
  }

  /**
   * 顾客预存金额
   * @param payObj 支付对象
   */
  export const addCusPrestore = (payObj) => {
    let params = new URLSearchParams()
    params.append('payObj', JSON.stringify(payObj))
    return axios.request({
      url: 'addCusPrestore',
      data: params,
      method: 'post'
    })
  }

  /**
   * 无分页查询预存类型
   */
  export const getListPrestore = () => {
    return axios.request({
      url: 'getListPrestore',
      method: 'post'
    })
  }

  /**
   * 不分页获取所有管理员信息
   */
  export const getAdminsInfo = () => {
    return axios.request({
      url: 'getAdminsInfo',
      method: 'post'
    })
  }

  /**
   * 查询咨讯类别列表
   */
  export const getPageConsult = () => {
    return axios.request({
      url: 'getPageConsult',
      method: 'post'
    })
  }

  /**
   * 查询顾客来源列表
   */
  export const getPageCusFrom = () => {
    return axios.request({
      url: 'getPageCusFrom',
      method: 'post'
    })
  }
