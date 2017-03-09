const render = require('../../chemist-render')

const requestMode = req => {
  const accepts = req.headers.accept
  return accepts && accepts.includes('application/json') ? 'JSON' : 'HTML'
}

const respond = (res, mode, body) => {
  if (mode === 'HTML') return res.send(body)
  if (mode === 'JSON') return res.json(body)
  return null
}

module.exports = function middleware ({ components, Layout } = {}) {
  return function renderingMiddleware (req, res, next) {
    res.chemist = {}

    res.chemist.render = async function (page, props = {}) {
      try {
        const mode = requestMode(req)
        const body = await render({
          mode,
          page,
          Document: Layout,
          props: Object.assign({ params: req.params }, props),
          pages: components
        })

        return respond(res, mode, body)
      } catch (e) {
        return next(e)
      }
    }

    res.chemist.redirect = function (path, { status = 302 } = {}) {
      res.redirect(status, path)
    }

    next()
  }
}
