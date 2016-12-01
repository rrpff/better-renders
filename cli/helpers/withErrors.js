const logger = require('../logger')

function withErrors (handler) {
  return function (...args) {
    const promise = handler(...args)
    promise.catch(err => {
      logger.error(err.stack)
      process.exit(1)
    })
  }
}

module.exports = withErrors
