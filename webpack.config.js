/*
 * @Author: Hhvcg
 * @Date: 2022-02-20 15:26:48
 * @LastEditors: Hhvcg
 */
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const resolve = dir => path.join(__dirname, dir)
// const webpack = require('webpack')
// const name = 'dadadadad!!!'
module.exports = {
  // entry: './src/main.js',
  mode: 'development',
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
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          'css-loader'
          // {
          //   loader: 'css-loader',
          //   options: {
          //     importLoaders: 2
          //   }
          // },
          // 'sass-loader',
          // 'postcss-loader'
        ]
      },
      // {
      //   test: /\.css$/,
      //   use: [
      //     MiniCssExtractPlugin.loader,
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         sourceMap: false
      //       }
      //     },
      //     {
      //       loader: 'postcss-loader',
      //       options: {
      //         sourceMap: false
      //       }
      //     }
      //   ]
      // },
      // {
      //   test: /\.s[ac]ss$/i,
      //   use: [
      //     MiniCssExtractPlugin.loader,
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         sourceMap: false
      //       }
      //     },
      //     {
      //       loader: 'postcss-loader',
      //       options: {
      //         sourceMap: false
      //       }
      //     },
      //     {
      //       loader: 'sass-loader',
      //       options: {
      //         sourceMap: false
      //       }
      //     }
      //   ]
      // },
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
    new VueLoaderPlugin()
    // new webpack.LoaderOptionsPlugin({
    //   options: {
    //     chainWebpack: config => {
    //       config.resolve.alias
    //         .set('@', resolve('src'))
    //     }
    //   }
    // })

  ],
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    allowedHosts: 'all'
  }

}
