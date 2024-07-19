import React from 'react'

import PageWrapper from '../../components/PageWrapper'
import Wrapper from '../../components/Wrapper'
import Header from '../../components/Header'

// import YoastHelmet from '../../components/YoastHelmet'

import WhitespaceHeader from '@/components/WhitespaceHeader'
import Doodle from '@/components/Doodle'
import Video from '@/components/blocks/Video'
import { H1, Intro } from '@/components/Headings'
import WeddingsListing from '@/components/WeddingsListing'
import { getAllItems } from '@nextwp/core/src/api/get-all-items'

export async function DefaultPageTemplate(props) {
  const {
    data: {
      title,
      acf: {
        wco_page_subtitle,
        wco_frontpage_weddings_title,
        wco_frontpage_weddings_subtitle,
        wco_frontpage_vimeo_id,
        wco_frontpage_weddings_footer,
      },
    },
  } = props
  // TODO Add placeholder schema page for Gutenberg
  //      blocks on generic pages
  const weddings = await getAllItems(['weddings'])

  return (
    <PageWrapper>
      {/* <Wrapper maxWidth={3}> */}
      <div style={{ marginTop: '7em' }}></div>
      <Header
        showTitle
        title={title?.rendered}
        subtitle={wco_page_subtitle}
        className="mt3 text-center "
      />
      <div style={{ marginBottom: '8em' }}></div>
      {/* <div dangerouslySetInnerHTML={{ __html: pageNode.content }} /> */}
      {/* <GutenbergBlocks blocks={pageNode.blocks} /> */}

      <div className="relative col-12 mb3" style={{ height: '50px' }}>
        <div className="absolute right-0">
          <Doodle name="wave" color="red" />
        </div>
      </div>

      <Video vimeo_id={wco_frontpage_vimeo_id} />

      <Wrapper padding>
        <div className="center py2 sm-py3 mb3 md-py4 mb4">
          <H1 is="h2">{wco_frontpage_weddings_title}</H1>
          <Intro>{wco_frontpage_weddings_subtitle}</Intro>
        </div>

        <WeddingsListing weddings={weddings} limit={4} showMore={false} />

        <WhitespaceHeader
          is="div"
          minHeight={350}
          height={25 + WhitespaceHeader.defaultProps.marginBottom}
          marginTop={0}
          marginBottom={0}>
          <div className="max-width-2 mx-auto h3 line-height-4 center">
            {wco_frontpage_weddings_footer}
          </div>
        </WhitespaceHeader>
      </Wrapper>
      {/* </Wrapper> */}
    </PageWrapper>
  )
}
