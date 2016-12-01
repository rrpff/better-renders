const path = require('path')
const glob = require('glob')
const { build, install, compile, remove } = require('../helpers/generation')

describe('chemist compile', function () {
  this.timeout(0)

  it('should bundle the client app', async function () {
    const args = 'CompileApp'
    const directory = path.join(__dirname, '..', 'fixtures', 'CompileApp')

    await build({ args, directory })
    await install({ directory })
    await compile({ directory })

    const files = glob.sync(`${directory}/static/dist/*`)

    expect(files).to.have.length(2)
    expect(files[0]).to.match(/main-[^.]+\.js/)
    expect(files[1]).to.match(/main-[^.]+\.js\.map/)

    await remove({ directory })
  })
})
