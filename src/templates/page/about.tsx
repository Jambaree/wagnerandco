import React from 'react'

// Ours
import Link from '@/components/LinkDuo'
import PageWrapper from '@/components/PageWrapper'
import Wrapper from '@/components/Wrapper'
import Header from '@/components/Header'
import TeamMembers from '@/components/TeamMembers'
import Image from 'next/image'
import { H1, H4 } from '@/components/Headings'
import { StylizedAbout } from '@/components/HeadingsStylized'
import WeddingIntro from '@/components/WeddingIntro'

const AboutH2 = (props) => {
  return (
    <div className="center py2 sm-py3 md-py4 max-width-1 mx-auto">
      <H1 is="h2">{props.children}</H1>
    </div>
  )
}

export function AboutTemplate(props) {
  const { data } = props
  let wrapperProps = { padding: true, maxWidth: 5 }

  return (
    <Wrapper {...wrapperProps}>
      <PageWrapper className="relative">
        <StylizedAbout />
        <Header
          title={data.title.rendered}
          subtitle={data.acf.wco_page_subtitle}
        />
        <Wrapper maxWidth={3}>
          <WeddingIntro>{data.content.rendered}</WeddingIntro>
        </Wrapper>
        <Wrapper maxWidth={5}>
          <AboutH2>{data.acf.wco_team_title}</AboutH2>
          <TeamMembers members={data.acf.wco_team_members} />
        </Wrapper>
        <AboutH2>Where we’ve been featured</AboutH2>
        <div className="sm-flex sm-mxn2">
          <div className="col-12 sm-col-6 sm-px2">
            <H4 is="h3">Press</H4>

            <ul className="list-style-none m0 p0">
              {data?.acf?.wco_press_items.map((edge, index) => {
                return (
                  <li key={`PressItem_Link_${index}`} className="mb1">
                    <Link
                      to={edge.press_link.url}
                      target="_blank"
                      rel="noopener">
                      {edge.press_link.title}
                    </Link>
                    , {edge.date}
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="col-12 sm-col-6 sm-px2">
            <ul className="list-style-none m0 p0 col-12 sm-flex flex-wrap">
              {data?.acf?.wco_press_logos?.map((image, index) => {
                return (
                  <li
                    key={`PressLogo_${image.id}_${index}`}
                    className="block col-12 sm-col-6 sm-flex items-center p2">
                    <Image
                      src={image?.url}
                      alt={image.alt || `${image.name} logo`}
                      // className="block m0 mx-auto max-width-1 col-12"
                      width={image?.width}
                      height={image?.height}
                      style={{
                        width: '100%',
                        height: 'auto',
                      }}
                    />
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </PageWrapper>
    </Wrapper>
  )
}
