import React from 'react'
import PropTypes from 'prop-types'
import Label from './GravityLabel'
import Desc from './GravityDescription'

const GravityTextInput = props => {
  // TODO props.numberFormat
  // decimal_dot
  let id = props.id.toString()
  let conditionalProps = {
    defaultValue: props.defaultValue,
  }

  if (typeof props.value === 'string' && typeof props.onChange === 'function') {
    conditionalProps = {
      value: props.value,
      onChange: props.onChange,
    }
  }

  return (
    <Label
      htmlFor={id}
      visibility={props.visibility}
      text={props.label}
      isRequired={props.isRequired}
      size={props.size}>
      <Desc {...props}>
        <input
          {...conditionalProps}
          id={id}
          name={id}
          type={props.type}
          className={props.cssClass}
          required={props.isRequired}
          maxLength={props.maxLength}
          placeholder={props.placeholder || props.inputMaskValue}
          min={props.rangeMin ? props.rangeMin : undefined}
          max={props.rangeMax ? props.rangeMax : undefined}
        />
      </Desc>
    </Label>
  )
}

GravityTextInput.defaultProps = {
  visibility: 'visible',
  cssClass: 'input block col-12',
  label: '',
  required: false,
  type: 'text',
  size: 'medium',
  maxLength: null,
  placeholder: '',
  inputMask: false,
  inputMaskValue: false,
  phoneFormat: null,
}

GravityTextInput.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  visibility: PropTypes.string,
  cssClass: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
  size: PropTypes.string,
  maxLength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  placeholder: PropTypes.string,
  // inputMask: false,
  // inputMaskValue: false,
  // phoneFormat: null,
}

export default GravityTextInput
