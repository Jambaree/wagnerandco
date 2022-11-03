import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import fecha from 'fecha'

// Ours
import unesc from '../../utils/unescape'
import permittedSlug from '../../utils/permitted-slug'
import PageWrapper from '../../components/PageWrapper'
import Video from '../../components/Video'
import LinkDuo from '../../components/LinkDuo'
import slugify from 'slugify'
import WhitespaceHeaderCorners from '../../components/WhitespaceHeaderCorners'
// import YoastHelmet from '../../components/YoastHelmet'
import SidebarNav from '../../components/SidebarNav'
import Seo from '../../components/Seo'

const ButtonDownload = (props) => {
  return (
    <LinkDuo to={props.href} className="h2 line-height-2">
      {props.children}
    </LinkDuo>
  )
}

ButtonDownload.propTypes = {
  children: PropTypes.node.isRequired,
}

ButtonDownload.defaultProps = {
  children: 'Download Film Clips',
}

const HighlightTemplate = (props) => {
  const data = props.data
  const wpHighlight = data.wpHighlight
  const videos = wpHighlight.acfHighlight.wcoHighlightVideos
  const seoData = data.wpHighlight.seo

  if (!permittedSlug(wpHighlight.slug)) {
    return null
  }

  let navSections = []
  let sections = []

  if (videos && videos.length >= 1) {
    videos.forEach((video, index) => {
      let type = (
        video.type === 'Other' ? video.typeCustom : video.type
      ).toLowerCase()
      let slug = slugify(type)
      navSections.push({ href: `#${slug}`, label: type })

      sections.push(
        <section
          id={slug}
          key={`HighlightTemplate_${data.id}_${index}`}
          className="py4 md-my4">
          <Video vimeoId={video.vimeoId} />
        </section>
      )
    })
  }

  let og = {
    location: unesc(wpHighlight.acfHighlight.wcoHighlightLocation),
    date: wpHighlight.date,
    description: `${fecha.format(
      new Date(wpHighlight.date),
      'MMMM Do, YYYY'
    )}. ${wpHighlight.acfHighlight.wcoHighlightLocation}.`,
  }

  return (
    <PageWrapper is="article">
      <Seo {...seoData} />
      <WhitespaceHeaderCorners
        title={wpHighlight.title}
        date={wpHighlight.date}
        location={wpHighlight.acfHighlight.wcoHighlightLocation}
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
        <ButtonDownload href={wpHighlight.acfHighlight.wcoHighlightUrl} />
        {data.wp.acfOptions.options.wcoSocialmedia.map((social, index) => {
          if (social.label !== 'Instagram') {
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
  )
}

HighlightTemplate.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.string).isRequired,
}

HighlightTemplate.defaultProps = {
  sections: ['highlight', 'featurette', 'vows', 'speeches'],
}

export const pageQuery = graphql`
  query DownloadById($id: String!) {
    wp {
      allSettings {
        generalSettingsTitle
      }
      acfOptions {
        options {
          wcoSocialmedia {
            label
            url
            handle
          }
          url
        }
      }
    }
    wpHighlight(id: { eq: $id }) {
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
      date
      slug
      title
      id
      featuredImage {
        node {
          id
          slug
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
      acfHighlight {
        wcoHighlightLocation
        wcoHighlightUrl
        wcoHighlightVideos {
          fieldGroupName
          type
          typeCustom
          vimeoId
        }
      }
    }
  }
`

export default HighlightTemplate
