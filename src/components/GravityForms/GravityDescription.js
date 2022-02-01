import React from 'react'
import PropTypes from 'prop-types'

const GravityDescription = props => {
  let desc = null
  let useDesc = props.description !== '' ? true : false

  if (useDesc) {
    desc = <p className="mt0 line-height-4 h5">{props.description}</p>
  }

  return (
    <React.Fragment>
      {useDesc && props.descriptionPlacement === 'above' ? desc : null}
      {props.children}
      {useDesc && props.descriptionPlacement === 'below' ? desc : null}
    </React.Fragment>
  )
}

GravityDescription.defaultProps = {
  description: '',
  descriptionPlacement: 'below',
}

GravityDescription.propTypes = {
  description: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
}

export default GravityDescription
