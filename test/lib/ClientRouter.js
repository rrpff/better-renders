const React = require('react')
const nock = require('nock')
const { applyMiddleware, createStore, combineReducers } = require('redux')
const thunk = require('redux-thunk').default
const { Provider } = require('react-redux')
const { render } = require('enzyme')
const createMemoryHistory = require('history/createMemoryHistory').default
const createRoutingReducer = require('../../src/lib/createRoutingReducer')
const syncHistoryToStore = require('../../src/lib/syncHistoryToStore')
const ClientRouter = require('../../src/lib/ClientRouter')

describe('Client Router', function () {
  describe('when rendering in the app', function () {
    const HomePage = () => <div className="homepage" />
    const AboutPage = () => <div className="aboutpage" />

    const host = 'http://localhost:3000'
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

    it('should only default to the homepage', function () {
      const wrapper = render(app)
      expect(wrapper.find('.homepage')).to.have.length(1)
      expect(wrapper.find('.aboutpage')).to.have.length(0)
    })

    it('should only render the component for the current URL', function (done) {
      nock(host).get('/about').reply(200, { component: 'AboutPage', props: {} })
      history.push({ pathname: '/about' })

      store.subscribe(function () {
        const wrapper = render(app)
        expect(wrapper.find('.homepage')).to.have.length(0)
        expect(wrapper.find('.aboutpage')).to.have.length(1)
        done()
      })
    })

    it('should throw an error when a history object isn\'t passed in', function () {
      const invalidApp = (
        <Provider store={store}>
          <ClientRouter />
        </Provider>
      )

      expect(() => render(invalidApp)).to.throw(
        '<ClientRouter> will not work without a history prop'
      )
    })
  })
})
