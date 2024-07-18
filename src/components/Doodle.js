import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import random from 'lodash.random'

const DoodleLine = props => {
  let lines = []
  let lineProps = {
    fill: 'none',
    strokeMiterlimit: 10,
    strokeWidth: 2,
  }

  for (let i = 0; i < 25; i++) {
    lines.push(
      <line
        key={`DoodleLine_${i}`}
        x1="15"
        y1={i * 6.25}
        x2="35"
        y2={i * 6.25}
        {...lineProps}
      />
    )
  }

  return <g className="doodlegroup doodlegroup-line">{lines}</g>
}

/*
const DoodleDiagonal = props => {
  let lineProps = {
    fill: 'none',
    strokeMiterlimit: 10,
    strokeWidth: 2,
    y1: 16.44,
    y2: 36.14,
  }

  return (
    <g className="doodlegroup doodlegroup-diagonal">
      <line x1="1.74" x2="-1.74" {...lineProps} />
      <line x1="7.99" x2="4.51" {...lineProps} />
      <line x1="14.24" x2="10.76" {...lineProps} />
      <line x1="20.49" x2="17.01" {...lineProps} />
      <line x1="26.74" x2="23.26" {...lineProps} />
      <line x1="32.99" x2="29.51" {...lineProps} />
      <line x1="39.24" x2="35.76" {...lineProps} />
      <line x1="45.49" x2="42.01" {...lineProps} />
      <line x1="51.74" x2="48.26" {...lineProps} />
    </g>
  )
}
*/

const DoodleZagSingle = props => {
  return (
    <g className="doodlegroup doodlegroup-zag">
      <polyline
        points="153.78 31 141.87 19 130.04 31 118.02 19 106.29 31 94.38 19 82.49 31 70.57 19 58.74 31 46.72 19 35 31 23.08 19 11.25 31 -0.77 19"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </g>
  )
}

const DoodleZag = props => {
  return (
    <g className="doodlegroup doodlegroup-zag">
      <polyline
        points="153.78 22 141.87 10 130.04 22 118.02 10 106.29 22 94.38 10 82.49 22 70.57 10 58.74 22 46.72 10 35 22 23.08 10 11.25 22 -0.77 10"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <polyline
        points="153.78 40 141.87 28 130.04 40 118.02 28 106.29 40 94.38 28 82.49 40 70.57 28 58.74 40 46.72 28 35 40 23.08 28 11.25 40 -0.77 28"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </g>
  )
}

const DoodleWave = props => {
  return (
    <g className="doodlegroup doodlegroup-wave">
      <path
        d="M.06,14.24a8.3,8.3,0,0,1,11.88-.15l3.82,3.82a8.28,8.28,0,0,0,11.87-.15L31,14.24a8.28,8.28,0,0,1,11.87-.15l3.82,3.82a8.3,8.3,0,0,0,11.88-.15l3.34-3.52a8.28,8.28,0,0,1,11.87-.15l3.82,3.82a8.28,8.28,0,0,0,11.87-.15l3.34-3.52a8.3,8.3,0,0,1,11.88-.15l3.82,3.82a8.28,8.28,0,0,0,11.87-.15l3.34-3.52a8.31,8.31,0,0,1,11.89-.15l3.82,3.82a8.28,8.28,0,0,0,11.87-.15l3.34-3.52"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M.06,32.24a8.3,8.3,0,0,1,11.88-.15l3.82,3.82a8.28,8.28,0,0,0,11.87-.15L31,32.24a8.28,8.28,0,0,1,11.87-.15l3.82,3.82a8.3,8.3,0,0,0,11.88-.15l3.34-3.52a8.28,8.28,0,0,1,11.87-.15l3.82,3.82a8.28,8.28,0,0,0,11.87-.15l3.34-3.52a8.3,8.3,0,0,1,11.88-.15l3.82,3.82a8.28,8.28,0,0,0,11.87-.15l3.34-3.52a8.31,8.31,0,0,1,11.89-.15l3.82,3.82a8.28,8.28,0,0,0,11.87-.15l3.34-3.52"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </g>
  )
}

const doodles = {
  'zag-single': DoodleZagSingle,
  zag: DoodleZag,
  wave: DoodleWave,
  line: DoodleLine,
  // diagonal: DoodleDiagonal,
}

// const doodleKeys = Object.keys(doodles)

const DoodleClipPath = props => (
  <React.Fragment>
    <defs>
      <clipPath id="DoodleClipPath">
        <polygon
          points={`0,0 ${props.width},0 ${props.width},50 ${props.width /
            2},50, ${props.width / 2},25 0,25 0,0`}
        />
      </clipPath>
    </defs>
    <g clipPath="url(#DoodleClipPath)">{props.children}</g>
  </React.Fragment>
)

DoodleClipPath.defaultProps = {
  width: 100,
}

class Doodle extends Component {
  render() {
    const props = this.props
    let name = props.name

    // if (typeof props.name === 'undefined') {
    //   name = doodleKeys[random(0, doodleKeys.length - 1)]
    // }

    let child = React.createElement(doodles[name])

    let dimensions = {
      width: 100,
      height: 50,
    }

    // Exceptions
    switch (props.name) {
      case 'wave':
        child = (
          <DoodleClipPath width={dimensions.width}>{child}</DoodleClipPath>
        )
        break
      case 'zag':
        child = (
          <DoodleClipPath width={dimensions.width}>{child}</DoodleClipPath>
        )
        break
      case 'line':
        dimensions.width = 35
        dimensions.height = 100
        break
      default:
    }

    dimensions.viewBox = `0 0 ${dimensions.width} ${dimensions.height}`

    return (
      <svg {...dimensions} className={`doodle stroke-${props.color}`}>
        {child}
      </svg>
    )
  }
}

Doodle.defaultProps = {
  color: 'blue',
  // name: doodleKeys[random(0, doodleKeys.length - 1)]
  name: 'zag-single',
}

Doodle.propTypes = {
  name: PropTypes.oneOf(Object.keys(doodles)),
}

export default Doodle
