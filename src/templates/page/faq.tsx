import React from 'react'

import typogr from 'typogr'

// Ours
import PageWrapper from '@/components/PageWrapper'
import Wrapper from '@/components/Wrapper'
import Header from '@/components/Header'
import { H4 } from '@/components/Headings'
import Image from 'next/image'
import { StylizedFAQ } from '@/components/HeadingsStylized'
// import YoastHelmet from '@/components/YoastHelmet'
import DoodleRandomCorner from '@/components/DoodleRandomCorner'

const FAQImage = (props) => {
  return (
    <Image
      src={props?.url}
      alt={props?.alt || ''}
      width={props?.width}
      height={props?.height}
      style={{
        width: '100%',
        height: 'auto',
      }}
      role="presentation"
      className="block col-12 m0 sm-max-width-1 mx-auto sm-m0 md-pb3"
    />
  )
}

const FAQItem = ({ question, answer, className }) => {
  return (
    <div className={`block mb3 ${className}`}>
      <H4 is="h3">{question}</H4>
      <div
        className="h4 line-height-4"
        dangerouslySetInnerHTML={{
          __html: typogr(answer).typogrify(),
        }}
      />
    </div>
  )
}

const FAQItemBlock = ({ items, image = null, imgDirection = 'left' }) => {
  let itemOne = items[0]
  let itemTwo = items[1]
  let imgClassName = `FAQItemBlock-img z0 col-12 sm-col-5 md-col-6 self-center py4 sm-py0`
  let long = false

  if (
    itemOne &&
    itemTwo &&
    itemOne.wco_faq_answer.length + itemTwo.wco_faq_answer.length > 1000
  ) {
    long = true
  }

  return (
    <div className={`sm-flex FAQItemBlock ${long ? 'FAQItemBlock--long' : ''}`}>
      {image && imgDirection === 'left' ? (
        <div className={`${imgClassName} sm-pr3 md-pr4`}>{image}</div>
      ) : null}
      <div
        className={`FAQItemBlock-content z2 ${
          image ? 'col-12 sm-col-7 md-col-6' : 'col-12 mx-auto'
        }`}>
        {itemOne ? (
          <FAQItem
            question={itemOne.wco_faq_question}
            answer={itemOne.wco_faq_answer}
          />
        ) : null}
        {itemTwo ? (
          <FAQItem
            question={itemTwo.wco_faq_question}
            answer={itemTwo.wco_faq_answer}
          />
        ) : null}
      </div>
      {image && imgDirection === 'right' ? (
        <div className={`${imgClassName} sm-pl3 md-pl4`}>{image}</div>
      ) : null}
    </div>
  )
}

const FAQItems = ({ items = [], images = [] }) => {
  let imgIndex = 0
  let faqItems = []
  let itemsToDisplay = []

  // Remove hidden items before handling layout
  items.forEach((item) => {
    if (item.wco_show_on_faq_page === true) {
      itemsToDisplay.push(item)
    }
  })

  for (let index = 0; itemsToDisplay.length >= index; index = index + 2) {
    let indexTwo = index + 1
    let image = null
    let imgDirection = index === 0 ? 'left' : index % 4 === 0 ? 'left' : 'right'

    if (images.length > imgIndex && index !== 2) {
      image = <FAQImage {...images[imgIndex]} />
      if (index % 4) {
        image = (
          <div className="relative">
            <DoodleRandomCorner color="blue" />
            {image}
          </div>
        )
      }
      imgIndex++
    }

    faqItems.push(
      <FAQItemBlock
        key={`FAQItemBlock_${index}`}
        image={image}
        imgDirection={imgDirection}
        items={[itemsToDisplay[index], itemsToDisplay[indexTwo]]}
      />
    )
  }

  return <div className="FAQItems max-width-4 md-pr4">{faqItems}</div>
}

export function FaqTemplate({ data }) {
  let wrapperProps = { padding: true, maxWidth: 5 }

  return (
    <Wrapper {...wrapperProps}>
      <PageWrapper className="relative">
        <StylizedFAQ right />
        <Header title={data.title.rendered} />
        <Wrapper maxWidth={5}>
          <FAQItems
            items={data.acf.wco_faq_item}
            images={data.acf.wco_faq_images}
          />
        </Wrapper>
      </PageWrapper>
    </Wrapper>
  )
}
