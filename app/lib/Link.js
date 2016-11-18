const React = require('react')

module.exports = function Link (props) {
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
