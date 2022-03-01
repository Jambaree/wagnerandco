import '../css/index.css'

import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import _has from 'lodash.has'

// Ours
import Wrapper from '../components/Wrapper'
import GlobalColors from '../components/GlobalColors'

// TODO Improve this API, or add wrapper into each page
const fullWidthPages = ['/', 'weddings']

const Layout = props => {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      wp {
        acfOptions {
          pageSlug
          pageTitle
          options {
            fieldGroupName
            url
            wcoEstablishedYear
            wcoFooterTagline
            wcoServiceTypekit
            wcoSocialmedia {
              handle
              label
              url
            }
          }
        }
        allSettings {
          generalSettingsDescription
          generalSettingsUrl
          generalSettingsTitle
          generalSettingsLanguage
        }
      }
      home: wpPage(slug: { eq: "home" }) {
        featuredImage {
          node {
            id
            slug
            localFile {
              childImageSharp {
                resize {
                  src
                }
              }
            }
          }
        }
      }
    }
  `)

  const children = props.children
  const site = data.wp.allSettings
  const pathname = props.location.pathname
  const options = data.wp.acfOptions.options

  let wrapperProps = { padding: true, maxWidth: 5 }
  let pathnameSplit = pathname.split('/')[1]

  if (pathname === '/' || fullWidthPages.indexOf(pathnameSplit) !== -1) {
    wrapperProps.maxWidth = 0
    wrapperProps.padding = false
  }

  let og = {
    title: site.generalSettingsTitle,
    description: site.generalSettingsDescription, // TODO
    url: options.url,
    image: _has(
      props,
      'data.home.featuredImage.node.localFile.childImageSharp.sizes.src'
    )
      ? `${options.url}${data.home.featuredImage.node.localFile.childImageSharp.resize.src}`
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
          href={`https://use.typekit.net/${options.wcoServiceTypekit}.css`}
        />
      </Helmet>
      <GlobalColors
        pathname={pathname}
        title={og.title}
        showNav={pathnameSplit !== 'highlights'}
        footerItems={options.wcoSocialmedia.map(item => ({
          href: item.url,
          label: item.label,
        }))}
        footerTagline={options.wcoFooterTagline}
        footerEstYear={options.wcoEstablishedYear}>
        <Wrapper {...wrapperProps}>{children}</Wrapper>
      </GlobalColors>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node,
}

export default Layout
