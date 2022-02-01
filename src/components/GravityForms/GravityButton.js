import React from 'react'
import PropTypes from 'prop-types'

const GravityButton = ({ loading, ...rest }) => {
  return <button className="btn btn-primary h4 p2 px3 col-12" {...rest} />
}

GravityButton.defaultProps = {
  disabled: false,
}

GravityButton.propTypes = {
  disabled: PropTypes.bool,
}

export default GravityButton
