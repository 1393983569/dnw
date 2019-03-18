import axios from '@/libs/api.request'
// 下单
export const getPageTsStock = (pageNum, goodsName) => {
  let params = new URLSearchParams()
  params.append('pageNum', pageNum)
  params.append('goodsName', goodsName)
  return axios.request({
    url: 'getPageTsStock',
    data: params,
    method: 'post'
  })
}

