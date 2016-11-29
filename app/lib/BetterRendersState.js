const React = require('react')
const serialize = require('serialize-js')

const BetterRendersState = ({ host, initialComponent, initialProps }) =>
  <script
    dangerouslySetInnerHTML={{ __html: `
window.__betterState = {
  host: '${host}',
  initialComponent: '${initialComponent}',
  initialProps: ${serialize(initialProps)}
};
    ` }}
  />

module.exports = BetterRendersState
