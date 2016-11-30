const chalk = require('chalk')
const ora = require('ora')

exports.success = message => console.log(chalk.green(message))
exports.warn = message => console.warn(chalk.yellow(message))
exports.error = message => console.error(chalk.red(message))
exports.spinner = message => ora(message).start()
