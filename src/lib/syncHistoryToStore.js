const { setLocation, fetchLocation } = require('./actions/routing')

module.exports = function syncHistoryToStore ({ history, store }) {
  const host = `${window.location.protocol}//${window.location.host}`

  history.listen(location => {
    const page = location.state && location.state.page

    if (page) {
      const payload = Object.assign({}, page, { location })
      store.dispatch(setLocation(payload))
    } else {
      store.dispatch(fetchLocation({ host, location }))
    }
  })
}
