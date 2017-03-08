const test = require('ava')
const nock = require('nock')
const { applyMiddleware, createStore, combineReducers } = require('redux')
const thunk = require('redux-thunk').default
const createRoutingReducer = require('../src/createRoutingReducer')
const { fetchLocation } = require('../src/actions/routing')

const HOST = 'http://www.example.com'

test('createRoutingReducer should create a new Routing Reducer', t => {
  const TestComponent = () => null
  const reducer = createRoutingReducer({
    components: { TestComponent },
    initialComponent: 'TestComponent',
    initialProps: {}
  })

  t.is('function', typeof reducer)
})

test.cb('Routing Reducer should call fetchLocation and set the current component', t => {
  t.plan(1)

  const TestComponent = () => null

  const reducer = combineReducers({
    routing: createRoutingReducer({
      components: { TestComponent },
      initialComponent: 'TestComponent',
      initialProps: {}
    })
  })

  const middlewares = applyMiddleware(thunk)
  const store = createStore(reducer, middlewares)

  const location = {
    pathname: '/test',
    search: '?query=true',
    state: { test: 'state' },
    hash: '',
    key: 'ignwkm'
  }

  nock(HOST)
    .get('/test')
    .query({ query: true })
    .reply(200, { component: 'TestComponent', props: { query: true } })

  store.subscribe(function () {
    t.deepEqual(store.getState(), {
      routing: {
        Component: TestComponent,
        props: { query: true }
      }
    })

    t.end()
  })

  store.dispatch(fetchLocation({ host: HOST, location }))
})
