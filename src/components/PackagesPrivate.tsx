'use client'
import React, { useState, useEffect } from 'react'
import slugify from 'slugify'
import queryString from 'query-string'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import parse from 'html-react-parser'
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
        let timestamp = item.length

        return (
          <li
            className={`col-12 sm-col-6 sm-px2 relative flex flex-col`}
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

            <p>{item.description}</p>
            <div className="flex flex-col justify-between mt-auto relative">
              {item?.examples && (
                <div className="text-[15.6px]">
                  <Link href={item?.examples || '/'} className="w-fit">
                    View Examples
                  </Link>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#062995"
                    className="size-4 ml-[2px] relative top-[2px]">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                    />
                  </svg>
                </div>
              )}

              <div className=" flex justify-between">
                {timestamp && !timestamp.includes(null) ? (
                  <p className="mt-[5px] text-[15.6px]">Length: {timestamp}</p>
                ) : null}
                {item?.voice_over && (
                  <p className="mt-[5px] text-[15.6px]">
                    Voice Over: {item?.voice_over}
                  </p>
                )}
              </div>
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
        // let hasExampleLink = pkg.example_link

        if (pkg.prices && country) {
          price = format.price(
            pkg.prices[`price_${country.value[0] + country.value.slice(1)}`],
            country.currencyCode
          )
        }
        const url = pkg.example_link.url
        const baseUrl = process.env.NEXT_PUBLIC_WP_URL // Ensure this is set in your environment variables
        // const relativeUrl = url.replace(baseUrl, '')
        return (
          <li key={keyStr} id={slug} className="mb4">
            <div className="flex items-center lg-mb2">
              <div className="col-6">
                <ScrollAnchor href={`#${slug}`}>
                  <PackagesSubhead>{pkg.title}</PackagesSubhead>
                </ScrollAnchor>
                <div className="h3 track-2">{price}</div>
                {/* <div className="mt2 pr2 h6 sm-h4 PackageItemExampleLink-offset">
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
                </div> */}
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

  const ComparisonTable = ({ tableData }) => {
    if (!tableData) return null

    const { use_header, header, body } = tableData

    return (
      <div className="overflow-x-auto mb-[150px]">
        <table className="min-w-full table-auto border border-[#062995] border-collapse">
          {/* Render Header */}
          {use_header && (
            <thead>
              <tr>
                {header.map((headerCell, index) => (
                  <th
                    key={`header-${index}`}
                    className="px-4 py-6 border border-[#062995] text-left text-sm font-semibold text-[#ea5c44]">
                    {parse(headerCell.c)}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          {/* Render Body */}
          <tbody>
            {body.map((row, rowIndex) => (
              <tr key={`row-${rowIndex}`}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={`cell-${rowIndex}-${cellIndex}`}
                    className="px-4 py-2 border border-[#062995] text-sm text-[#ea5c44] whitespace-nowrap">
                    {cell.c === '✔️' ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={3}
                        stroke="currentColor"
                        className="size-4 relative top-[2px]">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 12.75 6 6 9-13.5"
                        />
                      </svg>
                    ) : (
                      parse(cell.c)
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

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
                <div>
                  <div className="mb-[75px]">
                    <H1>Package Comparison Table</H1>
                  </div>

                  <ComparisonTable
                    tableData={data?.acf?.packages_comparison_table?.table}
                  />
                </div>
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
