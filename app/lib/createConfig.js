const path = require('path')

function createConfig (files) {
  const config = {}
  files.forEach(filePath => {
    try {
      return require(filePath)(config)
    } catch (e) {
      const relativePath = path.relative(process.cwd(), filePath)
      throw new Error(`The config file ${relativePath} does not exist`)
    }
  })
  return config
}

module.exports = createConfig
