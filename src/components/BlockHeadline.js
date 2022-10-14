import React from 'react'
import Parser from 'html-react-parser'
import slugify from 'slugify'

const BlockHeadline = (props) => {
  const { heading } = props
  return <h2 id={`#${slugify(heading.toLowerCase())}`}>{Parser(heading)}</h2>
}

export default BlockHeadline
