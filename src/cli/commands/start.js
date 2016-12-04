const path = require('path')
const pipe = require('piping')
const WebpackIsomorphicTools = require('webpack-isomorphic-tools')
const config = require('../../lib/config')

function start () {
  if (process.env.NODE_ENV !== 'development' || pipe()) {
    const serverPath = path.join(config.webpack.context, 'app', 'server')

    global.webpackIsomorphic = new WebpackIsomorphicTools(config.webpackIsomorphicTools)
      .server(config.webpack.context, () => require(serverPath))
  }
}

module.exports = start
