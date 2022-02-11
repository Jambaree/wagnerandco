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

const WPGuide = props => {
  const data = props.data
  const pageNode = data.wpGuide
  let sidebarItems = gutenbergBlocksToNav(pageNode.blocks)

  if (!permittedSlug(pageNode.slug)) {
    return null
  }

  // NOTE Don’t index WP Guide pages
  // TODO Make this configurable—we aren’t reading it from the WP custom post
  // type data, because then that removes some of the metadata we need to
  // be sent along via the API

  return (
    <PageWrapper className="WPGuide pb4" is="article">
      {/* <YoastHelmet node={pageNode} url={data.wp.acfOptions.options.url}>
        <meta name="robots" content="noindex" />
      </YoastHelmet> */}
      <WhitespaceHeaderCorners
        title={pageNode.title}
        date={props.showDate ? pageNode.date : undefined}
        location=""
        reverse={true}
      />
      <SidebarNav items={sidebarItems} />
      <Wrapper maxWidth={3}>
        {/* <GutenbergBlocks blocks={pageNode.blocks} /> */}
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
      id
      slug
      title
      date
      # content
      blocks {
        name
        originalContent
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
    }
  }
`
