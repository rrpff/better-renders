const React = require('react')
const { connect } = require('react-redux')
const { createLocation } = require('history')

const HISTORY_NOT_PRESENT_ERROR = '<ClientRouter> will not work without a history prop'

class ClientRouter extends React.Component {
  getChildContext () {
    const pushLocation = pathname => {
      const location = createLocation(pathname)
      this.props.history.push(location)
    }

    const pushLocationWithPage = (pathname, page) => {
      const location = createLocation(pathname)
      location.state = location.state || {}
      location.state.page = page

      this.props.history.push(location)
    }

    const router = { pushLocation, pushLocationWithPage }
    return { router }
  }

  componentWillMount () {
    if (!this.props.history) {
      throw new Error(HISTORY_NOT_PRESENT_ERROR)
    }
  }

  render () {
    const { Component, props } = this.props.routing
    return <Component {...props} />
  }
}

ClientRouter.childContextTypes = {
  router: React.PropTypes.object
}

const connector = connect(state => ({ routing: state.routing }))
module.exports = connector(ClientRouter)
