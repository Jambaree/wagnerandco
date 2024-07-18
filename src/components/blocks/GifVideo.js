import React from 'react'

const GifVideo = (props) => {
  let src = props?.featured_loop?.url
  let extSplit = src?.toString()?.split('.')
  let ext = extSplit && extSplit[extSplit?.length - 1]
  let extSecondary = 'mp4'

  // If the mp4 was provided instead of the webm by default,
  // make the webm the secondary format. There’s no check for this,
  // we have to assume it’s also been uploaded to the WordPress media
  // library—otherwise, it requires a fully custom Gutenberg block that
  // supports multiple format selection.
  if (ext === 'mp4') {
    extSecondary = 'webm'
  }

  return (
    <video
      className="block col-12"
      autoPlay
      playsInline
      loop
      muted
      width="auto"
      preload="none">
      <source src={src} type={`video/${ext}`} />
      <source
        src={src?.toString()?.replace(ext, extSecondary)}
        type={`video/${extSecondary}`}
      />
    </video>
  )
}

export default GifVideo
