'use client'
import React from 'react'
import GravityTextInput from './GravityTextInput'
import { AsYouType } from 'libphonenumber-js'
import { Rifm } from 'rifm'

// https://github.com/istarkov/rifm/blob/master/docs/format.js
const usPhone = new AsYouType('US')

export const formatPhone = (str) => {
  const clean = str.replace(/[^\d]+/gi, '').substr(0, 10)
  const r = usPhone.input(clean)
  usPhone.reset()

  return r
}

class GravityPhoneInput extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value: props.value || props.defaultValue,
    }
  }

  render() {
    const props = this.props
    const state = this.state

    return (
      <Rifm
        format={formatPhone}
        value={state.value}
        onChange={(newValue) => {
          this.setState({
            value: newValue,
          })
        }}>
        {({ value, onChange }) => {
          return (
            <GravityTextInput
              {...props}
              value={value}
              onChange={onChange}
              type="tel"
            />
          )
        }}
      </Rifm>
    )
  }
}

export default GravityPhoneInput
