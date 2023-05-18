/*
 * @Author: Hhvcg
 * @Date: 2022-02-20 15:26:48
 * @LastEditors: Hhvcg
 */
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const resolve = dir => path.join(__dirname, dir)
// const webpack = require('webpack')
// const name = 'dadadadad!!!'
module.exports = {
  // entry: './src/main.js',
  mode: 'development',
  // entry: path.join(__dirname, './public/index.html'),
  entry: path.join(__dirname, './src/main.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|svg|gif|webp|JPG|jpe)$/,
        type: 'assets',
        parser: {
          dataUrlCondition: {
            maxSize: 20 * 1024
          }
        },
        generator: {
          filename: 'assets/[hash:8].[name][ext]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.js',
      '@': path.resolve(__dirname, 'src')
    },
    fallback: {
      path: require.resolve('path-browserify')
    }
  },
  plugins: [
    // new HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name]_[contenthash:8].css'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve('public/index.html'),
      inject: 'body',
      minify: {
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 删除空符与换符
        minifyCSS: true// 压缩内联css
      },
      options: {
        url: 'src/asstes'
      }
    })
    // 进度条
    // new ProgressBarPlugin({
    //   format: `  :msg [:bar] ${chalk.green.bold(':percent')} (:elapsed s)`
    // })

  ],
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 9528,
    allowedHosts: 'all'
  }

}
