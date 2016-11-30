const url = require('url')
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
  return function renderingMiddleware (req, res, next) {
    const host = url.format({ protocol: req.protocol, host: req.get('host') })
    const renderer = createRenderer(Object.assign({ host }, rendererOptions))

    res.chemist = {}

    res.chemist.render = function (component, props = {}) {
      const mode = requestMode(req)
      const baseProps = { params: req.params }

      const render = renderer({ mode, baseProps })
      const respond = responder(res, mode)

      render(component, props)
        .then(respond)
        .catch(next)
    }

    res.chemist.redirect = function (path, { status = 302 } = {}) {
      res.redirect(status, path)
    }

    next()
  }
}
