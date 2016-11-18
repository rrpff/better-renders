const React = require('react')

const NO_CLIENT_ROUTER_ERROR = '<Link> must not be used outside of a <ClientRouter> instance'

function Link (props, context) {
  const handleClick = e => {
    e.preventDefault()
    context.router.pushToHistory(props.href)
    props.onClick(e)
  }

  if (context.router === undefined) {
    throw new Error(NO_CLIENT_ROUTER_ERROR)
  }

  return (
    <a {...props} onClick={handleClick}>
      {props.children}
    </a>
  )
}

Link.propTypes = {
  onClick: React.PropTypes.func
}

Link.defaultProps = {
  onClick: () => {}
}

Link.contextTypes = {
  router: React.PropTypes.object
}

module.exports = Link
