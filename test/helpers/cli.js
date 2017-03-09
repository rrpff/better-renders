const path = require('path')
const { exec, spawn } = require('child_process')
const rimraf = require('rimraf')

const chemistDirectory = path.join(__dirname, '..', '..')

function build ({ args, directory }) {
  const cwd = path.join(directory, '..')
  const rootDir = path.join(__dirname, '..', '..')
  const cliBinary = path.join(path.relative(cwd, rootDir), 'dist', 'cli', 'index.js')

  return new Promise((accept, reject) => {
    exec(`${cliBinary} new ${args}`, { cwd }, function (err, stdout, stderr) {
      if (err) reject(err)
      accept({ stdout, stderr })
    })
  })
}

function link ({ directory }) {
  return new Promise((accept, reject) => {
    exec('yarn link', { cwd: chemistDirectory }, function (err) {
      if (err) reject(err)
      exec('yarn link "@zuren/chemist-rewrite"', { cwd: directory }, function (childErr) {
        if (err) reject(childErr)
        accept()
      })
    })
  })
}

function unlink () {
  return new Promise(accept => {
    exec('yarn unlink', { cwd: chemistDirectory }, accept)
  })
}

function install ({ directory }) {
  return new Promise((accept, reject) => {
    exec('yarn', { cwd: directory }, function (err, stdout, stderr) {
      if (err) reject(err)
      accept({ stdout, stderr })
    })
  })
}

function compile ({ directory }) {
  const cliBinary = path.join(path.relative(directory, chemistDirectory), 'dist', 'cli', 'index.js')

  return new Promise((accept, reject) => {
    exec(`${cliBinary} compile`, { cwd: directory }, function (err, stdout, stderr) {
      if (err) reject(err)
      accept({ stdout, stderr })
    })
  })
}

function watch ({ directory }) {
  const cliBinary = path.join(path.relative(directory, chemistDirectory), 'dist', 'cli', 'index.js')

  return spawn(cliBinary, ['watch'], { cwd: directory })
}

function start ({ directory }) {
  const cliBinary = path.join(path.relative(directory, chemistDirectory), 'dist', 'cli', 'index.js')

  return spawn(cliBinary, ['start'], { cwd: directory, detached: true })
}

function remove ({ directory }) {
  return new Promise((accept, reject) => {
    rimraf(directory, function (err) {
      if (err) reject(err)
      else accept()
    })
  })
}

before(async function () {
  this.timeout(5 * 60 * 1000)

  global.webpackIsomorphic = {}
  global.webpackIsomorphic.assets = () => ({
    javascript: { main: 'bundle.js' },
    styles: {},
    assets: {}
  })

  this.name = 'TestApp'
  this.directory = path.join(__dirname, '..', 'fixtures', this.name)
  await build({ args: this.name, directory: this.directory })
  await install({ directory: this.directory })
  await link({ directory: this.directory })
})

after(async function () {
  this.timeout(10 * 1000)
  await unlink()
  await remove({ directory: this.directory })
})

exports.build = build
exports.install = install
exports.compile = compile
exports.watch = watch
exports.start = start
exports.remove = remove
