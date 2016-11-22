const React = require('react')
const Component = require('../Component')
const UserListItem = require('./UserListItem')

class UserList extends Component {
  render () {
    const { users } = this.props
    const content = users.length === 0
      ? <p>No users</p>
      : <ul>{users.map(user => <UserListItem key={user.username} user={user} />)}</ul>

    return (
      <section>
        {content}
      </section>
    )
  }
}

UserList.propTypes = {
  users: React.PropTypes.array.isRequired
}

module.exports = UserList
