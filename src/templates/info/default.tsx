import React from 'react'

// Ours
import permittedSlug from '../../utils/permitted-slug'
import PageWrapper from '../../components/PageWrapper'
import Wrapper from '../../components/Wrapper'
import Header from '../../components/Header'
import WhitespaceHeader from '../../components/WhitespaceHeader'

import { FlexibleContent } from '@nextwp/core'
import SidebarNav from '../../components/SidebarNav'
import headlineBlocksToNav from '../../utils/headline-blocks-to-nav'
import * as blocks from '@/components/blocks'

// import YoastHelmet from '../../components/YoastHelmet'

export function SingleInfoTemplate(props) {
  const { data } = props

  let sidebarItems = headlineBlocksToNav(data?.acf?.modules)
  if (!permittedSlug(data.slug)) {
    return null
  }
  return (
    <PageWrapper className="WPInfo pb4" is="article">
      <Wrapper maxWidth={3}>
        <WhitespaceHeader marginBottom={5}>
          <Header showTitle title={data?.acf?.wco_block_title} />
        </WhitespaceHeader>
        <SidebarNav items={sidebarItems} />

        {!!data?.acf?.modules && (
          <FlexibleContent blocks={blocks} rows={data?.acf?.modules} />
        )}
      </Wrapper>
    </PageWrapper>
  )
}
