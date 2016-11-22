const { fetchLocation } = require('./actions/routing')

module.exports = function syncHistoryToStore ({ history, store, host }) {
  history.listen(location => {
    store.dispatch(fetchLocation({ host, location }))
  })
}
