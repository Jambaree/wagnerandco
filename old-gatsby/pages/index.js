import React from 'react'

// Ours
import PageWrapper from '../../src/components/PageWrapper'
import Wrapper from '../../src/components/Wrapper'
import Video from '../../src/components/Video'
import WeddingsListing from '../../src/components/WeddingsListing'
import Header from '../../src/components/Header'
import WhitespaceHeader from '../../src/components/WhitespaceHeader'
import { H1, Intro } from '../../src/components/Headings'
// import YoastHelmet from '../components/YoastHelmet'
import Doodle from '../../src/components/Doodle'

const IndexPage = (props) => {
  const { data } = props

  const pageAcf = data?.wpPage?.acfFrontPage
  const weddingEdges = data?.allWpWedding?.edges

  return (
    <PageWrapper>
      {/* <Wrapper padding>
        <WhitespaceHeader is="div" marginBottom={5}>
          <Header
            className="mt3"
            showTitle
            title={data?.wpPage?.title}
            subtitle={data?.wpPage?.template?.acfPages?.wcoPageSubtitle}
          />
        </WhitespaceHeader>
      </Wrapper>
      <div className="relative col-12 mb3" style={{ height: '50px' }}>
        <div className="absolute right-0">
          <Doodle name="wave" color="red" />
        </div>
      </div>
      <Video vimeoId={pageAcf?.wcoFrontpageVimeoId} />
      <Wrapper padding>
        <div className="center py2 sm-py3 mb3 md-py4 mb4">
          <H1 is="h2">{pageAcf?.wcoFrontpageWeddingsTitle}</H1>
          <Intro>{pageAcf?.wcoFrontpageWeddingsSubtitle}</Intro>
        </div>
        <WeddingsListing edges={weddingEdges} limit={4} showMore={false} />
        <WhitespaceHeader
          is="div"
          minHeight={350}
          height={25 + WhitespaceHeader.defaultProps.marginBottom}
          marginTop={0}
          marginBottom={0}>
          <div className="max-width-2 mx-auto h3 line-height-4 center">
            {pageAcf.wcoFrontpageWeddingsFooter}
          </div>
        </WhitespaceHeader>
      </Wrapper> */}
    </PageWrapper>
  )
}

export default IndexPage

// export const pageQuery = graphql`
//   query IndexQuery {
//     wp {
//       acfOptions {
//         options {
//           url
//         }
//       }
//     }
//     allWpWedding(sort: { fields: [date], order: DESC }) {
//       edges {
//         node {
//           id
//           slug
//           title
//           content
//           featuredImage {
//             node {
//               id
//               altText
//               gatsbyImage(
//                 formats: AUTO
//                 fit: OUTSIDE
//                 placeholder: BLURRED
//                 quality: 90
//                 width: 600
//               )
//             }
//           }
//           acfPages {
//             wcoPageSubtitle
//           }
//         }
//       }
//     }
//     wpPage(slug: { eq: "home" }) {
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
//       acfFrontPage {
//         fieldGroupName
//         wcoFrontpageVimeoId
//         wcoFrontpageWeddingsFooter
//         wcoFrontpageWeddingsSubtitle
//         wcoFrontpageWeddingsTitle
//       }
//       template {
//         templateName
//         ... on WpTemplate_HomePage {
//           templateName
//           acfPages {
//             wcoPageSubtitle
//           }
//         }
//       }
//       featuredImage {
//         node {
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
