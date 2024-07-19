import React from 'react'
import PropTypes from 'prop-types'
import ScrollAnchor from '../components/ScrollAnchor'

const SidebarNav = (props) => {
  return (
    <div className="md-sticky md-pt2 lg-pt4 md-mnt2 lg-mnt4 top-0 z2 h4 line-height-4">
      <nav
        className={`${props.className} md-col-3 right-align md-absolute right-0 xlg-right-4`}>
        <ul className="list-style-none m0 p0">
          {props?.items?.map((item, index) => {
            return (
              <li
                key={`SidebarNav_${item?.label?.substring(0, 5)}_${index}`}
                className="block">
                <ScrollAnchor className="scroll" href={item.href}>
                  {item.label}
                </ScrollAnchor>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

SidebarNav.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      href: PropTypes.string,
    })
  ).isRequired,
}

SidebarNav.defaultProps = {}

export default SidebarNav
