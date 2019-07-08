var path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const BundleAnalyzer = require('webpack-bundle-analyzer')
const BundleAnalyzerPlugin = new BundleAnalyzer.BundleAnalyzerPlugin({
  analyzerMode: 'static',
  openAnalyzer: false
})
const extractCommon = new ExtractTextPlugin({
  filename: 'terrace.min.css',
  allChunks: true
})
const extractCommon2 = new ExtractTextPlugin({
  filename: 'terrace.css',
  allChunks: true
})
module.exports = [
  {
    mode: 'production',
    entry: ['./index'],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'terrace.min.js',
      library: 'terrace',
      libraryTarget: 'umd'
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            'source-map-loader',
            'eslint-loader'
          ]
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            'babel-loader'
          ]
        },
        {
          enforce: 'pre',
          test: /\.tsx$/,
          exclude: /node_modules/,
          use: [
            'tslint-loader'
          ]
        },
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          include: [path.resolve(__dirname, 'components')],
          use: [
            {
              loader: 'babel-loader'
            },
            {
              loader: 'ts-loader'
            }
          ]
        },
        {
          test: /\.css$/,
          use: extractCommon.extract({
            fallback: 'style-loader',
            use: [
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  config: {
                    ctx: {
                      env: 'production'
                    }
                  }
                }
              }
            ]
          })
        },
        {
          test: /\.styl$/,
          exclude: /node_modules/,
          use: extractCommon.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  localIdentName: '[local]-[hash:base64:5]'
                }
              }, {
                loader: 'postcss-loader',
                options: {
                  config: {
                    ctx: {
                      env: 'production'
                    }
                  }
                }
              }, {
                loader: 'stylus-loader'
              }
            ]
          })
        },
        {
          test: /\.(png|jpe?g|git)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 1000,
            name: 'images/[name].[hash:7].[ext]'
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'fonts/[name].[hash:7].[ext]'
          }
        }
      ]
    },
    plugins: [
      extractCommon,
      BundleAnalyzerPlugin,
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true
          }
        }
      }),
      new webpack.NoEmitOnErrorsPlugin()
    ],
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js', '.min.js', '.styl', '.css']
    },
    externals: {
      react: {
        commonjs: 'react',
        commonjs2: 'react',
        amd: 'react',
        root: 'React'
      },
      'react-dom': {
        commonjs: 'react-dom',
        commonjs2: 'react-dom',
        amd: 'react-dom',
        root: 'ReactDom'
      },
      'react-router': {
        commonjs: 'react-router',
        commonjs2: 'react-router',
        amd: 'react-router',
        root: 'ReactRouter'
      },
      'react-router-dom': {
        commonjs: 'react-router-dom',
        commonjs2: 'react-router-dom',
        amd: 'react-router-dom',
        root: 'ReactRouterDOM'
      },
      antd: {
        commonjs: 'antd',
        commonjs2: 'antd',
        amd: 'antd',
        root: 'antd'
      }
    },
    performance: {
      maxAssetSize: 5 * 1024 * 1024
    }
  },
  {
    mode: 'development',
    entry: './index',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'terrace.js',
      library: 'terrace',
      libraryTarget: 'umd'
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            'source-map-loader',
            'eslint-loader'
          ]
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            'babel-loader'
          ]
        },
        {
          enforce: 'pre',
          test: /\.tsx$/,
          exclude: /node_modules/,
          use: [
            'tslint-loader'
          ]
        },
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          include: [path.resolve(__dirname, 'components')],
          use: [
            {
              loader: 'babel-loader'
            },
            {
              loader: 'ts-loader'
            }
          ]
        },
        {
          test: /\.css$/,
          use: extractCommon2.extract({
            fallback: 'style-loader',
            use: [
              'css-loader',
              {
                loader: 'postcss-loader'
              }
            ]
          })
        },
        {
          test: /\.styl$/,
          exclude: /node_modules/,
          use: extractCommon2.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  localIdentName: '[local]-[hash:base64:5]'
                }
              }, {
                loader: 'postcss-loader'
              }, {
                loader: 'stylus-loader'
              }
            ]
          })
        },
        {
          test: /\.(png|jpe?g|git)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 1000,
            name: 'images/[name].[hash:7].[ext]'
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'fonts/[name].[hash:7].[ext]'
          }
        }
      ]
    },
    plugins: [
      extractCommon2,
      new webpack.NoEmitOnErrorsPlugin()
    ],
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js', '.min.js', '.styl', '.css']
    },
    externals: {
      react: {
        commonjs: 'react',
        commonjs2: 'react',
        amd: 'react',
        root: 'React'
      },
      'react-dom': {
        commonjs: 'react-dom',
        commonjs2: 'react-dom',
        amd: 'react-dom',
        root: 'ReactDom'
      },
      'react-router': {
        commonjs: 'react-router',
        commonjs2: 'react-router',
        amd: 'react-router',
        root: 'ReactRouter'
      },
      'react-router-dom': {
        commonjs: 'react-router-dom',
        commonjs2: 'react-router-dom',
        amd: 'react-router-dom',
        root: 'ReactRouterDOM'
      },
      antd: {
        commonjs: 'antd',
        commonjs2: 'antd',
        amd: 'antd',
        root: 'antd'
      }
    },
    performance: {
      maxAssetSize: 5 * 1024 * 1024
    }
  }
]
