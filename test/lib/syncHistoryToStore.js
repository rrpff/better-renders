const configureMockStore = require('redux-mock-store').default
const createMemoryHistory = require('history/createMemoryHistory').default
const syncHistoryToStore = require('../../app/lib/syncHistoryToStore')
const { SET_LOCATION } = require('../../app/lib/types')

function setup () {
  const history = createMemoryHistory()
  const store = configureMockStore()({})
  syncHistoryToStore(history, store)

  return { history, store }
}

describe('Sync History To Store', function () {
  it('should dispatch a SET_LOCATION action when called and on history changes', function () {
    const { history, store } = setup()

    history.push({
      pathname: '/test',
      search: '?query=true',
      state: { test: 'state' }
    })

    const [first, second] = store.getActions()

    expect(first.type).to.eq(SET_LOCATION)
    expect(first.location.pathname).to.eq('/')
    expect(second.type).to.eq(SET_LOCATION)
    expect(second.location.pathname).to.eq('/test')
  })
})
