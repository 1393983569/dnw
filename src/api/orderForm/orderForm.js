  import axios from '@/libs/api.request'

  /**
   * 分页查询订单
   * @param pageNum 页码
   * @param {Obj} select 查询条件对象
   * @param {Obj} date 查询时间对象
   */
  export const getPageOrder = (pageNum, select, date) => {
    let params = new URLSearchParams()
    params.append('pageNum', pageNum)
    if (select.key) params.append(select.key, select.value)
    if (date) {
      params.append('startTime', date.startTime)
      params.append('endTime', date.endTime)
    }
    return axios.request({
      url: 'getPageOrder',
      data: params,
      method: 'post'
    })
  }

  /**
   * 查询订单详情
   * @param id 订单id
   */
  export const getOrder = (id) => {
    let params = new URLSearchParams()
    params.append('id', id)
    return axios.request({
      url: 'getOrder',
      data: params,
      method: 'post'
    })
  }

  /**
   * 查询支付来源列表
   */
  export const getPagePayFrom = () => {
    return axios.request({
      url: 'getPagePayFrom',
      method: 'post'
    })
  }

  /**
   * 订单支付
   * @param obj 数据对象
   */
  export const orderPay = (obj) => {
    let params = new URLSearchParams()
    params.append('payObj', JSON.stringify(obj))
    return axios.request({
      url: 'orderPay',
      data: params,
      method: 'post'
    })
  }

  /**
   * 添加优惠
   * @param id 订单id
   * @param preferential 优惠金额 ,转为分
   */
  export const addPref = (id, preferential) => {
    let params = new URLSearchParams()
    params.append('preferential', preferential)
    params.append('id', id)
    return axios.request({
      url: 'addPref',
      data: params,
      method: 'post'
    })
  }

  /**
   * 退单
   * @param payObj
   */
  export const addRefund = (payObj) => {
    let params = new URLSearchParams()
    params.append('payObj', JSON.stringify(payObj))
    return axios.request({
      url: 'addRefund',
      data: params,
      method: 'post'
    })
  }

  /**
   * 付款时，查询顾客的总预存
   * @param cusId 顾客id
   * @param orderId	订单id
   */
  export const getCusAllPrestore = (cusId, orderId) => {
    let params = new URLSearchParams()
    params.append('cusId', cusId)
    params.append('orderId', orderId)
    return axios.request({
      url: 'getCusAllPrestore',
      data: params,
      method: 'post'
    })
  }
