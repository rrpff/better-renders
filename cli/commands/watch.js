const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const logger = require('../logger')
const { config } = require('../../app/server')

async function watch () {
  const compiler = webpack(config.webpack)
  const host = config.dev.application.host
  const port = config.dev.assetServer.port
  const app = express()

  const serverOptions = {
    contentBase: `${host}:${port}`,
    quiet: false,
    noInfo: false,
    hot: true,
    inline: true,
    lazy: false,
    publicPath: config.webpack.output.publicPath,
    headers: { 'Access-Control-Allow-Origin': '*' },
    stats: { colors: true }
  }

  app.use(webpackDevMiddleware(compiler, serverOptions))
  app.use(webpackHotMiddleware(compiler))

  app.listen(port, function (err) {
    if (err) {
      logger.error(err)
    } else {
      logger.success(`Asset server listening on ${host}:${port}`)
    }
  })
}

module.exports = watch
