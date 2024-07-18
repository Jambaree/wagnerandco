'use client'
import React from 'react'
import random from 'lodash.random'
import Doodle from './Doodle'

class DoodleRandomCorner extends React.Component {
  render() {
    const props = this.props
    let possiblePositions = [
      ['left-0', '-15px', '-25px'],
      ['right-0', '15px', '-25px'],
      ['right-0 bottom-0', '15px', '25px'],
      ['left-0 bottom-0', '-15px', '25px'],
    ]

    let pos = possiblePositions[random(0, possiblePositions.length - 1)]

    return (
      <div
        className={`absolute ${pos[0]}`}
        style={{
          transform: `translate(${pos[1]}, ${pos[2]})`,
          zIndex: 1,
        }}>
        <Doodle {...props} />
      </div>
    )
  }
}

export default DoodleRandomCorner
