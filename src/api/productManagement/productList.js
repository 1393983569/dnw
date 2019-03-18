import axios from '@/libs/api.request'
/**
   * 查询规格列表
   */
export const getListSpec = () => {
  return axios.request({
    url: 'getListSpec',
    method: 'post'
  })
}

/**
   * 查询供应商列表
   */
export const getListSupplier = () => {
  return axios.request({
    url: 'getListSupplier',
    method: 'post'
  })
}
