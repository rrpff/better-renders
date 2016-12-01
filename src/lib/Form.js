const React = require('react')
const { Form, FormInput, FormSubmit } = require('serializable-form-react')

class ActionForm extends React.Component {
  handleSubmit (e, form) {
    if (this.props.action) {
      const { serverHttp } = this.context.router

      serverHttp(this.props.action, {
        method: this.props.method,
        body: JSON.stringify(form)
      })
    }

    if (this.props.onSubmit) {
      this.props.onSubmit(e, form)
    }
  }

  render () {
    return (
      <Form {...this.props} onSubmit={this.handleSubmit.bind(this)}>
        {this.props.children}
      </Form>
    )
  }
}

ActionForm.propTypes = Object.assign({}, Form.propTypes, {
  action: React.PropTypes.string,
  method: React.PropTypes.string
})

ActionForm.defaultProps = Object.assign({}, Form.propTypes, {
  method: 'POST'
})

ActionForm.contextTypes = {
  router: React.PropTypes.object
}

exports.Form = ActionForm
exports.FormInput = FormInput
exports.FormSubmit = FormSubmit
