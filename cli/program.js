const program = require('commander')
const { version } = require('../package.json')
const create = require('./commands/create')

program.version(version)

program
  .command('new <name> [dir]')
  .action(create)

module.exports = program
