const config = require('./package.json');
console.log(`使用服务端域名 ==> ${process.env.VUE_APP_API_HOST}`);
console.log(`当前版本 ==> ${config.version}`);

const Timestamp = `${new Date().getTime()}`;
module.exports = {
  configureWebpack: { // webpack 配置
    output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
      filename: `[name].${Timestamp}.${config.version}.js`,
      chunkFilename: `[name].${Timestamp}.${config.version}.js`
    },
  },
  productionSourceMap: process.env.NODE_ENV === 'production' ? false : true,
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    host: '127.0.0.1',
    port: 8900,
  },
  chainWebpack: config => {
    config.module.rule('pug')
      .test(/\.pug$/)
      .use('pug-html-loader')
      .loader('pug-html-loader')
      .end()
  }
}