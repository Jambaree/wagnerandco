import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { navigate } from '@reach/router'

// Ours
import { handleLogin, isLoggedIn } from '../utils/auth'
import countriesConfig from '../utils/countries-config'
import LoginForm from '../components/LoginForm'
import Header from '../components/Header'
import Wrapper from '../components/Wrapper'

const LoginMessage = (props) => {
  return (
    <div
      style={{ minHeight: '6em', transform: `translateY(-1.5em)` }}
      className="center h5">
      {props.visible ? (
        <div className="inline-block line-height-3 bg-peach red rounded px3 p2 mx-auto">
          {props.children}
        </div>
      ) : null}
    </div>
  )
}

// This approach is based on Gatsby Simple Auth
// example https://git.io/vpgqr MIT

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      // username: '',
      password: '',
      modified: false,
      submitted: false,
      errors: false,
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleUpdate(e) {
    this.setState({
      // If you want the password base64 encoded, purely
      // so the string will not be directly in the source code
      // [e.target.name]: btoa(e.target.value),
      [e.target.name]: e.target.value,
      errors: false,
    })
  }

  handleSubmit(e) {
    e.preventDefault()

    console.log(e)
    console.log(this.props.countryKey)

    if (
      typeof this.props.countryKey === 'undefined' ||
      !this.props.countryKey
    ) {
      this.setState({
        modified: true,
        errors: 'countryKey',
      })
      return false
    }

    let result = handleLogin({
      password: this.state.password,
      countryKey: this.props.countryKey,
    })

    this.setState({
      submitted: true,
      modified: true,
      errors: result ? false : 'password',
    })

    if (result) {
      navigate(this.props.onSuccess)
    }
  }

  render() {
    const { handleSubmit, handleUpdate, ...props } = this.props
    // let activeCountry = props.countries[props.countryKey]

    let nextLocation = `${props.onSuccess}?country=${props.countryKey}`

    if (isLoggedIn()) {
      navigate(nextLocation)
      return null
    }

    let errorMessage = null

    switch (this.state.errors) {
      case 'password':
        errorMessage = (
          <React.Fragment>
            Incorrect password. If you haven’t been provided with one, please{' '}
            <Link href="/contact">fill out our contact form</Link>.
          </React.Fragment>
        )
        break
      case 'countryKey':
        errorMessage = (
          <React.Fragment>You must select a location.</React.Fragment>
        )
        break
      default:
        errorMessage = null
    }

    return (
      <Wrapper>
        <Header title={props.title} subtitle={props.subtitle} />
        <div className="mx-auto max-width-2 mb4">
          <LoginMessage visible={this.state.errors} children={errorMessage} />
          <LoginForm
            submitLabel={props.submitLabel}
            handleUpdate={(e) => this.handleUpdate(e)}
            handleSubmit={(e, cb) => this.handleSubmit(e, cb)}>
            <label className="block">
              <strong className="bold">My wedding is in…</strong>
              <select
                required
                className={`block col-12 border-blue mb2 select ${
                  this.state.modified ? '' : 'input-unused'
                }`}
                value={props.countryKey || ''}
                onChange={props.handleOnChangeCountry}>
                <option value="" disabled hidden>
                  Select location…
                </option>
                {Object.keys(props.countries).map((value, index) => {
                  let country = props.countries[value]
                  return (
                    <option key={`opt_${value}_${index}`} value={value}>
                      {country.label}
                    </option>
                  )
                })}
              </select>
            </label>
          </LoginForm>
        </div>
      </Wrapper>
    )
  }
}

Login.propTypes = {
  onSuccess: PropTypes.string.isRequired,
  countries: PropTypes.object,
}

// TODO Consolidate this
Login.defaultProps = {
  title: 'Log In',
  subtitle: 'You need to log in to see this page.',
  countries: countriesConfig,
  countryKey: null,
}

export default Login
