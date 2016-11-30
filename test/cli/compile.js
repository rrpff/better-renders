const path = require('path')
const { exec } = require('child_process')
const glob = require('glob')
const rimraf = require('rimraf')

describe('chemist compile', function () {
  this.timeout(0)

  const APPNAME = 'CompileApp'
  const DIRECTORY = path.join(__dirname, '..', 'fixtures', 'CompileApp')
  const PARENT_DIRECTORY = path.join(DIRECTORY, '..')

  it('should bundle the client app', function (done) {
    exec(`../../node_modules/.bin/babel-node ../../cli new ${APPNAME}`, { cwd: PARENT_DIRECTORY }, function (newErr) {
      expect(newErr).to.eq(null)

      exec('yarn', { cwd: DIRECTORY }, function (yarnErr) {
        expect(yarnErr).to.eq(null)

        exec('node_modules/.bin/babel-node ../../../cli compile', { cwd: DIRECTORY }, function (err) {
          expect(err).to.eq(null)

          const files = glob.sync(`${DIRECTORY}/static/dist/*`)

          expect(files).to.have.length(2)
          expect(files[0]).to.match(/main-[^.]+\.js/)
          expect(files[1]).to.match(/main-[^.]+\.js\.map/)

          rimraf(DIRECTORY, done)
        })
      })
    })
  })
})
