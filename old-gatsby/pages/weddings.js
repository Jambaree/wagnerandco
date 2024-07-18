import React from 'react'

// Ours
import Header from '../../src/components/Header'
import PageWrapper from '../../src/components/PageWrapper'
import Wrapper from '../../src/components/Wrapper'
import WeddingsListing from '../../src/components/WeddingsListing'
// import YoastHelmet from '../components/YoastHelmet'
import { stripTrailingSlash } from '../../src/utils/format'

const WeddingsIndexPage = (props) => {
  const { data } = props

  let postEdges = data.allWpWedding.edges
  let slugPrefix = stripTrailingSlash(props.location.pathname)
  let title = 'Weddings'

  return (
    <PageWrapper>
      <Header title={title} />
      <Wrapper maxWidth={5} padding>
        <WeddingsListing
          edges={postEdges}
          slugPrefix={slugPrefix}
          limit={data.wp.allSettings.readingSettingsPostsPerPage}
        />
      </Wrapper>
    </PageWrapper>
  )
}

export default WeddingsIndexPage

// export const pageQuery = graphql`
//   query WeddingsQuery {
//     wp {
//       allSettings {
//         readingSettingsPostsPerPage
//       }
//       acfOptions {
//         options {
//           url
//         }
//       }
//     }
//     wpPage(slug: { eq: "weddings" }) {
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
//       template {
//         ... on WpTemplate_WeddingsPage {
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
//           acfFeaturedLoop {
//             featuredLoop {
//               mediaItemUrl
//               id
//             }
//           }
//           acfPages {
//             wcoPageSubtitle
//           }
//         }
//       }
//     }
//   }
// `
