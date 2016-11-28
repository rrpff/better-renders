const path = require('path')
const glob = require('glob')
const flatten = require('flatten')
const createConfig = require('./createConfig')

const files = flatten([
  glob.sync(path.join(__dirname, '..', '..', 'config', '*.js')),
  glob.sync(path.join(__dirname, '..', '..', 'config', 'environments', '*.js')),
  glob.sync(path.join(process.cwd(), 'config', '*.js')),
  glob.sync(path.join(process.cwd(), 'config', 'environments', '*.js'))
])

module.exports = createConfig(files)
