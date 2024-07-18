import React from 'react'

import Link from 'next/link'
// Ours
import Header from '../../src/components/Header'
import { H2 } from '../../src/components/Headings'

export function SinglePackagesTemplate(props) {
  const data = props.data
  let edges = data.allWpInfo.edges

  return <div>singular packages template</div>
}

// export const pageQuery = graphql`
//   query InfoQuery {
//     allWpInfo {
//       edges {
//         node {
//           title
//           slug
//           id
//         }
//       }
//     }
//   }
// `
