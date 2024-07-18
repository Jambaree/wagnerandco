import React from 'react'
import PropTypes from 'prop-types'

// This approach is based on Gatsby Simple Auth
// example https://git.io/vpgqr MIT

class LoginFormWithCountry extends React.Component {
  render() {
    const { handleSubmit, handleUpdate, ...props } = this.props

    return (
      <form className="form" method="post" onSubmit={this.props.handleSubmit}>
        {props.children}
        <label className="block">
          <strong className="bold">Password</strong>
          <input
            className="input"
            type="password"
            name="password"
            required
            onChange={handleUpdate}
          />
        </label>
        <input
          className="btn btn-primary px3 py2 h4"
          type="submit"
          value={props.submitLabel}
        />
      </form>
    )
  }
}

const LoginForm = (props) => {
  return <LoginFormWithCountry {...props} />
}

LoginForm.defaultProps = {
  submitLabel: 'Login',
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  submitLabel: PropTypes.string.isRequired,
}

export default LoginForm
