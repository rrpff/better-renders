const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const rendering = require('../../app/lib/middleware')

const app = express()

const ServerLayout = require('./layouts/ServerLayout')
const pages = require('./pages')

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, './client')))
app.use(rendering({ components: pages, Layout: ServerLayout }))

const usersController = require('./controllers/users')

app.use(usersController)

app.use(function (err, req, res, next) {
  res.status(500).send(err.stack)
  next()
})

app.listen(4000, () => console.log('Listening on port 4000'))
