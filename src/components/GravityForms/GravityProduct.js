import React from 'react'
import PropTypes from 'prop-types'

const GravityProduct = props => {
  let warning = 'Gravity Forms products not yet supported.'
  console.warn(warning)
  return (
    <div className="hide">
      <h2 className="mt0">{props.label}</h2>
      <div>{warning}</div>
      {props.inputs.map(nestedField => {
        return (
          <div id={nestedField.id} key={`{props.namespace}_${nestedField.id}`}>
            <label className="block">
              <strong className="mb1">{nestedField.label}</strong>
              {nestedField.name}
            </label>
          </div>
        )
      })}
      {/* <Debug data={props} /> */}
    </div>
  )
}

GravityProduct.defaultProps = {
  label: '',
}

GravityProduct.propTypes = {
  label: PropTypes.string,
  inputs: PropTypes.array.isRequired,
}

export default GravityProduct
