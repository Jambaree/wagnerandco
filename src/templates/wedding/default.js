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
// import YoastHelmet from '../../components/YoastHelmet'
import DoodleRandomCorner from '../../components/DoodleRandomCorner'
import WeddingFeaturedMedia from '../../components/WeddingFeaturedMedia'
import VideoLoop from '../../components/VideoLoop'
import Seo from '../../components/Seo'

class WeddingTemplate extends React.Component {
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
    const weddingEdges = data.allWpWedding.edges
    const weddingNode = data.wpWedding
    const seoData = data.wpWedding.seo
    const stills = weddingNode.acfWedding.wcoWeddingStills

    if (!permittedSlug(weddingNode.slug)) {
      return null
    }

    let vimeoProps = weddingNode.acfWedding.wcoWeddingVimeoId
      ? { vimeoId: weddingNode.acfWedding.wcoWeddingVimeoId }
      : {}

    let prevFigDirClass = 'md-right'

    let formattedStills = null
    if (stills) {
      formattedStills = stills.map((item) => {
        let figureClasses = this.getFigureClasses(prevFigDirClass)
        prevFigDirClass = figureClasses[2]
        let media = null

        if (
          item.mediaItemUrl &&
          item.mimeType &&
          (item.mimeType === 'video/webm' || item.mimeType === 'video/mp4')
        ) {
          media = <VideoLoop src={`${item.mediaItemUrl}`} />
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
          <Seo {...seoData} />

          <div className="md-flex flex-wrap mb4">
            <div className="mt4 md-mt0 order-last col-12">
              <Video {...vimeoProps} />
            </div>
            <div className="order-0 col-12">
              <Wrapper maxWidth={3} padding>
                <Header
                  title={weddingNode.acfWedding.wcoWeddingCouple}
                  subtitle={subtitle(
                    weddingNode.acfPages.wcoPageSubtitle,
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
                        items={weddingNode.acfWedding.wcoWeddingCredits}
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

export default WeddingTemplate

export const pageQuery = graphql`
  query WeddingById($id: String!) {
    wp {
      acfOptions {
        options {
          url
        }
      }
    }
    wpWedding(id: { eq: $id }) {
      seo {
        title
        metaDesc
        opengraphTitle
        opengraphDescription
        opengraphImage {
          altText
          sourceUrl
          gatsbyImage(
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
      content
      featuredImage {
        node {
          id
          gatsbyImage(
            placeholder: BLURRED
            quality: 90
            width: 600
            layout: CONSTRAINED
          )
        }
      }
      acfFeaturedLoop {
        featuredLoop {
          mediaItemUrl
          id
        }
      }
      acfPages {
        wcoPageSubtitle
      }
      acfWedding {
        wcoWeddingCouple
        wcoWeddingLocation
        wcoWeddingVimeoId
        wcoWeddingCredits {
          credit
          label
          labelCustom
          link
        }
        wcoWeddingStills {
          altText
          slug
          id
          mimeType
          mediaItemUrl
          gatsbyImage(
            placeholder: BLURRED
            quality: 90
            width: 800
            layout: CONSTRAINED
          )
        }
      }
    }
    allWpWedding(limit: 8, sort: { fields: [date], order: DESC }) {
      edges {
        node {
          id
          slug
          title
          acfWedding {
            wcoWeddingLocation
            wcoWeddingCouple
          }
        }
      }
    }
  }
`
