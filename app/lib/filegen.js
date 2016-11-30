const path = require('path')
const { writeFile } = require('fs')
const mkdirp = require('mkdirp')

function createFile ({ absolutePath, content }) {
  return new Promise((accept, reject) => {
    const directory = path.dirname(absolutePath)
    mkdirp(directory, function (dirErr) {
      if (dirErr) return reject(dirErr)
      return writeFile(absolutePath, content, function (fileErr) {
        if (fileErr) return reject(fileErr)
        return accept()
      })
    })
  })
}

function filegen ({ root, files, context = {} }) {
  const creators = Object.keys(files).map(filepath => {
    const content = files[filepath](context)
    const stripped = content.replace(/^\s*\n/, '')

    return createFile({
      absolutePath: path.join(root, filepath),
      content: stripped
    })
  })

  return Promise.all(creators)
}

module.exports = filegen
