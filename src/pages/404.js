import React from 'react'
import { Link } from 'gatsby'

// Ours
import PageWrapper from '../components/PageWrapper'
import { H1, Intro } from '../components/Headings'

const NotFoundPage = () => (
  <PageWrapper className="center">
    <H1>Page Not Found</H1>
    <Intro typogrify={false}>
      Sorry, there is nothing here. If there should be, feel free to{' '}
      <Link to="/contact">Contact Us</Link>.
    </Intro>
  </PageWrapper>
)

export default NotFoundPage
