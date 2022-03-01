import React from 'react'
import Helmet from 'react-helmet'
import reactHtmlParser from 'react-html-parser'

const Seo = props => {
  const {
    siteTitle,
    href,
    title,
    metaDesc,
    opengraphTitle,
    opengraphDescription,
    opengraphImage,
  } = props

  return (
    <Helmet>
      {title && <title>{reactHtmlParser(title)}</title>}

      {metaDesc && (
        <meta name="description" content={reactHtmlParser(metaDesc)} />
      )}

      <meta property="og:type" content="website" />

      {(!!opengraphDescription || !!metaDesc) && (
        <meta
          property="og:description"
          content={reactHtmlParser(opengraphDescription || metaDesc)}
        />
      )}

      {opengraphImage && (
        <meta property="og:image" content={opengraphImage.sourceUrl} />
      )}

      {siteTitle && (
        <meta property="og:site_name" content={reactHtmlParser(siteTitle)} />
      )}

      {href && <meta property="og:url" content={href} />}

      {(opengraphTitle || title) && (
        <meta
          property="og:title"
          content={reactHtmlParser(opengraphTitle || title)}
        />
      )}

      <meta name="twitter:card" content="summary" />

      {opengraphImage && (
        <meta property="twitter:image" content={opengraphImage.sourceUrl} />
      )}

      {(opengraphTitle || title) && (
        <meta
          property="twitter:title"
          content={reactHtmlParser(opengraphTitle || title)}
        />
      )}
    </Helmet>
  )
}

export default Seo
