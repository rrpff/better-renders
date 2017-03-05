const path = require('path')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const config = require('../lib/config')
const rendering = require('./middleware')

function chemist ({ pages = {}, Layout } = {}) {
  const app = express()

  app.use(express.static(path.join(process.cwd(), config.staticPath)))
  app.use(bodyParser.json())
  app.use(cors())
  app.use(rendering({ components: pages, Layout }))

  return app
}

module.exports = chemist
