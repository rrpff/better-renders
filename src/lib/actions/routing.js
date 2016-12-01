const { SET_LOCATION } = require('../types')

function setLocation ({ location, component, props }) {
  return { type: SET_LOCATION, location, component, props }
}

function fetchLocation ({ host, location }) {
  return dispatch => {
    const path = host + location.pathname
    fetch(path, { headers: { Accept: 'application/json' } })
      .then(res => res.json())
      .then(({ component, props }) => dispatch(setLocation({ location, component, props })))
      // TODO: handle this error properly
      .catch(err => { throw err })
  }
}

exports.setLocation = setLocation
exports.fetchLocation = fetchLocation
