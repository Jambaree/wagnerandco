import React from 'react'
import PropTypes from 'prop-types'

const GravityLabel = props => {
  let Type = props.type
  let requiredLabel = null
  let small = props.size === 'small'

  if (props.isRequired) {
    requiredLabel = (
      <abbr
        className="red border-none text-decoration-none"
        title="This field is required.">
        &nbsp;*
      </abbr>
    )
  }

  return (
    <Type
      className={`block sm-px2 ${
        small ? 'sm-left sm-col-6' : 'clear-both block'
      }`}
      style={{ visibility: props.visibility }}
      htmlFor={props.htmlFor}>
      {props.text ? (
        <strong className="block mb1">
          {props.text}
          {requiredLabel}
        </strong>
      ) : null}
      {props.children}
    </Type>
  )
}

GravityLabel.defaultProps = {
  visibility: 'visible',
  children: null,
  text: '',
  type: 'label',
  isRequired: false,
  className: '',
  size: 'medium',
}

GravityLabel.propTypes = {
  visibility: PropTypes.string,
  text: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.string,
}

export default GravityLabel
