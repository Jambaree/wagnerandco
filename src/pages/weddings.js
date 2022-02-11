import React from 'react'
import { graphql } from 'gatsby'

// Ours
import Header from '../components/Header'
import PageWrapper from '../components/PageWrapper'
import Wrapper from '../components/Wrapper'
import WeddingsListing from '../components/WeddingsListing'
// import YoastHelmet from '../components/YoastHelmet'
import { stripTrailingSlash } from '../utils/format'

const WeddingsIndexPage = props => {
  const data = props.data
  const pageNode = data.wpPage
  let postEdges = data.allWpWedding.edges
  let slugPrefix = stripTrailingSlash(props.location.pathname)
  let title = 'Weddings'
  console.log(data.allWpWedding.edges)
  return (
    <PageWrapper>
      {/* <YoastHelmet node={pageNode} url={data.wp.acfOptions.options.url} /> */}
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
              id
              fluid(maxWidth: 1200) {
                src
              }
            }
          }
        }
      }
    }
    allWpWedding {
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
                  id
                  fluid(maxWidth: 960) {
                    src
                    srcSet
                    sizes
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
