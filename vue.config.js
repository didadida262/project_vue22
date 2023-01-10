'use strict'
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const defaultSettings = require('./src/settings.js')
// const CompressionPlugin = require('compression-webpack-plugin')
// const PrerenderSPAPlugin = require('prerender-spa-plugin');
// const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'vue Admin Template' // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following methods:
// port = 9528 npm run dev OR npm run dev --port = 9528
const port = process.env.port || process.env.npm_config_port || 9528 // dev port
// const webpack = require('webpack')
// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    // host: '192.168.0.106',
    host: 'localhost',
    port: 9528,
    // port: port,
    // open为true，运行完后能自动帮我们打开站点

    open: true,
    overlay: {
      warnings: false,
      errors: true
    }
    // before: require('./mock/mock-server.js')
  },
  //   devServer: {
  //     // publicPath: Setting.publicPath,
  //     // 配置前端转发
  //     open: true,
  //     proxy: {
  //         '/api/v1': {
  //             target: process.env.VUE_APP_BASE_API,
  //             // target: 'http://192.168.10.12:10801',
  //             changeOrigin: true
  //         },
  //     },
  //     disableHostCheck: true
  // },
  configureWebpack: {

    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
    // plugins
    // plugins: [
    //   new webpack.ProvidePlugin({
    //     $: 'jquery',
    //     jQuery: 'jquery',
    //     'window.jQuery': 'jquery',
    //     Popper: ['popper.js', 'default']
    //   })
    // ]
  },
  chainWebpack(config) {
    // config.plugin('prerender-spa-plugin')
    // .use(new PrerenderSPAPlugin({
    //   //要求-给的WebPack-输出应用程序的路径预渲染。
    //   staticDir: path.join(__dirname, 'dist'),
    //   //必需，要渲染的路线。
    //   routes: ['/test'],
    //   //必须，要使用的实际渲染器，没有则不能预编译
    //   renderer: new Renderer({
    //       inject: {
    //           foo: 'bar'
    //       },
    //       headless: false, //渲染时显示浏览器窗口。对调试很有用。
    //       //等待渲染，直到检测到指定元素。
    //       //例如，在项目入口使用`document.dispatchEvent(new Event('custom-render-trigger'))`
    //       renderAfterDocumentEvent: 'render-event',
    //       args: ['--no-sandbox', '--disable-setuid-sandbox']
    //   })
    // }))
    // 预渲染

    // chunk压缩
    // config.plugin('compression-webpack-plugin')
    // .use(new CompressionPlugin({
    //   test: /\.js$|\.html$|\.css/,
    //   threshold: 10240,
    //   deleteOriginalAssets: false
    // }))
    // config.plugin(new CompressionPlugin(
    //   {
    //     test: /\.js$|\.html$|\.css/,
    //     threshold: 10240,
    //     deleteOriginalAssets: false
    // }))
    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin('webpack-bundle-analyzer')
      .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
      // i18n
    config.module
      .rule('i18n')
      .resourceQuery(/blockType=i18n/)
      .use('i18n')
      .loader('@kazupon/vue-i18n-loader')
      .end()

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
