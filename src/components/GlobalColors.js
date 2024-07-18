import React from 'react'
import PropTypes from 'prop-types'

// Ours
import { stripTrailingSlash } from '../utils/format'
import GlobalNav from './GlobalNav'
import GlobalFooter from './GlobalFooter'
import { Wordmark } from './Logos'
import Wrapper from './Wrapper'
import Doodle from './Doodle'

const DoodleFixed = props => (
  <div
    style={{
      position: 'fixed',
      pointerEvents: 'none',
      top: props.top,
    }}
    className={`${props.align}-0 z4 xs-hide sm-hide`}>
    <div className={`${props.align}-0 absolute`}>
      <Doodle {...props} />
    </div>
  </div>
)

DoodleFixed.defaultProps = {
  top: '40%',
  align: 'left',
}

const DoodleSticky = props => (
  <div
    style={{
      position: 'sticky',
      pointerEvents: 'none',
      top: '40%',
    }}
    className="right-0 z4">
    <div className="right-0 absolute">
      <Doodle {...props} />
    </div>
  </div>
)

class GlobalColors extends React.Component {
  constructor(props) {
    super(props)

    let activePaletteKey = 'default'

    this.state = {
      backgroundColor: props.palette[activePaletteKey].backgroundColor,
      color: props.palette[activePaletteKey].color,
      activePaletteKey: activePaletteKey,
    }

    this.setPaletteFromPathname = this.setPaletteFromPathname.bind(this)
  }

  setPaletteFromPathname(pathname, cb) {
    let pathnameSplit = stripTrailingSlash(pathname)
    pathnameSplit = pathnameSplit.split('/')
    let pathnameKey = `/${pathnameSplit[1]}`
    let activePalette

    let palette = this.props.palette

    // TODO Clearly could be refactored, probably shouldn’t even
    // be the palette with setState—chnage the key and use it to
    // reference the props instead
    if (pathnameSplit.length > 2) {
      if (palette[`${pathnameKey}/*`]) {
        activePalette = palette[`${pathnameKey}/*`]
        activePalette.activePaletteKey = `${pathnameKey}/*`
      } else if (palette[pathnameKey]) {
        activePalette = palette[pathnameKey]
        activePalette.activePaletteKey = pathnameKey
      } else {
        activePalette = palette.default
        activePalette.activePaletteKey = 'default'
      }
    } else {
      if (palette[pathnameKey]) {
        activePalette = palette[pathnameKey]
        activePalette.activePaletteKey = pathnameKey
      } else {
        activePalette = palette.default
        activePalette.activePaletteKey = 'default'
      }
    }

    let oldPalette = Object.assign({}, this.state)

    this.setState(activePalette, function() {
      if (typeof document !== 'undefined') {
        let html = document.documentElement

        // Remove old HTML colour classes
        html.classList.remove(`bg-${oldPalette.backgroundColor}`)

        // Add new HTML colour classes
        html.classList.add(`bg-${this.state.backgroundColor}`)
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setPaletteFromPathname(nextProps.pathname)
  }

  componentDidMount() {
    this.setPaletteFromPathname(this.props.pathname)
  }

  render() {
    const props = this.props
    const state = this.state
    let newActivePaletteApproach = props.palette[state.activePaletteKey]
    let doodle =
      newActivePaletteApproach && newActivePaletteApproach.doodle
        ? newActivePaletteApproach.doodle
        : null

    return (
      <React.Fragment>
        <div
          className={`GlobalColors sm-pt2 bg-${state.backgroundColor} ${state.color}`}>
          <div style={{ minHeight: '100vh' }}>
            {doodle}
            {props.showNav === false ? null : (
              <Wrapper maxWidth={5} padding>
                <GlobalNav pathname={props.pathname} title={props.title}>
                  <Wordmark
                    fillName={state.color}
                    title={props.title}
                    width="125px"
                    style={{ transform: 'translateY(10px)' }}
                  />
                </GlobalNav>
              </Wrapper>
            )}
            {props.children}
          </div>
        </div>
        {props.showFooter === false ? null : (
          <div className={`${state.backgroundColor} bg-${state.color}`}>
            <GlobalFooter
              backgroundColor={state.color}
              color={state.backgroundColor}
              pathname={props.pathname}
              title={props.title}
              items={props.footerItems}
              tagline={props.footerTagline}
            />
          </div>
        )}
      </React.Fragment>
    )
  }
}

GlobalColors.propTypes = {
  palette: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
  // children: PropTypes.string.isRequired,
}

GlobalColors.defaultProps = {
  title: 'Wagner & Co.',
  pathname: 'default',
  showNav: true,
  showFooter: true,
  palette: {
    default: { backgroundColor: 'peach', color: 'blue' },
    '/weddings': {
      backgroundColor: 'blue',
      color: 'peach',
      doodle: <DoodleSticky name="line" color="peach" />,
    },
    '/weddings/*': {
      backgroundColor: 'peach',
      color: 'blue',
    },
    '/faq': { backgroundColor: 'white', color: 'red' },
    '/about': { backgroundColor: 'red', color: 'white' },
    '/contact': { backgroundColor: 'peach', color: 'blue' },
    '/packages': {
      backgroundColor: 'white',
      color: 'red',
      doodle: <DoodleFixed name="line" color="blue" />,
    },
    '/styleguide': { backgroundColor: 'white', color: 'black' },
  },
}

export default GlobalColors
