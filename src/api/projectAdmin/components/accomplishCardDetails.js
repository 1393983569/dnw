  import axios from '@/libs/api.request'

  /**
   * 查询与改顾客订单有关的所有项目
   * @param cusId 顾客id
   * @param pNum 查询做完的 pNum=0
   */
  export const getCusProject = (cusId, pNum) => {
    let params = new URLSearchParams()
    params.append('cusId', cusId)
    if (pNum + '') params.append('pNum', pNum)
    return axios.request({
      url: 'getCusProject',
      data: params,
      method: 'post'
    })
  }

  /**
   * 查询与改顾客订单有关的所有套餐
   * @param cusId 顾客id
   * @param pNum 查询做完的 pNum=0
   */
  export const getCusSetMeal = (cusId, pNum) => {
    let params = new URLSearchParams()
    params.append('cusId', cusId)
    if (pNum+ '') params.append('pNum', pNum)
    return axios.request({
      url: 'getCusSetMeal',
      data: params,
      method: 'post'
    })
  }

  /**
   * 查询顾客套餐中的项目
   * @param id 顾客的套餐id
   * @param pNum 查询做完的 pNum=0
   */
  export const getCusMealPro = (id, pNum) => {
    let params = new URLSearchParams()
    params.append('id', id)
    return axios.request({
      url: 'getCusMealOverPro',
      data: params,
      method: 'post'
    })
  }

  /**
   * 单项目划卡的日志
   * @param pageNum 当前的页数
   * @param type 1：单项目 2：套餐
   * @param pId 顾客的项目id
   */
  export const getCusHkInfo = (pageNum, pId, csmId) => {
    let params = new URLSearchParams()
    params.append('pageNum', pageNum)
    params.append('proId', pId)
    if (csmId) {
      params.append('csmId', csmId)
      params.append('type', 2)
    } else {
      params.append('type', 1)
    }
    return axios.request({
      url: 'getCusHkInfo',
      data: params,
      method: 'post'
    })
  }
