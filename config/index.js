const path = require('path')

module.exports = function (config) {
  config.version = require('../package.json').version

  config.title = 'Application'

  config.app = {
    host: 'http://localhost',
    port: 3000
  }

  config.assetServer = {
    host: 'http://localhost',
    port: 3001
  }

  config.staticPath = './static'
  config.serverPath = path.join(process.cwd(), 'app', 'server')
}
