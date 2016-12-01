const path = require('path')
const pipe = require('piping')
const logger = require('../logger')
const config = require('../../lib/config')

function start () {
  if (process.env.NODE_ENV !== 'development' || pipe()) {
    const app = require(path.join(process.cwd(), 'app', 'server'))

    app.listen(config.app.port, function () {
      logger.done(`${config.title} running on ${config.app.host}:${config.app.port}`)
    })
  }
}

module.exports = start
