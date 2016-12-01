const React = require('react')
const { mount } = require('enzyme')
const nock = require('nock')
const createClientApp = require('../../src/lib/createClientApp')
const createMemoryHistory = require('history/createMemoryHistory').default
const Link = require('../../src/lib/Link')

const HOST = 'http://www.example.com'

describe('createClientApp', function () {
  const HomePage = props =>
    <div className="home-page">
      <h1>{props.title}</h1>
      <Link href="/about">About us</Link>
    </div>

  const AboutPage = props =>
    <div>{props.text}</div>

  const pages = { HomePage, AboutPage }
  const initialComponent = 'HomePage'
  const initialProps = { title: 'Welcome to the homepage' }

  window.__chemistState = { host: HOST, initialComponent, initialProps }

  it('should initialise a <Provider /> and a <ClientRouter />', function () {
    const { app } = createClientApp({ pages })
    const wrapper = mount(app)
    expect(wrapper.type().name).to.equal('Provider')
    expect(wrapper.find('ClientRouter').type().name).to.equal('ClientRouter')
  })

  it('should use the initial component and props defined in window.__chemistState when renderered', function () {
    const { app } = createClientApp({ pages })
    const wrapper = mount(app)
    expect(wrapper.find('.home-page h1').text()).to.eq('Welcome to the homepage')
  })

  it('should make requests to the host defined in window.__chemistState when changing the page', function (done) {
    const mock = nock(HOST).get('/about').reply(200, {
      component: 'AboutPage',
      props: { text: 'this is the about page all about us' }
    })

    const history = createMemoryHistory()
    const { app, store } = createClientApp({ history, pages })
    const wrapper = mount(app)

    const link = wrapper.find('a')
    link.simulate('click')

    store.subscribe(function () {
      mock.done()
      expect(wrapper.text()).to.eq('this is the about page all about us')
      done()
    })
  })

  it('should create a redux store', function () {
    const { store } = createClientApp({ pages })
    expect(store.dispatch).to.be.a('function')
    expect(store.subscribe).to.be.a('function')
    expect(store.getState).to.be.a('function')
    expect(store.replaceReducer).to.be.a('function')
  })

  it('should create a history object', function () {
    const { history } = createClientApp({ pages })
    expect(history.location).to.deep.equal({
      pathname: 'blank',
      search: '',
      hash: '',
      state: undefined,
      key: undefined
    })
  })

  it('should allow overriding the history object', function () {
    const memoryHistory = createMemoryHistory()
    const { history } = createClientApp({ history: memoryHistory, pages: {} })

    expect(history).to.equal(memoryHistory)
  })
})
