module.exports = function (config) {
  config.dev = {}
  config.dev.application = {
    host: 'http://localhost'
  }

  config.dev.assetServer = {
    port: 3001
  }
}
