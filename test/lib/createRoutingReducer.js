const nock = require('nock')
const { applyMiddleware, createStore, combineReducers } = require('redux')
const thunk = require('redux-thunk').default
const createRoutingReducer = require('../../src/lib/createRoutingReducer')
const { fetchLocation } = require('../../src/lib/actions/routing')

describe('Create Routing Reducer', function () {
  describe('should return a Routing Reducer', function () {
    const TestComponent = () => null
    const reducer = createRoutingReducer({
      components: { TestComponent },
      initialComponent: 'TestComponent',
      initialProps: {}
    })

    expect(reducer).to.be.a('function')
  })

  describe('Routing Reducer', function () {
    describe('when calling fetchLocation', function () {
      it('should set the current component', function (done) {
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

        nock('http://localhost:3000')
          .get('/test')
          .query({ query: true })
          .reply(200, { component: 'TestComponent', props: { query: true } })

        store.subscribe(function () {
          expect(store.getState()).to.deep.equal({
            routing: {
              Component: TestComponent,
              props: { query: true }
            }
          })

          done()
        })

        store.dispatch(fetchLocation({ host: 'http://localhost:3000', location }))
      })
    })
  })
})
