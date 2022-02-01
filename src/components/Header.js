import React from 'react'
import PropTypes from 'prop-types'
import { H1, Intro } from '../components/Headings'

const Header = props => {
  return (
    <header
      className={`col-12 mx-auto max-width-2 center mb4 ${props.className}`}>
      {props.showTitle ? (
        <div className="mx-auto max-width-1">
          <H1>{props.title}</H1>
        </div>
      ) : (
        <h1 className="hide">{props.title}</h1>
      )}
      {props.subtitle ? (
        <div className="pt4 mt4">
          <Intro typogrify={false}>{props.subtitle}</Intro>
        </div>
      ) : null}
    </header>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  showTitle: PropTypes.bool,
  // subtitle: PropTypes.string, // String or Component
}

Header.defaultProps = {
  showTitle: false,
  className: '',
}

export default Header
