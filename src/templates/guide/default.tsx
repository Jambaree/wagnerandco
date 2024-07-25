import React from 'react'

// Ours
import permittedSlug from '../../utils/permitted-slug'
import PageWrapper from '../../components/PageWrapper'
import Wrapper from '../../components/Wrapper'
import WhitespaceHeaderCorners from '../../components/WhitespaceHeaderCorners'
import { FlexibleContent } from '@nextwp/core'
import SidebarNav from '../../components/SidebarNav'
import headlineBlocksToNav from '../../utils/headline-blocks-to-nav'
import * as blocks from '@/components/blocks'

export function GuideTemplate(props) {
  const { data } = props

  let sidebarItems = headlineBlocksToNav(data?.acf?.modules)
  // const seoData = data.wpGuide.seo

  // if (!permittedSlug(pageNode.slug)) {
  //   return null
  // }

  return (
    <PageWrapper className="WPGuide pb4" is="article">
      <Wrapper maxWidth={5}>
        <WhitespaceHeaderCorners
          title={data?.acf?.wco_block_title}
          date={props.showDate ? data.date : undefined}
          location=""
          reverse={true}
        />
        <SidebarNav items={sidebarItems} />
        <Wrapper maxWidth={3}>
          {!!data?.acf?.modules && (
            <FlexibleContent blocks={blocks} rows={data?.acf?.modules} />
          )}
        </Wrapper>
      </Wrapper>
    </PageWrapper>
  )
}
