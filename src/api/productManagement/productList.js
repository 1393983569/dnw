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

/**
 * 下载导入产品的模板
 */
export const downloadTemplateOfGoods = () => {
  return axios.request({
    url: 'downloadTemplateOfGoods',
    method: 'post'
  })
}
