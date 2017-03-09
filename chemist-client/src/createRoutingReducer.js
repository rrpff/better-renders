const { SET_LOCATION } = require('./types')

module.exports = function createRoutingReducer ({ pages, initialPage, initialProps }) {
  const initialState = { Page: pages[initialPage], props: initialProps }

  return function routingReducer (state = initialState, action) {
    if (action.type === SET_LOCATION && action.page !== undefined) {
      return { Page: pages[action.page], props: action.props }
    }

    return state
  }
}
