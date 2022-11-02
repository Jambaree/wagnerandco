import React from 'react'
import { graphql } from 'gatsby'

// Ours
import getConfirmationMessage from '../utils/get-confirmation-message'
import PageWrapper from '../components/PageWrapper'
import Wrapper from '../components/Wrapper'
import Header from '../components/Header'
import GravityForms from '../components/GravityForms'
import { StylizedSayHello } from '../components/HeadingsStylized'
import Seo from '../components/Seo'
// import YoastHelmet from '../components/YoastHelmet'

const ContactPage = (props) => {
  const data = props.data
  const pageNode = data.wpPage
  const seoData = data.wpPage.seo

  // eslint-disable-next-line
  const results = data.gfForm

  // results.labelPlacement
  // results.subLabelPlacement
  // results.descriptionPlacement
  // results.postStatus
  // results.is_active
  // results.date_created
  // results.is_trash

  let confirmationMessage = getConfirmationMessage(results)

  return (
    <PageWrapper className="relative">
      <Seo {...seoData} />
      <StylizedSayHello />
      <Wrapper maxWidth={3}>
        <div className="z2 relative mb4">
          <Header
            title={pageNode.title}
            subtitle={pageNode.template.acfPages.wcoPageSubtitle}
          />
          <div dangerouslySetInnerHTML={{ __html: pageNode.content }} />
        </div>
        <GravityForms
          showTitle={false}
          formId={1}
          url={process.env.GATSBY_WP_URL}
          data={results}
          confirmationMessage={confirmationMessage}
        />
      </Wrapper>
    </PageWrapper>
  )
}

export default ContactPage

export const pageQuery = graphql`
  query ContactQuery {
    wp {
      acfOptions {
        options {
          url
        }
      }
    }
    gfForm(formId: { eq: 1 }) {
      id
      title
      labelPlacement
      descriptionPlacement
      button {
        type
        text
      }
      formFields {
        id
        formId
        label
        labelPlacement
        description
        descriptionPlacement
        type
        isRequired
        placeholder
        defaultValue
        choices
        # maxLength
        # phoneFormat
        inputMask
        inputMaskValue
        size
        # rangeMin
        # rangeMax
        # HTML inputs
        content
      }
      confirmations {
        message
      }
    }

    wpPage(slug: { eq: "contact" }) {
      seo {
        title
        metaDesc
        opengraphTitle
        opengraphDescription
        opengraphImage {
          altText
          sourceUrl
          gatsbyImage(
            placeholder: BLURRED
            quality: 90
            width: 600
            layout: CONSTRAINED
          )
        }
      }
      id
      slug
      title
      content
      template {
        ... on WpTemplate_ContactPage {
          templateName
          acfPages {
            wcoPageSubtitle
          }
        }
      }
      featuredImage {
        node {
          altText
          gatsbyImage(
            placeholder: BLURRED
            quality: 90
            width: 600
            layout: CONSTRAINED
          )
        }
      }
    }
  }
`
