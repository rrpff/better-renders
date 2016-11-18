const React = require('react')
const { connect } = require('react-redux')
const { setLocation } = require('./actions/routing')

class ClientRouter extends React.Component {
  getChildContext () {
    const pushToHistory = pathname => this.props.dispatch(setLocation({ pathname }))
    const router = { pushToHistory }

    return { router }
  }

  render () {
    return <this.props.routing.Component />
  }
}

ClientRouter.childContextTypes = {
  router: React.PropTypes.object
}

const connector = connect(state => ({ routing: state.routing }))
module.exports = connector(ClientRouter)
