const React = require('react')

const Layout = props =>
  <article dangerouslySetInnerHTML={{ __html: props.content }} />

module.exports = Layout
