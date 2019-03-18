  import axios from '@/libs/api.request'

    // 分页查询案例信息
  export const getPagePayFrom = () => {
      return axios.request({
        url: 'getPagePayFrom',
        method: 'post'
      })
    }
