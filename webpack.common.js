const path = require('path')
const babelOptions = require('./babel.config')

const mode = process.env.NODE_ENV || 'development'

module.exports = {
  mode,
  resolve: {
    extensions: ['.jsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelOptions,
        },
      },
    ],
  },
  devServer: {
    compress: true,
    open: true,
    port: 3000,
    static: {
      directory: path.join(__dirname, 'dist'),
      serveIndex: true,
    },
  },
}
