import React from 'react'
import { graphql } from 'gatsby'

// Ours
import permittedSlug from '../../utils/permitted-slug'
import PageWrapper from '../../components/PageWrapper'
import Wrapper from '../../components/Wrapper'
import Header from '../../components/Header'
import WhitespaceHeader from '../../components/WhitespaceHeader'
import GutenbergBlocks from '../../components/GutenbergBlocks'
import Seo from '../../components/Seo'
// import YoastHelmet from '../../components/YoastHelmet'

const WPInfo = props => {
  const data = props.data
  const pageNode = data.wpInfo
  const seoData = data.wpInfo.seo

  if (!permittedSlug(pageNode.slug)) {
    return null
  }

  return (
    <PageWrapper className="WPInfo pb4" is="article">
      <Seo {...seoData} />
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
    wp {
      acfOptions {
        options {
          url
        }
      }
    }
    wpInfo(id: { eq: $id }) {
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
      # content
      blocks {
        originalContent
        name
        ... on WpGravityformsFormBlock {
          attributes {
            formId
          }
        }
      }
      featuredImage {
        node {
          id
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(quality: 90, width: 960, layout: CONSTRAINED)
            }
          }
        }
      }
    }
  }
`
