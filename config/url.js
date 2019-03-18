import env from './env'

const DEV_URL = 'http://192.168.31.229/admin'
const PRO_URL = 'https://produce.com'

export default env === 'development' ? DEV_URL : PRO_URL
