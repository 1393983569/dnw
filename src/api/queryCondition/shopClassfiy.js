import axios from '@/libs/api.request'

// 查询项目分类列表信息
export const getPageGoodsCategory = () => {
  return axios.request({
    url: 'getPageGoodsCategory',
    method: 'post'
  })
}
