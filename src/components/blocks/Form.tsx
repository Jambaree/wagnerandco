import React from 'react'
import GravityForms from '../GravityForms'
import getConfirmationMessage from '@/utils/get-confirmation-message'

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

export async function Form({ form_id }) {
  const gfForm = await getForm({ form_id })
  let confirmationMessage = getConfirmationMessage(gfForm)
  if (!form_id) {
    return null
  }

  return (
    <GravityForms
      showTitle={false}
      formId={form_id}
      url={process.env.NEXT_PUBLIC_WP_URL}
      data={gfForm}
      confirmationMessage={confirmationMessage}
    />
  )
}

export default Form
