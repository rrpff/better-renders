const React = require('react')
const serialize = require('serialize-js')

const ChemistState = ({ initialPage, initialProps }) =>
  <script
    dangerouslySetInnerHTML={{ __html: `
window.__chemistState = {
  initialPage: '${initialPage}',
  initialProps: ${serialize(initialProps)}
};
    ` }}
  />

module.exports = ChemistState
