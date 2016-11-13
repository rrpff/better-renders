const React = require('react')
const { connect } = require('react-redux')

class ClientRouter extends React.Component {
  render () {
    return <this.props.routing.Component />
  }
}

const connector = connect(state => ({ routing: state.routing }))
module.exports = connector(ClientRouter)
