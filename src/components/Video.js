import React from 'react'
import PropTypes from 'prop-types'
import { Play } from './Icons'

const ButtonPlay = props => {
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

const EmbedContainer = props => {
  let ratio = props.ratio.split(':')
  let paddingBottom = props.paddingBottom || (ratio[1] / ratio[0]) * 100

  return (
    <div
      style={{
        position: 'relative',
        paddingBottom: `${paddingBottom}%`,
        height: 0,
        overflow: 'hidden',
        maxWidth: '100%',
      }}>
      <iframe
        title={props.title}
        ref={props.iframeRef}
        src={props.src}
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

EmbedContainer.propTypes = {
  title: PropTypes.string.isRequired,
  ratio: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  ref: PropTypes.func,
}

EmbedContainer.defaultProps = {
  title: '',
  ratio: '16:9',
  ref: null,
}

class Video extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '…',
      showPlayButton: true,
      progress: 0,
      duration: 0,
      percent: 0,
      seconds: 0,
      width: 19.8,
      height: 9,
    }

    this.player = null

    let vimeoId = props.vimeoId 
    if (props.src) {
      vimeoId = this.stripTrailingSlash(props.vimeoId.toString())
      vimeoId = vimeoId.split('/')[0]
    }
    this.vimeoId = vimeoId
  }

  // https://stackoverflow.com/a/36242700/864799
  stripTrailingSlash = str => {
    return str !== '/' && str.endsWith('/') ? str.slice(0, -1) : str
  }

  handlePlay() {
    this.player
      .play()
      .then(() => {
        this.setState({ showPlayButton: false })
        // the video was played
      })
      .catch(function(err) {
        switch (err.name) {
          case 'PasswordError':
            // the video is password-protected and the viewer needs to enter the
            // password first
            break

          case 'PrivacyError':
            // the video is private
            break

          default:
            // some other error occurred
            break
        }
      })
  }

  setPlayerColor(player, color) {
    player
      .setColor(color)
      .then()
      .catch(err => {
        console.warn(err)
      })
  }

  componentDidMount() {
    const Player = require('@vimeo/player/dist/player.min')

    if (Player) {
      this.player = new Player(this.iframe)
      const player = this.player

      player
        .loadVideo(this.vimeoId)
        .then(function(id) {
          // the video successfully loaded
        })
        .catch(function(err) {
          switch (err.name) {
            case 'TypeError':
              // the id was not a number
              break

            case 'PasswordError':
              // the video is password-protected and the viewer needs to enter the
              // password first
              break

            case 'PrivacyError':
              // the video is password-protected or private
              break

            default:
              // some other error occurred
              console.warn('Error', err.name, err)
              break
          }
        })

      player.getVideoHeight().then(height => {
        this.setState({ height: parseFloat(height, 10) })
      })

      player.getVideoWidth().then(width => {
        this.setState({ width: parseFloat(width, 10) })
      })

      player.getVideoTitle().then(title => {
        this.setState({ title: title })
      })

      this.setPlayerColor(this.player, this.props.color)

      player.on('pause', data => {
        this.setState({ showPlayButton: true })
      })

      player.on('play', data => {
        this.setState({ showPlayButton: false })
      })

      player.on('timeupdate', data => {
        this.setState({
          duration: data.duration,
          percent: data.percent,
          sections: data.seconds,
        })
      })
    }
  }

  componentWillUnmount() {
    if (this.player) {
      const player = this.player
      let playerEvents = ['pause', 'play', 'timeupdate']
      let cb = function() {}

      playerEvents.forEach(name => {
        player.off(name, cb)
        player.off(name, cb)
        player.off(name, cb)
      })
    }
  }

  render() {
    const props = this.props
    const state = this.state
    let percent = state.percent * 100

    if (!props.src && !this.vimeoId) {
      return null
    }

    let src = props.src || `https://player.vimeo.com/video/${this.vimeoId}`

    return (
      <div>
        {props.showTitle ? <div>{state.title}</div> : null}
        <div className="relative">
          <EmbedContainer
            title={state.title}
            ratio={`${state.width}:${state.height}`}
            iframeRef={el => (this.iframe = el)}
            src={`${src}?title=0&byline=0&portrait=0`}
          />
          {state.showPlayButton ? (
            <ButtonPlay onClick={this.handlePlay.bind(this)} />
          ) : null}
        </div>
        {props.showProgress ? (
          <progress value={percent} max="100" className="bg-red">
            {percent}%
          </progress>
        ) : null}
      </div>
    )
  }
}

Video.propTypes = {
  vimeoId: PropTypes.string || PropTypes.number,
  src: PropTypes.string,
  showProgress: PropTypes.bool,
  showTitle: PropTypes.bool,
  ratio: PropTypes.string,
}

Video.defaultProps = {
  // src: undefined,
  vimeoId: '283522233',
  color: '#FAD8C3',
  showProgress: false,
  showTitle: false,
  ratio: '19.8:9',
}

export default Video
