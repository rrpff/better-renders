const { setLocation } = require('./actions/routing')

module.exports = function syncHistoryToStore (history, store) {
  store.dispatch(setLocation(history.location))

  history.listen(location => {
    store.dispatch(setLocation(location))
  })
}
