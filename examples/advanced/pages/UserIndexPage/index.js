const React = require('react')
const Page = require('../Page')
const UserList = require('../../components/UserList')

class UserIndexPage extends Page {
  render () {
    const { users } = this.props

    return (
      <article>
        <h1>Users ({users.length})</h1>
        <UserList users={users} />
      </article>
    )
  }
}

UserIndexPage.propTypes = {
  users: React.PropTypes.array.isRequired,
  params: React.PropTypes.object
}

module.exports = UserIndexPage
