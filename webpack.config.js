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
let plugins = []

if (dev) {
  context = path.join(__dirname)
  entry = [
    'core-js/stable',
    './examples/full-featured.jsx',
  ]
  plugins = [new HtmlWebpackPlugin({ title: 'react-simple-data-table' })]
}

module.exports = {
  mode,
  context,
  entry,
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'react-simple-data-table.js',
    library: 'SimpleDataTable',
    libraryTarget: 'umd',
  },
  externals: [
    {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
      },
    },
  ],
  devServer: {
    compress: true,
    contentBase: [
      path.join(__dirname, 'dist'),
    ],
    open: 'Google Chrome',
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
