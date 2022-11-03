import React from 'react'
import { graphql } from 'gatsby'

// Ours
import Link from '../components/LinkDuo'
import PageWrapper from '../components/PageWrapper'
import Wrapper from '../components/Wrapper'
import Header from '../components/Header'
import TeamMembers from '../components/TeamMembers'
import ImgSharp from '../components/ImgSharp'
import { H1, H4 } from '../components/Headings'
import { StylizedAbout } from '../components/HeadingsStylized'
import WeddingIntro from '../components/WeddingIntro'
import Seo from '../components/Seo'

const AboutH2 = (props) => {
  return (
    <div className="center py2 sm-py3 md-py4 max-width-1 mx-auto">
      <H1 is="h2">{props.children}</H1>
    </div>
  )
}

const About = (props) => {
  const data = props.data
  const pageNode = data.wpPage
  const seoData = data.wpPage.seo
  const pressItemsEdges = pageNode.template.acfPress.wcoPressItems
  const pressLogoEdges = pageNode.template.acfPress.wcoPressLogos

  return (
    <PageWrapper className="relative">
      <Seo {...seoData} />
      <StylizedAbout />
      <Header
        title={pageNode.title}
        subtitle={pageNode.template.acfPages.wcoPageSubtitle}
      />
      <Wrapper maxWidth={3}>
        <WeddingIntro>{pageNode.content}</WeddingIntro>
      </Wrapper>
      <Wrapper maxWidth={5}>
        <AboutH2>{pageNode.template.acfTeam.wcoTeamTitle}</AboutH2>
        <TeamMembers members={pageNode.template.acfTeam.wcoTeamMembers} />
      </Wrapper>
      <AboutH2>Where we’ve been featured</AboutH2>
      <div className="sm-flex sm-mxn2">
        <div className="col-12 sm-col-6 sm-px2">
          <H4 is="h3">Press</H4>
          <ul className="list-style-none m0 p0">
            {pressItemsEdges.map((edge, index) => {
              return (
                <li key={`PressItem_Link_${index}`} className="mb1">
                  <Link to={edge.link.url} target="_blank" rel="noopener">
                    {edge.link.title}
                  </Link>
                  , {edge.date}
                </li>
              )
            })}
          </ul>
        </div>
        <div className="col-12 sm-col-6 sm-px2">
          <ul className="list-style-none m0 p0 col-12 sm-flex flex-wrap">
            {pressLogoEdges.map((edge, index) => {
              return (
                <li
                  key={`PressLogo_${edge.id}_${index}`}
                  className="block col-12 sm-col-6 sm-flex items-center p2">
                  <ImgSharp
                    {...edge}
                    alt={edge.alt || `${edge.title} logo`}
                    className="block m0 mx-auto max-width-1 col-12"
                  />
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </PageWrapper>
  )
}

export default About

export const pageQuery = graphql`
  query AboutQuery {
    wp {
      acfOptions {
        options {
          url
        }
      }
    }
    wpPage(slug: { eq: "about" }) {
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
      content
      featuredImage {
        node {
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
      template {
        ... on WpTemplate_AboutPage {
          templateName
          acfPages {
            wcoPageSubtitle
          }
          acfTeam {
            wcoTeamTitle
            wcoTeamMembers {
              role
              name
              location
              links {
                link {
                  target
                  title
                  url
                }
              }
              image {
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
          acfPress {
            wcoPressItems {
              date
              link {
                url
                title
                target
              }
            }
            wcoPressLogos {
              title
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
    }
    # allWordpressWpUsers
  }
`
