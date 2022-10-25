import React from 'react'
import PropTypes from 'prop-types'

const VideoLoop = (props) => {
  let src = props?.src || props?.video?.publicUrl
  let extSplit = src?.toString()?.split('.')
  let ext = extSplit[extSplit.length - 1]
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
      preload="none"
      poster={props?.poster}>
      <source
        src={props?.src || props?.video?.publicUrl}
        type={`video/${ext}`}
      />
      <source
        src={src?.toString()?.replace(ext, extSecondary)}
        type={`video/${extSecondary}`}
      />
    </video>
  )
}

VideoLoop.propTypes = {
  src: PropTypes.string,
  poster: PropTypes.string,
}

export default VideoLoop
