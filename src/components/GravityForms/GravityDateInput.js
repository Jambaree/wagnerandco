import React from 'react'
import GravityTextInput from './GravityTextInput'
import { Rifm } from 'rifm'
import fecha from 'fecha'

// https://github.com/istarkov/rifm/blob/master/docs/format.js
export const dateFormat = str => {
  const clean = str.replace(/[^\d]+/gi, '')
  const chars = clean.split('')

  // 2, 4 would be DD-MM-YYYY
  // 4, 6 would be YYYY-MM-DD
  return chars.reduce(
    (r, v, index) =>
      (index === 4 || index === 6 ? `${r}-${v}` : `${r}${v}`).substr(0, 10),
    ''
  )
}

class GravityDateInput extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      supportsDateInput: true,
      value: props.value || props.defaultValue,
    }
  }

  // https://stackoverflow.com/a/10199306/864799
  checkDateInput() {
    let input = document.createElement('input')
    input.setAttribute('type', 'date')

    let notADateValue = 'not-a-date'
    input.setAttribute('value', notADateValue)

    return input.value !== notADateValue
  }

  componentDidMount() {
    this.setState({
      supportsDateInput: this.checkDateInput(),
    })
  }

  render() {
    const props = this.props
    const state = this.state

    if (state.supportsDateInput) {
      return <GravityTextInput {...props} size="small" />
    }

    return (
      <Rifm
        replace={value => value.length >= 10}
        format={dateFormat}
        value={state.value}
        onChange={newValue => {
          this.setState({
            value: newValue,
          })
        }}>
        {({ value, onChange }) => {
          return (
            <GravityTextInput
              {...props}
              type="date"
              placeholder="yyyy-mm-dd"
              onChange={onChange}
              value={value}
              maxLength={10}
              max={props.rangeMax}
              size="small"
            />
          )
        }}
      </Rifm>
    )
  }
}

GravityDateInput.defaultProps = {
  rangeMax: '9999-12-31',
  rangeMin: fecha.format(new Date(), 'YYYY-MM-DD'),

  // Primarily for fallback date input
  visibility: 'visible',
  cssClass: 'input block col-12',
  label: '',
  required: false,
  type: 'text',
  size: 'small',
  maxLength: null,
  placeholder: '',
}

export default GravityDateInput
