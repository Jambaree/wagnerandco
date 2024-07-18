import React from 'react'
import { graphql, navigate } from 'gatsby'
import Link from 'next/link'
// Ours
import Header from '../components/Header'

class HighlightsIndexPage extends React.Component {
  componentDidMount() {
    if (
      !process ||
      !process.env ||
      !process.env.NODE_ENV ||
      process.env.NODE_ENV !== 'development'
    ) {
      navigate('/404')
    }
  }

  render() {
    if (
      !process ||
      !process.env ||
      !process.env.NODE_ENV ||
      process.env.NODE_ENV !== 'development'
    ) {
      return null
    }

    const data = this.props.data
    let downloadEdges = data.allWpHighlight.edges

    return (
      <div>
        <Header title="Highlights" />
        <p>This page is for development purposes only.</p>
        <ul>
          {downloadEdges.map(({ node }, index) => {
            return (
              <li key={index}>
                <Link href={`/highlights/${node.slug}`}>{node.title}</Link>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default HighlightsIndexPage

export const pageQuery = graphql`
  query HighlightsQuery {
    allWpHighlight {
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
