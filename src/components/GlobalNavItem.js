import React from 'react'
import PropTypes from 'prop-types'
import Link from './LinkDuo'

const GlobalNavItem = props => (
  <div>
    <Link
      className={`lowercase border-none ${props.active ? 'muted' : ''} ${
        props.className
      }`}
      to={props.href}>
      {props.label}
    </Link>
  </div>
)

GlobalNavItem.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
}

GlobalNavItem.defaultProps = {
  active: false,
  className: '',
}

export default GlobalNavItem
