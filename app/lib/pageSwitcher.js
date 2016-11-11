const routeComponentMapper = require('./routeComponentMapper')
const { SET_LOCATION } = require('../../app/lib/types')

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
