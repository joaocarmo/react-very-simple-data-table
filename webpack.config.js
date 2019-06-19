const path = require('path')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const common = require('./webpack.common.js')

const { NODE_ENV } = process.env

const mode = NODE_ENV || 'development'
const dev = mode === 'development'

let context = path.join(__dirname, '/lib')
let entry = [
  'core-js/stable',
  './index.js',
]
let output = {
  path: path.join(__dirname, '/dist'),
  filename: 'react-very-simple-data-table.js',
  library: 'SimpleDataTable',
  libraryTarget: 'umd',
}
let externals = [
  {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
  },
]
let plugins = []

if (dev) {
  context = path.join(__dirname)
  entry = [
    'core-js/stable',
    './examples/full-featured.jsx',
  ]
  output = {
    path: path.join(__dirname, '/dist'),
    filename: 'react-very-simple-data-table-example.js',
  }
  externals = []
  plugins = [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/test/index.html'),
    }),
  ]
}

module.exports = merge(common, {
  context,
  entry,
  output,
  externals,
  plugins,
})
