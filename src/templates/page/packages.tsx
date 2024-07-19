import React, { Suspense } from 'react'
import PackagesPrivate from '@/components/PackagesPrivate'
import { getPageData } from '@nextwp/core'

export async function PackagesPageTemplate(props) {
  const faqdata = await getPageData('faq')

  const { data } = props
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PackagesPrivate data={data} faqdata={faqdata} />
    </Suspense>
  )
}
