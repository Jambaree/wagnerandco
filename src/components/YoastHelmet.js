import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import _has from 'lodash.get'
// import formatOpenGraph from '../utils/format-open-graph'
import unesc from '../utils/unescape'

class YoastHelmet extends React.Component {
  formatOpenGraph() {
    let { node, url } = this.props
    let y = node.yoast_meta

    let ogDefaults = {
      title:
        _has(y, 'yoast_wpseo_title') &&
        y.yoast_wpseo_title !== '' &&
        !y.yoast_wpseo_title.includes('not found')
          ? y.yoast_wpseo_title
          : `${node.title}`,
      description:
        _has(y, 'yoast_wpseo_metadesc') && y.yoast_wpseo_metadesc !== ''
          ? y.yoast_wpseo_metadesc
          : _has(node, 'acf.wco_page_subtitle') && node.acf.wco_page_subtitle
          ? node.acf.wco_page_subtitle
          : null,
      image: _has(node, 'featured_media.localFile.childImageSharp.fluid.src')
        ? node.featured_media.localFile.childImageSharp.fluid.src
        : null,
    }

    let openGraph = {
      title: ogDefaults.title,
      description: ogDefaults.description,
      'og:title':
        _has(y, 'yoast_wpseo_facebook_title') &&
        y.yoast_wpseo_facebook_title !== ''
          ? y.yoast_wpseo_facebook_title
          : ogDefaults.title,
      'og:description':
        _has(y, 'yoast_wpseo_facebook_description') &&
        y.yoast_wpseo_facebook_description !== ''
          ? y.yoast_wpseo_facebook_description
          : ogDefaults.description,
      'og:image': _has(
        y,
        'yoast_wpseo_facebook_image.localFile.childImageSharp.fluid.src'
      )
        ? y.yoast_wpseo_facebook_image.localFile.childImageSharp.fluid.src
        : ogDefaults.image,
      // 'og:image:alt'
    }

    openGraph['twitter:title'] =
      _has(y, 'yoast_wpseo_twitter_title') && y.yoast_wpseo_twitter_title !== ''
        ? y.yoast_wpseo_twitter_title
        : openGraph['og:title']

    openGraph['twitter:description'] =
      _has(y, 'yoast_wpseo_twitter_description') &&
      y.yoast_wpseo_twitter_description !== ''
        ? y.yoast_wpseo_twitter_description
        : openGraph['og:description']

    openGraph['twitter:image'] = _has(
      y,
      'yoast_wpseo_twitter_image.localFile.childImageSharp.fluid.src'
    )
      ? y.yoast_wpseo_twitter_image.localFile.childImageSharp.fluid.src
      : openGraph['og:image']

    // Prefix image with URL
    if (openGraph['og:image']) {
      openGraph['og:image'] = `${url}${openGraph['og:image']}`
    }
    if (openGraph['twitter:image']) {
      openGraph['twitter:image'] = `${url}${openGraph['twitter:image']}`
    }

    // Determine Twitter card type based on image
    openGraph['twitter:card'] = openGraph['twitter:image']
      ? 'summary_large_image'
      : 'summary'

    return openGraph
  }

  // Temp
  componentDidMount() {
    let openGraph = this.formatOpenGraph()
    if (process && process.env && process.env.NODE_ENV === 'development') {
      console.log('open graph data', openGraph)
    }
  }

  render() {
    const props = this.props
    let openGraph = this.formatOpenGraph()

    return (
      <Helmet>
        {Object.keys(openGraph).map((key, index) => {
          let content = openGraph[key]
          let keyStr = `${key}_${index}`
          if (content) {
            if (key === 'title') {
              return <title key={keyStr}>{unesc(content)}</title>
            } else {
              return <meta key={keyStr} name={key} content={unesc(content)} />
            }
          }

          return null
        })}
        {props.children}
      </Helmet>
    )
  }
}

YoastHelmet.defaultProps = {
  url: 'https://wagnerandco.film',
  children: null,
}

YoastHelmet.propTypes = {
  url: PropTypes.string.isRequired,
  node: PropTypes.shape({
    yoast_meta: PropTypes.object.isRequired,
  }).isRequired,
}

export default YoastHelmet
