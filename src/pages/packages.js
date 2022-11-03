import React from 'react'
import PropTypes from 'prop-types'
import { graphql, navigate } from 'gatsby'
import slugify from 'slugify'
import queryString from 'query-string'

// Ours
import format from '../utils/format'
import unesc from '../utils/unescape'
import countriesConfig from '../utils/countries-config'
import Link from '../components/LinkDuo'
import PageWrapper from '../components/PageWrapper'
import Wrapper from '../components/Wrapper'
import Header from '../components/Header'
import Video from '../components/Video'
import PrivateRoute from '../components/PrivateRoute'
import WeddingIntro from '../components/WeddingIntro'
import WhitespaceHeader from '../components/WhitespaceHeader'
import { H1, H4, Intro } from '../components/Headings'
import {
  StylizedInfo,
  StylizedCinematography,
  StylizedFAQLeft,
} from '../components/HeadingsStylized'
import ImgSharp from '../components/ImgSharp'
import ScrollAnchor from '../components/ScrollAnchor'
// import YoastHelmet from '../components/YoastHelmet'
import Doodle from '../components/Doodle'
import { isLoggedIn, logout, getCurrentUser } from '../utils/auth'
import Seo from '../components/Seo'

const List = (props) => {
  const { className, ...remainingProps } = props

  return (
    <ul className={`list-style-none m0 p0 ${className}`} {...remainingProps} />
  )
}

List.defaultProps = { className: '' }
List.propTypes = { className: PropTypes.string }

const PackagesSubhead = (props) => {
  return (
    <h2 className="h2 md-h1 line-height-2 font-weight-400 left-align mb0 track-1">
      {props.children}
    </h2>
  )
}

const PackagesListItems = (props) => {
  let enoughPackages = props.items.length >= 2
  // let halfLength = props.items.length / 2

  return (
    <List
      className="sm-flex flex-wrap sm-mxn2"
      style={{
        paddingBottom:
          enoughPackages && props.items.length % 2 === 0 ? '19%' : 0,
      }}>
      {props.items.map((item, j) => {
        let timestamp = format.timestampRange(
          item.durationShort,
          item.durationLong
        )

        return (
          <li
            className={`col-12 sm-col-6 sm-px2 ${
              j % 2 !== 0 ? 'PackageItem-offset' : ''
            }`}
            key={`${props.namespace}_${j}`}>
            <H4>
              {item.prices && props.country ? (
                <div>
                  {format.price(
                    item.prices[
                      `price${
                        props.country.value[0].toUpperCase() +
                        props.country.value.slice(1)
                      }`
                    ],
                    props.country.currencyCode
                  )}
                </div>
              ) : null}
              <div>{unesc(item.name)}</div>
            </H4>

            <div>
              <p>{item.description}</p>
              {timestamp && !timestamp.includes(null) ? (
                <p>Length: {timestamp}</p>
              ) : null}
            </div>
          </li>
        )
      })}
    </List>
  )
}

PackagesListItems.propTypes = {
  items: PropTypes.array.isRequired,
  country: PropTypes.object,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  durationShort: PropTypes.string,
  durationLong: PropTypes.string,
}

PackagesListItems.defaultProps = {}

const PackagesList = (props) => {
  return (
    <List>
      {props.items.map((pkg, index) => {
        let slug = slugify(pkg.title).toLowerCase()
        let keyStr = `Package_${slug}_${index}`

        let price = null
        let hasExampleLink = pkg.exampleLink

        if (pkg.prices && props.country) {
          price = format.price(
            pkg.prices[
              `price${
                props.country.value[0].toUpperCase() +
                props.country.value.slice(1)
              }`
            ],
            props.country.currencyCode
          )
        }

        return (
          <li key={keyStr} id={slug} className="mb4">
            <div className="flex items-end lg-mb2">
              <div className="col-6">
                <ScrollAnchor href={`#${slug}`}>
                  <PackagesSubhead>{pkg.title}</PackagesSubhead>
                </ScrollAnchor>
                <div className="h3 track-2">{price}</div>
                <div className="mt2 pr2 h6 sm-h4 PackageItemExampleLink-offset">
                  View:
                  <br />
                  <Link
                    title={hasExampleLink ? pkg.exampleLink.title : undefined}
                    to={
                      hasExampleLink
                        ? pkg.exampleLink.url
                        : `/highlights/${slug}-example`
                    }>
                    Example of {pkg.title}
                  </Link>
                </div>
              </div>
              <div className="col-6 z3">
                <ImgSharp {...pkg.image} />
              </div>
            </div>
            <PackagesListItems items={pkg.items} namespace={keyStr} />
          </li>
        )
      })}
    </List>
  )
}

PackagesList.defaultProps = {
  country: { label: 'Canada', value: 'ca', currencyCode: 'CAD' },
}

