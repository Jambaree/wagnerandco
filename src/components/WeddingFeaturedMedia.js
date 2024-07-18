import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import ImgSharp from './ImgSharp'
import ImgFallback from './ImgFallback'
import VideoLoop from './VideoLoop'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const WeddingFeaturedMedia = (props) => {
  const node = props.node
  const img = node.featuredImage.node
  // let sharp = img && img.localFile ? img.localFile.childImageSharp : false
  const image = getImage(img.gatsbyImage)
  return (
    <Fragment>
      {node.acfFeaturedLoop?.featuredLoop ? (
        <VideoLoop
          poster={img.gatsbyImage ? img.gatsbyImage : null}
          src={`${node.acfFeaturedLoop.featuredLoop.mediaItemUrl}`}
        />
      ) : img ? (
        <ImgSharp {...img} />
      ) : (
        <ImgFallback />
      )}
    </Fragment>
  )
}

WeddingFeaturedMedia.propTypes = {
  node: PropTypes.object.isRequired,
}
WeddingFeaturedMedia.defaultProps = {}

export default WeddingFeaturedMedia
