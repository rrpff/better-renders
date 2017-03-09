const React = require('react')
const ReactDOM = require('react-dom/server')

const MISSING_COMPONENT_ERROR = 'You must pass a `page` option into render'
const missingPageError = name => `The page "${name}" is not registered`
const invalidModeError = mode => `The mode "${mode}" is invalid. Use "HTML" or "JSON"`

function renderJson ({ page, props }) {
  return Promise.resolve({ page, props })
}

function renderHtml ({ Document, PageComponent, page, props }) {
  const layoutProps = { assets: global.webpackIsomorphic.assets() }

  try {
    let content = ReactDOM.renderToString(<PageComponent {...props} />)

    content = ReactDOM.renderToStaticMarkup(
      <Document
        content={content}
        page={page}
        pageProps={props}
        {...layoutProps}
      />
    )

    return Promise.resolve(content)
  } catch (e) {
    return Promise.reject(e)
  }
}

function render ({ mode, pages, page, props, Document }) {
  if (process.env.NODE_ENV === 'development') {
    global.webpackIsomorphic.refresh()
  }

  if (!page) return Promise.reject(new Error(MISSING_COMPONENT_ERROR))

  const PageComponent = pages[page]
  if (!PageComponent) return Promise.reject(new Error(missingPageError(page)))

  switch (mode) {
    case 'JSON': return renderJson({ page, props })
    case 'HTML': return renderHtml({ Document, PageComponent, page, props })
    default: return Promise.reject(new Error(invalidModeError(mode)))
  }
}

module.exports = render
