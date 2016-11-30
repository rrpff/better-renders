const path = require('path')
const mkdirp = require('mkdirp')
const filegen = require('../../app/lib/filegen')
const files = require('../templates')

function create (name, dir = name) {
  return new Promise((accept, reject) => {
    const root = path.join(process.cwd(), dir)
    mkdirp(root, function (err) {
      if (err) return reject(err)

      const context = { name }
      const gen = filegen({ root, files, context })
      return gen.then(accept)
    })
  })
}

module.exports = create
