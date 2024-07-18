import React from 'react'

import { H1, Intro } from '../components/Headings'

const Header = (props) => {
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

export default Header
