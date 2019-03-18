import axios from '@/libs/api.request'

// 分页查询案例信息
export const addCase = (caseTitle, caseContent) => {
  let params = new URLSearchParams()
  params.append('title', caseTitle)
  params.append('content', caseContent)
  params.append('state', 2)
  return axios.request({
    url: 'addCase',
    data: params,
    method: 'post'
  })
}
