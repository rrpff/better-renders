const React = require('react')
const serialize = require('serialize-js')

const ChemistState = ({ host, initialComponent, initialProps }) =>
  <script
    dangerouslySetInnerHTML={{ __html: `
window.__chemistState = {
  host: '${host}',
  initialComponent: '${initialComponent}',
  initialProps: ${serialize(initialProps)}
};
    ` }}
  />

module.exports = ChemistState
