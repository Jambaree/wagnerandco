import React from 'react'

import ImgFallback from './ImgFallback'
import VideoLoop from './VideoLoop'
import Image from 'next/image'

const WeddingFeaturedMedia = (props) => {
  const { node } = props

  const img = node?._embedded?.['wp:featuredmedia']?.[0]
  // let sharp = img && img.localFile ? img.localFile.childImageSharp : false

  return (
    <>
      {node?.acf?.featured_loop ? (
        <VideoLoop
          poster={img.gatsbyImage ? img.gatsbyImage : null}
          src={`${node.acf.featured_loop.mediaItemUrl}`}
        />
      ) : img ? (
        <Image
          src={img?.source_url}
          width={img.media_details?.sizes.medium.width}
          height={img.media_details?.sizes.medium.height}
          alt={img?.alt_text}
        />
      ) : (
        <ImgFallback />
      )}
    </>
  )
}

export default WeddingFeaturedMedia
