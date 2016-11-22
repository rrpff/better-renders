const React = require('react')

function Link (props, context) {
  const handleClick = e => {
    e.preventDefault()

    if (context.router) {
      context.router.pushToHistory(props.href)
    }

    props.onClick(e)
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
