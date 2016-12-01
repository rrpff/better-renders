#!/usr/bin/env node

if (!global._babelPolyfill) {
  require('babel-polyfill')
}

const program = require('./program')

program.parse(process.argv)
