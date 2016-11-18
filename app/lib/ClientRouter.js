const React = require('react')
const { connect } = require('react-redux')
const { createLocation } = require('history')

const HISTORY_NOT_PRESENT_ERROR = '<ClientRouter> will not work without a history prop'

class ClientRouter extends React.Component {
  getChildContext () {
    const pushToHistory = pathname => {
      const location = createLocation(pathname)
      this.props.history.push(location)
    }

    const router = { pushToHistory }
    return { router }
  }

  componentWillMount () {
    if (!this.props.history) {
      throw new Error(HISTORY_NOT_PRESENT_ERROR)
    }
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
