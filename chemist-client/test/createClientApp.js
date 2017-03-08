const test = require('ava')
const React = require('react')
const { mount } = require('enzyme')
const nock = require('nock')
const createMemoryHistory = require('history/createMemoryHistory').default
const createClientApp = require('../src/createClientApp')
const Link = require('../src/Link')

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

window.__chemistState = { initialComponent, initialProps }

test('createClientApp should initialise a <Provider /> and a <ClientRouter />', t => {
  const { app } = createClientApp({ pages })
  const wrapper = mount(app)
  t.is('Provider', wrapper.type().name)
  t.is('ClientRouter', wrapper.find('ClientRouter').type().name)
})

test('createClientApp should use the initial component and props defined in window.__chemistState when renderered', t => {
  const { app } = createClientApp({ pages })
  const wrapper = mount(app)
  t.is('Welcome to the homepage', wrapper.find('.home-page h1').text())
})

test.cb('createClientApp should make requests to the current host when changing the page', t => {
  t.plan(1)

  const mock = nock('http://www.example.com').get('/about').reply(200, {
    component: 'AboutPage',
    props: { text: 'this is the about page all about us' }
  })

  const history = createMemoryHistory()
  const { app, store } = createClientApp({ history, pages })
  const wrapper = mount(app)

  store.subscribe(function () {
    mock.done()
    t.is('this is the about page all about us', wrapper.text())
    t.end()
  })

  const link = wrapper.find('a')
  link.simulate('click')
})

test('createClientApp should create a redux store', t => {
  const { store } = createClientApp({ pages })
  t.is('function', typeof store.dispatch)
  t.is('function', typeof store.subscribe)
  t.is('function', typeof store.getState)
  t.is('function', typeof store.replaceReducer)
})

test('createClientApp should create a history object', t => {
  const { history } = createClientApp({ pages })
  t.deepEqual(history.location, {
    pathname: '/',
    search: '',
    hash: '',
    state: undefined,
    key: undefined
  })
})

test('createClientApp should allow overriding the history object', t => {
  const memoryHistory = createMemoryHistory()
  const { history } = createClientApp({ history: memoryHistory, pages: {} })

  t.is(history, memoryHistory)
})
