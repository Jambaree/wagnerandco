import React from 'react'

// Ours

import PageWrapper from '../../components/PageWrapper'
import Wrapper from '../../components/Wrapper'
import Header from '../../components/Header'

import WeddingsListing from '@/components/WeddingsListing'

export function WeddingPageTemplate(props) {
  const {
    data: {
      page: {
        title,
        acf: { wco_page_subtitle },
      },
      weddings,
    },
  } = props

  if (!weddings) return null

  return (
    <PageWrapper>
      <Header title={title?.rendered} />
      <Wrapper maxWidth={5} padding>
        <WeddingsListing
          weddings={weddings}
          slugPrefix={'/weddings'}
          limit={10}
        />
      </Wrapper>
    </PageWrapper>
  )
}
