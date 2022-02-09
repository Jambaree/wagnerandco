import React from 'react'
import { Link, graphql } from 'gatsby'

// Ours
import Header from '../components/Header'
import { H2 } from '../components/Headings'

const InfoIndexPage = props => {
  const data = props.data
  let edges = data.infos.edges

  return (
    <div>
      <Header title="Info" />
      <ul className="list-style-none m0 p0">
        {edges.map(({ node }, index) => {
          return (
            <li key={node.id} className="block mb3 md-mb4">
              <Link to={`/${node.slug}`} className="block border-none">
                <H2 align="left">{node.title}</H2>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default InfoIndexPage

export const pageQuery = graphql`
  query InfoQuery {
    infos {
      edges {
        node {
          slug
          title
          id
        }
      }
    }
    # allWordpressWpInfo {
    #   edges {
    #     node {
    #       title
    #       slug
    #       id
    #     }
    #   }
    # }
  }
`
