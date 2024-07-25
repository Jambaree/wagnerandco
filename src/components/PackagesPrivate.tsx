'use client'
import React, { useState, useEffect } from 'react'
import slugify from 'slugify'
import queryString from 'query-string'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'

// Ours
import format from '@/utils/format'
import unesc from '@/utils/unescape'
import countriesConfig from '@/utils/countries-config'
import Link from '@/components/LinkDuo'
import PageWrapper from '@/components/PageWrapper'
import Wrapper from '@/components/Wrapper'
import Header from '@/components/Header'
import Video from '@/components/blocks/Video'
import PrivateRoute from '@/components/PrivateRoute'
import WeddingIntro from '@/components/WeddingIntro'
import WhitespaceHeader from '@/components/WhitespaceHeader'
import { H1, H4, Intro } from '@/components/Headings'
import {
  StylizedInfo,
  StylizedCinematography,
  StylizedFAQLeft,
} from '@/components/HeadingsStylized'

import Image from 'next/image'
import ScrollAnchor from '@/components/ScrollAnchor'

import Doodle from '@/components/Doodle'
import { isLoggedIn, logout, getCurrentUser } from '@/utils/auth'
import FaqBlock from '@/components/faqBlock'

const List = ({ className = '', ...remainingProps }) => {
  return (
    <ul className={`list-style-none m0 p0 ${className}`} {...remainingProps} />
  )
}

const PackagesSubhead = ({ children }) => {
  return (
    <h2 className="h2 md-h1 line-height-2 font-weight-400 left-align mb0 track-1">
      {children}
    </h2>
  )
}

