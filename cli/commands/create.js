const path = require('path')
const mkdirp = require('mkdirp-promise')
const filegen = require('../../app/lib/filegen')
const logger = require('../logger')
const files = require('../templates')

async function create (name, dir = name) {
  const spinner = logger.spinner(`Generating ${name}`)
  const root = path.relative(process.cwd(), dir)

  await mkdirp(root)
  await filegen({ root, files, context: { name } })

  spinner.text = `Generated ${name}`
  spinner.succeed()
}

module.exports = create
