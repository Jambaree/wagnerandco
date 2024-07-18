'use client'
import React, { useState, useEffect, useRef } from 'react'
import { Play } from '@/components/Icons'

const ButtonPlay = (props) => {
  return (
    <button
      className="ButtonPlay absolute bg-transparent px4 py3 border-none cursor-pointer z2"
      style={{
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
      }}
      {...props}>
      <Play />
    </button>
  )
}

const EmbedContainer = ({ title, ratio, src, iframeRef, paddingBottom }) => {
  const ratioArray = ratio.split(':')
  const calculatedPaddingBottom =
    paddingBottom || (ratioArray[1] / ratioArray[0]) * 100

  return (
    <div
      style={{
        position: 'relative',
        paddingBottom: `${calculatedPaddingBottom}%`,
        height: 0,
        overflow: 'hidden',
        maxWidth: '100%',
      }}>
      <iframe
        title={title}
        ref={iframeRef}
        src={src}
        width="640"
        height="291"
        frameBorder="0"
        webkitallowfullscreen="true"
        mozallowfullscreen="true"
        allowFullScreen={true}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  )
}

const Video = ({
  vimeoId = '283522233',
  src,
  showProgress = false,
  showTitle = false,
  color = '#FAD8C3',
  ratio = '19.8:9',
}) => {
  const [state, setState] = useState({
    title: '…',
    showPlayButton: true,
    progress: 0,
    duration: 0,
    percent: 0,
    seconds: 0,
    width: 19.8,
    height: 9,
  })

  const iframeRef = useRef(null)
  const playerRef = useRef(null)

  const stripTrailingSlash = (str) => {
    return str !== '/' && str.endsWith('/') ? str.slice(0, -1) : str
  }

  const handlePlay = () => {
    if (playerRef.current) {
      playerRef.current
        .play()
        .then(() => {
          setState((prevState) => ({ ...prevState, showPlayButton: false }))
        })
        .catch((err) => {
          switch (err.name) {
            case 'PasswordError':
              break
            case 'PrivacyError':
              break
            default:
              break
          }
        })
    }
  }

  const setPlayerColor = (player, color) => {
    player
      .setColor(color)
      .then()
      .catch((err) => {
        console.warn(err)
      })
  }

  useEffect(() => {
    const Player = require('@vimeo/player/dist/player.min')

    if (Player) {
      const player = new Player(iframeRef.current)
      playerRef.current = player

      const loadVideo = async () => {
        try {
          await player.loadVideo(vimeoId)
        } catch (err) {
          console.warn('Error', err.name, err)
        }

        const height = await player.getVideoHeight()
        setState((prevState) => ({
          ...prevState,
          height: parseFloat(height, 10),
        }))

        const width = await player.getVideoWidth()
        setState((prevState) => ({
          ...prevState,
          width: parseFloat(width, 10),
        }))

        const title = await player.getVideoTitle()
        setState((prevState) => ({ ...prevState, title }))

        setPlayerColor(player, color)

        player.on('pause', () =>
          setState((prevState) => ({ ...prevState, showPlayButton: true }))
        )
        player.on('play', () =>
          setState((prevState) => ({ ...prevState, showPlayButton: false }))
        )
        player.on('timeupdate', (data) => {
          setState((prevState) => ({
            ...prevState,
            duration: data.duration,
            percent: data.percent,
            seconds: data.seconds,
          }))
        })
      }

      loadVideo()
    }

    return () => {
      if (playerRef.current) {
        const player = playerRef.current
        const playerEvents = ['pause', 'play', 'timeupdate']
        playerEvents.forEach((name) => {
          player.off(name)
        })
      }
    }
  }, [vimeoId, color])

  const { title, showPlayButton, percent, width, height } = state

  if (!src && !vimeoId) {
    return null
  }

  const videoSrc = src || `https://player.vimeo.com/video/${vimeoId}`
  const progressPercent = percent * 100

  return (
    <div>
      {showTitle ? <div>{title}</div> : null}
      <div className="relative">
        <EmbedContainer
          title={title}
          ratio={`${width}:${height}`}
          iframeRef={iframeRef}
          src={`${videoSrc}?title=0&byline=0&portrait=0`}
        />
        {showPlayButton ? <ButtonPlay onClick={handlePlay} /> : null}
      </div>
      {showProgress ? (
        <progress value={progressPercent} max="100" className="bg-red">
          {progressPercent}%
        </progress>
      ) : null}
    </div>
  )
}

export default Video
