const { createStore, combineReducers } = require('redux')
const createRoutingReducer = require('../../app/lib/createRoutingReducer')
const { SET_LOCATION } = require('../../app/lib/types')

describe('Create Routing Reducer', function () {
  describe('should return a Routing Reducer', function () {
    const routes = {}
    expect(createRoutingReducer(routes)).to.be.a('function')
  })

  describe('Routing Reducer', function () {
    describe('when receiving a SET_LOCATION action', function () {
      it('should dispatch set the routing state', function () {
        const TestComponent = () => null
        const routes = {
          '/test': TestComponent
        }

        const reducer = combineReducers({ routing: createRoutingReducer(routes) })
        const store = createStore(reducer)

        store.dispatch({
          type: SET_LOCATION,
          location: {
            pathname: '/test',
            search: '?query=true',
            state: { test: 'state' },
            hash: '',
            key: 'ignwkm'
          }
        })

        expect(store.getState()).to.deep.equal({ routing: { Component: TestComponent } })
      })
    })
  })
})
