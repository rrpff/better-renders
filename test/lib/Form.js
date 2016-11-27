const React = require('react')
const nock = require('nock')
const { mount } = require('enzyme')
const thunk = require('redux-thunk').default
const { applyMiddleware, createStore, combineReducers } = require('redux')
const { Provider } = require('react-redux')
const form = require('serializable-form')
const createMemoryHistory = require('history/createMemoryHistory').default
const createRoutingReducer = require('../../app/lib/createRoutingReducer')
const syncHistoryToStore = require('../../app/lib/syncHistoryToStore')
const ClientRouter = require('../../app/lib/ClientRouter')
const { Form, FormInput, FormSubmit } = require('../../app/lib/Form')

const HOST = 'http://www.example.com'

const sleep = () => new Promise(process.nextTick)

describe('Form', function () {
  describe('when submitting the form', function () {
    it('should call the given action and re-render the page with the output', async function (done) {
      const guestbookForm = form({ fields: { message: [] } })
      const entry = {
        valid: true,
        fields: {
          message: { value: 'My message', valid: true, errors: [] }
        }
      }

      const GuestbookIndexPage = ({ posts }) => (
        <div>
          <h1>Guestbook Entries</h1>
          <ul>
            {posts.map(post => <li>{post}</li>)}
          </ul>
        </div>
      )

      const GuestbookCreatePage = () => (
        <Form form={guestbookForm} entry={entry} action={`${HOST}/guestbook?withQuery=true`}>
          <FormInput field="message" />
          <FormSubmit>Submit</FormSubmit>
        </Form>
      )

      const history = createMemoryHistory()
      const reducer = combineReducers({
        routing: createRoutingReducer({
          components: { GuestbookIndexPage, GuestbookCreatePage },
          initialComponent: 'GuestbookCreatePage',
          initialProps: {}
        })
      })

      const middlewares = applyMiddleware(thunk)
      const store = createStore(reducer, middlewares)

      syncHistoryToStore({ history, store, host: HOST })

      const endpoint = nock(HOST).post('/guestbook').query({ withQuery: true }).reply(200, {
        component: 'GuestbookIndexPage',
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
        expect(history.location.pathname).to.eq('/guestbook')
        expect(history.location.search).to.eq('?withQuery=true')
        expect(wrapper.html()).to.eq('<div><h1>Guestbook Entries</h1><ul><li>My message</li></ul></div>')
        done()
      })

      const button = wrapper.find('button').first()
      button.simulate('submit', {})
    })
  })
})
