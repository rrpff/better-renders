const { setLocation } = require('./actions/routing')

module.exports = function syncHistoryToStore (history, store) {
  history.listen(location => {
    store.dispatch(setLocation(location))
  })
}
