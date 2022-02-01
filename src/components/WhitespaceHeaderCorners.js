import React from 'react'
import PropTypes from 'prop-types'
import fecha from 'fecha'

// Ours
import { H1 } from '../components/Headings'
import WhitespaceHeader from '../components/WhitespaceHeader'

const WhitespaceHeaderCorners = props => {
  let dateTime

  if (!props.date) {
    dateTime = null
  } else {
    let d = new Date(props.date)
    dateTime = (
      <time dateTime={props.date} className="inline-block line-height-3">
        {fecha
          .format(d, 'MMMM Do, YYYY')
          .split(', ')
          .map(line => (
            <div key={line}>{line}</div>
          ))}
      </time>
    )
  }

  let children = [
    dateTime,
    <H1>{props.title}</H1>,
    <React.Fragment>
      {props.location.split(', ').map((line, index) => {
        return <div key={`HighlightHeader_location_${index}`}>{line}</div>
      })}
    </React.Fragment>,
  ]

  if (props.reverse) {
    children = children.reverse()
  }

  return (
    <WhitespaceHeader className={props.className}>
      {children[0] ? (
        <div className="absolute top-0 left-0">{children[0]}</div>
      ) : null}
      {children[1] ? (
        <div className="col-12 max-width-1 mx-auto">{children[1]}</div>
      ) : null}
      {children[2] ? (
        <div className="absolute bottom-0 right-0 right-align">
          {children[2]}
        </div>
      ) : null}
    </WhitespaceHeader>
  )
}

WhitespaceHeaderCorners.propTypes = {
  reverse: PropTypes.bool,
  className: PropTypes.string.isRequired,
  date: PropTypes.string,
  location: PropTypes.string,
}

WhitespaceHeaderCorners.defaultProps = {
  className: 'col-12 md-col-10 lg-col-10 xlg-col-12 mx-auto',
  reverse: false,
}

export default WhitespaceHeaderCorners
