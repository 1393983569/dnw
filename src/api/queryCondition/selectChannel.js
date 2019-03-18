  import axios from '@/libs/api.request'

  // 查询项目分类列表信息
  export const getPageCusFrom = () => {
    return axios.request({
      url: 'getPageCusFrom',
      method: 'post'
    })
  }
