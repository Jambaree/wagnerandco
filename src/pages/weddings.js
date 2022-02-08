import React from 'react'
import { graphql } from 'gatsby'

// Ours
import Header from '../components/Header'
import PageWrapper from '../components/PageWrapper'
import Wrapper from '../components/Wrapper'
import WeddingsListing from '../components/WeddingsListing'
import YoastHelmet from '../components/YoastHelmet'
import { stripTrailingSlash } from '../utils/format'

const WeddingsIndexPage = props => {
  const data = props.data
  const pageNode = data.wordpressPage
  let postEdges = data.allWordpressWpWeddings.edges
  let slugPrefix = stripTrailingSlash(props.location.pathname)
  let title = 'Weddings'

  return (
    <PageWrapper>
      <YoastHelmet node={pageNode} url={data.options.options.url} />
      <Header title={title} />
      <Wrapper maxWidth={5} padding>
        <WeddingsListing
          edges={postEdges}
          slugPrefix={slugPrefix}
          limit={data.settings.posts_per_page}
        />
      </Wrapper>
    </PageWrapper>
  )
}

export default WeddingsIndexPage

export const pageQuery = graphql`
  query WeddingsQuery {
    settings: wordpressWpSettings {
      title
      posts_per_page
    }
    options: wordpressAcfOptions {
      options {
        url
      }
    }
    wordpressPage(slug: { eq: "weddings" }) {
      id
      wordpress_id
      slug
      title
      acf {
        wco_page_subtitle
      }
      # yoast_meta {
      #   yoast_wpseo_title
      #   yoast_wpseo_metadesc

      #   # Facebook
      #   yoast_wpseo_facebook_title
      #   yoast_wpseo_facebook_description
      #   yoast_wpseo_facebook_type
      #   # yoast_wpseo_facebook_image

      #   # Twitter
      #   yoast_wpseo_twitter_title
      #   yoast_wpseo_twitter_description
      #   # yoast_wpseo_twitter_image
      # }
      featured_media {
        localFile {
          childImageSharp {
            id
            fluid(maxWidth: 1200) {
              src
            }
          }
        }
      }
    }
    allWordpressWpWeddings {
      edges {
        node {
          id
          wordpress_id
          slug
          title
          template
          content
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
          acf {
            wco_page_subtitle
            featured_loop {
              wordpress_id
              source_url
            }
          }
        }
      }
    }
  }
`
