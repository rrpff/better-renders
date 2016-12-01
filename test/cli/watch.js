const path = require('path')
const { build, install, watch, remove } = require('../helpers/cli')
const config = require('../../app/lib/config')

describe('chemist watch', function () {
  this.timeout(0)

  it('should start an asset watch server', async function () {
    const args = 'WatchApp'
    const directory = path.join(__dirname, '..', 'fixtures', args)

    await build({ args, directory })
    await install({ directory })

    const watcher = watch({ directory })

    await new Promise(accept => {
      watcher.stdout.on('data', async msg => {
        if (msg.includes('[rendered]')) {
          const [js] = msg.toString().match(/(main-[^.]*\.js)/)
          const host = `${config.app.host}:${config.assetServer.port}`
          const pathname = `${config.webpack.output.publicPath}${js}`
          const response = await fetch(`${host}${pathname}`)
          expect(response.ok)
          accept()
        }
      })
    })

    await remove({ directory })
  })
})
