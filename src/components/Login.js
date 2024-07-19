'use client'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// Ours
import { handleLogin, isLoggedIn } from '../utils/auth'
import countriesConfig from '../utils/countries-config'
import LoginForm from '../components/LoginForm'
import Header from '../components/Header'
import Wrapper from '../components/Wrapper'

const LoginMessage = ({ visible, children }) => {
  return (
    <div
      style={{ minHeight: '6em', transform: `translateY(-1.5em)` }}
      className="center h5">
      {visible ? (
        <div className="inline-block line-height-3 bg-peach red rounded px3 p2 mx-auto">
          {children}
        </div>
      ) : null}
    </div>
  )
}

const Login = (props) => {
  const [password, setPassword] = useState('')
  const [modified, setModified] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState(false)
  const router = useRouter()

  const handleUpdate = (e) => {
    setPassword(e.target.value)
    setErrors(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (typeof props.countryKey === 'undefined' || !props.countryKey) {
      setModified(true)
      setErrors('countryKey')
      return false
    }

    const result = handleLogin({
      password,
      countryKey: props.countryKey,
    })

    setSubmitted(true)
    setModified(true)
    setErrors(result ? false : 'password')

    if (result) {
      router.push(props.onSuccess)
    }
  }

  const nextLocation = `${props.onSuccess}?country=${props.countryKey}`

  if (isLoggedIn()) {
    router.push(nextLocation)
    return null
  }

  let errorMessage = null

  switch (errors) {
    case 'password':
      errorMessage = (
        <>
          Incorrect password. If you haven’t been provided with one, please{' '}
          <Link href="/contact">fill out our contact form</Link>.
        </>
      )
      break
    case 'countryKey':
      errorMessage = <>You must select a location.</>
      break
    default:
      errorMessage = null
  }

  return (
    <Wrapper>
      <Header title={props.title} subtitle={props.subtitle} />
      <div className="mx-auto max-width-2 mb4">
        <LoginMessage visible={errors} children={errorMessage} />
        <LoginForm
          submitLabel={props.submitLabel}
          handleUpdate={handleUpdate}
          handleSubmit={handleSubmit}>
          <label className="block">
            <strong className="bold">My wedding is in…</strong>
            <select
              required
              className={`block col-12 border-blue mb2 select ${
                modified ? '' : 'input-unused'
              }`}
              value={props.countryKey || ''}
              onChange={props.handleOnChangeCountry}>
              <option value="" disabled hidden>
                Select location…
              </option>
              {Object.keys(props.countries).map((value, index) => {
                const country = props.countries[value]
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

Login.propTypes = {
  onSuccess: PropTypes.string.isRequired,
  countries: PropTypes.object,
}

Login.defaultProps = {
  title: 'Log In',
  subtitle: 'You need to log in to see this page.',
  countries: countriesConfig,
  countryKey: null,
}

export default Login
