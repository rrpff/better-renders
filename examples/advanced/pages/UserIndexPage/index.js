const React = require('react')
const Page = require('../Page')
const UserList = require('../../components/UserList')
const Link = require('../../../../app/lib/Link')

class UserIndexPage extends Page {
  render () {
    const { users } = this.props

    return (
      <article>
        <h1>Users ({users.length})</h1>
        <h3><Link href="/users/new">create user</Link></h3>
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
