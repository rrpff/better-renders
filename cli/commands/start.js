const path = require('path')
const { config } = require('../../app/server')
const logger = require('../logger')
const pipe = require('piping')

function start () {
  if (process.env.NODE_ENV !== 'development' || pipe()) {
    const app = require(path.join(process.cwd(), 'app', 'server'))

    app.listen(config.app.port, function () {
      logger.success(`${config.title} running on ${config.app.host}:${config.app.port}`)
    })
  }
}

module.exports = start
