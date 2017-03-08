const test = require('ava')
const React = require('react')
const sanitize = require('sanitize-html')
const render = require('../src')

const Document = props =>
  <body dangerouslySetInnerHTML={{ __html: props.content }} />

const Message = ({ params, message }) =>
  <article>
    <h1>{message}</h1>
    <p>This is message ID {params.id}</p>
  </article>

// TODO: use chemist-assets instead
global.webpackIsomorphic = {
  refresh: () => {},
  assets: () => ({})
}

test('when the mode is HTML it should render the page as HTML', async t => {
  const html = await render({
    mode: 'HTML',
    pages: { Message },
    page: 'Message',
    props: { message: 'The sky is blue', params: { id: 123 } },
    Document
  })

  const cleanHtml = sanitize(html, { allowedTags: ['body', 'article', 'h1', 'p'] })
  t.is(cleanHtml, '<body><article><h1>The sky is blue</h1><p>This is message ID 123</p></article></body>')
})

test('when the mode is JSON it should render the page as JSON', async t => {
  const json = await render({
    mode: 'JSON',
    pages: { Message },
    page: 'Message',
    props: { message: 'The sky is blue', params: { id: 123 } },
    Document
  })

  t.deepEqual(json, {
    page: 'Message',
    props: {
      params: { id: 123 },
      message: 'The sky is blue'
    }
  })
})

test('when the page prop is not passed in', async t => {
  const error = await t.throws(render({}))
  t.is(error.message, 'You must pass a `page` option into render')
})

test('when the page prop does not match a registered page component', async t => {
  const error = await t.throws(render({ pages: {}, page: 'Test' }))
  t.is(error.message, 'The page "Test" is not registered')
})

test('when the mode passed is invalid', async t => {
  const error = await t.throws(render({ mode: 'POP MUSIC', pages: { Message }, page: 'Message' }))
  t.is(error.message, 'The mode "POP MUSIC" is invalid. Use "HTML" or "JSON"')
})
