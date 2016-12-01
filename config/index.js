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
}
