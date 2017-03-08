const test = require('ava')
const path = require('path')
const { readFileSync } = require('fs')
const mkdirp = require('mkdirp')
const rimraf = require('rimraf')
const { spy } = require('sinon')
const flatten = require('flatten')
const filegen = require('../src')

const DIRECTORY = path.join(__dirname, 'fixtures', 'filegen')

test.beforeEach.cb(t => mkdirp(DIRECTORY, t.end))
test.always.afterEach.cb(t => rimraf(DIRECTORY, t.end))

test('should return a promise', t => {
  const gen = filegen({ root: DIRECTORY, files: {} })
  t.true(gen instanceof Promise)
})

test('should generate files in the given directory', async t => {
  const files = {}
  files['index.js'] = () => `
module.exports = 123
`

  await filegen({ root: DIRECTORY, files })
  t.is(require('./fixtures/filegen'), 123)
})

test('should generate directories recursively as needed', async t => {
  const files = {}
  files['make/this/file/really/deep.js'] = () => `
module.exports = 'deep'
`

  await filegen({ root: DIRECTORY, files })
  t.is(require('./fixtures/filegen/make/this/file/really/deep'), 'deep')
})

test('should strip leading whitespace', async t => {
  const files = {}
  files['strip.js'] = () => `
const numbers = { one: 1, two: 2, three: 3 }

module.exports = {
  numbers
}
`

  await filegen({ root: DIRECTORY, files })

  const filepath = path.join(__dirname, 'fixtures', 'filegen', 'strip.js')
  const contents = readFileSync(filepath).toString()
  t.is(contents, 'const numbers = { one: 1, two: 2, three: 3 }\n\nmodule.exports = {\n  numbers\n}\n')
})

test('should pass context to the content function', async t => {
  const files = {}
  files['context.js'] = ({ name }) => `
const greeting = 'Hello ${name}'
module.exports = greeting
`

  await filegen({ root: DIRECTORY, files, context: { name: 'World' } })

  t.is(require('./fixtures/filegen/context'), 'Hello World')
})

test('should call onFileCreate for each file', async t => {
  const onFileCreate = spy()
  const files = { 'file.js': () => '', 'nested/file.js': () => '' }

  await filegen({ root: DIRECTORY, files, onFileCreate })

  const args = flatten(onFileCreate.getCalls().map(call => call.args))
  t.true(args.includes('file.js'))
  t.true(args.includes('nested/file.js'))
})
