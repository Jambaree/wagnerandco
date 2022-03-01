import React, { Fragment, lazy, Suspense } from 'react'
import PropTypes from 'prop-types'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

//import as lazy
export const VideoLoop = lazy(() => import('./VideoLoop'))
export const ImgSharp = lazy(() => import('./ImgSharp'))
export const ImgFallback = lazy(() => import('./ImgFallback'))

const WeddingFeaturedMedia = props => {
  const node = props.node
  const img = node.featuredImage.node
  // let sharp = img && img.localFile ? img.localFile.childImageSharp : false
  const image = getImage(img.localFile)

  return (
    <Fragment>
      <Suspense fallback={false}>
        {node.acfFeaturedLoop?.featuredLoop ? (
          <VideoLoop
            poster={img.localFile ? image : null}
            src={`${node.acfFeaturedLoop.featuredLoop.mediaItemUrl}`}
          />
        ) : img ? (
          <ImgSharp {...img} />
        ) : (
          <ImgFallback />
        )}
      </Suspense>
    </Fragment>
  )
}

WeddingFeaturedMedia.propTypes = {
  node: PropTypes.object.isRequired,
}
WeddingFeaturedMedia.defaultProps = {}

export default WeddingFeaturedMedia
