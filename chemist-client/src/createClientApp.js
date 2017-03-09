const React = require('react')
const { applyMiddleware, createStore, combineReducers } = require('redux')
const thunk = require('redux-thunk').default
const { Provider } = require('react-redux')
const createBrowserHistory = require('history/createBrowserHistory').default
const createRoutingReducer = require('./createRoutingReducer')
const syncHistoryToStore = require('./syncHistoryToStore')
const ClientRouter = require('./ClientRouter')

function createClientApp ({ history = createBrowserHistory(), pages = {} }) {
  const { initialPage, initialProps } = window.__chemistState

  const reducer = combineReducers({
    routing: createRoutingReducer({
      pages,
      initialPage,
      initialProps
    })
  })

  const middlewares = applyMiddleware(thunk)
  const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  const store = createStore(reducer, devTools, middlewares)

  syncHistoryToStore({ history, store })

  const app = (
    <Provider store={store}>
      <ClientRouter history={history} />
    </Provider>
  )

  return { app, history, store }
}

module.exports = createClientApp
