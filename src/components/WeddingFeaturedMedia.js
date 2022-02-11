import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import ImgSharp from './ImgSharp'
import ImgFallback from './ImgFallback'
import VideoLoop from './VideoLoop'

const WeddingFeaturedMedia = props => {
  const node = props.node
  const img = node.featuredImage.node
  let sharp = img && img.localFile ? img.localFile.childImageSharp : false
  return (
    <Fragment>
      {node.acfFeaturedLoop?.featuredLoop ? (
        <VideoLoop
          poster={
            img.localFile ? img.localFile.childImageSharp.fluid.src : null
          }
          src={`${node.acfFeaturedLoop.featuredLoop.mediaItemUrl}`}
        />
      ) : img && sharp ? (
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
