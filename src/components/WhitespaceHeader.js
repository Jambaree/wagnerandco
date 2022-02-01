import React from 'react'
import PropTypes from 'prop-types'

const WhitespaceHeader = props => {
  let Tag = props.is

  return (
    <Tag
      style={{
        minHeight: `${props.minHeight}px`,
        height: `${props.height}vh`,
        maxHeight: '1000px',
        marginTop: `${props.marginTop}vh`,
        marginBottom: `${props.marginBottom}vh`,
      }}
      className={`${props.className} relative flex items-center`}>
      {props.children}
    </Tag>
  )
}

WhitespaceHeader.defaultProps = {
  className: '',
  is: 'header',
  height: 65,
  minHeight: 500,
  marginTop: 0,
  marginBottom: 15,
}

WhitespaceHeader.propTypes = {
  className: PropTypes.string,
  tag: PropTypes.string,
  height: PropTypes.number,
  minHeight: PropTypes.number,
  marginBottom: PropTypes.number,
}

export default WhitespaceHeader
