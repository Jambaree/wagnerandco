'use client'
import React, { Component } from 'react'

// Ours
import { stripTrailingSlash } from '../utils/format'
import GlobalNav from './GlobalNav'
import GlobalFooter from './GlobalFooter'
import { Wordmark } from './Logos'
import Wrapper from './Wrapper'
import Doodle from './Doodle'
import { useRouter } from 'next/router'

type DoodleFixedProps = {
  top?: string
  align?: 'left' | 'right'
  name?: string
  color?: string
}

const DoodleFixed: React.FC<DoodleFixedProps> = ({
  top = '40%',
  align = 'left',
  ...props
}) => (
  <div
    style={{
      position: 'fixed',
      pointerEvents: 'none',
      top: top,
    }}
    className={`${align}-0 z4 xs-hide sm-hide`}>
    <div className={`${align}-0 absolute`}>
      <Doodle {...props} />
    </div>
  </div>
)

type DoodleStickyProps = {
  name?: string
  color?: string
}

const DoodleSticky: React.FC<DoodleStickyProps> = (props) => (
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

type GlobalColorsProps = {
  palette: {
    [key: string]: {
      backgroundColor: string
      color: string
      doodle?: React.ReactNode
    }
  }
  title?: string
  pathname?: string
  showNav?: boolean
  showFooter?: boolean
  footerItems?: { href: string; label: string }[]
  footerTagline?: string
  children?: React.ReactNode
}

type GlobalColorsState = {
  backgroundColor: string
  color: string
  activePaletteKey: string
}

class GlobalColors extends Component<GlobalColorsProps, GlobalColorsState> {
  constructor(props: GlobalColorsProps) {
    super(props)

    const activePaletteKey = 'default'

    this.state = {
      backgroundColor: props.palette[activePaletteKey].backgroundColor,
      color: props.palette[activePaletteKey].color,
      activePaletteKey: activePaletteKey,
    }

    this.setPaletteFromPathname = this.setPaletteFromPathname.bind(this)
  }

  setPaletteFromPathname(pathname: string) {
    let pathnameSplit = stripTrailingSlash(pathname).split('/')
    let pathnameKey = `/${pathnameSplit[1]}`
    let activePalette

    const { palette } = this.props

    if (pathnameSplit.length > 2) {
      if (palette[`${pathnameKey}/*`]) {
        activePalette = {
          ...palette[`${pathnameKey}/*`],
          activePaletteKey: `${pathnameKey}/*`,
        }
      } else if (palette[pathnameKey]) {
        activePalette = {
          ...palette[pathnameKey],
          activePaletteKey: pathnameKey,
        }
      } else {
        activePalette = { ...palette.default, activePaletteKey: 'default' }
      }
    } else {
      if (palette[pathnameKey]) {
        activePalette = {
          ...palette[pathnameKey],
          activePaletteKey: pathnameKey,
        }
      } else {
        activePalette = { ...palette.default, activePaletteKey: 'default' }
      }
    }

    const oldPalette = { ...this.state }

    this.setState(activePalette, () => {
      if (typeof document !== 'undefined') {
        const html = document.documentElement
        html.classList.remove(`bg-${oldPalette.backgroundColor}`)
        html.classList.add(`bg-${this.state.backgroundColor}`)
      }
    })
  }

  componentDidUpdate(prevProps: GlobalColorsProps) {
    if (prevProps.pathname !== this.props.pathname) {
      this.setPaletteFromPathname(this.props.pathname!)
    }
  }

  componentDidMount() {
    this.setPaletteFromPathname(this.props.pathname!)
  }

  render() {
    const { backgroundColor, color } = this.state

    const {
      title,

      showNav,
      showFooter,
      footerItems,
      footerTagline,
      children,
      palette,
    } = this.props

    const activePalette = palette[this.state.activePaletteKey]
    const doodle = activePalette?.doodle ?? null

    const fullWidthPages = ['/', 'weddings']
    let wrapperProps = { padding: true, maxWidth: 5 }
    const isBrowser = typeof window !== `undefined`
    const pathname = isBrowser ? window.location.pathname : '/'
    let pathnameSplit = pathname.split('/')[1]
    if (pathname === '/' || fullWidthPages.indexOf(pathnameSplit) !== -1) {
      wrapperProps.maxWidth = 0
      wrapperProps.padding = false
    }

    return (
      <React.Fragment>
        <div className={`GlobalColors sm-pt2 bg-${backgroundColor} ${color}`}>
          <div style={{ minHeight: '100vh' }}>
            {doodle}
            {showNav !== false && (
              <Wrapper maxWidth={5} padding>
                <GlobalNav pathname={pathname} title={title}>
                  <Wordmark
                    fillName={color}
                    title={title}
                    width="125px"
                    style={{ transform: 'translateY(10px)' }}
                  />
                </GlobalNav>
              </Wrapper>
            )}
            {children}
          </div>
        </div>
        {showFooter !== false && (
          <div className={`${backgroundColor} bg-${color}`}>
            <GlobalFooter
              backgroundColor={color}
              color={backgroundColor}
              pathname={pathname}
              title={title}
              items={footerItems}
              tagline={footerTagline}
            />
          </div>
        )}
      </React.Fragment>
    )
  }
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
