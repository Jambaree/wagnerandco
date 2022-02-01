import React from 'react'
import PropTypes from 'prop-types'
import Label from './GravityLabel'
import Desc from './GravityDescription'

const GravityTextArea = props => {
  let className = `textarea col-12`
  let id = props.id.toString()
  let rows = {
    small: 4,
    medium: 8,
    large: 12,
  }

  // Set label size to `large`, even if text area
  // size is `small` or `medium`
  let labelSize = 'large'

  return (
    <Label
      htmlFor={id}
      visibility={props.visible}
      text={props.label}
      isRequired={props.isRequired}
      size={labelSize}>
      <Desc {...props}>
        <textarea
          id={id}
          name={id}
          onBlur={props.onBlur}
          className={props.cssClass || className}
          required={props.isRequired}
          maxLength={props.maxLength}
          rows={props.rows || rows[props.size]}
          defaultValue={props.defaultValue}
          placeholder={props.placeholder}
        />
      </Desc>
    </Label>
  )
}

GravityTextArea.defaultProps = {
  visibility: 'visible',
  label: '',
  labelPlacement: 'top_label',
  required: false,
  type: 'text',
  size: 'medium',
  maxLength: null,
  placeholder: '',
}

GravityTextArea.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  visibility: PropTypes.string,
  label: PropTypes.string,
  labelPlacement: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
  size: PropTypes.string,
  maxLength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  placeholder: PropTypes.string,
}

export default GravityTextArea
