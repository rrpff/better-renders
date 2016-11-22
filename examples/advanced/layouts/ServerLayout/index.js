const React = require('react')
const serialize = require('serialize-js')
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
      <div id="root">
        <Layout content={props.content} />
        {/* TODO: stop hardcoding */}
        <script
          dangerouslySetInnerHTML={{ __html: `
            window.__betterState = {
              host: 'http://localhost:4000',
              initialComponent: 'UserIndexPage',
              initialProps: ${serialize(props.childProps)}
            };
          ` }}
        />
        <script type="text/javascript" src="/index-compiled.js" />
      </div>
    </body>
  </html>

module.exports = ServerLayout
