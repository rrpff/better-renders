const nock = require('nock')
const configureMockStore = require('redux-mock-store').default
const thunk = require('redux-thunk').default
const createMemoryHistory = require('history/createMemoryHistory').default
const syncHistoryToStore = require('../../app/lib/syncHistoryToStore')
const { SET_LOCATION } = require('../../app/lib/types')

describe('Sync History To Store', function () {
  describe('when a page object is not included in the location state', function () {
    it('should fetch JSON of the new page on history changes', function (done) {
      const host = 'http://localhost:3000'
      const history = createMemoryHistory()
      const store = configureMockStore([thunk])({})

      syncHistoryToStore({ history, store, host })

      nock(host).get('/test').reply(200, { component: 'TestPage', props: {} })

      store.subscribe(function () {
        const [action] = store.getActions()

        expect(action.type).to.eq(SET_LOCATION)
        expect(action.location.pathname).to.eq('/test')
        expect(action.component).to.eq('TestPage')
        expect(action.props).to.deep.equal({})

        done()
      })

      history.push({ pathname: '/test', search: '?query=true' })
    })
  })

  describe('when a page object is included in the location state', function () {
    it('should fetch JSON of the new page on history changes', function (done) {
      const host = 'http://localhost:3000'
      const history = createMemoryHistory()
      const store = configureMockStore([thunk])({})

      syncHistoryToStore({ history, store, host })

      store.subscribe(function () {
        const [action] = store.getActions()

        expect(action.type).to.eq(SET_LOCATION)
        expect(action.location.pathname).to.eq('/existing')
        expect(action.component).to.eq('MyExistingPage')
        expect(action.props).to.deep.equal({ existing: true })

        done()
      })

      const page = {
        component: 'MyExistingPage',
        props: { existing: true }
      }

      history.push({ pathname: '/existing', state: { page } })
    })
  })
})
