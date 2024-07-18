'use client'
import React, { useRef } from 'react'
import Helmet from 'react-helmet'

const Form = ({ formId = 1 }) => {
  const iframeRef = useRef(null)

  if (!formId) {
    return null
  }

  const formIdString = formId.toString()

  return (
    <React.Fragment>
      <Helmet>
        <script
          src={`${process.env.NEXT_PUBLIC_WP_URL}/wp-content/plugins/gravity-forms-iframe-develop/assets/scripts/gfembed.min.js`}
          type="text/javascript"></script>
      </Helmet>
      <iframe
        title={`Form ${formIdString}`}
        ref={iframeRef}
        src={`${process.env.NEXT_PUBLIC_WP_URL}/gfembed/?f=${formIdString}`}
        width="100%"
        height="750"
        frameBorder="0"
        className="gfiframe mxn2"
      />
    </React.Fragment>
  )
}

export default Form
