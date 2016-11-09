const React = require('react')
const sanitizeHtml = require('sanitize-html')
const augmentedRender = require('../../app/lib/render')

const TestComponent = function ({ header, body }) {
  return (
    <article>
      <h1>{header}</h1>
      <p>{body}</p>
    </article>
  )
}

describe('Augmented Render', function () {
  it('should return a render function which shallow merges its props', function () {
    const render = augmentedRender({ header: 'Test' })
    const html = render(TestComponent, { body: 'This is a test' })
    const cleanHtml = sanitizeHtml(html, { allowedTags: ['article', 'h1', 'p'] })

    expect(cleanHtml).to.eq('<article><h1>Test</h1><p>This is a test</p></article>')
  })
})
