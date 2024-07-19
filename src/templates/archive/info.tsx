import React from 'react'

// Ours
import Header from '@/components/Header'
import { H2 } from '@/components/Headings'
import Link from 'next/link'
import Wrapper from '@/components/Wrapper'

export function InfoPageTemplate(props) {
  const { data } = props
  let wrapperProps = { padding: true, maxWidth: 5 }
  return (
    <Wrapper {...wrapperProps}>
      <Header title="Info" />
      <ul className="list-style-none m0 p0">
        {data?.items?.map((info, index) => {
          return (
            <li key={info.id} className="block mb3 md-mb4">
              <Link href={`/info/${info.slug}`} className="block border-none">
                <H2 align="left">{info.title.rendered}</H2>
              </Link>
            </li>
          )
        })}
      </ul>
    </Wrapper>
  )
}
