import React from 'react'

// Ours
import { subtitle } from '../../utils/format'
import permittedSlug from '../../utils/permitted-slug'
import PageWrapper from '../../components/PageWrapper'
import Wrapper from '../../components/Wrapper'
import Header from '../../components/Header'
import WeddingIntro from '../../components/WeddingIntro'
import WeddingCredits from '../../components/WeddingCredits'
import WeddingMore from '../../components/WeddingMore'
import Video from '../../components/blocks/Video'

import DoodleRandomCorner from '../../components/DoodleRandomCorner'
import WeddingFeaturedMedia from '../../components/WeddingFeaturedMedia'
import VideoLoop from '../../components/VideoLoop'
import Image from 'next/image'
import { getAllItems } from '@nextwp/core/src/api/get-all-items'

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function getFigureClasses(omit) {
  let xsDirections = ['left', 'right']
  let mdDirections = ['md-left', 'md-mx-auto', 'md-right', 'md-mx-auto']
  let mdColWidths = [4, 7, 11]

  if (omit === 'md-left' || omit === 'md-right') {
    mdDirections.splice(mdDirections.indexOf(omit), 1)
  }

  return [
    'block',
    xsDirections[getRandomIntInclusive(0, 1)],
    mdDirections[getRandomIntInclusive(0, 2)],
    `col-${getRandomIntInclusive(7, 12)}`,
    `md-col-${mdColWidths[getRandomIntInclusive(0, 2)]}`,
  ]
}

function formatStills(stills) {
  let prevFigDirClass = 'md-right'

  return stills.map((item) => {
    let figureClasses = getFigureClasses(prevFigDirClass)
    prevFigDirClass = figureClasses[2]
    let media = null

    if (
      item.mime_type &&
      (item.mime_type === 'video/webm' || item.mime_type === 'video/mp4')
    ) {
      media = <VideoLoop src={`${item.mediaItemUrl}`} />
    } else {
      media = (
        <Image
          src={item?.url}
          width={item?.width}
          height={item?.height}
          alt={item?.alt || ''}
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      )
    }

    return (
      <div className="clearfix mb4 md-pb4" key={item.id}>
        <figure className={figureClasses.join(' ')}>{media}</figure>
      </div>
    )
  })
}

export async function SingleWeddingTemplate(props) {
  const { data: weddingNode } = props
  const allWeddings = await getAllItems(['weddings'])

  if (!weddingNode) return null

  const vimeoProps = weddingNode.acf.wco_wedding_vimeo_id
    ? { vimeoId: weddingNode.acf.wco_wedding_vimeo_id }
    : {}

  const formattedStills = weddingNode.acf.wco_wedding_stills
    ? formatStills(weddingNode.acf.wco_wedding_stills)
    : null

  return (
    <div>
      <PageWrapper is="article">
        {permittedSlug(weddingNode.slug) && (
          <div key={weddingNode.id}>
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
                      <WeddingIntro>
                        {weddingNode.content.rendered}
                      </WeddingIntro>
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
          </div>
        )}
      </PageWrapper>
      <div className="bg-white sm-py3 md-py4 blue">
        <Wrapper maxWidth={5} padding>
          <WeddingMore edges={allWeddings} />
        </Wrapper>
      </div>
    </div>
  )
}
