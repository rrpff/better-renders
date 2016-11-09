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

  router.call = function (path, options) {
    const match = router.match(path)
    const responder = co.wrap(match.node.handler)

    return responder(options)
  }

  router.middleware = function () {
    return function routerMiddleware (req, res, next) {
      const path = url.parse(req.url).pathname
      router.call(path, { req, res, next })
    }
  }

  return router
}
