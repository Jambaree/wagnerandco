import React from 'react'
import { graphql } from 'gatsby'

// Ours
import permittedSlug from '../../utils/permitted-slug'
import PageWrapper from '../../components/PageWrapper'
import Wrapper from '../../components/Wrapper'
import Header from '../../components/Header'
// import YoastHelmet from '../../components/YoastHelmet'
import GutenbergBlocks from '../../components/GutenbergBlocks'
import Seo from '../../components/Seo'

const PostTemplate = props => {
  const data = props.data
  const postNode = data.wpPost
  const seoData = data.wpPost.seo

  if (!permittedSlug(postNode.slug)) {
    return null
  }

  return (
    <PageWrapper is="article" className="WPPost">
      <Seo {...seoData} />
      <Wrapper maxWidth={3}>
        <Header showTitle title={postNode.title} />
        <GutenbergBlocks blocks={postNode.blocks} />
      </Wrapper>
    </PageWrapper>
  )
}

export default PostTemplate

export const pageQuery = graphql`
  query PostById($id: String!) {
    wp {
      acfOptions {
        options {
          url
        }
      }
    }
    wpPost(id: { eq: $id }) {
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
              gatsbyImageData(quality: 90, layout: CONSTRAINED, formats: AUTO)
            }
          }
        }
      }
      date
      slug
      title
      id
      # content
      blocks {
        name
        originalContent
        ... on WpGravityformsFormBlock {
          attributes {
            formId
          }
        }
      }
    }
  }
`
