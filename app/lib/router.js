const url = require('url')
const routington = require('routington')
const co = require('co')
const augmentedRender = require('./render')

module.exports = function () {
  const router = routington()

  router.add = function (path, handler) {
    const nodes = router.define(path)
    const node = nodes[0]

    node.handler = handler

    return router
  }

  router.call = function (path, options = {}) {
    const match = router.match(path)
    const responder = co.wrap(match.node.handler)
    options.params = match.param
    options.render = augmentedRender({ params: options.params })

    return responder(options)
  }

  router.middleware = function () {
    return async function routerMiddleware (req, res) {
      const path = url.parse(req.url).pathname

      return router
        .call(path, { req, res })
        .then(body => res.send(body))
    }
  }

  return router
}
