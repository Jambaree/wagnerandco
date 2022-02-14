import React from 'react'
import { graphql } from 'gatsby'

// Ours
import permittedSlug from '../../utils/permitted-slug'
import PageWrapper from '../../components/PageWrapper'
import Wrapper from '../../components/Wrapper'
import Header from '../../components/Header'
// import YoastHelmet from '../../components/YoastHelmet'
// import GutenbergBlocks from '../components/GutenbergBlocks'

const WPPage = props => {
  const data = props.data
  const pageNode = data.wpPage

  // TODO Add placeholder schema page for Gutenberg
  //      blocks on generic pages

  return (
    <PageWrapper className="WPPage">
      <Wrapper maxWidth={3}>
        <Header
          showTitle
          title={pageNode.title}
          subtitle={pageNode.template.acfPages.wcoPageSubtitle}
        />
        <div dangerouslySetInnerHTML={{ __html: pageNode.content }} />
        <GutenbergBlocks blocks={pageNode.blocks} />
      </Wrapper>
    </PageWrapper>
  )
}

export default WPPage

export const pageQuery = graphql`
  query WordpressPage($id: String!) {
    wp {
      acfOptions {
        options {
          url
        }
      }
    }
    wpPage(id: { eq: $id }) {
      id
      slug
      title
      content
      # TODO
      blocks {
        name
        originalContent
        ... on WpGravityformsFormBlock {
          attributes {
            formId
          }
        }
      }
      template {
        ... on WpDefaultTemplate {
          templateName
          acfPages {
            wcoPageSubtitle
          }
        }
      }
    }
  }
`
