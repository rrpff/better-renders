const path = require('path')
const mkdirp = require('mkdirp-promise')
const filegen = require('../../lib/filegen')
const logger = require('../logger')
const files = require('../templates')

async function create (name, dir = name) {
  const root = path.relative(process.cwd(), dir)
  const onFileCreate = file => logger.success(file, 'created')

  await mkdirp(root)
  await filegen({ root, files, context: { name }, onFileCreate })

  logger.done(`${name} is ready!`)
}

module.exports = create
