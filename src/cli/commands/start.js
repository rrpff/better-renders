const path = require('path')
// const pipe = require('piping')
const webpack = require('webpack')
const { server, serverConfiguration } = require('universal-webpack')
const logger = require('../logger')
const config = require('../../lib/config')

function start () {
  // if (process.env.NODE_ENV !== 'development' || pipe()) {
  const input = path.join(process.cwd(), 'app', 'server')
  const output = path.join(process.cwd(), 'tmp', 'server', 'bundle.js')
  const universalSettings = { server: { input, output } }
  const serverConfig = serverConfiguration(config.webpack, universalSettings)

  const compiler = webpack(serverConfig)
  compiler.watch({}, function (err, stats) {
    console.log(stats.toJson({ errorDetails: true }))

    if (err) {
      logger.error(err)
      // process.exit(1)
    }

    console.log(serverConfig)

    server(serverConfig, universalSettings)
  })
  // }
}

module.exports = start
