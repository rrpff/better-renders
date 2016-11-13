const { SET_LOCATION } = require('../types')

exports.setLocation = function (location) {
  return { type: SET_LOCATION, location }
}
