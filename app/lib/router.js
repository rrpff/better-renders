const url = require('url')
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

  router.call = function (path, ...args) {
    const match = router.match(path)
    const responder = co.wrap(match.node.handler)

    return responder(...args)
  }

  router.middleware = function () {
    return function routerMiddleware (req, res, next) {
      const path = url.parse(req.url).pathname
      router.call(path, req, res, next)
    }
  }

  return router
}
