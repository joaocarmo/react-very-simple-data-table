const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

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
  filename: 'react-simple-data-table.js',
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
    filename: 'react-simple-data-table-example.js',
  }
  externals = []
  plugins = [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/test/index.html'),
    }),
  ]
}

module.exports = {
  mode,
  context,
  entry,
  output,
  externals,
  devServer: {
    compress: true,
    contentBase: [
      path.join(__dirname, 'dist'),
    ],
    open: true,
    overlay: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  modules: 'umd',
                  corejs: '3',
                },
              ],
              '@babel/preset-react',
            ],
            plugins: [
              '@babel/plugin-transform-runtime',
            ],
          },
        },
      },
    ],
  },
  plugins,
}
