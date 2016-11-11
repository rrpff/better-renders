const configureMockStore = require('redux-mock-store').default
const createMemoryHistory = require('history/createMemoryHistory').default
const createPageSwitcher = require('../../app/lib/pageSwitcher')
const { SET_LOCATION } = require('../../app/lib/types')

describe('Page Switcher', function () {
  const TestComponent = () => null
  const routes = {
    '/test': TestComponent
  }

  it('should dispatch a SET_LOCATION action on history changes', function () {
    const history = createMemoryHistory()
    const pageSwitcher = createPageSwitcher(routes, history)
    const mockStore = configureMockStore([pageSwitcher])
    const store = mockStore({})

    const location = {
      pathname: '/test',
      search: '?query=true',
      state: { test: 'state' }
    }

    history.push(location)

    const action = store.getActions()[0]
    expect(action.type).to.eq(SET_LOCATION)
    expect(action.Component).to.eq(TestComponent)
    expect(action.location.pathname).to.eq(location.pathname)
  })
})
