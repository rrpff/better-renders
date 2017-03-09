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

test.cb('the Document component should receive all the props necessary to render the page', t => {
  const expectedLayoutProps = {
    assets: {},
    content: '<article data-reactroot="" data-reactid="1" data-react-checksum="-360692236"><h1 data-reactid="2">The sky is blue</h1><p data-reactid="3"><!-- react-text: 4 -->This is message ID <!-- /react-text --><!-- react-text: 5 -->123<!-- /react-text --></p></article>',
    page: 'Message',
    pageProps: {
      message: 'The sky is blue',
      params: { id: 123 }
    }
  }

  const SpyDocument = props => {
    t.deepEqual(props, expectedLayoutProps)
    t.end()

    return <div />
  }

  render({
    mode: 'HTML',
    pages: { Message },
    page: 'Message',
    props: { message: 'The sky is blue', params: { id: 123 } },
    Document: SpyDocument
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
