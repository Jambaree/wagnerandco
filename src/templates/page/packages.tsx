import React from 'react'
import PackagesPrivate from '@/components/PackagesPrivate'
import { getPageData } from '@nextwp/core'

export async function PackagesPageTemplate(props) {
  const faqdata = await getPageData('faq')

  const { data } = props
  return <PackagesPrivate data={data} faqdata={faqdata} />
}
