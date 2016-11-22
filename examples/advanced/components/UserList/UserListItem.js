const React = require('react')
const Link = require('../../../../app/lib/Link')
const Component = require('../Component')

class UserListItem extends Component {
  render () {
    const { user } = this.props

    return (
      <li>
        <Link href={`/users/${user.username}`}>
          {user.name}
        </Link>
      </li>
    )
  }
}

UserListItem.propTypes = {
  user: React.PropTypes.object.isRequired
}

module.exports = UserListItem
