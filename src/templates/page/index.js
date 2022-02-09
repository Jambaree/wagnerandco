// import React from 'react'
// import { graphql } from 'gatsby'

// // Ours
// import PageWrapper from '../components/PageWrapper'
// import Wrapper from '../components/Wrapper'
// import Video from '../components/Video'
// import WeddingsListing from '../components/WeddingsListing'
// import Header from '../components/Header'
// import WhitespaceHeader from '../components/WhitespaceHeader'
// import { H1, Intro } from '../components/Headings'
// import YoastHelmet from '../components/YoastHelmet'
// import Doodle from '../components/Doodle'

// const IndexPage = props => {
//   console.log(props)
//   const data = props.data
//   const pageAcf = data.wpPage.acfFrontPage
//   const pageAcf2 = data.wpPage.template.acfPages
//   const weddingEdges = data.allWpWedding.edges

//   return (
//     <PageWrapper>
//       <YoastHelmet url={data.wpPage.acfOtions.url} node={data.wpPage} />
//       <Wrapper padding>
//         <WhitespaceHeader is="div" marginBottom={5}>
//           <Header
//             className="mt3"
//             showTitle
//             title={data.wpPage.title}
//             subtitle={pageAcf2.wcoPageSubtitle}
//           />
//         </WhitespaceHeader>
//       </Wrapper>
//       <div className="relative col-12 mb3" style={{ height: '50px' }}>
//         <div className="absolute right-0">
//           <Doodle name="wave" color="red" />
//         </div>
//       </div>
//       <Video vimeoId={pageAcf.wcoFrontpageVimeoId} />
//       <Wrapper padding>
//         <div className="center py2 sm-py3 mb3 md-py4 mb4">
//           <H1 is="h2">{pageAcf.wcoFrontpageWeddingsTitle}</H1>
//           <Intro>{pageAcf.wcoFrontpageWeddingsSubtitle}</Intro>
//         </div>
//         <WeddingsListing edges={weddingEdges} limit={4} showMore={false} />
//         <WhitespaceHeader
//           is="div"
//           minHeight={350}
//           height={25 + WhitespaceHeader.defaultProps.marginBottom}
//           marginTop={0}
//           marginBottom={0}>
//           <div className="max-width-2 mx-auto h3 line-height-4 center">
//             {pageAcf.wcoFrontpageWeddingsFooter}
//           </div>
//         </WhitespaceHeader>
//       </Wrapper>
//     </PageWrapper>
//   )
// }

// export default IndexPage

// export const CollectionQuery = graphql`
//   query IndexQuery($id: String!) {
//     wpPage(id: { eq: $id }) {
//       acfOptions {
//         url
//       }
//       id
//       slug
//       title
//       acfFrontPage {
//         wcoFrontpageVimeoId
//         wcoFrontpageWeddingsFooter
//         wcoFrontpageWeddingsSubtitle
//         wcoFrontpageWeddingsTitle
//       }
//       template {
//         ... on WpDefaultTemplate {
//           templateName
//           acfPages {
//             wcoPageSubtitle
//           }
//         }
//       }
//       featuredImage {
//         node {
//           localFile {
//             childImageSharp {
//               id
//               fluid(maxWidth: 1200) {
//                 src
//               }
//             }
//           }
//         }
//       }
//     }
//     allWpWedding {
//       edges {
//         node {
//           id
//           slug
//           title
//           template {
//             templateName
//             ... on WpDefaultTemplate {
//               templateName
//               acfPages {
//                 fieldGroupName
//                 wcoPageSubtitle
//               }
//             }
//           }
//           content
//           featuredImage {
//             node {
//               id
//               altText
//               localFile {
//                 childImageSharp {
//                   fluid {
//                     src
//                     srcSet
//                     sizes
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `
