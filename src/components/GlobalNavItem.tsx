import React from 'react'
import Link from './LinkDuo'

type GlobalNavItemProps = {
  active?: boolean
  className?: string
  href: string
  label: string
}

const GlobalNavItem: React.FC<GlobalNavItemProps> = ({
  active = false,
  className = '',
  href,
  label,
  target,
}) => (
  <div>
    <Link
      target={target || ''}
      className={`lowercase border-none ${active ? 'muted' : ''} ${className}`}
      href={href}>
      {label}
    </Link>
  </div>
)

export default GlobalNavItem
