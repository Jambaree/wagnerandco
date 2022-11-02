import React from 'react'
import { graphql } from 'gatsby'

// Ours
import permittedSlug from '../../utils/permitted-slug'
import PageWrapper from '../../components/PageWrapper'
import Wrapper from '../../components/Wrapper'
import Header from '../../components/Header'
// import YoastHelmet from '../../components/YoastHelmet'
import Seo from '../../components/Seo'
import FlexibleContent from '../../components/FlexibleContent'
import headlineBlocksToNav from '../../utils/headline-blocks-to-nav'

const PostTemplate = (props) => {
  const data = props.data
  const postNode = data.wpPost
  const seoData = data.wpPost.seo
  let sidebarItems = headlineBlocksToNav(
    props?.data?.wpPost?.acfTextImageBlocks?.modules
  )
  if (!permittedSlug(postNode.slug)) {
    return null
  }

  return (
    <PageWrapper is="article" className="WPPost">
      <Seo {...seoData} />
      <SidebarNav items={sidebarItems} />
      <Wrapper maxWidth={3}>
        <Header showTitle title={postNode.title} />
        {!!props?.data?.wpPost?.acfTextImageBlocks?.modules && (
          <FlexibleContent
            rows={props?.data?.wpPost?.acfTextImageBlocks?.modules}
            data={{
              titl: props?.data?.wpPost?.title,
              uri: props?.data?.wpPost?.uri,
            }}
          />
        )}
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
          gatsbyImage(
            placeholder: BLURRED
            quality: 90
            width: 600
            layout: CONSTRAINED
          )
        }
      }
      date
      slug
      title
      id
      # content
      acfTextImageBlocks {
        wcoBlockTitle
        fieldGroupName
        modules {
          ... on WpPost_Acftextimageblocks_Modules_BlockHeadline {
            fieldGroupName
            heading
          }
          ... on WpPost_Acftextimageblocks_Modules_BlockTextarea {
            fieldGroupName
            content
          }
          ... on WpPost_Acftextimageblocks_Modules_BlockGifVideo {
            fieldGroupName
            featuredLoop {
              mediaItemUrl
              id
            }
          }
          ... on WpPost_Acftextimageblocks_Modules_BlockForm {
            fieldGroupName
            formId
          }
          ... on WpPost_Acftextimageblocks_Modules_BlockVideo {
            fieldGroupName
            vimeoId
          }
        }
      }
    }
  }
`
