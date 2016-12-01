const path = require('path')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const rendering = require('./middleware')

function chemist ({ pages = {}, Layout } = {}) {
  const app = express()

  app.use(express.static(path.join(process.cwd(), '../client')))
  app.use(bodyParser.json())
  app.use(cors())
  app.use(rendering({ components: pages, Layout }))

  return app
}

module.exports = chemist
