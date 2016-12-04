const path = require('path')
const webpack = require('webpack')
const { clientConfiguration } = require('universal-webpack')
const logger = require('../logger')
const config = require('../../lib/config')

async function compile () {
  const input = path.join(process.cwd(), 'app', 'server')
  const output = path.join(process.cwd(), 'tmp', 'server', 'bundle.js')
  const universalSettings = { server: { input, output } }
  const clientConfig = clientConfiguration(config.webpack, universalSettings)

  webpack(clientConfig, function (err, stats) {
    if (err) throw err

    const { errors, warnings, assetsByChunkName } = stats.toJson()

    errors.forEach(logger.error)
    warnings.forEach(logger.warn)

    assetsByChunkName.main.forEach(asset => logger.success(asset, 'created'))
    logger.done('Compiled assets.')
  })
}

module.exports = compile
