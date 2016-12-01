const path = require('path')

function mergeConfigFile (filePath, config) {
  try {
    return require(filePath)(config)
  } catch (e) {
    const isModuleError = e.message === `Cannot find module '${filePath}'`

    if (isModuleError) {
      const relativePath = path.relative(process.cwd(), filePath)
      throw new Error(`The config file ${relativePath} does not exist`)
    } else {
      throw e
    }
  }
}

function createConfig (files) {
  const config = {}
  files.forEach(filePath => mergeConfigFile(filePath, config))
  return config
}

module.exports = createConfig
