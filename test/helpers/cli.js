const path = require('path')
const { exec, spawn } = require('child_process')
const rimraf = require('rimraf')

function build ({ args, directory }) {
  const cwd = path.join(directory, '..')
  const rootDir = path.join(__dirname, '..', '..')
  const nodeBinary = path.join(path.relative(cwd, rootDir), 'node_modules', '.bin', 'babel-node')
  const cliBinary = path.join(path.relative(cwd, rootDir), 'src', 'cli')

  return new Promise((accept, reject) => {
    exec(`${nodeBinary} ${cliBinary} new ${args}`, { cwd }, function (err, stdout, stderr) {
      if (err) reject(err)
      accept({ stdout, stderr })
    })
  })
}

function link ({ directory }) {
  return new Promise((accept, reject) => {
    const chemistLocation = path.join(__dirname, '..', '..')
    exec('yarn link', { cwd: chemistLocation }, function (err) {
      if (err) reject(err)
      exec('yarn link "@zuren/chemist-rewrite"', { cwd: directory }, function (childErr) {
        if (err) reject(childErr)
        accept()
      })
    })
  })
}

function unlink () {
  return new Promise((accept, reject) => {
    const chemistLocation = path.join(__dirname, '..', '..')
    exec('yarn unlink', { cwd: chemistLocation }, function (err) {
      if (err) reject(err)
      else accept()
    })
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
  const rootDir = path.join(__dirname, '..', '..')
  const cliBinary = path.join(path.relative(directory, rootDir), 'src', 'cli')

  return new Promise((accept, reject) => {
    exec(`node_modules/.bin/babel-node ${cliBinary} compile`, { cwd: directory }, function (err, stdout, stderr) {
      if (err) reject(err)
      accept({ stdout, stderr })
    })
  })
}

function watch ({ directory }) {
  const rootDir = path.join(__dirname, '..', '..')
  const cliBinary = path.join(path.relative(directory, rootDir), 'src', 'cli')

  return spawn('node_modules/.bin/babel-node', [cliBinary, 'watch'], { cwd: directory })
}

function start ({ directory }) {
  const rootDir = path.join(__dirname, '..', '..')
  const cliBinary = path.join(path.relative(directory, rootDir), 'src', 'cli')

  return spawn('node_modules/.bin/babel-node', [cliBinary, 'start'], { cwd: directory, detached: true })
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
