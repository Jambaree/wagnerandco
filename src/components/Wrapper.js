import React from 'react'

const Wrapper = props => {
  let classes = [
    `max-width-${props.maxWidth}`,
    `mx${!props.mx ? '0' : '-auto'}`,
  ]

  if (props.padding) {
    classes.push('p2')
    classes.push('sm-px3')
  }

  return <div className={classes.join(' ')}>{props.children}</div>
}

Wrapper.defaultProps = {
  padding: false,
  maxWidth: 4,
  mx: 'auto',
}

Wrapper.propTypes = {
  // mxAuto: PropTypes.bool,
  maxWidth: function(props, propName, componentName) {
    let width = props[propName]

    if (width === undefined) {
      return new Error('You must include a number for `maxWidth`.')
    }

    if (isNaN(width)) {
      return new Error('`maxWidth` must be a number.')
    }

    return width >= 0 && width <= 5
      ? null
      : new Error('`maxWidth` can only go from 1 through 5')
  },
}

export default Wrapper
