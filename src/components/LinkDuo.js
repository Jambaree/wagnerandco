import React from 'react'
import Link from 'next/link'

const isExternal = (url) => {
  if (typeof window !== 'undefined') {
    const host = window.location.hostname

    const linkHost = (() => {
      if (/^(http|https):\/\//.test(url)) {
        const parser = document.createElement('a')
        parser.href = url
        return parser.hostname
      } else {
        return window.location.hostname
      }
    })()

    return host !== linkHost
  } else {
    return false
  }
}

const LinkDuo = (props) => {
  const { to, children, ...rest } = props
  const external = isExternal(to)
  const fallback = (
    <a
      href={to}
      {...rest}
      target={external ? '_blank' : ''}
      rel={external ? 'noopener' : ''}>
      {children}
    </a>
  )

  if (typeof window !== 'undefined') {
    if (external) {
      return fallback
    } else {
      return (
        <Link href={to} {...rest}>
          {children}
        </Link>
      )
    }
  } else {
    return fallback
  }
}

export default LinkDuo
