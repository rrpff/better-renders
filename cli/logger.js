const chalk = require('chalk')
const ora = require('ora')

exports.success = message => console.log(`${chalk.green('success')} ${message}`)
exports.warn = message => console.warn(`${chalk.yellow('warning')} ${message}`)
exports.error = message => console.error(`${chalk.red('error')} ${message}`)
exports.spinner = message => ora(message).start()
