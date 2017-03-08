const React = require('react')
const serialize = require('serialize-js')

const ChemistState = ({ initialComponent, initialProps }) =>
  <script
    dangerouslySetInnerHTML={{ __html: `
window.__chemistState = {
  initialComponent: '${initialComponent}',
  initialProps: ${serialize(initialProps)}
};
    ` }}
  />

module.exports = ChemistState
