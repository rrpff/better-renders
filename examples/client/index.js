require('babel-polyfill')

const React = require('react')
const ReactDOM = require('react-dom')
const { createStore, combineReducers } = require('redux')
const { Provider } = require('react-redux')
const createBrowserHistory = require('history/createBrowserHistory').default
const createRoutingReducer = require('../../app/lib/createRoutingReducer')
const syncHistoryToStore = require('../../app/lib/syncHistoryToStore')
const ClientRouter = require('../../app/lib/ClientRouter')
const Link = require('../../app/lib/Link')

const form = require('serializable-form')
const { Form, FormInput } = require('serializable-form-react')

const bookForm = form({
  fields: {
    title: [
      form.validator(value => value.length > 1, 'too short')
    ],
    author: [
      form.validator(value => value.includes('!!!'), 'not bold enough'),
      form.validator(value => value.toUpperCase() === value, 'must be caps')
    ]
  }
})

const entry = {
  valid: false,
  fields: {
    title: {
      value: 'The Stand',
      valid: true,
      errors: []
    }
  }
}

const history = createBrowserHistory()

function Navigation () {
  return (
    <ul>
      <li><Link href="/?test=123&great">home</Link></li>
      <li><Link href="/about">about</Link></li>
    </ul>
  )
}

function Location () {
  return (
    <section>
      <p>
        The current location is
      </p>
      <pre>
        <code>
          {JSON.stringify(history.location)}
        </code>
      </pre>
    </section>
  )
}

function HomePage () {
  return (
    <section>
      <Navigation />
      <h1>home</h1>
      <Form form={bookForm} entry={entry}>
        <FormInput field="title" type="text" />
        <FormInput field="author" type="text" />
      </Form>
      <Location />
    </section>
  )
}

function AboutPage () {
  return (
    <section>
      <Navigation />
      <h1>about</h1>
      <Location />
    </section>
  )
}

const routes = {
  '/': HomePage,
  '/about': AboutPage
}

const reducer = combineReducers({ routing: createRoutingReducer(routes) })
const store = createStore(reducer)
syncHistoryToStore(history, store)

store.subscribe(console.log.bind(console))

const app = (
  <Provider store={store}>
    <ClientRouter history={history} />
  </Provider>
)

const root = document.getElementById('root')
ReactDOM.render(app, root)
