// image-webpack-loader   图片按需加载 - npm install image-webpack-loader -D
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 抽离 css 支持按需加载 -  npm install mini-css-extract-plugin -D
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin') // css压缩 - npm install css-minimizer-webpack-plugin -D
const CompressionWebpackPlugin = require('compression-webpack-plugin') // gzip压缩代码 - npm install compression-webpack-plugin -D
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin // 分析过大文件并进行优化 - npm install webpack-bundle-analyzer -D

module.exports = {
  publicPath: '/',
  productionSourceMap: false,
  lintOnSave: true,

  devServer: {
    host: '0.0.0.0',
    port: 8082,
    open: false,
    allowedHosts: 'all',
    proxy: {
      [process.env.VUE_APP_AUTH_URL]: {
        target: process.env.VUE_APP_AUTH_URL,
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          [process.env.VUE_APP_AUTH_URL]: ''
        }
      },
      [process.env.VUE_APP_LOBBY_URL]: {
        target: process.env.VUE_APP_LOBBY_URL,
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          [process.env.VUE_APP_LOBBY_URL]: ''
        }
      },
      [process.env.VUE_APP_SPACE_URL]: {
        target: process.env.VUE_APP_SPACE_URL,
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          [process.env.VUE_APP_SPACE_URL]: ''
        }
      },
      [process.env.VUE_APP_SERVICE_URL]: {
        target: process.env.VUE_APP_SERVICE_URL,
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_SERVICE_URL]: ''
        }
      }
    }
  },

  chainWebpack: config => {

    config.plugins.delete('prefetch') // 移除 prefetch 插件，避免加载多余的资源
    config.plugins.delete('preload')  // 移除 preload 插件，避免加载多余的资源
    config.optimization.minimizer[new CssMinimizerPlugin()] // css压缩
    config.optimization.minimize(true) // 开发环境下启用 CSS 优化
    config.optimization.splitChunks({ chunks: 'all' })

    config.plugin('webpack-bundle-analyzer').use(BundleAnalyzerPlugin)

    if (process.env.NODE_ENV !== 'development') {

      let miniCssExtractPlugin = new MiniCssExtractPlugin({
        filename: 'assets/[name].[hash:8].css',
        chunkFilename: 'assets/[name].[hash:8].css'
      })
      config.plugin('extract-css').use(miniCssExtractPlugin)


      config.module.rule('images')
        .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
        .use('image-webpack-loader')
        .loader('image-webpack-loader')
        .options({
          bypassOnDebug: true
        })
        .end()
        .use('url-loader')
        .loader('file-loader')
        .options({
          name: 'assets/[name].[hash:8].[ext]'
        }).end() // npm install image-webpack-loader -D 图片按需加载

      
      config.module.rule('svg')
        .test(/\.(svg)(\?.*)?$/)
        .use('file-loader')
        .loader('file-loader')
        .options({
          name: 'assets/[name].[hash:8].[ext]'
        })
    }
  },

  configureWebpack: config => {
    if (process.env.NODE_ENV !== 'development') {
      config.output.filename = 'assets/[name].[hash:8].js'
      config.output.chunkFilename = 'assets/[name].[hash:8].js'
    }

    // 公共代码抽离
    config.optimization = {   
      splitChunks: { // 分割代码块
        cacheGroups: {

          common: { //公用模块抽离
            chunks: 'initial',
            minSize: 0, //大于0个字节
            minChunks: 2, //抽离公共代码时，这个代码块最小被引用的次数
          },
         
          vendor: {  //第三方库抽离
            priority: 1, //权重
            test: /node_modules/,
            chunks: 'initial',
            minSize: 0, //大于0个字节
            minChunks: 2, //在分割之前，这个代码块最小应该被引用的次数
          },
        },
      }
    }

    // 开启gzip压缩
    config.plugins.push(
      new CompressionWebpackPlugin(
        {
          filename: '[path][base].gz[query]',
          algorithm: 'gzip',
          threshold: 10240, // 只有大小大于该值的资源会被处理 10240
          test: new RegExp('\\.(' + ['js'].join('|') + ')$'
          ),
          minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
          deleteOriginalAssets: false // 删除原文件
        }
      )
    )
  }
}