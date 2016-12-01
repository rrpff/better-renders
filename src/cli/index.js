#!/usr/bin/env node

require('babel-register')

if (!global._babelPolyfill) {
  require('babel-polyfill')
}

const program = require('./program')

program.parse(process.argv)
