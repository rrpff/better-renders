const test = require('ava')
const nock = require('nock')
const { spy } = require('sinon')
const createServerHttp = require('../src/createServerHttp')

test('createServerHttp should call pushLocationWithPage with page data after a response', async t => {
  nock('http://www.example.com').get('/test').reply(200, {})

  const pushLocationWithPage = spy()
  const serverHttp = createServerHttp(pushLocationWithPage)
  await serverHttp('http://www.example.com/test')

  t.deepEqual(['/test', {}], pushLocationWithPage.firstCall.args)
})

test('createServerHttp should merge JSON headers into the options', async t => {
  const reqheaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Test-Header': '123'
  }

  const mock = nock('http://www.example.com', { reqheaders }).get('/test').reply(200, {})
  const serverHttp = createServerHttp(() => {})
  await serverHttp('http://www.example.com/test', { headers: { 'X-Test-Header': '123' } })

  mock.done()
  t.pass()
})
