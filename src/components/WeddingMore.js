import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import unesc from '../utils/unescape'
import permittedSlug from '../utils/permitted-slug'

const WeddingMoreThumb = props => (
  <div
    className={`WeddingMoreThumb bg-peach red mb1 hover-bg-${props.hover} hover-color-peach hover-transition-all flex items-center justify-around`}>
    <div
      dangerouslySetInnerHTML={{ __html: props.title }}
      className="center font-weight-600 lowercase line-height-2 absolute mx-auto line-height-2"
      style={{
        fontSize: '0.95em',
        maxWidth: '190px',
        transform: `rotate(45deg)`,
        transformOrigin: 'center center',
      }}
    />
  </div>
)

WeddingMoreThumb.defaultProps = {
  hover: 'red',
}

const WeddingMore = props => {
  return (
    <ul className="m0 p0 list-style-none flex flex-wrap mxn1">
      {props.edges.map(({ node }, index) => {
        if (!permittedSlug(node.slug)) {
          return null
        }

        return (
          <li
            className="col-6 sm-col-4 md-col-3 block px1 mb3"
            key={`${node.id}_${index}`}>
            <Link
              to={`${props.slugPrefix}/${node.slug}`}
              className="block border-none">
              <WeddingMoreThumb
                title={node.title}
                hover={index % 2 ? 'blue' : 'red'}
              />
              <div className="red">{unesc(node.acf.wco_wedding_couple)}</div>
              <div className="red">{unesc(node.acf.wco_wedding_location)}</div>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

WeddingMore.defaultProps = {
  edges: PropTypes.array.isRequired,
  limit: PropTypes.number.isRequired,
  slugPrefix: PropTypes.string,
}

WeddingMore.defaultProps = {
  edges: [],
  limit: 8,
  slugPrefix: '/weddings',
}

export default WeddingMore
