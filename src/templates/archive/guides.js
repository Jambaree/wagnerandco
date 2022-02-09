// import React from 'react'
// import { Link, graphql, navigate } from 'gatsby'

// // Ours
// import Header from '../components/Header'

// class GuidesIndexPage extends React.Component {
//   componentDidMount() {
//     if (!process || !process.env || process.env.NODE_ENV !== 'development') {
//       navigate('/404')
//     }
//   }

//   render() {
//     if (!process || !process.env || process.env.NODE_ENV !== 'development') {
//       return null
//     }

//     const data = this.props.data
//     let edges = data.allWordpressWpGuides.edges

//     return (
//       <div>
//         <Header title="Guides" />
//         <p>This page is for development purposes only.</p>
//         <ul>
//           {edges.map(({ node }, index) => {
//             return (
//               <li key={index}>
//                 <Link to={`/guides/${node.slug}`}>{node.title}</Link>
//               </li>
//             )
//           })}
//         </ul>
//       </div>
//     )
//   }
// }

// export default GuidesIndexPage

// export const pageQuery = graphql`
//   query GuidesQuery {
//     allWordpressWpGuides {
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
