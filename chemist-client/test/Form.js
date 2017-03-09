const test = require('ava')
const React = require('react')
const nock = require('nock')
const { mount } = require('enzyme')
const thunk = require('redux-thunk').default
const { applyMiddleware, createStore, combineReducers } = require('redux')
const { Provider } = require('react-redux')
const form = require('serializable-form')
const createMemoryHistory = require('history/createMemoryHistory').default
const createRoutingReducer = require('../src/createRoutingReducer')
const syncHistoryToStore = require('../src/syncHistoryToStore')
const ClientRouter = require('../src/ClientRouter')
const { Form, FormInput, FormSubmit } = require('../src/Form')

const HOST = 'http://www.example.com'

const sleep = () => new Promise(process.nextTick)

test.cb('When submitting the Form, it should call the given action so the page will be re-rendered with the output', t => {
  t.plan(3)

  const guestbookForm = form({ fields: { message: [] } })
  const entry = {
    valid: true,
    fields: {
      message: { value: 'My message', valid: true, errors: [] }
    }
  }

  const GuestbookIndexPage = ({ posts }) =>
    <div>
      <h1>Guestbook Entries</h1>
      <ul>
        {posts.map(post => <li>{post}</li>)}
      </ul>
    </div>

  const GuestbookCreatePage = () =>
    <Form form={guestbookForm} entry={entry} action={`${HOST}/guestbook?withQuery=true`}>
      <FormInput field="message" />
      <FormSubmit>Submit</FormSubmit>
    </Form>

  const history = createMemoryHistory()
  const reducer = combineReducers({
    routing: createRoutingReducer({
      pages: { GuestbookIndexPage, GuestbookCreatePage },
      initialPage: 'GuestbookCreatePage',
      initialProps: {}
    })
  })

  const middlewares = applyMiddleware(thunk)
  const store = createStore(reducer, middlewares)

  syncHistoryToStore({ history, store, host: HOST })

  const endpoint = nock(HOST).post('/guestbook').query({ withQuery: true }).reply(200, {
    page: 'GuestbookIndexPage',
    props: { posts: ['My message'] }
  })

  const wrapper = mount(
    <Provider store={store}>
      <ClientRouter history={history} />
    </Provider>
  )

  store.subscribe(async function () {
    await sleep()

    endpoint.done()
    t.is('/guestbook', history.location.pathname)
    t.is('?withQuery=true', history.location.search)
    t.is('<div><h1>Guestbook Entries</h1><ul><li>My message</li></ul></div>', wrapper.html())
    t.end()
  })

  const button = wrapper.find('button').first()
  button.simulate('submit', {})
})
