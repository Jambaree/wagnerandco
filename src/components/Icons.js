import React from 'react'

const Play = props => (
  <svg
    viewBox="0 0 100 100"
    width={props.width}
    id="56f675ae-e087-433c-95d4-f2dc5f1a569a"
    className={`fill-${props.fillName}`}>
    <title>Play</title>
    <rect x="42" width="16" height="58" />
    <rect y="42" width="58" height="16" />
    <rect x="58" y="58" width="16" height="42" />
    <rect x="58" y="58" width="42" height="16" />
  </svg>
)

Play.defaultProps = {
  width: '100px',
  fillName: 'blue',
}

export { Play }
