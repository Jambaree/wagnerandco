'use client'
import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

// Ours
import format from '../utils/format'
import permittedSlug from '../utils/permitted-slug'
import WeddingFeaturedMedia from './WeddingFeaturedMedia'

class WeddingsListing extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: props.limit,
    }
  }

  render() {
    const props = this.props
    const state = this.state
    // console.log(props)
    const weddings = props.weddings.slice(0, state.visible)
    let nextVisibleCount = state.visible + props.limit

    return (
      <div className="md-pb4">
        <ul className="WeddingsListing m0 p0 md-pb4 list-style-none sm-mxn2 md-mxn3 lg-mxn4 sm-flex flex-wrap">
          {weddings.map((wedding, index) => {
            if (!permittedSlug(wedding.slug, true)) {
              return null
            }

            let keyStr = `Weddings_${wedding.id}_${index}`
            let columnClasses = `col-12 sm-col-8 sm-left md-col-12 md-left`
            let formattedTitle = format.subtitle(
              wedding.acf.wco_page_subtitle,
              wedding.title,
              { bold: true }
            )

            if (index % 2 === 0) {
              columnClasses = `col-12 sm-col-8 sm-right md-col-12 md-left`
            }

            if (index % 4 === 0) {
              columnClasses = `col-12 sm-col-6 sm-right md-col-8 md-right`
            }

            if ((index + 1) % 4 === 0) {
              columnClasses = `col-12 sm-col-12 sm-left md-col-8 md-right`
            }

            return (
              <li
                key={keyStr}
                className="col-12 md-col-6 mb3 sm-mb4 md-mb0 sm-px2 md-px3 lg-px4">
                <div
                  className={`${columnClasses} ${
                    index % 2 === 0 ? '' : 'WeddingsListing-item'
                  }`}>
                  <Link
                    href={`${props.slugPrefix}/${wedding.slug}`}
                    className="block border-none hover-media-opacity hover-color-red">
                    <figure>
                      <div className="col-12 relative">
                        <WeddingFeaturedMedia node={wedding} />
                      </div>
                      <figcaption className="block col-12 mt2 md-mt3 line-height-3 md-line-height-4">
                        <div className="max-width-1">
                          {formattedTitle
                            ? formattedTitle
                            : wedding.title.rendered}
                        </div>
                      </figcaption>
                    </figure>
                  </Link>
                </div>
              </li>
            )
          })}
        </ul>
        {props.showMore && weddings.length >= state.visible ? (
          <div className="mx-auto center">
            <button
              className="border-none px3 btn bg-transparent center"
              onClick={(e) => {
                this.setState({ visible: nextVisibleCount })
              }}>
              <div className="h3 a-faux peach border-red line-height-4">
                More Films
              </div>
            </button>
          </div>
        ) : null}
      </div>
    )
  }
}

WeddingsListing.propTypes = {
  edges: PropTypes.array.isRequired,
  limit: PropTypes.number.isRequired,
  slugPrefix: PropTypes.string,
  showMore: PropTypes.bool,
}

WeddingsListing.defaultProps = {
  edges: [],
  limit: 10,
  slugPrefix: '/weddings',
  showMore: true,
}

export default WeddingsListing
