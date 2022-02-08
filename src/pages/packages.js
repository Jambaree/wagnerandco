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
import YoastHelmet from '../components/YoastHelmet'
import Doodle from '../components/Doodle'
import { isLoggedIn, logout, getCurrentUser } from '../utils/auth'

const List = props => {
  const { className, ...remainingProps } = props

  return (
    <ul className={`list-style-none m0 p0 ${className}`} {...remainingProps} />
  )
}

List.defaultProps = { className: '' }
List.propTypes = { className: PropTypes.string }

const PackagesSubhead = props => {
  return (
    <h2 className="h2 md-h1 line-height-2 font-weight-400 left-align mb0 track-1">
      {props.children}
    </h2>
  )
}

const PackagesListItems = props => {
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
          item.duration_short,
          item.duration_long
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
                    item.prices[`price_${props.country.value}`],
                    props.country.currencyCode
                  )}
                </div>
              ) : null}
              <div>{unesc(item.name)}</div>
            </H4>

            <div>
              <p>{item.description}</p>
              {timestamp ? <p>Length: {timestamp}</p> : null}
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
  // name: PropTypes.string.isRequired,
  // description: PropTypes.string,
  // duration_short: PropTypes.string,
  // duration_long: PropTypes.string,
}

PackagesListItems.defaultProps = {}

const PackagesList = props => {
  return (
    <List>
      {props.items.map((pkg, index) => {
        let slug = slugify(pkg.title).toLowerCase()
        let keyStr = `Package_${slug}_${index}`

        let price = null
        let hasExampleLink = pkg.example_link

        if (pkg.prices && props.country) {
          price = format.price(
            pkg.prices[`price_${props.country.value}`],
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
                    title={hasExampleLink ? pkg.example_link.title : undefined}
                    to={
                      hasExampleLink
                        ? pkg.example_link.url
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

const PackagesCallToAction = props => (
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

const Section = props => <section className="pb4" {...props} />

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
    const pageNode = data.wordpressPage
    const acf = pageNode.acf

    let itemsToDisplay = []

    data.faq.acf.wco_faq_item.forEach(function(item) {
      if (item.wco_show_on_packages_page === true) {
        itemsToDisplay.push(item)
      }
    })

    let activeCountry = props.countries[state.countryKey]
    let activeCountryNote = null

    if (
      acf.wco_packages_notes &&
      typeof acf.wco_packages_notes[`wco_packages_note_${state.countryKey}`] !==
        'undefined'
    ) {
      activeCountryNote = (
        <p>{acf.wco_packages_notes[`wco_packages_note_${state.countryKey}`]}</p>
      )
    }

    return (
      <PrivateRoute
        parentNode={pageNode}
        title={acf.wco_packages_protected.title}
        submitLabel={acf.wco_packages_protected.button_label}
        subtitle={acf.wco_packages_protected.subtitle}
        location={props.location}
        countryKey={state.countryKey}
        handleOnChangeCountry={e => {
          if (e && e.target && e.target.value) {
            this.setState({ countryKey: e.target.value })
          }
        }}
        onSuccess="/packages">
        <PageWrapper>
          <YoastHelmet node={pageNode} url={data.options.options.url}>
            <meta name="robots" content="noindex" />
          </YoastHelmet>
          {/*
          <div className="bg-red blue">
            Country: {state.countryKey} {activeCountry.currencyCode}
            <form onSubmit={e => e.preventDefault()}>
              <select
                value={state.countryKey}
                onChange={this.handleOnChangeCountry}>
                {Object.keys(props.countries).map((value, index) => {
                  let country = props.countries[value]
                  return <option value={value}>{country.label}</option>
                })}
              </select>
            </form>
          </div>
          */}
          <div className="relative md-pb4">
            <StylizedInfo />
            <Header title={pageNode.title} subtitle={acf.wco_page_subtitle} />
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
                      <ImgSharp {...acf.wco_packages_intro_image} />
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
                  <H1>{acf.wco_packages_title}</H1>
                </header>
                <div className="md-mb4 lg-pb4">
                  <Section>
                    <H4>All packages include:</H4>
                    <ul className="m0 pl2 relative z2">
                      {acf.wco_packages_all.map((obj, index) => {
                        return <li key={`Package_All_${index}`}>{obj.item}</li>
                      })}
                    </ul>
                  </Section>
                </div>
                <Section>
                  <PackagesList
                    items={acf.wco_packages}
                    country={activeCountry}
                  />
                </Section>
                {acf.wco_packages_addons ? (
                  <Section id="add-ons">
                    <ScrollAnchor href="#add-ons">
                      <H1>Add-ons</H1>
                    </ScrollAnchor>
                    <PackagesListItems
                      country={activeCountry}
                      items={acf.wco_packages_addons}
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
                                    {item.wco_faq_question}
                                  </span>
                                </H4>
                              </summary>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: item.wco_faq_answer,
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
            <Video vimeoId={acf.wco_packages_vimeo_id} />
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
    options: wordpressAcfOptions {
      options {
        url
      }
    }
    wordpressPage(slug: { eq: "packages" }) {
      id
      wordpress_id
      slug
      title
      content
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
      #   # yoast_wpseo_facebook_image

      #   # Twitter
      #   yoast_wpseo_twitter_title
      #   yoast_wpseo_twitter_description
      #   # yoast_wpseo_twitter_image
      # }
      acf {
        wco_page_subtitle
        wco_packages_title
        wco_packages_intro_image {
          id
          alt_text
          localFile {
            childImageSharp {
              fluid {
                src
                srcSet
              }
            }
          }
        }
        wco_packages_all {
          item
        }
        wco_packages {
          title
          example_link {
            title
            url
          }
          prices {
            price_ca
            price_us
            price_other
          }
          items {
            name
            description
            duration_short
            duration_long
          }
          image {
            id
            alt_text
            source_url
            localFile {
              childImageSharp {
                fluid {
                  src
                  srcSet
                }
              }
            }
          }
        }
        wco_packages_addons {
          name
          description
          price
          prices {
            price_ca
            price_us
            price_other
          }
          duration_short
          duration_long
        }
        wco_packages_notes {
          wco_packages_note_ca
          wco_packages_note_us
          wco_packages_note_other
        }
        wco_packages_vimeo_id
        wco_packages_protected {
          title
          subtitle
          button_label
        }
      }
    }
    faq: wordpressPage(slug: { eq: "faq" }) {
      title
      acf {
        wco_faq_item {
          wco_faq_question
          wco_faq_answer
          wco_show_on_packages_page
        }
      }
    }
    # allWordpressAcfOptions
  }
`

export default PackagesPage
