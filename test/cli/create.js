const path = require('path')
const { existsSync } = require('fs')
const templates = require('../../cli/templates')
const { build, remove } = require('../helpers/cli')

describe('chemist new', function () {
  this.timeout(0)

  describe('when given a name but not a directory', function () {
    const args = 'MyTestApp'
    const directory = path.join(process.cwd(), 'test', 'fixtures', args)

    it('should create a directory of the name and generate a new chemist app within', async function () {
      await build({ args, directory })

      const filesExistances = Object.keys(templates).map(file => {
        const absolutePath = path.join(directory, file)
        return existsSync(absolutePath)
      })

      expect(filesExistances).to.not.include(false)

      await remove({ directory })
    })
  })

  describe('when given a name and a directory', function () {
    it('should generate a new chemist app within the directory specified', async function () {
      const args = 'MyOtherTestApp existing'
      const directory = path.join(process.cwd(), 'test', 'fixtures', 'existing')

      await build({ args, directory })

      const filesExistances = Object.keys(templates).map(file => {
        const absolutePath = path.join(directory, file)
        return existsSync(absolutePath)
      })

      expect(filesExistances).to.not.include(false)

      await remove({ directory })
    })
  })
})