const PackagesListItems = ({ items, country, namespace }) => {
  let enoughPackages = items.length >= 2

  return (
    <List
      className="sm-flex flex-wrap sm-mxn2"
      style={{
        paddingBottom: enoughPackages && items.length % 2 === 0 ? '19%' : 0,
      }}>
      {items.map((item, j) => {
        let timestamp = format.timestampRange(
          item.duration_short,
          item.duration_long
        )

        return (
          <li
            className={`col-12 sm-col-6 sm-px2 ${
              j % 2 !== 0 ? 'PackageItem-offset' : ''
            }`}
            key={`${namespace}_${j}`}>
            <H4>
              {item.prices && country ? (
                <div>
                  {format.price(
                    item.prices[
                      `price_${country.value[0] + country.value.slice(1)}`
                    ],
                    country.currencyCode
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

const PackagesList = ({ items, country }) => {
  return (
    <List>
      {items.map((pkg, index) => {
        let slug = slugify(pkg?.title)?.toLowerCase()
        let keyStr = `Package_${slug}_${index}`

        let price = null
        let hasExampleLink = pkg.example_link

        if (pkg.prices && country) {
          price = format.price(
            pkg.prices[`price_${country.value[0] + country.value.slice(1)}`],
            country.currencyCode
          )
        }
        const url = pkg.example_link.url
        const baseUrl = process.env.NEXT_PUBLIC_WP_URL // Ensure this is set in your environment variables
        const relativeUrl = url.replace(baseUrl, '')
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
                    href={
                      hasExampleLink
                        ? relativeUrl
                        : `/highlights/${slug}-example`
                    }>
                    Example of {pkg.title}
                  </Link>
                </div>
              </div>
              <div className="col-6 z3">
                <Image
                  src={pkg?.image?.url}
                  width={pkg?.image?.width}
                  height={pkg?.image?.height}
                  style={{
                    width: '100%',
                    height: 'auto',
                  }}
                  alt={pkg?.image?.alt || ''}
                />
              </div>
            </div>
            <PackagesListItems
              items={pkg.items}
              namespace={keyStr}
              country={country}
            />
          </li>
        )
      })}
    </List>
  )
}

const PackagesCallToAction = () => (
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

export default function PackagesPrivate(props) {
  const router = useRouter()

  const searchParams = useSearchParams()
  const [countryKey, setCountryKey] = useState(handleCountryFromQueryString())

  useEffect(() => {
    setCountryKey(handleCountryFromQueryString())
  }, [])

  function handleCountryFromQueryString() {
    const search = searchParams.toString()

    if (search) {
      let parsed = queryString.parse(search)

      if (typeof countriesConfig[parsed.country] === 'object') {
        return parsed.country
      }
    } else if (typeof window !== 'undefined') {
      if (isLoggedIn()) {
        let currentUser = getCurrentUser()

        if (currentUser.countryKey && countriesConfig[currentUser.countryKey]) {
          router.push(`/packages/?country=${currentUser.countryKey}`)
          return currentUser.countryKey
        }
      } else {
        logout()
        router.push('/packages')
      }
    }
    return null
  }

  const { data, faqdata } = props

  let activeCountry = countriesConfig[countryKey]
  let activeCountryNote = null

  if (
    countryKey !== null &&
    data.acf.wco_packages_notes &&
    typeof data.acf?.wco_packages_notes[
      `wcoPackagesNote${countryKey[0].toUpperCase() + countryKey.slice(1)}`
    ] !== 'undefined'
  ) {
    activeCountryNote = (
      <p>
        {
          data.acf?.wco_packages_notes[
            `wcoPackagesNote${
              countryKey[0].toUpperCase() + countryKey.slice(1)
            }`
          ]
        }
      </p>
    )
  }

  let wrapperProps = { padding: true, maxWidth: 5 }
  return (
    <PrivateRoute
      parentNode={data}
      title={data.acf.wco_packages_protected.title}
      submitLabel={data.acf.wco_packages_protected.button_label}
      subtitle={data.acf.wco_packages_protected.subtitle}
      location={props.location}
      countryKey={countryKey}
      handleOnChangeCountry={(e) => {
        if (e && e.target && e.target.value) {
          setCountryKey(e.target.value)
        }
      }}
      onSuccess="/packages">
      <Wrapper {...wrapperProps}>
        <PageWrapper>
          <div className="relative md-pb4">
            <StylizedInfo />
            <Header
              title={data.title.rendered}
              subtitle={data.acf.wco_page_subtitle}
            />

            <div className="z2 relative">
              <Wrapper maxWidth={3}>
                <div className="md-flex flex-wrap md3 md-mb4">
                  <div className="col-12 md-col-8">
                    <WeddingIntro favorColumn="first">
                      {data.content.rendered}
                    </WeddingIntro>
                  </div>
                  <div className="col-12 md-col-4 md-pl3">
                    <div className="WPWeddingIntro-img md-max-width-1">
                      <Image
                        src={data?.acf?.wco_packages_intro_image?.url}
                        width={data?.acf?.wco_packages_intro_image?.width}
                        height={data?.acf?.wco_packages_intro_image?.height}
                        alt={data?.acf?.wco_packages_intro_image?.alt}
                        style={{
                          width: '100%',
                          height: 'auto',
                        }}
                      />
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
                  <H1>{data?.acf.wco_packages_title}</H1>
                </header>
                <div className="md-mb4 lg-pb4">
                  <Section>
                    <H4>All packages include:</H4>
                    <ul className="m0 pl2 relative z2">
                      {data?.acf.wco_packages_all.map((obj, index) => {
                        return <li key={`Package_All_${index}`}>{obj.item}</li>
                      })}
                    </ul>
                  </Section>
                </div>
                <Section>
                  <PackagesList
                    items={data?.acf?.wco_packages}
                    country={activeCountry}
                  />
                </Section>
                {data?.acf.wco_packages_addons ? (
                  <Section id="add-ons">
                    <ScrollAnchor href="#add-ons">
                      <H1>Add-ons</H1>
                    </ScrollAnchor>
                    <PackagesListItems
                      country={activeCountry}
                      items={data?.acf?.wco_packages_addons}
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
                  <FaqBlock faqdata={faqdata} />
                </Section>
                <PackagesCallToAction />
              </article>
            </Wrapper>
            <Video vimeo_id={data?.acf?.wco_packages_vimeo_id} />
            <WhitespaceHeader is="div" minHeight={350} height={25}>
              <div className="max-width-2 mx-auto h3 line-height-4 center">
                <Intro>
                  This is you in the moment, living your best life, surrounded
                  by the people who hold you up.
                </Intro>
              </div>
            </WhitespaceHeader>
          </div>
        </PageWrapper>
      </Wrapper>
    </PrivateRoute>
  )
}
