'use client'
import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

// Ours
import { stripTrailingSlash } from '../utils/format'
import GlobalNav from './GlobalNav'
import GlobalFooter from './GlobalFooter'
import { Wordmark } from './Logos'
import Wrapper from './Wrapper'
import Doodle from './Doodle'

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
  showNav?: boolean
  showFooter?: boolean
  footerItems?: { href: string; label: string }[]
  footerTagline?: string
  children?: React.ReactNode
}

const GlobalColors: React.FC<GlobalColorsProps> = ({
  palette = {
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
  title = 'Wagner & Co.',
  showNav = true,
  showFooter = true,
  footerItems,
  footerTagline,
  children,
}) => {
  const pathname = usePathname()
  const [state, setState] = useState(() => {
    const activePaletteKey = 'default'
    return {
      backgroundColor: palette[activePaletteKey].backgroundColor,
      color: palette[activePaletteKey].color,
      activePaletteKey: activePaletteKey,
    }
  })

  useEffect(() => {
    const setPaletteFromPathname = (pathname: string) => {
      let pathnameSplit = stripTrailingSlash(pathname).split('/')
      let pathnameKey = `/${pathnameSplit[1]}`
      let activePalette

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

      const oldPalette = { ...state }

      setState(activePalette)
      if (typeof document !== 'undefined') {
        const html = document.documentElement
        html.classList.remove(`bg-${oldPalette.backgroundColor}`)
        html.classList.add(`bg-${activePalette.backgroundColor}`)
      }
    }

    setPaletteFromPathname(pathname)
  }, [pathname])

  const { backgroundColor, color } = state

  const activePalette = palette[state.activePaletteKey]
  const doodle = activePalette?.doodle ?? null

  const fullWidthPages = ['/', 'weddings']
  let wrapperProps = { padding: true, maxWidth: 5 }
  let pathnameSplit = pathname.split('/')[1]
  if (pathname === '/' || fullWidthPages.indexOf(pathnameSplit) !== -1) {
    wrapperProps.maxWidth = 0
    wrapperProps.padding = false
  }

  const weddingPath = pathname?.includes('/highlights/')

  return (
    <React.Fragment>
      <div className={`GlobalColors sm-pt2 bg-${backgroundColor} ${color}`}>
        <div style={{ minHeight: '100vh' }}>
          {doodle}
          {weddingPath ||
            (showNav !== false && (
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
            ))}
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

export default GlobalColors
