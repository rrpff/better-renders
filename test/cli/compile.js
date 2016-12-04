const glob = require('glob')
const { compile } = require('../helpers/cli')

describe('chemist compile', function () {
  this.timeout(5 * 60 * 1000)

  before(async function () {
    await compile({ directory: this.directory })
  })

  it('should bundle the client app', async function () {
    const files = glob.sync(`${this.directory}/static/dist/*`)

    expect(files).to.have.length.of(1)
    expect(files[0]).to.match(/main-[^.]+\.js/)
  })
})
