const { Router } = require('express')

const router = new Router()

const users = [{ name: 'Storm', username: 'storm' }, { name: 'Richard', username: 'richard' }]

router.get('/users', async function (req, res) {
  res.better.render('UserIndexPage', { users })
})

router.get('/users/:username', async function (req, res) {
  const user = users.find(model => model.username === req.params.username)

  res.better.render('UserShowPage', { user })
})

module.exports = router
