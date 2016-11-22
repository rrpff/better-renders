const { Router } = require('express')

const router = new Router()

const models = [{ name: 'Storm', username: 'storm' }, { name: 'Richard', username: 'richard' }]

router.get('/users', async function (req, res) {
  const users = models.map(user => ({
    name: user.name,
    username: user.username
  }))

  res.better.render('UserIndexPage', { users })
})

router.get('/users/:username', async function (req, res) {
  const model = models.find(user => user.username === req.params.username)
  const user = {
    name: model.name,
    username: model.username
  }

  res.better.render('UserShowPage', { user })
})

module.exports = router
