import React from 'react'

import Image from 'next/image'

const ImgSharp = (props) => {
  let { image } = props

  return (
    <Image
      image={image}
      alt={image.altText || ''}
      width={image?.width}
      height={image?.height}
    />
  )
}

export default ImgSharp
