import React from 'react'

import ImgFallback from './ImgFallback'
import VideoLoop from './VideoLoop'
import Image from 'next/image'

const WeddingFeaturedMedia = (props) => {
  const { node } = props

  const img = node?._embedded?.['wp:featuredmedia']?.[0]

  return (
    <>
      {node?.acf?.featured_loop ? (
        <VideoLoop
          poster={node?.acf?.featured_loop?.link}
          src={`${node.acf.featured_loop.url}`}
        />
      ) : img ? (
        <Image
          src={img?.source_url}
          width={img.media_details?.width}
          height={img.media_details?.height}
          alt={img?.alt_text}
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      ) : (
        <ImgFallback />
      )}
    </>
  )
}

export default WeddingFeaturedMedia
