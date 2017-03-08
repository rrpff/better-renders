const test = require('ava')
const React = require('react')
const nock = require('nock')
const { applyMiddleware, createStore, combineReducers } = require('redux')
const thunk = require('redux-thunk').default
const { Provider } = require('react-redux')
const { render } = require('enzyme')
const createMemoryHistory = require('history/createMemoryHistory').default
const createRoutingReducer = require('../src/createRoutingReducer')
const syncHistoryToStore = require('../src/syncHistoryToStore')
const ClientRouter = require('../src/ClientRouter')

const HomePage = () => <div className="homepage" />
const AboutPage = () => <div className="aboutpage" />

const host = 'http://www.example.com'
const history = createMemoryHistory()
const reducer = combineReducers({
  routing: createRoutingReducer({
    components: { HomePage, AboutPage },
    initialComponent: 'HomePage',
    initialProps: {}
  })
})

const middlewares = applyMiddleware(thunk)
const store = createStore(reducer, middlewares)

syncHistoryToStore({ history, store, host })

const app = (
  <Provider store={store}>
    <ClientRouter history={history} />
  </Provider>
)

test('Client Router should only default to the homepage', t => {
  const wrapper = render(app)
  t.is(1, wrapper.find('.homepage').length)
  t.is(0, wrapper.find('.aboutpage').length)
})

test.cb('Client Router should only render the component for the current URL', t => {
  t.plan(2)

  nock(host).get('/about').reply(200, { component: 'AboutPage', props: {} })
  history.push({ pathname: '/about' })

  store.subscribe(function () {
    const wrapper = render(app)
    t.is(0, wrapper.find('.homepage').length)
    t.is(1, wrapper.find('.aboutpage').length)
    t.end()
  })
})

test('Client Router should throw an error when a history object isn\'t passed in', t => {
  const invalidApp = (
    <Provider store={store}>
      <ClientRouter />
    </Provider>
  )

  const error = t.throws(() => render(invalidApp))
  t.is(error.message, '<ClientRouter> will not work without a history prop')
})
