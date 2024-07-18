import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

// Ours
import { stripTrailingSlash } from '../utils/format'
import GlobalNavItem from './GlobalNavItem'

const GlobalNav = props => {
  let items = props.items
  let halfLength = Math.floor(items.length / 2)

  let itemsLeft = items.slice(0, halfLength)
  let itemsRight = items.slice(halfLength, items.length)
  let pathname = props.pathname ? stripTrailingSlash(props.pathname) : '/'

  return (
    <div className="flex items-center col-12">
      <div className="col-3 md-col-4 left-align">
        {itemsLeft.map((item, index) => (
          <GlobalNavItem
            {...item}
            className={props.color}
            active={pathname === item.href}
            key={`GlobalNav_ItemLeft_${index}`}
          />
        ))}
      </div>
      <div className="col-6 md-col-4 center">
        {props.children ? (
          <div>
            <Link
              className={`${props.children ? 'border-none' : ''} inline-block`}
              to="/">
              {props.children}
            </Link>
          </div>
        ) : null}
      </div>
      <div className="col-3 md-col-4 right-align">
        {itemsRight.map((item, index) => (
          <GlobalNavItem
            {...item}
            className={props.color}
            active={pathname === item.href}
            key={`GlobalNav_ItemRight_${index}`}
          />
        ))}
      </div>
    </div>
  )
}

GlobalNav.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array,
  // children: PropTypes.func || PropTypes.bool ,
  pathname: PropTypes.string,
}

GlobalNav.defaultProps = {
  title: 'Wagner & Co.',
  items: [
    { href: '/weddings', label: 'Weddings' },
    { href: '/faq', label: 'FAQ' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ],
}

export default GlobalNav
