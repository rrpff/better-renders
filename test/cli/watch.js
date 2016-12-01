const { watch } = require('../helpers/cli')
const config = require('../../app/lib/config')

describe('chemist watch', function () {
  this.timeout(5 * 60 * 1000)

  before(async function () {
    this.proc = watch({ directory: this.directory })
  })

  it('should start an asset watch server', function (done) {
    const checkAssetServer = async msg => {
      const [js] = msg.toString().match(/(main-[^.]*\.js)/)
      const host = `${config.app.host}:${config.assetServer.port}`
      const pathname = `${config.webpack.output.publicPath}${js}`
      const response = await fetch(`${host}${pathname}`)
      expect(response.ok)
      done()
    }

    this.proc.stderr.on('data', done)
    this.proc.stdout.on('data', msg => {
      if (msg.includes('[rendered]')) {
        checkAssetServer(msg).catch(done)
      }
    })
  })
})
