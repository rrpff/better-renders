const path = require('path')
const config = require('../../app/lib/config')
const { build, install, start, remove } = require('../helpers/cli')

describe('chemist start', function () {
  this.timeout(5 * 60 * 1000)

  it('should start the application server', async function () {
    const name = 'StartApp'
    const directory = path.join(__dirname, '..', 'fixtures', name)

    await build({ args: name, directory })
    await install({ directory })

    const proc = start({ directory })

    await new Promise((accept, reject) => {
      const host = `${config.app.host}:${config.app.port}`
      const assertions = async msg => {
        if (msg.includes(`${name} running on ${host}`)) {
          const response = await fetch(host)
          const text = await response.text()

          expect(response.ok)
          expect(text).to.include('Welcome to Chemist!')
          accept()
        }
      }

      proc.stdout.on('data', msg => {
        assertions(msg).catch(reject)
      })
    })

    process.kill(-proc.pid)
    await remove({ directory })
  })
})
