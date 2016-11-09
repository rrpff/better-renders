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
  describe('when the mode is HTML', function () {
    it('should return a render function which shallow merges its props and returns HTML', function () {
      const render = augmentedRender({ mode: 'HTML', baseProps: { header: 'Test' } })
      const html = render(TestComponent, { body: 'This is a test' })
      const cleanHtml = sanitizeHtml(html, { allowedTags: ['article', 'h1', 'p'] })

      expect(cleanHtml).to.eq('<article><h1>Test</h1><p>This is a test</p></article>')
    })
  })

  describe('when the mode is JSON', function () {
    it('should return a render function which shallow merges its props and returns JSON', function () {
      const render = augmentedRender({ mode: 'JSON', baseProps: { header: 'Test' } })
      const json = render(TestComponent, { body: 'This is a test' })

      expect(JSON.parse(json)).to.deep.equal({
        header: 'Test',
        body: 'This is a test'
      })
    })
  })
})
