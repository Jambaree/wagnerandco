import React from 'react'
import unesc from '../utils/unescape'
import typogr from 'typogr'

const handleAlign = direction => {
  let directions = {
    left: 'left-align',
    right: 'right-align',
    center: 'center',
  }

  if (directions[direction]) {
    return directions[direction]
  }

  return directions['left']
}

const H1 = props => {
  let Tag = props.is
  let align = handleAlign(props.align)

  return (
    <Tag className={`h1 line-height-2 bold ${align}`}>
      {unesc(props.children)}
    </Tag>
  )
}

H1.defaultProps = {
  is: 'h1',
  align: 'center',
}

const H2 = props => {
  let Tag = props.is
  let align = handleAlign(props.align)

  return (
    <Tag className={`h2 line-height-2 bold ${align}`}>
      {unesc(props.children)}
    </Tag>
  )
}

H2.defaultProps = {
  is: 'h2',
  align: 'center',
}

const H3 = props => {
  let Tag = props.is
  let align = handleAlign(props.align)

  return (
    <Tag className={`h3 line-height-3 bold ${align}`}>
      {unesc(props.children)}
    </Tag>
  )
}

H3.defaultProps = {
  is: 'h3',
  align: 'left',
}

const H4 = props => {
  let Tag = props.is

  return (
    <Tag
      className={`${props.fontSize} mb1 line-height-3 font-weight-600 uppercase track-${props.track}`}>
      {unesc(props.children)}
    </Tag>
  )
}

H4.defaultProps = {
  is: 'h4',
  fontSize: 'h4',
  track: 2,
}

const Intro = props => {
  let { typogrify, ...remainingProps } = props
  let className = 'h3 line-height-4'

  if (props.typogrify) {
    return (
      <div
        className={className}
        dangerouslySetInnerHTML={
          props.dangerouslySetInnerHTML || {
            __html: typogr(unesc(props.children))
              .chain()
              .initQuotes()
              .smartypants()
              .widont()
              .value(),
          }
        }
      />
    )
  }

  return <div {...remainingProps} className={className} />
}

Intro.defaultProps = {
  typogrify: true,
}

export { H1, H2, H3, H4, Intro }
