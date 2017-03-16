const pipe = require('piping')
const WebpackIsomorphicTools = require('webpack-isomorphic-tools')
const config = require('../../lib/config')

function start () {
  if (process.env.NODE_ENV !== 'development' || pipe()) {
    global.webpackIsomorphic = new WebpackIsomorphicTools(config.webpackIsomorphicTools)
      .server(process.cwd(), () => require(config.serverPath))
  }
}

module.exports = start
