const React = require('react')
const ReactDOM = require('react-dom/server')

module.exports = function augmentedRender (baseProps) {
  return function render (Component, childProps) {
    const props = Object.assign({}, baseProps, childProps)
    return ReactDOM.renderToString(<Component {...props} />)
  }
}
