import React from 'react'
import { graphql } from 'gatsby'

// Ours
import PageWrapper from '../components/PageWrapper'
import Wrapper from '../components/Wrapper'
import Video from '../components/Video'
import WeddingsListing from '../components/WeddingsListing'
import Header from '../components/Header'
import WhitespaceHeader from '../components/WhitespaceHeader'
import { H1, Intro } from '../components/Headings'
import YoastHelmet from '../components/YoastHelmet'
import Doodle from '../components/Doodle'

const IndexPage = props => {
  const data = props.data
  const pageAcf = data.wordpressPage.acf
  const weddingEdges = data.allWordpressWpWeddings.edges

  return (
    <PageWrapper>
      <YoastHelmet url={data.options.options.url} node={data.wordpressPage} />
      <Wrapper padding>
        <WhitespaceHeader is="div" marginBottom={5}>
          <Header
            className="mt3"
            showTitle
            title={data.wordpressPage.title}
            subtitle={pageAcf.wco_page_subtitle}
          />
        </WhitespaceHeader>
      </Wrapper>
      <div className="relative col-12 mb3" style={{ height: '50px' }}>
        <div className="absolute right-0">
          <Doodle name="wave" color="red" />
        </div>
      </div>
      <Video vimeoId={pageAcf.wco_frontpage_vimeo_id} />
      <Wrapper padding>
        <div className="center py2 sm-py3 mb3 md-py4 mb4">
          <H1 is="h2">{pageAcf.wco_frontpage_weddings_title}</H1>
          <Intro>{pageAcf.wco_frontpage_weddings_subtitle}</Intro>
        </div>
        <WeddingsListing edges={weddingEdges} limit={4} showMore={false} />
        <WhitespaceHeader
          is="div"
          minHeight={350}
          height={25 + WhitespaceHeader.defaultProps.marginBottom}
          marginTop={0}
          marginBottom={0}>
          <div className="max-width-2 mx-auto h3 line-height-4 center">
            {pageAcf.wco_frontpage_weddings_footer}
          </div>
        </WhitespaceHeader>
      </Wrapper>
    </PageWrapper>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery {
    options: wordpressAcfOptions {
      options {
        url
      }
    }
    wordpressPage(slug: { eq: "home" }) {
      id
      slug
      title
      acf {
        wco_page_subtitle
        wco_frontpage_weddings_title
        wco_frontpage_weddings_subtitle
        wco_frontpage_vimeo_id
        wco_frontpage_weddings_footer
      }
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
                fluid {
                  src
                  srcSet
                  sizes
                }
              }
            }
          }
          acf {
            wco_page_subtitle
          }
        }
      }
    }
  }
`
