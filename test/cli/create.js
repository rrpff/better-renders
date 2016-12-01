const path = require('path')
const { existsSync } = require('fs')
const templates = require('../../cli/templates')
const { build, remove } = require('../helpers/cli')

function expectAllFilesToExistIn (directory) {
  const filesExistances = Object.keys(templates).map(file => {
    const absolutePath = path.join(directory, file)
    return existsSync(absolutePath)
  })

  expect(filesExistances).to.not.include(false)
}

describe('chemist new', function () {
  describe('when given a name but not a directory', function () {
    it('should create a directory of the name and generate a new chemist app within', async function () {
      expectAllFilesToExistIn(this.directory)
    })
  })

  describe('when given a name and a directory', function () {
    this.timeout(5 * 60 * 1000)

    before(function () {
      this.args = 'MyOtherTestApp existing'
      this.directory = path.join(process.cwd(), 'test', 'fixtures', 'existing')
    })

    after(async function () {
      await remove({ directory: this.directory })
    })

    it('should generate a new chemist app within the directory specified', async function () {
      await build({ args: this.args, directory: this.directory })
      expectAllFilesToExistIn(this.directory)
    })
  })
})
