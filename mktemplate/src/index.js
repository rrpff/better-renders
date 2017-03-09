const path = require('path')
const { writeFile } = require('fs')
const mkdirp = require('mkdirp-promise')

function createFile ({ absolutePath, content }) {
  return new Promise(async (accept, reject) => {
    const directory = path.dirname(absolutePath)
    await mkdirp(directory)

    writeFile(absolutePath, content, function (fileErr) {
      if (fileErr) {
        reject(fileErr)
      } else {
        accept()
      }
    })
  })
}

function mktemplate ({ root, files, context = {}, onFileCreate = () => {} }) {
  const creators = Object.keys(files).map(filePath => {
    const content = files[filePath](context)
    const stripped = content.replace(/^\s*\n/, '')

    const create = createFile({
      absolutePath: path.join(root, filePath),
      content: stripped,
    })

    return create.then(() => onFileCreate(filePath))
  })

  return Promise.all(creators)
}

module.exports = mktemplate
