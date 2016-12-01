const webpack = require('webpack')
const logger = require('../logger')
const { config } = require('../../server')

async function compile () {
  webpack(config.webpack, function (err, stats) {
    if (err) throw err

    const { errors, warnings, assetsByChunkName } = stats.toJson()

    errors.forEach(logger.error)
    warnings.forEach(logger.warn)

    assetsByChunkName.main.forEach(asset => logger.success(asset, 'created'))
    logger.done('Compiled assets.')
  })
}

module.exports = compile