PackagesList.propTypes = {
  items: PropTypes.array.isRequired,
  country: PropTypes.object.isRequired,
}

PackagesList.defaultProps = {}

const PackagesCallToAction = (props) => (
  <footer className="pb4">
    <div className="center my4">
      <p>
        <a
          href="mailto:team@wagnerandco.film"
          className="h2 lg-h1 line-height-2">
          Get in touch with us
        </a>
      </p>
    </div>
  </footer>
)

const Section = (props) => <section className="pb4" {...props} />

class PackagesPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      countryKey: this.handleCountryFromQueryString(),
    }

    this.handleOnChangeCountry = this.handleOnChangeCountry.bind(this)
  }

  handleOnChangeCountry(e) {
    if (e && e.target && e.target.value) {
      this.setState({ countryKey: e.target.value })
    }
  }

  handleCountryFromQueryString() {
    const props = this.props

    if (props.location && props.location.search) {
      let str = props.location.search.replace('?', '')
      let parsed = queryString.parse(str)
      // If the country key in the URL matches one of the
      // supported countires in the props
      if (typeof props.countries[parsed.country] === 'object') {
        return parsed.country
      }
    } else if (typeof window !== 'undefined') {
      if (isLoggedIn()) {
        // If there is no query string, but they are logged in,
        // get the current user. If that user has a countryKey
        // key stored, used that.
        let currentUser = getCurrentUser()
        if (currentUser.countryKey && props.countries[currentUser.countryKey]) {
          navigate(`/packages/?country=${currentUser.countryKey}`)
          return currentUser.countryKey
        }
      } else {
        // If there is no country key on the user, and there
        // was no query param, or the country key existed but it
        // wasn’t in our list of country data, redirect them to login again
        logout()
        navigate('/packages')
      }
    }

    return null
  }

  componentDidMount() {
    this.setState({
      countryKey: this.handleCountryFromQueryString(),
    })
  }

  render() {
    const props = this.props
    const state = this.state
    const data = props.data
    const pageNode = data.wpPage
    const acf = pageNode.template.acfPackages
    const seoData = data.wpPage.seo

    let itemsToDisplay = []

    data.faq.template.acfFaq.wcoFaqItem.forEach(function (item) {
      if (item.wcoShowOnPackagesPage === true) {
        itemsToDisplay.push(item)
      }
    })

    let activeCountry = props.countries[state.countryKey]
    let activeCountryNote = null

    if (
      state.countryKey !== null &&
      acf.wcoPackagesNotes &&
      typeof acf?.wcoPackagesNotes[
        `wcoPackagesNote${
          state.countryKey[0].toUpperCase() + state.countryKey.slice(1)
        }`
      ] !== 'undefined'
    ) {
      activeCountryNote = (
        <p>
          {
            acf?.wcoPackagesNotes[
              `wcoPackagesNote${
                state.countryKey[0].toUpperCase() + state.countryKey.slice(1)
              }`
            ]
          }
        </p>
      )
    }

    return (
      <PrivateRoute
        parentNode={pageNode}
        title={acf.wcoPackagesProtected.title}
        submitLabel={acf.wcoPackagesProtected.button_label}
        subtitle={acf.wcoPackagesProtected.subtitle}
        location={props.location}
        countryKey={state.countryKey}
        handleOnChangeCountry={(e) => {
          if (e && e.target && e.target.value) {
            this.setState({ countryKey: e.target.value })
          }
        }}
        onSuccess="/packages">
        <PageWrapper>
          <Seo {...seoData} />

          <div className="relative md-pb4">
            <StylizedInfo />
            <Header
              title={pageNode.title}
              subtitle={pageNode.template.acfPages.wcoPageSubtitle}
            />
            <div className="z2 relative">
              <Wrapper maxWidth={3}>
                <div className="md-flex flex-wrap md3 md-mb4">
                  <div className="col-12 md-col-8">
                    <WeddingIntro favorColumn="first">
                      {pageNode.content}
                    </WeddingIntro>
                  </div>
                  <div className="col-12 md-col-4 md-pl3">
                    <div className="WPWeddingIntro-img md-max-width-1">
                      <ImgSharp {...acf.wcoPackagesIntroImage} />
                    </div>
                    <div className="WPWeddingIntro-doodle">
                      <Doodle name="zag" color="blue" />
                    </div>
                  </div>
                </div>
              </Wrapper>
            </div>
          </div>
          <div className="relative">
            <Wrapper maxWidth={3}>
              <article className="relative z2">
                <StylizedCinematography />

                <header className="max-width-2 mx-auto">
                  <H1>{acf.wcoPackagesTitle}</H1>
                </header>
                <div className="md-mb4 lg-pb4">
                  <Section>
                    <H4>All packages include:</H4>
                    <ul className="m0 pl2 relative z2">
                      {acf.wcoPackagesAll.map((obj, index) => {
                        return <li key={`Package_All_${index}`}>{obj.item}</li>
                      })}
                    </ul>
                  </Section>
                </div>
                <Section>
                  <PackagesList
                    items={acf.wcoPackages}
                    country={activeCountry}
                  />
                </Section>
                {acf.wcoPackagesAddons ? (
                  <Section id="add-ons">
                    <ScrollAnchor href="#add-ons">
                      <H1>Add-ons</H1>
                    </ScrollAnchor>
                    <PackagesListItems
                      country={activeCountry}
                      items={acf.wcoPackagesAddons}
                    />
                  </Section>
                ) : null}
                {activeCountryNote ? (
                  <Section id="notes">
                    <small className="h4 block mb4" id="notes">
                      <ScrollAnchor href="#notes">
                        <H4>Notes</H4>
                      </ScrollAnchor>
                      {activeCountryNote}
                    </small>
                  </Section>
                ) : null}

                <div className="doodle-outer right-0">
                  <Doodle name="zag" color="blue" />
                </div>

                <Section>
                  <div className="relative">
                    <StylizedFAQLeft />
                  </div>
                  <div className="z1">
                    <List>
                      {itemsToDisplay.map((item, index) => {
                        return (
                          <li
                            className="md-mxn2 md-pr2 mb2"
                            key={`PackagesFAQItem_${index}`}>
                            <details className="m0 p0">
                              <summary
                                className="cursor-pointer"
                                style={{ paddingBottom: '0.2em' }}>
                                <H4 is="span" underline>
                                  <span className="border-bottom border-blue border-medium">
                                    {item.wcoFaqQuestion}
                                  </span>
                                </H4>
                              </summary>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: item.wcoFaqAnswer,
                                }}
                              />
                            </details>
                          </li>
                        )
                      })}
                    </List>
                  </div>
                </Section>
                <PackagesCallToAction />
              </article>
            </Wrapper>
            <Video vimeoId={acf.wcoPackagesVimeoId} />
            <WhitespaceHeader
              is="div"
              minHeight={350}
              height={25 + WhitespaceHeader.defaultProps.marginBottom}
              marginTop={0}
              marginBottom={0}>
              <div className="max-width-2 mx-auto h3 line-height-4 center">
                <Intro>
                  This is you in the moment, living your best life, surrounded
                  by the people who hold you up.
                </Intro>
              </div>
            </WhitespaceHeader>
          </div>
        </PageWrapper>
      </PrivateRoute>
    )
  }
}

