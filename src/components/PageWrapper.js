import React from 'react'

const PageWrapper = props => {
  let Tag = props.is

  return (
    <Tag className={`relative mb2 sm-mb3 md-mb4 ${props.className}`}>
      {props.children}
    </Tag>
  )
}

PageWrapper.defaultProps = {
  className: '',
  is: 'div',
}

export default PageWrapper
