const React = require('react')
const ReactDOM = require('react-dom/server')

const MISSING_COMPONENT_ERROR = 'You must pass a component into render'
const missingComponentError = name => `The component ${name} is not registered`

function createRenderer ({ components = {}, Layout } = {}) {
  return function renderer ({ mode, baseProps } = {}) {
    return function render (component, props = {}) {
      if (!component) return Promise.reject(new Error(MISSING_COMPONENT_ERROR))

      const Component = components[component]
      if (!Component) return Promise.reject(new Error(missingComponentError(component)))

      const allProps = Object.assign({}, baseProps, props)

      switch (mode) {
        case 'JSON': {
          return JSON.stringify(allProps)
        }
        case 'HTML': {
          let content = ReactDOM.renderToString(<Component {...allProps} />)
          if (Layout) content = ReactDOM.renderToStaticMarkup(<Layout content={content} />)
          return content
        }
        default: {
          return null
        }
      }
    }
  }
}

module.exports = createRenderer
