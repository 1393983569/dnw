import axios from '@/libs/api.request'

  // 查询项目分类列表信息
export const getPageTsProjectCategory = () => {
    return axios.request({
      url: 'getPageTsProjectCategory',
      method: 'post'
    })
  }
