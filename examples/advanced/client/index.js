require('babel-polyfill')

const React = require('react')
const ReactDOM = require('react-dom')
const { applyMiddleware, createStore, combineReducers } = require('redux')
const thunk = require('redux-thunk').default
const { Provider } = require('react-redux')
const createBrowserHistory = require('history/createBrowserHistory').default
const createRoutingReducer = require('../../../app/lib/createRoutingReducer')
const syncHistoryToStore = require('../../../app/lib/syncHistoryToStore')
const ClientRouter = require('../../../app/lib/ClientRouter')

const UserIndexPage = require('../pages/UserIndexPage')
const UserShowPage = require('../pages/UserShowPage')

const components = { UserIndexPage, UserShowPage }
const { initialComponent, initialProps, host } = window.__betterState

const reducer = combineReducers({
  routing: createRoutingReducer({ components, initialComponent, initialProps })
})

const middlewares = applyMiddleware(thunk)
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = createStore(reducer, devTools, middlewares)

const history = createBrowserHistory()
syncHistoryToStore({ history, store, host })

store.subscribe(console.log.bind(console))

const app = (
  <Provider store={store}>
    <ClientRouter history={history} />
  </Provider>
)

const root = document.getElementById('root')
ReactDOM.render(app, root)
