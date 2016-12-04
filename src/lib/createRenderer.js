const React = require('react')
const ReactDOM = require('react-dom/server')

const MISSING_COMPONENT_ERROR = 'You must pass a component into render'
const missingComponentError = name => `The component ${name} is not registered`

function createRenderer ({ host, components = {}, Layout } = {}) {
  return function renderer ({ mode, baseProps = {}, layoutProps = {} } = {}) {
    return function render (componentName, props = {}) {
      if (!componentName) return Promise.reject(new Error(MISSING_COMPONENT_ERROR))

      const Component = components[componentName]
      if (!Component) return Promise.reject(new Error(missingComponentError(componentName)))

      const allProps = Object.assign({}, baseProps, props)

      switch (mode) {
        case 'JSON': {
          return Promise.resolve({
            component: componentName,
            props: allProps
          })
        }
        case 'HTML': {
          try {
            let content = ReactDOM.renderToString(<Component {...allProps} />)

            if (Layout) {
              content = ReactDOM.renderToStaticMarkup(
                <Layout
                  content={content}
                  component={componentName}
                  childProps={allProps}
                  host={host}
                  {...layoutProps}
                />
              )
            }

            return Promise.resolve(content)
          } catch (e) {
            return Promise.reject(e)
          }
        }
        default: {
          return Promise.resolve()
        }
      }
    }
  }
}

module.exports = createRenderer
