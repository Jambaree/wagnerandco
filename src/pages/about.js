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
import YoastHelmet from '../components/YoastHelmet'

const AboutH2 = props => {
  return (
    <div className="center py2 sm-py3 md-py4 max-width-1 mx-auto">
      <H1 is="h2">{props.children}</H1>
    </div>
  )
}

const AboutPage = props => {
  const data = props.data
  const pageNode = data.wordpressPage
  const pressItemsEdges = pageNode.acf.wco_press_items
  const pressLogoEdges = pageNode.acf.wco_press_logos

  return (
    <PageWrapper className="relative">
      <YoastHelmet node={pageNode} url={data.page.options.url} />
      <StylizedAbout />
      <Header
        title={pageNode.title}
        subtitle={pageNode.acf.wco_page_subtitle}
      />
      <Wrapper maxWidth={3}>
        <WeddingIntro>{pageNode.content}</WeddingIntro>
      </Wrapper>
      <Wrapper maxWidth={5}>
        <AboutH2>{pageNode.acf.wco_team_title}</AboutH2>
        <TeamMembers members={pageNode.acf.wco_team_members} />
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

export default AboutPage

export const pageQuery = graphql`
  query AboutQuery {
    page: wpPage(id: { eq: $id }) {
      options {
        url
      }
    }
    wordpressPage(slug: { eq: "about" }) {
      id
      wordpress_id
      slug
      title
      template
      content
      featured_media {
        localFile {
          childImageSharp {
            id
            fluid(maxWidth: 1200) {
              src
            }
          }
        }
      }
      # yoast_meta {
      #   yoast_wpseo_title
      #   yoast_wpseo_metadesc

      #   # Facebook
      #   yoast_wpseo_facebook_title
      #   yoast_wpseo_facebook_description
      #   yoast_wpseo_facebook_type
      #   # yoast_wpseo_facebook_image

      #   # Twitter
      #   yoast_wpseo_twitter_title
      #   yoast_wpseo_twitter_description
      #   # yoast_wpseo_twitter_image
      # }
      acf {
        wco_page_subtitle
        wco_team_title
        wco_team_members {
          name
          role
          location
          links {
            link {
              title
              url
              target
            }
          }
          image {
            alt_text
            localFile {
              childImageSharp {
                id
                fluid(maxWidth: 1200) {
                  aspectRatio
                  src
                  srcSet
                  sizes
                  # srcWebp
                  # srcSetWebp
                }
              }
            }
          }
        }
        wco_press_items {
          date
          link {
            title
            url
          }
        }
        wco_press_logos {
          title
          id
          alt_text
          localFile {
            childImageSharp {
              id
              fluid {
                src
                srcSet
                aspectRatio
              }
            }
          }
        }
      }
    }
    # allWordpressWpUsers
  }
`
