const webpack = require('webpack')
const logger = require('../logger')
const config = require('../../lib/config')

async function compile () {
  webpack(config.webpack, function (err, stats) {
    if (err) throw err

    const { errors, warnings, assetsByChunkName } = stats.toJson()

    errors.forEach(logger.error)
    warnings.forEach(logger.warn)

    const assets = Object.keys(assetsByChunkName).reduce((acc, key) => {
      const value = assetsByChunkName[key]
      const entries = Array.isArray(value) ? value : [value]
      return acc.concat(entries)
    }, [])

    assets.forEach(asset => logger.success(asset, 'created'))
    logger.done('Compiled assets.')
  })
}

module.exports = compile
