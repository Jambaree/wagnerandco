import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import ImgSharp from './ImgSharp'
import ImgFallback from './ImgFallback'
import VideoLoop from './VideoLoop'

const WeddingFeaturedMedia = props => {
  const node = props.node
  const img = node.featured_media
  let sharp = img && img.localFile ? img.localFile.childImageSharp : false

  return (
    <Fragment>
      {node.acf.featured_loop ? (
        <VideoLoop
          poster={
            img.localFile ? img.localFile.childImageSharp.fluid.src : null
          }
          src={`${process.env.GATSBY_WP_URL}${node.acf.featured_loop.source_url}`}
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
