import React from 'react'

// Ours
import Header from '@/components/Header'
// import { H2 } from '@/components/Headings'
// import Link from 'next/link'
import Wrapper from '@/components/Wrapper'
import ServicesHeaderMenu from '@/components/ServicesHeaderMenu'

export function ServicesPageTemplate(props) {
  const { data } = props
  let wrapperProps = { padding: true, maxWidth: 4 }

  return (
    <Wrapper {...wrapperProps}>
      <div className="max-w-[875px] mx-auto">
        <Header
          title={data.page.title.rendered}
          subtitle={data.page.acf.wco_page_subtitle}
          className="mb-[130px]"
        />
        <ServicesHeaderMenu services={data?.items} />
      </div>
    </Wrapper>
  )
}
