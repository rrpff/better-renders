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

  router.call = function (path, mode, options = {}) {
    const match = router.match(path)
    const responder = co.wrap(match.node.handler)
    options.params = match.param

    const props = { params: options.params }
    options.render = augmentedRender(mode, props)

    return responder(options)
  }

  router.middleware = function () {
    return async function routerMiddleware (req, res) {
      const path = url.parse(req.url).pathname
      const accepts = req.headers.accept
      const mode = accepts && accepts.includes('application/json') ? 'JSON' : 'HTML'

      return router
        .call(path, mode, { req, res })
        .then(body => res.send(body))
    }
  }

  return router
}
