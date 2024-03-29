module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: '3',
        modules: 'umd',
        useBuiltIns: 'usage',
        targets: {
          browsers:
            process.env.NODE_ENV === 'development'
              ? 'last 2 versions'
              : '> 0.25%, not dead',
        },
      },
    ],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
  ],
  plugins: ['@babel/plugin-transform-runtime'],
}
