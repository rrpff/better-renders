const routington = require('routington')

module.exports = function routeComponentMapper (routes) {
  const router = routington()
  const paths = Object.keys(routes)

  paths.forEach(path => {
    const node = router.define(path)[0]
    node.Component = routes[path]
  })

  return function (path) {
    const match = router.match(path)
    return match.node.Component
  }
}
