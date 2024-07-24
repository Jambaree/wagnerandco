import React from 'react'

// Ours
import getConfirmationMessage from '@/utils/get-confirmation-message'
import PageWrapper from '@/components/PageWrapper'
import Wrapper from '@/components/Wrapper'
import Header from '@/components/Header'
import GravityForms from '@/components/GravityForms'
import { StylizedSayHello } from '@/components/HeadingsStylized'

// import YoastHelmet from '../components/YoastHelmet'
export async function getForm({ form_id }: { form_id: string | number }) {
  if (!process.env.NEXT_PUBLIC_WP_URL) {
    throw new Error('Missing NEXT_PUBLIC_WP_URL environment variable')
  }

  const req = await fetch(
    `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/gf/v2/forms/${form_id}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${btoa(process.env.WP_APPLICATION_PASSWORD!)}`,
      },
    }
  )

  const data = await req.json()

  if (data?.code) {
    throw new Error(`Gravity Form Error: ${data.message}`)
  }

  return data
}

export async function ContactPageTemplate(props) {
  const { data } = props
  const gfForm = await getForm({ form_id: 1 })

  let confirmationMessage = getConfirmationMessage(gfForm)

  return (
    <Wrapper padding>
      <PageWrapper className="relative">
        <StylizedSayHello />
        <Wrapper maxWidth={3}>
          <div className="z2 relative mb4">
            <Header
              title={data?.title?.rendered}
              subtitle={data?.acf?.wco_page_subtitle}
            />
            <div dangerouslySetInnerHTML={{ __html: data?.content.rendered }} />
          </div>
          <GravityForms
            showTitle={false}
            formId={1}
            url={process.env.NEXT_PUBLIC_WP_URL}
            data={gfForm}
            confirmationMessage={confirmationMessage}
          />
        </Wrapper>
      </PageWrapper>
    </Wrapper>
  )
}
