const React = require('react')

class FormInput extends React.Component {
  constructor (...args) {
    super(...args)

    const field = this.context.form.getField(this.props.field)
    this.state = {
      value: (field && field.value) || '',
      valid: (field && field.valid),
      errors: (field && field.errors) || []
    }
  }

  fullClassName () {
    if (this.state.valid === undefined) return this.props.className

    const validityClass = this.state.valid ? 'valid' : 'invalid'
    if (this.props.className) return `${this.props.className} ${validityClass}`

    return validityClass
  }

  async handleChange (e) {
    const value = e.target.value
    const { valid, errors } = await this.context.form.validate(this.props.field, value)
    this.setState({ value, valid, errors })
  }

  render () {
    const errors = this.state.errors.map(error => <span key={error}>{error}</span>)
    const props = Object.assign({}, this.props)
    delete props.field

    return (
      <div>
        <input
          {...props}
          className={this.fullClassName()}
          onChange={this.handleChange.bind(this)}
          value={this.state.value}
        />
        {errors}
      </div>
    )
  }
}

FormInput.propTypes = {
  field: React.PropTypes.string.isRequired
}

FormInput.contextTypes = {
  form: React.PropTypes.object
}

module.exports = FormInput
