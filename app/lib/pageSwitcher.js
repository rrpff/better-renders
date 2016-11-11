const routington = require('routington')
const { SET_LOCATION } = require('../../app/lib/types')

function routeComponentMapper (routes) {
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

function setLocation (store, location, Component) {
  return {
    type: SET_LOCATION,
    location,
    Component
  }
}

module.exports = function createPageSwitcher (routes, history) {
  const getComponentForRoute = routeComponentMapper(routes)

  return function (store) {
    history.listen(location => {
      const Component = getComponentForRoute(location.pathname)
      const action = setLocation(store, location, Component)

      store.dispatch(action)
    })

    return next => action => next(action)
  }
}