PackagesPage.defaultProps = {
  countries: countriesConfig,
}

export const pageQuery = graphql`
  query PackagesQuery {
    wp {
      acfOptions {
        options {
          url
        }
      }
    }
    wpPage(slug: { eq: "packages" }) {
      seo {
        title
        metaDesc
        opengraphTitle
        opengraphDescription
        opengraphImage {
          altText
          sourceUrl
          gatsbyImage(
            fit: OUTSIDE
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
      featuredImage {
        node {
          altText
          gatsbyImage(
            fit: OUTSIDE
            placeholder: BLURRED
            quality: 90
            width: 600
            layout: CONSTRAINED
          )
        }
      }
      template {
        ... on WpTemplate_PackagesPage {
          templateName
          acfPackages {
            fieldGroupName
            wcoPackagesTitle
            wcoPackagesIntroImage {
              altText
              id
              gatsbyImage(
                fit: OUTSIDE
                placeholder: BLURRED
                quality: 90
                width: 600
                layout: CONSTRAINED
              )
            }
            wcoPackagesAll {
              item
            }
            wcoPackages {
              title
              exampleLink {
                title
                target
                url
              }
              prices {
                priceCa
                priceOther
                priceUs
              }
              items {
                description
                durationLong
                durationShort
                name
              }
              image {
                altText
                id
                gatsbyImage(
                  fit: OUTSIDE
                  placeholder: BLURRED
                  quality: 90
                  width: 600
                  layout: CONSTRAINED
                )
              }
            }
            wcoPackagesAddons {
              name
              price
              durationLong
              durationShort
              description
              prices {
                priceCa
                priceOther
                priceUs
              }
            }
            wcoPackagesNotes {
              wcoPackagesNoteCa
              wcoPackagesNoteOther
              wcoPackagesNoteUs
            }
            wcoPackagesVimeoId
            wcoPackagesProtected {
              buttonLabel
              subtitle
              title
            }
          }
          acfPages {
            wcoPageSubtitle
          }
        }
      }
    }
    faq: wpPage(slug: { eq: "faq" }) {
      template {
        ... on WpTemplate_FAQPage {
          templateName
          acfFaq {
            wcoFaqItem {
              wcoShowOnPackagesPage
              wcoFaqQuestion
              wcoFaqAnswer
              wcoShowOnFaqPage
            }
          }
        }
      }
      title
    }
    # allWordpressAcfOptions
  }
`

export default PackagesPage
