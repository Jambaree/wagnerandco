'use client'
// import '../vendor/scroll'
import React from 'react'
import PropTypes from 'prop-types'
import smoothScroll from 'smoothscroll'

class ScrollAnchor extends React.Component {
  handleOnClick(str) {
    smoothScroll(document.getElementById(str))
  }

  render() {
    const props = this.props
    let id = props.href.split('#')[1]

    return (
      <a
        href={props.href}
        {...props}
        onClick={(e) => {
          e.preventDefault()
          return this.handleOnClick(id)
        }}>
        {props.children}
      </a>
    )
  }
}

ScrollAnchor.propTypes = {
  href: PropTypes.string.isRequired,
}

export default ScrollAnchor
