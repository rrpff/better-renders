const { SET_LOCATION } = require('./types')

module.exports = function createRoutingReducer ({ components, initialComponent, initialProps }) {
  const initialState = { Component: components[initialComponent], props: initialProps }

  return function routingReducer (state = initialState, action) {
    if (action.type === SET_LOCATION && action.component !== undefined) {
      return { Component: components[action.component], props: action.props }
    }

    return state
  }
}
