import React from 'react'
import PropTypes from 'prop-types'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const ImgSharp = props => {
  let { gatsbyImage, altText, ...remainder } = props
  const image = getImage(gatsbyImage)
  remainder.alt = remainder.alt || altText || ''

  return <GatsbyImage image={image} alt={remainder.alt || ''} {...remainder} />
}

ImgSharp.propTypes = {
  // alt_text: PropTypes.string.isRequired,
  // alt: PropTypes.string.isRequired, // TODO One is required
  title: PropTypes.string,
  role: PropTypes.string,
  // srcSet: PropTypes.string,
  gatsbyImage: PropTypes.object.isRequired,
  className: PropTypes.string,
}

ImgSharp.defaultProps = {
  alt: '',
  className: 'block m0 col-12',
}

export default ImgSharp
