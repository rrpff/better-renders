const test = require('ava')
const nock = require('nock')
const configureMockStore = require('redux-mock-store').default
const thunk = require('redux-thunk').default
const createMemoryHistory = require('history/createMemoryHistory').default
const syncHistoryToStore = require('../src/syncHistoryToStore')
const { SET_LOCATION } = require('../src/types')

test.cb('When a page object is not included in the location state, should fetch JSON of the new page on history changes', t => {
  t.plan(4)

  const host = 'http://www.example.com'
  const history = createMemoryHistory()
  const store = configureMockStore([thunk])({})

  syncHistoryToStore({ history, store, host })

  nock(host)
    .get('/test')
    .query({ query: true })
    .reply(200, { component: 'TestPage', props: {} })

  store.subscribe(function () {
    const [action] = store.getActions()

    t.is(SET_LOCATION, action.type)
    t.is('/test', action.location.pathname)
    t.is('TestPage', action.component)
    t.deepEqual({}, action.props)
    t.end()
  })

  history.push({ pathname: '/test', search: '?query=true' })
})

test.cb('When a page object is included in the location state, should fetch JSON of the new page on history changes', t => {
  t.plan(4)

  const host = 'http://localhost:3000'
  const history = createMemoryHistory()
  const store = configureMockStore([thunk])({})

  syncHistoryToStore({ history, store, host })

  store.subscribe(function () {
    const [action] = store.getActions()

    t.is(SET_LOCATION, action.type)
    t.is('/existing', action.location.pathname)
    t.is('MyExistingPage', action.component)
    t.deepEqual({ existing: true }, action.props)
    t.end()
  })

  const page = {
    component: 'MyExistingPage',
    props: { existing: true }
  }

  history.push({ pathname: '/existing', state: { page } })
})
