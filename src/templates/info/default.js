import React from 'react'
import { graphql } from 'gatsby'

// Ours
import permittedSlug from '../../utils/permitted-slug'
import PageWrapper from '../../components/PageWrapper'
import Wrapper from '../../components/Wrapper'
import Header from '../../components/Header'
import WhitespaceHeader from '../../components/WhitespaceHeader'
import Seo from '../../components/Seo'
import FlexibleContent from '../../components/FlexibleContent'
import SidebarNav from '../../components/SidebarNav'
import headlineBlocksToNav from '../../utils/headline-blocks-to-nav'

// import YoastHelmet from '../../components/YoastHelmet'

const WPInfo = (props) => {
  const data = props.data
  const pageNode = data.wpInfo
  const seoData = data.wpInfo.seo
  let sidebarItems = headlineBlocksToNav(
    props?.data?.wpInfo?.acfTextImageBlocks?.modules
  )
  if (!permittedSlug(pageNode.slug)) {
    return null
  }
  return (
    <PageWrapper className="WPInfo pb4" is="article">
      <Seo {...seoData} />
      <Wrapper maxWidth={3}>
        <WhitespaceHeader marginBottom={5}>
          <Header
            showTitle
            title={props?.data?.wpInfo?.acfTextImageBlocks?.wcoBlockTitle}
          />
        </WhitespaceHeader>
        <SidebarNav items={sidebarItems} />

        {!!props?.data?.wpInfo?.acfTextImageBlocks?.modules && (
          <FlexibleContent
            rows={props?.data?.wpInfo?.acfTextImageBlocks?.modules}
            data={{
              titl: props?.data?.wpInfo?.title,
              uri: props?.data?.wpInfo?.uri,
            }}
          />
        )}
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
          gatsbyImage(
            formats: AUTO
            fit: OUTSIDE
            placeholder: BLURRED
            quality: 90
            width: 600
            layout: CONSTRAINED
          )
        }
      }
      id
      slug
      title
      # content
      acfTextImageBlocks {
        wcoBlockTitle
        fieldGroupName
        modules {
          ... on WpInfo_Acftextimageblocks_Modules_BlockHeadline {
            fieldGroupName
            heading
          }
          ... on WpInfo_Acftextimageblocks_Modules_BlockTextarea {
            fieldGroupName
            content
          }
          ... on WpInfo_Acftextimageblocks_Modules_BlockGifVideo {
            fieldGroupName
            featuredLoop {
              mediaItemUrl
              id
            }
          }
          ... on WpInfo_Acftextimageblocks_Modules_BlockForm {
            fieldGroupName
            formId
          }
          ... on WpInfo_Acftextimageblocks_Modules_BlockVideo {
            fieldGroupName
            vimeoId
          }
        }
      }
      featuredImage {
        node {
          id
          altText
          gatsbyImage(
            formats: AUTO
            fit: OUTSIDE
            placeholder: BLURRED
            quality: 90
            width: 600
            layout: CONSTRAINED
          )
        }
      }
    }
  }
`
