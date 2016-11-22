const createRenderer = require('./createRenderer')

const requestMode = req => {
  const accepts = req.headers.accept
  return accepts && accepts.includes('application/json') ? 'JSON' : 'HTML'
}

const responder = (res, mode) => body => {
  if (mode === 'HTML') return res.send(body)
  if (mode === 'JSON') return res.json(body)
  return null
}

module.exports = function middleware (rendererOptions) {
  const renderer = createRenderer(rendererOptions)

  return function renderingMiddleware (req, res, next) {
    res.better = {}

    res.better.render = function (component, props = {}) {
      const mode = requestMode(req)
      const baseProps = { params: req.params }

      const render = renderer({ mode, baseProps })
      const respond = responder(res, mode)

      render(component, props)
        .then(respond)
        .catch(next)
    }

    next()
  }
}
