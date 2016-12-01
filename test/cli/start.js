const path = require('path')
const config = require('../../app/lib/config')
const { build, install, start, remove } = require('../helpers/cli')

describe('chemist start', function () {
  this.timeout(5 * 60 * 1000)

  before(async function () {
    this.name = 'StartApp'
    this.directory = path.join(__dirname, '..', 'fixtures', this.name)
    await build({ args: this.name, directory: this.directory })
    await install({ directory: this.directory })

    this.proc = start({ directory: this.directory })
  })

  after(async function () {
    process.kill(-this.proc.pid)
    await remove({ directory: this.directory })
  })

  it('should start the application server', function (done) {
    const host = `${config.app.host}:${config.app.port}`
    const checkHomepage = async () => {
      const response = await fetch(host)
      const text = await response.text()

      expect(response.ok)
      expect(text).to.include('Welcome to Chemist!')
      done()
    }

    this.proc.stderr.on('data', done)
    this.proc.stdout.on('data', msg => {
      if (msg.includes(`${this.name} running on ${host}`)) {
        checkHomepage().catch(done)
      }
    })
  })
})
