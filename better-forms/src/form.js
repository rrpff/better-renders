const { awaitIfAsync } = require('./helpers')

function formatValidation (errorOrValid) {
  if (errorOrValid === true) {
    return { error: null, valid: true }
  }

  return { error: errorOrValid, valid: false }
}

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
    const validateField = fields[field]
    if (!validateField) return formatValidation(true)

    const errorOrValid = validateField(value, helpers)
    return formatValidation(await awaitIfAsync(errorOrValid))
  }

  return instance
}

module.exports = form
