const webpack = require('webpack')
const logger = require('../logger')
const { config } = require('../../app/server')

async function compile () {
  webpack(config.webpack, function (err, stats) {
    if (err) throw err

    const { errors, warnings, assetsByChunkName } = stats.toJson()

    errors.forEach(logger.error)
    warnings.forEach(logger.warn)

    logger.success(`Compiled ${assetsByChunkName.main}`)
  })
}

module.exports = compile
