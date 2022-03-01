import React from 'react'
import { graphql } from 'gatsby'

// Ours
import permittedSlug from '../../utils/permitted-slug'
import PageWrapper from '../../components/PageWrapper'
import Wrapper from '../../components/Wrapper'
import WhitespaceHeaderCorners from '../../components/WhitespaceHeaderCorners'
// import YoastHelmet from '../../components/YoastHelmet'
import GutenbergBlocks from '../../components/GutenbergBlocks'
import SidebarNav from '../../components/SidebarNav'
import gutenbergBlocksToNav from '../../utils/gutenberg-blocks-to-nav'
import Seo from '../../components/Seo'

const WPGuide = props => {
  const data = props.data
  const pageNode = data.wpGuide
  let sidebarItems = gutenbergBlocksToNav(pageNode.blocks)
  const seoData = data.wpGuide.seo

  if (!permittedSlug(pageNode.slug)) {
    return null
  }

  // NOTE Don’t index WP Guide pages
  // TODO Make this configurable—we aren’t reading it from the WP custom post
  // type data, because then that removes some of the metadata we need to
  // be sent along via the API

  return (
    <PageWrapper className="WPGuide pb4" is="article">
      <Seo {...seoData} />
      <WhitespaceHeaderCorners
        title={pageNode.title}
        date={props.showDate ? pageNode.date : undefined}
        location=""
        reverse={true}
      />
      <SidebarNav items={sidebarItems} />
      <Wrapper maxWidth={3}>
        <GutenbergBlocks blocks={pageNode.blocks} />
      </Wrapper>
    </PageWrapper>
  )
}

export default WPGuide

WPGuide.defaultProps = {
  showDate: false,
}

export const pageQuery = graphql`
  query WordpressGuide($id: String!) {
    wp {
      acfOptions {
        options {
          url
        }
      }
    }
    wpGuide(id: { eq: $id }) {
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
      date
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
      # acf {
      #   wco_page_subtitle
      # }
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
