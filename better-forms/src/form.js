const validateAll = require('./validateAll')

function form ({ helpers = [], fields = {} } = {}) {
  function instance (entry = {}) {
    const validated = Object.keys(entry).map(field => {
      const value = entry[field]
      return instance.validate(field, value)
    })

    return validated
  }

  instance.helpers = helpers
  instance.validate = async function (field, value) {
    return validateAll({
      value,
      helpers,
      validators: fields[field]
    })
  }

  return instance
}

module.exports = form
