'use client'
import React from 'react'

import { isLoggedIn } from '../utils/auth'
import Login from './Login'

// More info at https://reacttraining.com/react-router/web/example/auth-workflow
export default function PrivateRoute(props) {
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
