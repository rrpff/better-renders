const React = require('react')
const express = require('express')
const supertest = require('supertest')
const sanitize = require('sanitize-html')
const rendering = require('../../app/lib/middleware')

describe('Express middleware', function () {
  describe('when rendering pages', function () {
    function createTestMessagingApp () {
      const Layout = props =>
        <body dangerouslySetInnerHTML={{ __html: props.content }} />

      const MessagePage = function ({ params, message }) {
        return (
          <article>
            <h1>{message}</h1>
            <p>This is message ID {params.id}</p>
          </article>
        )
      }

      const app = express()
      app.use(rendering({ components: { MessagePage }, Layout }))

      app.get('/message/:id', function (req, res) {
        const message = 'The sky is blue'
        res.better.render('MessagePage', { message })
      })

      return app
    }

    describe('and the route exists and renders content', function () {
      describe('and the content-type is not application/json', function () {
        it('should render the page as HTML', function (done) {
          const app = createTestMessagingApp()

          supertest(app)
            .get('/message/123')
            .expect(200)
            .expect(function (res) {
              const cleanHtml = sanitize(res.text, { allowedTags: ['body', 'article', 'h1', 'p'] })
              expect(cleanHtml).to.eq('<body><article><h1>The sky is blue</h1><p>This is message ID 123</p></article></body>')
            })
            .end(done)
        })
      })

      describe('and the content-type is application/json', function () {
        it('should render the page props as JSON', function (done) {
          const app = createTestMessagingApp()

          supertest(app)
            .get('/message/123')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(function (res) {
              expect(res.body).to.deep.equal({
                component: 'MessagePage',
                props: {
                  params: { id: '123' },
                  message: 'The sky is blue'
                }
              })
            })
            .end(done)
        })
      })

      // it('should pass errors down the chain', function () {
      // })
    })
  })
})
