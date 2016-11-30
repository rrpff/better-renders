const path = require('path')
const { exec } = require('child_process')
const { existsSync } = require('fs')
const rimraf = require('rimraf')
const mkdirp = require('mkdirp')
const templates = require('../../cli/templates')

describe('chemist new', function () {
  this.timeout(5000)

  describe('when given a name but not a directory', function () {
    const APPNAME = 'MyTestApp'
    const TESTDIR = path.join(process.cwd(), APPNAME)

    it('should create a directory of the name and generate a new chemist app within', function (done) {
      exec(`node_modules/.bin/babel-node cli new ${APPNAME}`, function (err) {
        expect(err).to.eq(null)

        const filesExistances = Object.keys(templates).map(file => {
          const absolutePath = path.join(TESTDIR, file)
          return existsSync(absolutePath)
        })

        expect(filesExistances).to.not.include(false)
        rimraf(TESTDIR, done)
      })
    })
  })

  describe('when given a name and a directory', function () {
    it('should generate a new chemist app within the directory specified', function (done) {
      const APPNAME = 'MyOtherTestApp'
      const TESTDIR = path.join(process.cwd(), 'test', 'fixtures', 'existing')

      mkdirp(TESTDIR, function () {
        exec(`node_modules/.bin/babel-node cli new ${APPNAME} test/fixtures/existing`, function (err) {
          expect(err).to.eq(null)

          const filesExistances = Object.keys(templates).map(file => {
            const absolutePath = path.join(TESTDIR, file)
            return existsSync(absolutePath)
          })

          expect(filesExistances).to.not.include(false)
          rimraf(TESTDIR, done)
        })
      })
    })
  })
})
