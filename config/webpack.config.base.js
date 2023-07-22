const path = require('path')

const utils = require('./utils')
const nodeExternals = require('webpack-node-externals')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')

const webpackConfig = {
  target: 'node',
  entry: {
    server: path.join(utils.APP_PATH, 'index.js')
  },
  output: {
    filename: '[name].bundle.js',
    path: utils.DIST_PATH
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: [path.join(__dirname, '/node_modules')]
      }
    ]
  },
  externals: [nodeExternals()],
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV:
          process.env.NODE_ENV === 'production' ||
          process.env.NODE_ENV === 'prod'
            ? "'production'"
            : "'development'"
      }
    })
  ],
  node: {
    global: true,
    __filename: true,
    __dirname: true
  },
  resolve: {
    fallback: {
      buffer: require.resolve('buffer'),
      console: require.resolve('console'),
      path: require.resolve('path'),
      process: require.resolve('process')
    }
  }
}

module.exports = webpackConfig
