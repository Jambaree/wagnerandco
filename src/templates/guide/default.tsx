import React from 'react'

// Ours
import permittedSlug from '../../utils/permitted-slug'
import PageWrapper from '../../components/PageWrapper'
import Wrapper from '../../components/Wrapper'
import WhitespaceHeaderCorners from '../../components/WhitespaceHeaderCorners'

import SidebarNav from '../../components/SidebarNav'
import headlineBlocksToNav from '../../utils/headline-blocks-to-nav'

import FlexibleContent from '../../components/FlexibleContent'
export function GuideTemplate(props) {
  // const data = props.data
  // const pageNode = data.wpGuide
  // let sidebarItems = headlineBlocksToNav(
  //   props?.data?.wpGuide?.acfTextImageBlocks?.modules
  // )
  // const seoData = data.wpGuide.seo

  // if (!permittedSlug(pageNode.slug)) {
  //   return null
  // }

  // NOTE Don’t index WP Guide pages
  // TODO Make this configurable—we aren’t reading it from the WP custom post
  // type data, because then that removes some of the metadata we need to
  // be sent along via the API

  return (
    <PageWrapper className="WPGuide pb4" is="article">
      <div>Guide template</div>
      {/* <WhitespaceHeaderCorners
        title={props?.data?.wpGuide?.acfTextImageBlocks?.wcoBlockTitle}
        date={props.showDate ? pageNode.date : undefined}
        location=""
        reverse={true}
      />
      <SidebarNav items={sidebarItems} />
      <Wrapper maxWidth={3}>
        {!!props?.data?.wpGuide?.acfTextImageBlocks?.modules && (
          <FlexibleContent
            rows={props?.data?.wpGuide?.acfTextImageBlocks?.modules}
            data={{
              titl: props?.data?.wpGuide?.title,
              uri: props?.data?.wpGuide?.uri,
            }}
          />
        )}
      </Wrapper> */}
      {/* {console.log(props?.data?.wpGuide?.acfTextImageBlocks?.wcoBlockTitle)}
      {console.log(pageNode.blocks)} */}
    </PageWrapper>
  )
}

// export const pageQuery = graphql`
//   query WordpressGuide($id: String!) {
//     wp {
//       acfOptions {
//         options {
//           url
//         }
//       }
//     }
//     wpGuide(id: { eq: $id }) {
//       seo {
//         title
//         metaDesc
//         opengraphTitle
//         opengraphDescription
//         opengraphImage {
//           altText
//           sourceUrl
//           gatsbyImage(
//             formats: AUTO
//             fit: OUTSIDE
//             placeholder: BLURRED
//             quality: 90
//             width: 600
//           )
//         }
//       }
//       id
//       slug
//       title
//       date
//       uri
//       # content
//       # acf {
//       #   wco_page_subtitle
//       # }
//       acfTextImageBlocks {
//         wcoBlockTitle
//         fieldGroupName
//         modules {
//           ... on WpGuide_Acftextimageblocks_Modules_BlockHeadline {
//             fieldGroupName
//             heading
//           }
//           ... on WpGuide_Acftextimageblocks_Modules_BlockTextarea {
//             fieldGroupName
//             content
//           }
//           ... on WpGuide_Acftextimageblocks_Modules_BlockGifVideo {
//             fieldGroupName
//             featuredLoop {
//               mediaItemUrl
//               id
//             }
//           }
//           ... on WpGuide_Acftextimageblocks_Modules_BlockForm {
//             fieldGroupName
//             formId
//           }
//           ... on WpGuide_Acftextimageblocks_Modules_BlockVideo {
//             fieldGroupName
//             vimeoId
//           }
//         }
//       }
//       featuredImage {
//         node {
//           id
//           altText
//           gatsbyImage(
//             formats: AUTO
//             fit: OUTSIDE
//             placeholder: BLURRED
//             quality: 90
//             width: 600
//           )
//         }
//       }
//     }
//   }
// `
