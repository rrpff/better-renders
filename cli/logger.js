const chalk = require('chalk')
const ora = require('ora')
const { emojify } = require('node-emoji')

const levelColours = { success: 'green', warn: 'yellow', error: 'red' }
const levelMethods = { success: 'log', warn: 'warn', error: 'error' }

const log = (level, tag, message) => {
  const colour = levelColours[level]
  const method = levelMethods[level]
  const logger = console[method]
  let formattedMessage = emojify(message)

  if (tag) {
    const formattedTag = chalk[colour](tag)
    formattedMessage = `${formattedTag} ${formattedMessage}`
  }

  logger(formattedMessage)
}

const success = (message, tag = 'success') =>
  log('success', tag, message)

const warn = (message, tag = 'warning') =>
  log('warn', tag, message)

const error = (message, tag = 'error') =>
  log('error', tag, message)

const done = message =>
  log('success', null, `:sparkles:  ${message}`)

const spinner = message =>
  ora(message).start()

module.exports = { success, warn, error, done, spinner }
