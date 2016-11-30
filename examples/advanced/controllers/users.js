const { Router } = require('express')
const userCreateForm = require('../forms/userCreateForm')

const router = new Router()

const User = {
  users: [{ name: 'Richard', username: 'richard', age: 22 }],

  async all () {
    return User.users
  },

  async find (username) {
    return User.users.find(model => model.username === username)
  },

  async create (user) {
    User.users.push(user)
    return user
  }
}

router.get('/users', async function (req, res) {
  const users = await User.all()
  res.chemist.render('UserIndexPage', { users })
})

router.get('/user/:username', async function (req, res) {
  const user = await User.find(req.params.username)
  res.chemist.render('UserShowPage', { user })
})

router.get('/users/new', async function (req, res) {
  const entry = await userCreateForm()
  res.chemist.render('UserCreatePage', { entry })
})

router.post('/users', async function (req, res) {
  const entry = await userCreateForm(req.body)

  if (entry.valid) {
    const user = await User.create(req.body)
    res.chemist.redirect(`/user/${user.username}`)
  } else {
    res.chemist.render('UserCreatePage', { entry })
  }
})

module.exports = router
