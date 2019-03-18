  import axios from '@/libs/api.request'

  /**
   * 分店，分页查询下单信息
   * @param pageNum 当前页数
   */
  export const getPageTsGoodsOut = (pageNum) => {
    let params = new URLSearchParams()
    params.append('pageNum', pageNum)
    return axios.request({
      url: 'getPageTsGoodsOut',
      data: params,
      method: 'post'
    })
  }

  export const getPageTsGoodsOutInfo = (pageNum) => {
    let params = new URLSearchParams()
    params.append('pageNum', pageNum)
    return axios.request({
      url: 'getPageTsGoodsOutInfo',
      data: params,
      method: 'post'
    })
  }

  /**
   * 查询详情
   * @param pageNum 页数
   * @param id 订单id
   */
  export const getTsGoodsOutOfInfo = (pageNum, id) => {
    let params = new URLSearchParams()
    params.append('pageNum', pageNum)
    params.append('id', id)
    return axios.request({
      url: 'getTsGoodsOutOfInfo',
      data: params,
      method: 'post'
    })
  }

  /**
   * 分店确认入库
   * @param id 下单表id
   */
  export const confirmInStock = (id) => {
    let params = new URLSearchParams()
    params.append('id', id)
    return axios.request({
      url: 'confirmInStock',
      data: params,
      method: 'post'
    })
  }
