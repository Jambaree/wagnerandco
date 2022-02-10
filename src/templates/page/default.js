import React from 'react'
import { graphql } from 'gatsby'

// Ours
import permittedSlug from '../../utils/permitted-slug'
import PageWrapper from '../../components/PageWrapper'
import Wrapper from '../../components/Wrapper'
import Header from '../../components/Header'
import YoastHelmet from '../../components/YoastHelmet'
// import GutenbergBlocks from '../components/GutenbergBlocks'

const WPPage = props => {
  const data = props.data
  const pageNode = data.wpPage
  console.log(pageNode.template.acfPages.wcoPageSubtitle)

  // TODO Add placeholder schema page for Gutenberg
  //      blocks on generic pages
  // <GutenbergBlocks blocks={pageNode.blocks} />

  return (
    <PageWrapper className="WPPage">
      <YoastHelmet node={pageNode} url={data.wp.acfOptions.options.url} />
      <Wrapper maxWidth={3}>
        <Header
          showTitle
          title={pageNode.title}
          subtitle={pageNode.template.acfPages.wcoPageSubtitle}
        />
        <div dangerouslySetInnerHTML={{ __html: pageNode.content }} />
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
      # blocks {
      #   innerHTML
      #   blockName
      # }
      template {
        ... on WpDefaultTemplate {
          templateName
          acfPages {
            wcoPageSubtitle
          }
        }
      }
      #  acf {
      #    wco_page_subtitle
      #  }
      # yoast_meta {
      #   yoast_wpseo_title
      #   yoast_wpseo_metadesc

      #   # Facebook
      #   yoast_wpseo_facebook_title
      #   yoast_wpseo_facebook_description
      #   yoast_wpseo_facebook_type
      #   # yoast_wpseo_facebook_image {
      #   #   id
      #   #   localFile {
      #   #     childImageSharp {
      #   #       id
      #   #       fluid(maxWidth: 1200) {
      #   #         aspectRatio
      #   #         src
      #   #       }
      #   #     }
      #   #   }
      #   # }

      #   # yoast_wpseo_facebook_image
      #   # Twitter
      #   yoast_wpseo_twitter_title
      #   yoast_wpseo_twitter_description
      #   # yoast_wpseo_twitter_image
      # }
    }
  }
`
