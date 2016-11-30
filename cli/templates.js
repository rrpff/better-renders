const templates = {}

templates['app/client/index.js'] = () => `
require('babel-polyfill')
const ReactDOM = require('react-dom')
const { createClientApp } = require('@zuren/chemist-rewrite')
const pages = require('../pages')

const { app } = createClientApp({ pages })
const root = document.getElementById('root')

ReactDOM.render(app, root)
`

templates['app/components/Component/index.js'] = () => `
const React = require('react')

class Component extends React.Component {}

module.exports = Component
`

templates['app/layouts/Layout/index.js'] = () => `
const React = require('react')

const Layout = props =>
  <div id="root">
    <main dangerouslySetInnerHTML={{ __html: props.content }} />
  </div>

module.exports = Layout
`

templates['app/layouts/ServerLayout/index.js'] = () => `
const React = require('react')
const { ChemistState } = require('@zuren/chemist-rewrite')
const Layout = require('../Layout')

const ServerLayout = props =>
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <title>{props.title}</title>
    </head>
    <body>
      <Layout content={props.content} />
      <ChemistState
        host={props.host}
        initialComponent={props.component}
        initialProps={props.childProps}
      />
      <script type="text/javascript" src="/index-compiled.js" />
    </body>
  </html>

module.exports = ServerLayout
`

templates['app/pages/HomePage/index.js'] = () => `
const React = require('react')
const Page = require('../Page')

class HomePage extends Page {
  render () {
    return (
      <h1>Welcome to Chemist!</h1>
    )
  }
}

module.exports = HomePage
`

templates['app/pages/NotFoundPage/index.js'] = () => `
const React = require('react')
const Page = require('../Page')

class NotFoundPage extends Page {
  render () {
    return (
      <article>
        <h1>404</h1>
        <p>Not Found</p>
      </article>
    )
  }
}

module.exports = NotFoundPage
`

templates['app/pages/Page/index.js'] = () => `
const React = require('react')

class Page extends React.Component {}

module.exports = Page
`

templates['app/pages/index.js'] = () => `
exports.HomePage = require('./HomePage')
exports.NotFoundPage = require('./NotFoundPage')
`

templates['app/server/controllers/home.js'] = () => `
const { Router } = require('express')

const router = new Router()

router.get('/', function (req, res) {
  res.chemist.render('HomePage')
})

module.exports = router
`

templates['app/server/controllers/notFound.js'] = () => `
const { Router } = require('express')

const router = new Router()

router.use(function (req, res) {
  res.status(404).chemist.render('NotFoundPage')
})

module.exports = router
`

templates['app/server/app.js'] = () => `
const path = require('path')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const rendering = require('./middleware/rendering')

const app = express()

app.use(express.static(path.join(__dirname, '../client')))
app.use(bodyParser.json())
app.use(cors())
app.use(rendering())

app.use(require('./controllers/home'))
app.use(require('./controllers/notFound'))

module.exports = app
`

templates['app/server/middleware/rendering.js'] = () => `
const rendering = require('@zuren/chemist-rewrite/server').middleware
const pages = require('../../pages')
const ServerLayout = require('../../layouts/ServerLayout')

function renderingMiddleware () {
  return rendering({ components: pages, Layout: ServerLayout })
}

module.exports = renderingMiddleware
`

templates['app/server/index.js'] = () => `
if (process.env.NODE_ENV === 'development') {
  require('piping')()
}

const app = require('./app')

const HOST = 'http://localhost'
const PORT = 3000

app.listen(3000, () => {
  console.log(\`Paste running on http://\${HOST}:\${PORT}\`)
})
`

templates['config/app.js'] = () => `
module.exports = function (config) {
  config.app = {
    title: 'Application'
  }
}
`

templates['test/helpers/chai.js'] = () => `
global.expect = require('chai').expect
`

templates['test/helpers/jsdom.js'] = () => `
const { jsdom } = require('jsdom')

global.document = jsdom('')
global.window = document.defaultView

global.navigator = {
  userAgent: 'node.js'
}
`

templates['test/mocha.opts'] = () => `
--compilers js:babel-core/register
--require babel-polyfill
test/helpers/*.js
`

