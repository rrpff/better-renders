const React = require('react')
const supertest = require('supertest-as-promised')
const chemist = require('../../src/lib/chemist')

describe('chemist', function () {
  const Layout = props =>
    <body>
      <div
        id="root"
        dangerouslySetInnerHTML={{ __html: props.content }}
      />
    </body>

  const HomePage = props =>
    <article>
      <h1>Test Chemist App</h1>
      <h3>Welcome {props.username}</h3>
    </article>

  const server = chemist({ pages: { HomePage }, Layout })

  server.get('/', function (req, res) {
    res.chemist.render('HomePage', { username: 'storm' })
  })

  it('should create an express app with default middleware', function () {
    const expectedBody = '<body><div id="root"><article data-reactroot="" data-reactid="1" ' +
      'data-react-checksum="1559643361"><h1 data-reactid="2">Test Chemist App</h1><h3 data-' +
      'reactid="3"><!-- react-text: 4 -->Welcome <!-- /react-text --><!-- react-text: 5 -->' +
      'storm<!-- /react-text --></h3></article></div></body>'

    return supertest(server)
      .get('/')
      .expect(200, expectedBody)
  })
})
