import React from 'react'
import { graphql } from 'gatsby'

// Ours
import permittedSlug from '../../utils/permitted-slug'
import PageWrapper from '../../components/PageWrapper'
import Wrapper from '../../components/Wrapper'
import Header from '../../components/Header'
// import YoastHelmet from '../../components/YoastHelmet'
import GutenbergBlocks from '../../components/GutenbergBlocks'

const PostTemplate = props => {
  const data = props.data
  const postNode = data.wpPost

  if (!permittedSlug(postNode.slug)) {
    return null
  }

  return (
    <PageWrapper is="article" className="WPPost">
      {/* <YoastHelmet url={data.wp.acfOptions.options.url} node={postNode} /> */}
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
      date
      slug
      title
      id
      # content
      blocks {
        name
        originalContent
      }
    }
  }
`