templates['.babelrc'] = () => `
{
  "presets": ["react", "latest"]
}
`

templates['.eslintrc'] = () => `
{
  "extends": "eslint-config-airbnb",
  "env": {
    "browser": true,
    "node": true,
    "mocha": true
  },
  "rules": {
    "react/no-multi-comp": 0,
    "react/prop-types": 0,
    "react/forbid-prop-types": 0,
    "react/jsx-filename-extension": 0,
    "react/jsx-no-bind": 0,
    "react/prefer-stateless-function": 0,
    "import/default": 0,
    "import/no-duplicates": 0,
    "import/named": 0,
    "import/namespace": 0,
    "import/no-unresolved": 0,
    "import/no-named-as-default": 2,
    "import/prefer-default-export": 0,
    "import/no-extraneous-dependencies": 0,
    "comma-dangle": 0,
    "indent": [2, 2, {"SwitchCase": 1}],
    "no-console": 0,
    "no-alert": 0,
    "semi": [2, "never"],
    "space-before-function-paren": [2, { "anonymous": "always", "named": "always" }],
    "no-empty": 0,
    "func-names": 0,
    "prefer-arrow-callback": 0,
    "no-underscore-dangle": 0,
    "global-require": 0,
    "no-param-reassign": 0,
    "generator-star-spacing": 0,
    "no-return-assign": 0,
    "arrow-parens": ["error", "as-needed"],
    "jsx-a11y/no-static-element-interactions": 0,
    "class-methods-use-this": 0
  },
  "plugins": [
    "react"
  ],
  "globals": {
    "expect": true
  },
  "parser": "babel-eslint"
}
`

templates['.gitignore'] = () => `
node_modules
**/index-compiled.js
`

templates['package.json'] = () => `
{
  "name": "application",
  "version": "1.0.0",
  "description": "Application",
  "private": true,
  "main": "index.js",
  "scripts": {
    "lint": "eslint -c .eslintrc .",
    "build": "browserify -t babelify app/client/index.js -o app/client/index-compiled.js",
    "watch": "watchify -t babelify app/client/index.js -o app/client/index-compiled.js",
    "dev": "NODE_ENV=development concurrently \\"npm run watch\\" \\"babel-node app/server\\"",
    "test": "mocha --recursive test/server test/pages"
  },
  "keywords": [],
  "author": "Richard Foster <richard@rpf.me> (http://rpf.me)",
  "devDependencies": {
    "babel-cli": "^6.18.0",
    "babel-core": "^6.18.2",
    "babel-eslint": "^7.1.1",
    "babel-polyfill": "^6.16.0",
    "babel-preset-latest": "^6.16.0",
    "babel-preset-react": "^6.16.0",
    "babelify": "^7.3.0",
    "browserify": "^13.1.1",
    "chai": "^3.5.0",
    "concurrently": "^3.1.0",
    "enzyme": "^2.6.0",
    "eslint": "^3.11.0",
    "eslint-config-airbnb": "^13.0.0",
    "eslint-plugin-import": "^2.2.0",
    "eslint-plugin-jsx": "^0.0.2",
    "eslint-plugin-jsx-a11y": "^2.2.3",
    "eslint-plugin-react": "^6.7.1",
    "jsdom": "^9.8.3",
    "mocha": "^3.2.0",
    "nock": "^9.0.2",
    "nock-vcr-recorder": "^0.1.5",
    "piping": "^1.0.0-rc.4",
    "react-addons-test-utils": "^15.4.1",
    "supertest": "^2.0.1",
    "supertest-as-promised": "^4.0.2",
    "watchify": "^3.7.0"
  },
  "dependencies": {
    "@zuren/chemist-rewrite": "1.0.1",
    "body-parser": "^1.15.2",
    "cors": "^2.8.1",
    "express": "^4.14.0",
    "history": "^4.4.1",
    "react": "^15.4.1",
    "react-dom": "^15.4.1",
    "react-redux": "^4.4.6",
    "redux": "^3.6.0",
    "redux-thunk": "^2.1.0"
  }
}
`

module.exports = templates
