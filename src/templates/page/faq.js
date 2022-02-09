// import React from 'react'
// import PropTypes from 'prop-types'
// import { graphql } from 'gatsby'
// import typogr from 'typogr'

// // Ours
// import PageWrapper from '../components/PageWrapper'
// import Wrapper from '../components/Wrapper'
// import Header from '../components/Header'
// import { H4 } from '../components/Headings'
// import ImgSharp from '../components/ImgSharp'
// import { StylizedFAQ } from '../components/HeadingsStylized'
// import YoastHelmet from '../components/YoastHelmet'
// import DoodleRandomCorner from '../components/DoodleRandomCorner'

// const FAQImage = props => {
//   return (
//     <ImgSharp
//       {...props}
//       role="presentation"
//       className="block col-12 m0 sm-max-width-1 mx-auto sm-m0 md-pb3"
//     />
//   )
// }

// FAQImage.propTypes = {
//   id: PropTypes.string,
//   alt: PropTypes.string,
// }

// const FAQItem = props => {
//   return (
//     <div className={`block mb3 ${props.className}`}>
//       <H4 is="h3">{props.question}</H4>
//       <div
//         className="h4 line-height-4"
//         dangerouslySetInnerHTML={{
//           __html: typogr(props.answer).typogrify(),
//         }}
//       />
//     </div>
//   )
// }

// const FAQItemBlock = props => {
//   let itemOne = props.items[0]
//   let itemTwo = props.items[1]
//   // eslint-disable-next-line
//   let { image, imgDirection, ...remainingProps } = props
//   let imgClassName = `FAQItemBlock-img z0 col-12 sm-col-5 md-col-6 self-center py4 sm-py0`
//   let long = false

//   if (
//     itemOne &&
//     itemTwo &&
//     itemOne.wco_faq_answer.length + itemTwo.wco_faq_answer.length > 1000
//   ) {
//     long = true
//   }

//   return (
//     <div className={`sm-flex FAQItemBlock ${long ? 'FAQItemBlock--long' : ''}`}>
//       {image && imgDirection === 'left' ? (
//         <div className={`${imgClassName} sm-pr3 md-pr4`}>{image}</div>
//       ) : null}
//       <div
//         className={`FAQItemBlock-content z2 ${
//           image ? 'col-12 sm-col-7 md-col-6' : 'col-12 mx-auto'
//         }`}>
//         {itemOne ? (
//           <FAQItem
//             question={itemOne.wco_faq_question}
//             answer={itemOne.wco_faq_answer}
//           />
//         ) : null}
//         {itemTwo ? (
//           <FAQItem
//             question={itemTwo.wco_faq_question}
//             answer={itemTwo.wco_faq_answer}
//           />
//         ) : null}
//       </div>
//       {image && imgDirection === 'right' ? (
//         <div className={`${imgClassName} sm-pl3 md-pl4`}>{image}</div>
//       ) : null}
//     </div>
//   )
// }

// FAQItemBlock.defaultProps = {
//   image: null,
//   imgDirection: 'left',
// }

// FAQItemBlock.propTypes = {
//   // image:
//   imgDirection: PropTypes.string,
//   items: PropTypes.arrayOf(PropTypes.object).isRequired,
// }

// const FAQItems = props => {
//   // eslint-disable-next-line
//   let { items, images, ...remainingProps } = props
//   let imgIndex = 0
//   let faqItems = []
//   let itemsToDisplay = []

//   // Remove hidden items before handling layout
//   items.forEach((item, index) => {
//     if (item.wco_show_on_faq_page === true) {
//       itemsToDisplay.push(item)
//     }
//   })

//   for (let index = 0; itemsToDisplay.length >= index; index = index + 2) {
//     let indexTwo = index + 1
//     let image = null
//     let imgDirection = index === 0 ? 'left' : index % 4 === 0 ? 'left' : 'right'

//     if (images.length > imgIndex && index !== 2) {
//       image = <FAQImage {...images[imgIndex]} />
//       if (index % 4) {
//         image = (
//           <div className="relative">
//             <DoodleRandomCorner color="blue" />
//             {image}
//           </div>
//         )
//       }
//       imgIndex++
//     }

//     faqItems.push(
//       <FAQItemBlock
//         key={`FAQItemBlock_${index}`}
//         image={image}
//         imgDirection={imgDirection}
//         items={[itemsToDisplay[index], itemsToDisplay[indexTwo]]}
//       />
//     )
//   }

//   return <div className="FAQItems max-width-4 md-pr4">{faqItems}</div>
// }

// FAQItems.defaultProps = {
//   images: [],
//   items: [],
// }

// FAQItems.propTypes = {
//   images: PropTypes.arrayOf(PropTypes.object),
//   items: PropTypes.arrayOf(PropTypes.object),
// }

// const FAQPage = props => {
//   const data = props.data
//   const pageNode = data.wordpressPage

//   return (
//     <PageWrapper className="relative">
//       <YoastHelmet node={pageNode} url={data.page.options.url} />
//       <StylizedFAQ right />
//       <Header title={pageNode.title} />
//       <Wrapper maxWidth={5}>
//         <FAQItems
//           items={pageNode.acf.wco_faq_item}
//           images={pageNode.acf.wco_faq_images}
//         />
//       </Wrapper>
//     </PageWrapper>
//   )
// }

// export default FAQPage

// export const pageQuery = graphql`
//   query FAQQuery {
//     settings: wordpressWpSettings {
//       title
//       url
//     }
//     page: wpPage(id: { eq: $id }) {
//       options {
//         url
//       }
//     }
//     wordpressPage(slug: { eq: "faq" }) {
//       id
//       wordpress_id
//       slug
//       title
//       template
//       content
//       featured_media {
//         localFile {
//           childImageSharp {
//             id
//             fluid(maxWidth: 1200) {
//               src
//             }
//           }
//         }
//       }
//       # yoast_meta {
//       #   yoast_wpseo_title
//       #   yoast_wpseo_metadesc

//       #   # Facebook
//       #   yoast_wpseo_facebook_title
//       #   yoast_wpseo_facebook_description
//       #   yoast_wpseo_facebook_type
//       #   # yoast_wpseo_facebook_image

//       #   # Twitter
//       #   yoast_wpseo_twitter_title
//       #   yoast_wpseo_twitter_description
//       #   # yoast_wpseo_twitter_image
//       # }
//       acf {
//         wco_page_subtitle
//         wco_faq_images {
//           title
//           id
//           alt_text
//           localFile {
//             childImageSharp {
//               id
//               fluid(maxWidth: 600) {
//                 aspectRatio
//                 src
//                 srcSet
//                 sizes
//               }
//             }
//           }
//         }
//         wco_faq_item {
//           wco_faq_question
//           wco_faq_answer
//           wco_show_on_faq_page
//         }
//       }
//     }
//   }
// `
