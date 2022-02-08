import React from 'react'
import { graphql } from 'gatsby'

// Ours
import permittedSlug from '../utils/permitted-slug'
import PageWrapper from '../components/PageWrapper'
import Wrapper from '../components/Wrapper'
import Header from '../components/Header'
import WhitespaceHeader from '../components/WhitespaceHeader'
import GutenbergBlocks from '../components/GutenbergBlocks'
import YoastHelmet from '../components/YoastHelmet'

const WPInfo = props => {
  const data = props.data
  const pageNode = data.wordpressWpInfo

  if (!permittedSlug(pageNode.slug)) {
    return null
  }

  return (
    <PageWrapper className="WPInfo pb4" is="article">
      <YoastHelmet node={pageNode} url={data.options.options.url} />
      <Wrapper maxWidth={3}>
        <WhitespaceHeader marginBottom={5}>
          <Header showTitle title={pageNode.title} />
        </WhitespaceHeader>
        <GutenbergBlocks blocks={pageNode.blocks} />
      </Wrapper>
    </PageWrapper>
  )
}

export default WPInfo

export const pageQuery = graphql`
  query WordpressInfo($id: String!) {
    options: wordpressAcfOptions {
      options {
        url
      }
    }
    wordpressWpInfo(id: { eq: $id }) {
      id
      wordpress_id
      slug
      title
      template
      # content
      blocks {
        innerHTML
        blockName

        # For Gravity Forms, probably other Gutenberg block type
        attrs {
          formId
          wordpress_id
        }
      }
      featured_media {
        id
        alt_text
        localFile {
          childImageSharp {
            id
            fluid(maxWidth: 960) {
              src
              srcSet
              sizes
            }
          }
        }
      }
      yoast_meta {
        yoast_wpseo_title
        yoast_wpseo_metadesc

        # Facebook
        yoast_wpseo_facebook_title
        yoast_wpseo_facebook_description
        yoast_wpseo_facebook_type
        # yoast_wpseo_facebook_image

        # Twitter
        yoast_wpseo_twitter_title
        yoast_wpseo_twitter_description
        # yoast_wpseo_twitter_image
      }
    }
  }
`
