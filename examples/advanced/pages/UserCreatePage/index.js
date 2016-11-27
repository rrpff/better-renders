const React = require('react')
const Page = require('../Page')
const { Form, FormInput, FormSubmit } = require('../../../../app/lib/Form')
const userCreateForm = require('../../forms/userCreateForm')

class UserCreatePage extends Page {
  render () {
    const { entry } = this.props

    return (
      <section>
        <h1>Create a new user</h1>

        <Form form={userCreateForm} entry={entry} action="http://localhost:4000/users">
          <FormInput field="name" />
          <FormInput field="username" />
          <FormInput field="age" type="number" />

          <FormSubmit>Submit</FormSubmit>
        </Form>
      </section>
    )
  }
}

UserCreatePage.propTypes = {
  entry: React.PropTypes.object.isRequired
}

module.exports = UserCreatePage
