const path = require('path')
const { readFileSync } = require('fs')
const mkdirp = require('mkdirp')
const rimraf = require('rimraf')
const { spy } = require('sinon')
const flatten = require('flatten')
const filegen = require('../../app/lib/filegen')

describe('filegen', function () {
  const DIRECTORY = path.join(__dirname, '..', 'fixtures', 'filegen')

  beforeEach(done => mkdirp(DIRECTORY, done))
  afterEach(done => rimraf(DIRECTORY, done))

  it('should return a promise', function () {
    const gen = filegen({ root: DIRECTORY, files: {} })
    expect(gen).to.be.a('Promise')
  })

  it('should generate files in the given directory', async function () {
    const files = {}
    files['index.js'] = () => `
module.exports = 123
`

    await filegen({ root: DIRECTORY, files })
    expect(require('../fixtures/filegen')).to.eq(123)
  })

  it('should generate directories recursively as needed', async function () {
    const files = {}
    files['make/this/file/really/deep.js'] = () => `
module.exports = 'deep'
`

    await filegen({ root: DIRECTORY, files })
    expect(require('../fixtures/filegen/make/this/file/really/deep')).to.eq('deep')
  })

  it('should strip leading whitespace', async function () {
    const files = {}
    files['strip.js'] = () => `
const numbers = { one: 1, two: 2, three: 3 }

module.exports = {
  numbers
}
`

    await filegen({ root: DIRECTORY, files })

    const filepath = path.join(__dirname, '..', 'fixtures', 'filegen', 'strip.js')
    expect(readFileSync(filepath).toString()).to.eq('const numbers = { one: 1, two: 2, three: 3 }\n\nmodule.exports = {\n  numbers\n}\n')
  })

  it('should pass context to the content function', async function () {
    const files = {}
    files['context.js'] = ({ name }) => `
const greeting = 'Hello ${name}'
module.exports = greeting
`

    await filegen({ root: DIRECTORY, files, context: { name: 'World' } })

    expect(require('../fixtures/filegen/context')).to.eq('Hello World')
  })

  it.only('should call onFileCreate for each file', async function () {
    const onFileCreate = spy()
    const files = { 'file.js': () => '', 'nested/file.js': () => '' }

    await filegen({ root: DIRECTORY, files, onFileCreate })

    const args = flatten(onFileCreate.getCalls().map(call => call.args))
    expect(args).to.include('file.js')
    expect(args).to.include('nested/file.js')
  })
})
