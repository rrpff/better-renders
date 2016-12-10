const webpack = require('webpack')
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')

module.exports = function (config) {
  const host = `${config.assetServer.host}:${config.assetServer.port}`
  config.webpack.entry.main.unshift(`webpack-hot-middleware/client?path=${host}/__webpack_hmr`)
  config.webpack.devtool = 'inline-source-map'
  config.webpack.output.filename = '[name]-[hash].js'
  config.webpack.output.publicPath = `${host}/dist/`

  const webpackIsomorphicPlugin = new WebpackIsomorphicToolsPlugin(config.webpackIsomorphicTools)

  config.webpack.module.loaders = [
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['babel-loader']
    },
    {
      test: /\.json$/,
      loader: 'json-loader'
    },
    {
      test: /\.scss$/,
      loaders: [
        'style?sourceMap',
        'css?modules&importLoaders=2&sourceMap&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
        'autoprefixer?browsers=last 2 version',
        'sass?outputStyle=expanded&sourceMap'
      ]
    },
    {
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=application/font-woff'
    },
    {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=application/font-woff'
    },
    {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=application/octet-stream'
    },
    {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file'
    },
    {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=image/svg+xml'
    },
    {
      test: webpackIsomorphicPlugin.regexp('images'),
      loader: 'url-loader?limit=10240'
    }
  ]

  config.webpack.plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `"${process.env.NODE_ENV}"`
      }
    }),
    webpackIsomorphicPlugin.development()
  ]
}
