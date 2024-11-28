import React from 'react'

// Ours

import permittedSlug from '../../utils/permitted-slug'
import PageWrapper from '../../components/PageWrapper'
import Video from '../../components/blocks/Video'
import LinkDuo from '../../components/LinkDuo'
import slugify from 'slugify'
import WhitespaceHeaderCorners from '../../components/WhitespaceHeaderCorners'
// import YoastHelmet from '../../components/YoastHelmet'
import SidebarNav from '../../components/SidebarNav'
import { getOptionsPage } from '@nextwp/core'
import Wrapper from '@/components/Wrapper'

const ButtonDownload = (props) => {
  return (
    <LinkDuo to={props.href} className="h2 line-height-2">
      {props.children}
    </LinkDuo>
  )
}

export async function SingleHighlightTemplate(props) {
  const { data } = props
  const options = await getOptionsPage({
    slug: 'nextwp',
  })

  if (!permittedSlug(data.slug)) {
    return null
  }

  let navSections = []
  let sections = []

  if (
    data?.acf?.wco_highlight_videos &&
    data?.acf?.wco_highlight_videos.length >= 1
  ) {
    data?.acf?.wco_highlight_videos.forEach((video, index) => {
      let type = (
        video.type === 'Other' ? video.typeCustom : video.type
      )?.toLowerCase()
      let slug = type && slugify(type)
      navSections.push({ href: `#${slug}`, label: type })

      sections.push(
        <section
          id={slug}
          key={`HighlightTemplate_${data.id}_${index}`}
          className="py4 md-my4">
          <Video vimeo_id={video.vimeo_id} />
        </section>
      )
    })
  }

  let wrapperProps = { padding: true, maxWidth: 5 }
  return (
    <Wrapper {...wrapperProps}>
      <PageWrapper is="article">
        <WhitespaceHeaderCorners
          title={data.title.rendered}
          date={data?.acf?.toggle_off?.toggle_off_date ? false : data.date}
          location={data?.acf?.wco_highlight_location}
        />
        {navSections.length >= 1 ? (
          <div className="col-12 relative">
            <SidebarNav
              className={WhitespaceHeaderCorners.defaultProps.className}
              items={navSections}
            />
            <div className={WhitespaceHeaderCorners.defaultProps.className}>
              {sections}
            </div>
          </div>
        ) : null}

        <footer className="clearfix center my4 mb4">
          {!data?.acf?.toggle_off?.toggle_off_download_film_clips && (
            <ButtonDownload href={data?.acf?.wco_highlight_url}>
              Download Film Clips
            </ButtonDownload>
          )}
          {options.wco_socialmedia.map((social, index) => {
            if (social.label !== 'Instagram') {
              return null
            }
            if (data?.acf?.toggle_off?.toggle_off_upload_film_clips) {
              return null
            }
            return (
              <p
                key={`HighlightTemplate_cta_${index}`}
                className="my4 h3 max-width-1 mx-auto">
                Upload your film clips to {social.label} and tag us at&nbsp;
                <LinkDuo to={social.url}>{social.handle}</LinkDuo>
              </p>
            )
          })}
        </footer>
      </PageWrapper>
    </Wrapper>
  )
}

// export const pageQuery = graphql`
//   query DownloadById($id: String!) {
//     wp {
//       allSettings {
//         generalSettingsTitle
//       }
//       acfOptions {
//         options {
//           wcoSocialmedia {
//             label
//             url
//             handle
//           }
//           url
//         }
//       }
//     }
//     wpHighlight(id: { eq: $id }) {
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
//       date
//       slug
//       title
//       id
//       featuredImage {
//         node {
//           id
//           slug
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
//       acfHighlight {
//         wco_highlight_location
//         wcoHighlightUrl
//         wcoHighlightVideos {
//           fieldGroupName
//           type
//           typeCustom
//           vimeoId
//         }
//       }
//     }
//   }
// `
