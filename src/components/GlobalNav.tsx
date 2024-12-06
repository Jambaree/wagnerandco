import React from 'react'
import Link from 'next/link'

// Ours
import { stripTrailingSlash } from '../utils/format'
import GlobalNavItem from './GlobalNavItem'

type GlobalNavProps = {
  title?: string
  items?: { href: string; label: string }[]
  pathname?: string
  color?: string
  children?: React.ReactNode
}

const GlobalNav: React.FC<GlobalNavProps> = ({
  items = [
    { href: '/weddings', label: 'Wedding stories' },
    { href: '/services/super-8mm', label: 'services' },
    { href: '/faq', label: 'FAQ' },
    { href: '/about', label: 'the team' },
    { href: '/contact', label: 'Contact' },
    {
      href: 'https://www.instagram.com/wagnerandcofilm',
      label: 'Instagram',
      target: '_blank',
    },
  ],
  pathname,
  color,
  children,
}) => {
  const halfLength = Math.floor(items.length / 2)

  const itemsLeft = items.slice(0, halfLength)
  const itemsRight = items.slice(halfLength, items.length)
  const strippedPathname = pathname ? stripTrailingSlash(pathname) : '/'

  return (
    <div className="flex items-center col-12">
      <div className="col-3 md-col-4 left-align">
        {itemsLeft.map((item, index) => (
          <>
            <GlobalNavItem
              {...item}
              className={color}
              active={strippedPathname === item.href}
              key={`GlobalNav_ItemLeft_${index}`}
            />
          </>
        ))}
      </div>
      <div className="col-6 md-col-4 center">
        {children ? (
          <div>
            <Link
              className={`${children ? 'border-none' : ''} inline-block`}
              href="/">
              {children}
            </Link>
          </div>
        ) : null}
      </div>
      <div className="col-3 md-col-4 right-align">
        {itemsRight.map((item, index) => (
          <GlobalNavItem
            {...item}
            className={color}
            active={strippedPathname === item.href}
            key={`GlobalNav_ItemRight_${index}`}
          />
        ))}
      </div>
    </div>
  )
}

export default GlobalNav
