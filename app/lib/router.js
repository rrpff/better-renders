const routington = require('routington')
const co = require('co')

module.exports = function () {
  const router = routington()

  router.add = function (path, handler) {
    const nodes = router.define(path)
    const node = nodes[0]

    node.handler = handler

    return router
  }

  router.call = function (path) {
    const match = router.match(path)
    return co(match.node.handler)
  }

  return router
}
