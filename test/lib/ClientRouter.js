const React = require('react')
const { createStore, combineReducers } = require('redux')
const { Provider } = require('react-redux')
const { render } = require('enzyme')
const createMemoryHistory = require('history/createMemoryHistory').default
const createRoutingReducer = require('../../app/lib/createRoutingReducer')
const syncHistoryToStore = require('../../app/lib/syncHistoryToStore')
const ClientRouter = require('../../app/lib/ClientRouter')

describe('Client Router', function () {
  describe('when rendering in the app', function () {
    const HomePage = () => <div className="homepage" />
    const AboutPage = () => <div className="aboutpage" />
    const routes = {
      '/': HomePage,
      '/about': AboutPage
    }

    const history = createMemoryHistory()
    const reducer = combineReducers({ routing: createRoutingReducer(routes) })
    const store = createStore(reducer)
    syncHistoryToStore(history, store)

    const app = (
      <Provider store={store}>
        <ClientRouter />
      </Provider>
    )

    it('should only render the component for the current URL', function () {
      history.push({ pathname: '/' })
      const homeWrapper = render(app)
      expect(homeWrapper.find('.homepage')).to.have.length(1)
      expect(homeWrapper.find('.aboutpage')).to.have.length(0)

      history.push({ pathname: '/about' })
      const aboutWrapper = render(app)
      expect(aboutWrapper.find('.homepage')).to.have.length(0)
      expect(aboutWrapper.find('.aboutpage')).to.have.length(1)
    })
  })
})
