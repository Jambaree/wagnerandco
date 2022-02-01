import React from 'react'
import PropTypes from 'prop-types'
import { isLoggedIn } from '../utils/auth'
import Login from './Login'

// More info at https://reacttraining.com/react-router/web/example/auth-workflow
const PrivateRoute = props => {
  const { children, ...loginProps } = props
  let isBrowser = typeof window !== 'undefined'
  // console.log('logged in', isLoggedIn())

  if (!isBrowser) {
    return null
  } else if (isLoggedIn()) {
    return React.cloneElement(props.children)
  } else {
    let onSuccess = props.onSuccess

    return <Login onSuccess={onSuccess} {...loginProps} />
  }
}

PrivateRoute.propTypes = {
  children: PropTypes.any.isRequired,
  onSuccess: PropTypes.string.isRequired,
}

PrivateRoute.defaultProps = {
  submitLabel: 'Login',
  title: 'Login',
  subtitle: 'You need a password to see this.',
}

export default PrivateRoute
