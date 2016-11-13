const { SET_LOCATION } = require('../../app/lib/types')

function setLocation (location) {
  return { type: SET_LOCATION, location }
}

module.exports = function syncHistoryToStore (history, store) {
  history.listen(location => {
    store.dispatch(setLocation(location))
  })
}
