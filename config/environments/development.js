const webpack = require('webpack')

module.exports = function (config) {
  const host = `${config.assetServer.host}:${config.assetServer.port}`
  config.webpack.entry.main.unshift(`webpack-hot-middleware/client?path=${host}/__webpack_hmr`)
  config.webpack.devtool = 'inline-source-map'
  config.webpack.output.filename = '[name]-[hash].js'
  config.webpack.output.publicPath = `${host}/dist/`

  config.webpack.plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `"${process.env.NODE_ENV}"`
      }
    }),
    config.webpackIsomorphicPlugin.development()
  ]
}
