const React = require('react')
const URL = require('url-parse')
const Page = require('../Page')
const { Form, FormInput, FormSubmit } = require('../../../../../better-forms-react/dist')
const userCreateForm = require('../../forms/userCreateForm')

class UserCreatePage extends Page {
  render () {
    const { entry } = this.props

    const handleSubmit = (e, form) => {
      const request = fetch('http://localhost:4000/users', {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })

      request.then(async res => {
        const page = await res.json()
        const url = new URL(res.url)
        const path = url.pathname + url.query

        this.context.router.pushLocationWithPage(path, page)
      })
    }

    return (
      <section>
        <h1>Create a new user</h1>

        <Form form={userCreateForm} entry={entry} onSubmit={handleSubmit.bind(this)}>
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

UserCreatePage.contextTypes = {
  router: React.PropTypes.object
}

module.exports = UserCreatePage
