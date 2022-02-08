import React from 'react'
import { graphql } from 'gatsby'

// Ours
import { subtitle } from '../../utils/format'
import permittedSlug from '../../utils/permitted-slug'
import PageWrapper from '../../components/PageWrapper'
import Wrapper from '../../components/Wrapper'
import Header from '../../components/Header'
import WeddingIntro from '../../components/WeddingIntro'
import WeddingCredits from '../../components/WeddingCredits'
import WeddingMore from '../../components/WeddingMore'
import Video from '../../components/Video'
import ImgSharp from '../../components/ImgSharp'
import YoastHelmet from '../../components/YoastHelmet'
import DoodleRandomCorner from '../../components/DoodleRandomCorner'
import WeddingFeaturedMedia from '../../components/WeddingFeaturedMedia'
import VideoLoop from '../../components/VideoLoop'

class Wedding extends React.Component {
  getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
  }

  getFigureClasses(omit) {
    let xsDirections = ['left', 'right']
    let mdDirections = ['md-left', 'md-mx-auto', 'md-right', 'md-mx-auto']
    let mdColWidths = [4, 7, 11]

    if (omit === 'md-left' || omit === 'md-right') {
      mdDirections.splice(mdDirections.indexOf(omit), 1)
    }

    return [
      'block',
      xsDirections[this.getRandomIntInclusive(0, 1)],
      mdDirections[this.getRandomIntInclusive(0, 2)],
      `col-${this.getRandomIntInclusive(7, 12)}`,
      `md-col-${mdColWidths[this.getRandomIntInclusive(0, 2)]}`,
    ]
  }

  render() {
    const props = this.props
    const data = props.data
    const weddingEdges = data.allWordpressWpWeddings.edges
    const weddingNode = data.wordpressWpWeddings
    const stills = weddingNode.acf.wco_wedding_stills

    if (!permittedSlug(weddingNode.slug)) {
      return null
    }

    let vimeoProps = weddingNode.acf.wco_wedding_vimeo_id
      ? { vimeoId: weddingNode.acf.wco_wedding_vimeo_id }
      : {}

    let prevFigDirClass = 'md-right'

    let formattedStills = null
    if (stills) {
      formattedStills = stills.map(item => {
        let figureClasses = this.getFigureClasses(prevFigDirClass)
        prevFigDirClass = figureClasses[2]
        let media = null

        if (
          item.source_url &&
          item.mime_type &&
          (item.mime_type === 'video/webm' || item.mime_type === 'video/mp4')
        ) {
          media = (
            <VideoLoop src={`${process.env.GATSBY_WP_URL}${item.source_url}`} />
          )
        } else {
          media = <ImgSharp {...item} />
        }

        return (
          <div className="clearfix mb4 md-pb4" key={item.id}>
            <figure className={figureClasses.join(' ')}>{media}</figure>
          </div>
        )
      })
    }

    return (
      <React.Fragment>
        <PageWrapper is="article">
          <YoastHelmet node={weddingNode} url={data.options.options.url} />
          <div className="md-flex flex-wrap mb4">
            <div className="mt4 md-mt0 order-last col-12">
              <Video {...vimeoProps} />
            </div>
            <div className="order-0 col-12">
              <Wrapper maxWidth={3} padding>
                <Header
                  title={weddingNode.acf.wco_wedding_couple}
                  subtitle={subtitle(
                    weddingNode.acf.wco_page_subtitle,
                    weddingNode.title,
                    { bold: true }
                  )}
                />
              </Wrapper>
              <Wrapper maxWidth={5} padding>
                <div
                  className="md-flex flex-wrap md3 md-mb4"
                  style={{
                    minHeight: '90vh',
                  }}>
                  <div className="mb3 md-mb4 col-12 md-flex justify-end">
                    <div className="WPWeddingIntro-img md-max-width-1 relative">
                      <DoodleRandomCorner />
                      <WeddingFeaturedMedia node={weddingNode} />
                    </div>
                  </div>
                  <div className="col-12 md-col-8">
                    <WeddingIntro>{weddingNode.content}</WeddingIntro>
                  </div>
                  <div className="order-last md-order-last col-12 md-col-4 md-pl3 self-stretch md-flex">
                    <div className="sm-h5 md-h4 self-end">
                      <WeddingCredits
                        items={weddingNode.acf.wco_wedding_credits}
                      />
                    </div>
                  </div>
                </div>
              </Wrapper>
            </div>
          </div>
          <Wrapper maxWidth={5} padding>
            {formattedStills}
          </Wrapper>
        </PageWrapper>
        <div className="bg-white sm-py3 md-py4 blue">
          <Wrapper maxWidth={5} padding>
            <WeddingMore edges={weddingEdges} />
          </Wrapper>
        </div>
      </React.Fragment>
    )
  }
}

export default Wedding

export const pageQuery = graphql`
  query WeddingById($id: String!) {
    options: wordpressAcfOptions {
      options {
        url
      }
    }
    wordpressWpWeddings(id: { eq: $id }) {
      date
      slug
      title
      id
      content
      featured_media {
        id
        localFile {
          url
        }
      }
      acf {
        featured_loop {
          wordpress_id
          source_url
        }
        wco_page_subtitle
        wco_wedding_couple
        wco_wedding_location
        wco_wedding_vimeo_id
        wco_wedding_credits {
          label
          label_custom
          credit
          link
        }
        wco_wedding_stills {
          id
          slug
          alt_text
          mime_type
          source_url
          localFile {
            url
          }
        }
      }
      # yoast_meta {
      #   yoast_wpseo_title
      #   yoast_wpseo_metadesc
      #   # yoast_wpseo_canonical
      #   # yoast_wpseo_social_url
      #   # yoast_wpseo_company_or_person
      #   # yoast_wpseo_person_name
      #   # yoast_wpseo_company_name
      #   # yoast_wpseo_website_name

      #   # Facebook
      #   yoast_wpseo_facebook_title
      #   yoast_wpseo_facebook_description
      #   yoast_wpseo_facebook_type
      #   yoast_wpseo_facebook_image {
      #     id
      #     localFile {
      #       childImageSharp {
      #         id
      #         fluid(maxWidth: 1200) {
      #           aspectRatio
      #           src
      #         }
      #       }
      #     }
      #   }

      #   # yoast_wpseo_facebook_image
      #   # Twitter
      #   yoast_wpseo_twitter_title
      #   yoast_wpseo_twitter_description
      #   yoast_wpseo_twitter_image {
      #     id
      #     localFile {
      #       childImageSharp {
      #         id
      #         fluid(maxWidth: 1200) {
      #           aspectRatio
      #           src
      #         }
      #       }
      #     }
      #   }
      # }
    }
    allWordpressWpWeddings(limit: 8) {
      edges {
        node {
          id
          wordpress_id
          slug
          title
          acf {
            wco_wedding_location
            wco_wedding_couple
          }
        }
      }
    }
  }
`
