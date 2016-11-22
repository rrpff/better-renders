const React = require('react')
const Page = require('../Page')

class UserShowPage extends Page {
  render () {
    const { user } = this.props

    return (
      <article>
        <h1>{user.username}</h1>
      </article>
    )
  }
}

module.exports = UserShowPage
