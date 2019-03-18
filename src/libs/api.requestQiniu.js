import HttpRequest from '@/libs/axios'
import config from '@/config'
// 七牛专用
const baseUrl = config.baseUrl.qiniuUrl

const axios = new HttpRequest(baseUrl)
export default axios
