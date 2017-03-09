const { SET_LOCATION } = require('../types')

function setLocation ({ location, page, props }) {
  return { type: SET_LOCATION, location, page, props }
}

function fetchLocation ({ host, location }) {
  return dispatch => {
    const path = host + location.pathname + location.search
    fetch(path, { headers: { Accept: 'application/json' } })
      .then(res => res.json())
      .then(({ page, props }) => dispatch(setLocation({ location, page, props })))
      // TODO: handle this error properly
      .catch(err => console.error(err))
  }
}

exports.setLocation = setLocation
exports.fetchLocation = fetchLocation
