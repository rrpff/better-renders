#!/usr/bin/env node

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

require('babel-register')

if (!global._babelPolyfill) {
  require('babel-polyfill')
}

const program = require('./program')

program.parse(process.argv)
