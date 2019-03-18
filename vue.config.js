const path = require('path')
const fs = require('fs')
// const HtmlWebpackPlugin = require('html-webpack-plugin')

const resolve = dir => {
  return path.join(__dirname, dir)
}

const env = process.env.NODE_ENV || 'development'
  fs.writeFileSync(path.join(__dirname, './config/env.js'), `export default '${env}'
`)

// 这里需要修改为你线上项目存放的路径
// 比如你打包的文件放到服务器的my-app文件夹，域名为a.com，则应改为
// const BASE_URL = 'https://iview.github.io/iview-admin/'
const BASE_URL = process.env.NODE_ENV === 'production' ? './' : './'
const indexJs = __dirname + './src/index.js'
module.exports = {
  baseUrl: BASE_URL,
  // 如果你不需要使用eslint，把lintOnSave设为false即可
  lintOnSave: false,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_c', resolve('src/components'))
      .set('_conf', resolve('config'))
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 10240 }))
  },
  // 打包不生成map文件
  productionSourceMap: false,
  devServer: {
    disableHostCheck: true
  }
}
