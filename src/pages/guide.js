import React from 'react'
import { graphql, navigate } from 'gatsby'
import Link from 'next/link'
// Ours
import Header from '../components/Header'

class Guide extends React.Component {
  componentDidMount() {
    if (!process || !process.env || process.env.NODE_ENV !== 'development') {
      navigate('/404')
    }
  }

  render() {
    if (!process || !process.env || process.env.NODE_ENV !== 'development') {
      return null
    }

    const data = this.props.data
    let edges = data.allWpGuide.edges

    return (
      <div>
        <Header title="Guides" />
        <p>This page is for development purposes only.</p>
        <ul>
          {edges.map(({ node }, index) => {
            return (
              <li key={index}>
                <Link href={`/guides/${node.slug}`}>{node.title}</Link>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default Guide

export const pageQuery = graphql`
  query GuidesQuery {
    allWpGuide {
      edges {
        node {
          title
          slug
          id
        }
      }
    }
  }
`
