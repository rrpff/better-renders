const routeComponentMapper = require('./routeComponentMapper')
const { SET_LOCATION } = require('./types')

module.exports = function createRoutingReducer (routes) {
  const initialState = { Component: null }
  const getComponentForRoute = routeComponentMapper(routes)

  return function routingReducer (state = initialState, action) {
    if (action.type === SET_LOCATION) {
      const Component = getComponentForRoute(action.location.pathname)
      return { Component }
    }

    return state
  }
}
