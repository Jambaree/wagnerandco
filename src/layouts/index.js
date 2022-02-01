import '../css/index.css'

import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import _has from 'lodash.has'

// Ours
import Wrapper from '../components/Wrapper'
import GlobalColors from '../components/GlobalColors'
import unesc from '../utils/unescape'

// TODO Improve this API, or add wrapper into each page
const fullWidthPages = ['/', 'weddings']

const Layout = props => {
  return (
    <StaticQuery
      query={graphql`
        query SiteMetaQuery {
          site: wordpressWpSettings {
            title
            description
            url
            # email
            # timezone
            # date_format
            # time_format
            language
            # posts_per_page
          }

          # TODO Might be better way to get front page from WP,
          # but it doesn’t seem available from wordpressWpSettings
          home: wordpressPage(slug: { eq: "home" }) {
            featured_media {
              id
              slug
              localFile {
                childImageSharp {
                  fluid {
                    src
                  }
                }
              }
            }
          }
          wordpressAcfOptions {
            options {
              url
              wco_service_typekit
              wco_socialmedia {
                label
                handle
                url
              }
              wco_footer_tagline
              wco_established_year
            }
          }
        }
      `}
      render={data => {
        const children = props.children
        const site = data.site
        const pathname = props.location.pathname
        const options = data.wordpressAcfOptions.options

        let wrapperProps = { padding: true, maxWidth: 5 }
        let pathnameSplit = pathname.split('/')[1]

        if (pathname === '/' || fullWidthPages.indexOf(pathnameSplit) !== -1) {
          wrapperProps.maxWidth = 0
          wrapperProps.padding = false
        }

        let og = {
          title: unesc(site.title),
          description: unesc(site.description), // TODO
          url: options.url,
          image: _has(
            props,
            'data.home.featured_media.localFile.childImageSharp.sizes.src'
          )
            ? `${options.url}${data.home.featured_media.localFile.childImageSharp.sizes.src}`
            : null,
        }

        return (
          <div>
            <Helmet
              title={og.title}
              meta={[
                { name: 'description', content: og.description },
                // { name: 'og:url', content: og.url },
                { name: 'og:title', content: og.title },
                { name: 'og:description', content: og.description },
                { name: 'og:site_name', content: og.title },
                // { name: 'article:author', content: 'Tomasz Wagner' },
                // { name: 'twitter:creator', content: '@tomaszwagner' },
                // { name: 'twitter:site', content: '@wagnerandcofilm' },
                { name: 'twitter:card', content: 'summary_large_image' },
                { name: 'twitter:image', content: og.image },
                { name: 'og:image', content: og.image },
                // TODO
                // Don’t do this until it’s properly set up, otherwise will
                // show up as the deafult even on pages without img dimensions
                // { name: 'og:image:type', content: 'image/png' },
                // { name: 'og:image:width', content: 1500 },
                // { name: 'og:image:height', content: 750 },
              ]}>
              <link
                rel="stylesheet"
                href={`https://use.typekit.net/${options.wco_service_typekit}.css`}
              />
            </Helmet>
            <GlobalColors
              pathname={pathname}
              title={og.title}
              showNav={pathnameSplit !== 'highlights'}
              footerItems={options.wco_socialmedia.map(item => ({
                href: item.url,
                label: item.label,
              }))}
              footerTagline={options.wco_footer_tagline}
              footerEstYear={options.wco_established_year}>
              <Wrapper {...wrapperProps}>{children}</Wrapper>
            </GlobalColors>
          </div>
        )
      }}
    />
  )
}

Layout.propTypes = {
  children: PropTypes.node,
}

export default Layout
