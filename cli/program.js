const program = require('commander')
const { version } = require('../package.json')
const create = require('./commands/create')
const compile = require('./commands/compile')
const start = require('./commands/start')
const watch = require('./commands/watch')

program.version(version)

program
  .command('new <name> [dir]')
  .action(create)

program
  .command('start')
  .action(start)

program
  .command('compile')
  .action(compile)

program
  .command('watch')
  .action(watch)

module.exports = program
