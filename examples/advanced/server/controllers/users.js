const { Router } = require('express')

const router = new Router()

const USERS = [{ name: 'Storm', username: 'storm' }, { name: 'Richard', username: 'richard' }]

router.get('/users', async function (req, res) {
  const models = USERS
  console.log(models)
  const users = models.map(user => ({
    name: user.name,
    username: user.username
  }))

  console.log(users)

  res.better.render('UserIndexPage', { users })
})

router.get('/users/:username', async function (req, res) {
  console.log('here')
  const model = USERS.find(user => user.username === req.params.username)
  console.log(model)
  const user = {
    name: model.name,
    username: model.username
  }
  console.log(user)

  res.better.render('UserShowPage', { user })
})

module.exports = router
