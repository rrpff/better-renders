const program = require('commander')
const { version } = require('../package.json')
const create = require('./commands/create')
const compile = require('./commands/compile')
const watch = require('./commands/watch')

program.version(version)

program
  .command('new <name> [dir]')
  .action(create)

program
  .command('compile')
  .action(compile)

program
  .command('watch')
  .action(watch)

module.exports = program
