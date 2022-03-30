import React from 'react'
import { graphql } from 'gatsby'

// Ours
import Header from '../components/Header'
import PageWrapper from '../components/PageWrapper'
import Wrapper from '../components/Wrapper'
import WeddingsListing from '../components/WeddingsListing'
// import YoastHelmet from '../components/YoastHelmet'
import { stripTrailingSlash } from '../utils/format'
import Seo from '../components/Seo'

const WeddingsIndexPage = props => {
  const data = props.data
  const pageNode = data.wpPage
  let postEdges = data.allWpWedding.edges
  let slugPrefix = stripTrailingSlash(props.location.pathname)
  let title = 'Weddings'
  const seoData = data.wpPage.seo

  return (
    <PageWrapper>
      <Seo {...seoData} />
      <Header title={title} />
      <Wrapper maxWidth={5} padding>
        <WeddingsListing
          edges={postEdges}
          slugPrefix={slugPrefix}
          limit={data.wp.allSettings.readingSettingsPostsPerPage}
        />
      </Wrapper>
    </PageWrapper>
  )
}

export default WeddingsIndexPage

export const pageQuery = graphql`
  query WeddingsQuery {
    wp {
      allSettings {
        readingSettingsPostsPerPage
      }
      acfOptions {
        options {
          url
        }
      }
    }
    wpPage(slug: { eq: "weddings" }) {
      seo {
        title
        metaDesc
        opengraphTitle
        opengraphDescription
        opengraphImage {
          altText
          sourceUrl
          localFile {
            childImageSharp {
              gatsbyImageData(quality: 90, layout: CONSTRAINED)
            }
          }
        }
      }
      id
      slug
      title
      template {
        ... on WpTemplate_WeddingsPage {
          templateName
          acfPages {
            wcoPageSubtitle
          }
        }
      }
      featuredImage {
        node {
          localFile {
            childImageSharp {
              gatsbyImageData(
                quality: 90
                layout: CONSTRAINED
                placeholder: BLURRED
              )
            }
          }
        }
      }
    }
    allWpWedding(sort: { fields: [date], order: DESC }) {
      edges {
        node {
          id
          slug
          title
          content
          featuredImage {
            node {
              id
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(
                    quality: 90
                    layout: CONSTRAINED
                    placeholder: BLURRED
                  )
                  fluid {
                    src
                  }
                }
              }
            }
          }
          acfFeaturedLoop {
            featuredLoop {
              mediaItemUrl
              id
            }
          }
          acfPages {
            wcoPageSubtitle
          }
        }
      }
    }
  }
`
