const form = require('serializable-form')

module.exports = form({
  fields: {
    name: [
      form.validator(value => value.length >= 1, 'Name must be given'),
      form.validator(value => value.length <= 128, 'Name is too long')
    ],
    username: [
      form.validator(value => value.length >= 1, 'Username must be given'),
      form.validator(value => value.length > 4, 'Username is too short'),
      form.validator(value => value.length <= 64, 'Username is too long')
    ],
    age: []
  }
})
