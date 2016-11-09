const React = require('react')
const ReactDOM = require('react-dom/server')

module.exports = function augmentedRender ({ mode, baseProps }) {
  return function render (Component, childProps) {
    const props = Object.assign({}, baseProps, childProps)

    if (mode === 'JSON') return JSON.stringify(props)
    if (mode === 'HTML') return ReactDOM.renderToString(<Component {...props} />)

    return null
  }
}
