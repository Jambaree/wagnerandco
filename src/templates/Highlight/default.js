// import React from 'react'
// import PropTypes from 'prop-types'
// import { graphql } from 'gatsby'
// import fecha from 'fecha'

// // Ours
// import unesc from '../../utils/unescape'
// import permittedSlug from '../../utils/permitted-slug'
// import PageWrapper from '../../components/PageWrapper'
// import Video from '../../components/Video'
// import LinkDuo from '../../components/LinkDuo'
// import slugify from 'slugify'
// import WhitespaceHeaderCorners from '../../components/WhitespaceHeaderCorners'
// import YoastHelmet from '../../components/YoastHelmet'
// import SidebarNav from '../../components/SidebarNav'

// const ButtonDownload = props => {
//   return (
//     <LinkDuo to={props.href} className="h2 line-height-2">
//       {props.children}
//     </LinkDuo>
//   )
// }

// ButtonDownload.propTypes = {
//   children: PropTypes.node.isRequired,
// }

// ButtonDownload.defaultProps = {
//   children: 'Download Film Clips',
// }

// const Highlight = props => {
//   const data = props.data
//   const wordpressWpHighlights = data.wordpressWpHighlights
//   const videos = wordpressWpHighlights.acf.wco_highlight_videos

//   if (!permittedSlug(wordpressWpHighlights.slug)) {
//     return null
//   }

//   let navSections = []
//   let sections = []

//   if (videos && videos.length >= 1) {
//     videos.forEach((video, index) => {
//       let type = (video.type === 'Other'
//         ? video.type_custom
//         : video.type
//       ).toLowerCase()
//       let slug = slugify(type)
//       navSections.push({ href: `#${slug}`, label: type })

//       sections.push(
//         <section
//           id={slug}
//           key={`HighlightTemplate_${data.id}_${index}`}
//           className="py4 md-my4">
//           <Video vimeoId={video.vimeo_id} />
//         </section>
//       )
//     })
//   }

//   let og = {
//     location: unesc(wordpressWpHighlights.acf.wco_highlight_location),
//     date: wordpressWpHighlights.date,
//     description: `${fecha.format(
//       new Date(wordpressWpHighlights.date),
//       'MMMM Do, YYYY'
//     )}. ${wordpressWpHighlights.acf.wco_highlight_location}.`,
//   }

//   // Adds manual fix for constructing Highlights title, when it comes
//   // through as Not Found from Yoast SEO
//   if (
//     wordpressWpHighlights &&
//     wordpressWpHighlights.yoast_meta &&
//     wordpressWpHighlights.yoast_meta.yoast_wpseo_title.includes('not found')
//   ) {
//     wordpressWpHighlights.yoast_meta.yoast_wpseo_title = `${wordpressWpHighlights.title} • ${data.settings.title}`
//   }

//   return (
//     <PageWrapper is="article">
//       <YoastHelmet node={wordpressWpHighlights} url={data.page.options.url}>
//         <meta name="robots" content="noindex" />
//         <meta name={og.description} content="og:description" />
//         <meta name={og.date} content="og:date" />
//         <meta name={og.location} content="og:location" />
//       </YoastHelmet>
//       <WhitespaceHeaderCorners
//         title={wordpressWpHighlights.title}
//         date={wordpressWpHighlights.date}
//         location={wordpressWpHighlights.acf.wco_highlight_location}
//       />
//       {navSections.length >= 1 ? (
//         <div className="col-12 relative">
//           <SidebarNav
//             className={WhitespaceHeaderCorners.defaultProps.className}
//             items={navSections}
//           />
//           <div className={WhitespaceHeaderCorners.defaultProps.className}>
//             {sections}
//           </div>
//         </div>
//       ) : null}
//       <footer className="clearfix center my4 mb4">
//         <ButtonDownload href={wordpressWpHighlights.acf.wco_highlight_url} />
//         {data.page.options.wco_socialmedia.map((social, index) => {
//           if (social.label !== 'Instagram') {
//             return null
//           }

//           return (
//             <p
//               key={`HighlightTemplate_cta_${index}`}
//               className="my4 h3 max-width-1 mx-auto">
//               Upload your film clips to {social.label} and tag us at&nbsp;
//               <LinkDuo to={social.url}>{social.handle}</LinkDuo>
//             </p>
//           )
//         })}
//       </footer>
//     </PageWrapper>
//   )
// }

// Highlight.propTypes = {
//   sections: PropTypes.arrayOf(PropTypes.string).isRequired,
// }

// Highlight.defaultProps = {
//   sections: ['highlight', 'featurette', 'vows', 'speeches'],
// }

// export const pageQuery = graphql`
//   query Highlight($id: String!) {
//     settings: wordpressWpSettings {
//       title
//     }
//     page: wpPage(id: { eq: $id }) {
//       options {
//         url
//         wco_socialmedia {
//           label
//           handle
//           url
//         }
//       }
//     }

//     wordpressWpHighlights(id: { eq: $id }) {
//       date
//       slug
//       title
//       id
//       featured_media {
//         id
//         slug
//         alt_text
//         localFile {
//           childImageSharp {
//             fluid {
//               aspectRatio
//               src
//               srcSet
//             }
//           }
//         }
//       }
//       acf {
//         wco_highlight_location
//         wco_highlight_url
//         wco_highlight_videos {
//           vimeo_id
//           type
//           type_custom
//         }
//       }
//       # yoast_meta {
//       #   yoast_wpseo_title
//       #   yoast_wpseo_metadesc

//       #   # Facebook
//       #   yoast_wpseo_facebook_title
//       #   yoast_wpseo_facebook_description
//       #   yoast_wpseo_facebook_type

//       #   # If there is at least one Facebook-specific image…
//       #   # yoast_wpseo_facebook_image {
//       #   #   id
//       #   #   localFile {
//       #   #     childImageSharp {
//       #   #       id
//       #   #       fluid(maxWidth: 1200) {
//       #   #         aspectRatio
//       #   #         src
//       #   #       }
//       #   #     }
//       #   #   }
//       #   # }

//       #   # Twitter
//       #   yoast_wpseo_twitter_title
//       #   yoast_wpseo_twitter_description
//       #   # yoast_wpseo_twitter_image {
//       #   #   id
//       #   #   localFile {
//       #   #     childImageSharp {
//       #   #       id
//       #   #       fluid(maxWidth: 1200) {
//       #   #         aspectRatio
//       #   #         src
//       #   #       }
//       #   #     }
//       #   #   }
//       #   # }
//       # }
//     }
//   }
// `

// export default Highlight
