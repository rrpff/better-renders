const configureMockStore = require('redux-mock-store').default
const createMemoryHistory = require('history/createMemoryHistory').default
const syncHistoryToStore = require('../../app/lib/syncHistoryToStore')
const { SET_LOCATION } = require('../../app/lib/types')

describe('Sync History To Store', function () {
  it('should dispatch a SET_LOCATION action on history changes', function () {
    const history = createMemoryHistory()
    const store = configureMockStore()({})
    syncHistoryToStore(history, store)

    const location = {
      pathname: '/test',
      search: '?query=true',
      state: { test: 'state' }
    }

    history.push(location)

    const action = store.getActions()[0]
    expect(action.type).to.eq(SET_LOCATION)
    expect(action.location.pathname).to.eq(location.pathname)
  })
})
