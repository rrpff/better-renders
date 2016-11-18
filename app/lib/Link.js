const React = require('react')

function Link (props) {
  const handleClick = e => {
    e.preventDefault()
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

module.exports = Link
