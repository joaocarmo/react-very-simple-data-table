const path = require('path')

const { NODE_ENV } = process.env

const mode = NODE_ENV || 'development'

module.exports = {
  mode,
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
}
