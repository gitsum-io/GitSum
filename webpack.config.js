'use strict'

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const cssnext = require('postcss-cssnext')

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, 'app/gitsum.js')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    alias: {
      'views': path.resolve(__dirname, './app/views'),
      'components': path.resolve(__dirname, './app/components'),
      'assets': path.resolve(__dirname, './app/assets')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-0', 'react-hmre']
      }
    }, {
      test: /\.json?$/,
      loader: 'json'
    }, {
      test: /\.css$/,
      loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]!postcss-loader'
    }, {
      test: /\.woff$/,
      loader: 'file-loader'
    }, {
      test: /\.svg$/,
      loader: 'babel?presets[]=es2015,presets[]=react!svg-react!svgo-loader',
    }, {
      test: /\.(jpg|png)$/,
      loader: 'url?limit=10000'
    }]
  },
  postcss: () => {
    return [
      cssnext
    ]
  }
}
