import React from 'react'
import { getAllItems } from '@nextwp/core/src/api/get-all-items'
import { getPageData } from '@nextwp/core'
import parse from 'html-react-parser'

// Ours

import Wrapper from '../../components/Wrapper'
import Header from '@/components/Header'
import ServicesHeaderMenu from '@/components/ServicesHeaderMenu'
import ServiceVideo from '@/components/ServiceVideos'

// import YoastHelmet from '../../components/YoastHelmet'
export async function SingleServiceTemplate(props) {
  const {
    uri,
    data: { content, acf },
  } = props
  const services = await getAllItems(['services'])
  const archivePage = await getPageData('services')

  // console.log(data)
  let wrapperProps = { padding: true, maxWidth: 4 }

  return (
    <Wrapper {...wrapperProps}>
      <div className="max-w-[875px] mx-auto">
        <Header
          title={archivePage.data.page.title.rendered}
          subtitle={archivePage.data.page.acf.wco_page_subtitle}
          className="mb-[130px]"
        />
        <ServicesHeaderMenu services={services} uri={uri} />

        {content?.rendered && (
          <div className="text-[#ea5c44] max-w-[410px] relative md:ml-auto mx-auto md:mx-0 mb-[60px]">
            {parse(content?.rendered)}
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[60px] mb-[60px]">
          {acf?.videos &&
            acf?.videos?.map((video, index) => {
              return (
                <div className=" mb-[20px] ">
                  <div className="bg-[#ea5c44]">
                    <ServiceVideo vimeo_id={video?.vimeo_id} />
                  </div>
                  <div className="mt-[15px] mb-[2px]">{video?.title}</div>
                  <div>{video?.description}</div>
                </div>
              )
            })}
        </div>
      </div>
    </Wrapper>
  )
}
