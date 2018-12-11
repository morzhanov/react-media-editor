const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  context: './src',
  entry: ['@babel/polyfill', './index'],
  output: {
    path: './dist',
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js'
  },
  performance: {
    hints: false
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: true
        },
        sourceMap: false
      })
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)?$/,
        loaders: ['babel-loader'],
        include: './src'
      }
    ]
  },
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
}
