const path = require('path')
const glob = require('glob')
const flatten = require('flatten')
const createConfig = require('./createConfig')

const files = flatten([
  glob.sync(path.join(__dirname, '..', '..', 'config', 'index.js')),
  glob.sync(path.join(process.cwd(), 'config', '*.js')),
  glob.sync(path.join(process.cwd(), 'config', 'environments', `${process.env.NODE_ENV}.js`)),
  glob.sync(path.join(__dirname, '..', '..', 'config', 'webpack.js')),
  glob.sync(path.join(__dirname, '..', '..', 'config', 'environments', `${process.env.NODE_ENV}.js`))
])

module.exports = createConfig(files)
