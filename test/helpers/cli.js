const path = require('path')
const { exec, spawn } = require('child_process')
const rimraf = require('rimraf')

function build ({ args, directory }) {
  const cwd = path.join(directory, '..')
  const rootDir = path.join(__dirname, '..', '..')
  const nodeBinary = path.join(path.relative(cwd, rootDir), 'node_modules', '.bin', 'babel-node')
  const cliBinary = path.join(path.relative(cwd, rootDir), 'cli')

  return new Promise((accept, reject) => {
    exec(`${nodeBinary} ${cliBinary} new ${args}`, { cwd }, function (err, stdout, stderr) {
      if (err) reject(err)
      accept({ stdout, stderr })
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
  const cliBinary = path.join(path.relative(directory, rootDir), 'cli')

  return new Promise((accept, reject) => {
    exec(`node_modules/.bin/babel-node ${cliBinary} compile`, { cwd: directory }, function (err, stdout, stderr) {
      if (err) reject(err)
      accept({ stdout, stderr })
    })
  })
}

function watch ({ directory }) {
  const rootDir = path.join(__dirname, '..', '..')
  const cliBinary = path.join(path.relative(directory, rootDir), 'cli')

  return spawn('node_modules/.bin/babel-node', [cliBinary, 'watch'], { cwd: directory })
}

function start ({ directory }) {
  const rootDir = path.join(__dirname, '..', '..')
  const cliBinary = path.join(path.relative(directory, rootDir), 'cli')

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

exports.build = build
exports.install = install
exports.compile = compile
exports.watch = watch
exports.start = start
exports.remove = remove
