import React from 'react'
import { graphql } from 'gatsby'

// Ours
import getConfirmationMessage from '../utils/get-confirmation-message'
import PageWrapper from '../components/PageWrapper'
import Wrapper from '../components/Wrapper'
import Header from '../components/Header'
import GravityForms from '../components/GravityForms'
import { StylizedSayHello } from '../components/HeadingsStylized'
import YoastHelmet from '../components/YoastHelmet'

const ContactPage = props => {
  const data = props.data
  const pageNode = data.wordpressPage

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
      <YoastHelmet node={pageNode} url={data.options.options.url} />
      <StylizedSayHello />
      <Wrapper maxWidth={3}>
        <div className="z2 relative mb4">
          <Header
            title={pageNode.title}
            subtitle={pageNode.acf.wco_page_subtitle}
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
    options: wordpressAcfOptions {
      options {
        url
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
    wordpressPage(slug: { eq: "contact" }) {
      id
      wordpress_id
      slug
      title
      template
      content
      acf {
        wco_page_subtitle
      }
      featured_media {
        localFile {
          childImageSharp {
            id
            fluid(maxWidth: 1200) {
              src
            }
          }
        }
      }
      # yoast_meta {
      #   yoast_wpseo_title
      #   yoast_wpseo_metadesc

      #   # Facebook
      #   yoast_wpseo_facebook_title
      #   yoast_wpseo_facebook_description
      #   yoast_wpseo_facebook_type
      #   # yoast_wpseo_facebook_image {
      #   #   id
      #   #   localFile {
      #   #     childImageSharp {
      #   #       id
      #   #       fluid(maxWidth: 1200) {
      #   #         aspectRatio
      #   #         src
      #   #       }
      #   #     }
      #   #   }
      #   # }

      #   # Twitter
      #   yoast_wpseo_twitter_title
      #   yoast_wpseo_twitter_description
      #   # yoast_wpseo_twitter_image
      # }
    }
  }
`
