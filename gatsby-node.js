// const path = require(`path`)
// const graphql = require('gatsby').graphql

// // Same as
// // const permittedSlug = require('./src/utils/permitted-slug')
// const permittedSlug = function(slug) {
//   if (slug === 'schema' || slug === 'placeholder') {
//     if (process && process.env && process.env.NODE_ENV === 'development') {
//       console.warn('Permitting ', slug)
//       return true
//     }
//     return false
//   }
//   return true
// }

// const template = {
//   page: path.resolve(`./src/templates/WPPage.js`),
//   post: path.resolve(`./src/templates/WPPost.js`),
//   wedding: path.resolve(`./src/templates/WPWedding.js`),
//   highlight: path.resolve(`./src/templates/WPHighlight.js`),
//   guide: path.resolve(`./src/templates/WPGuide.js`),
//   info: path.resolve(`./src/templates/WPInfo.js`),
// }

// const customPostTypes = [
//   {
//     slug: 'weddings/',
//     template: 'wedding',
//     name: 'Weddings',
//     singular_name: 'Wedding',
//   },
//   {
//     slug: 'highlights/',
//     template: 'highlight',
//     name: 'Highlights',
//     singular_name: 'Highlight',
//   },
//   {
//     slug: 'guides/',
//     template: 'guide',
//     name: 'Guides',
//     singular_name: 'Guide',
//   },
//   { slug: '', template: 'info', name: 'Info', singular_name: 'Info' },
// ]

// // Will create pages for Wordpress pages (route : /{slug})
// exports.createPages = ({ graphql, actions }) => {
//   const { createPage, createRedirect } = actions

//   // Wrapper around createRedirect
//   const oldSlugsToRedirects = function(old_slugs, opts = {}) {
//     opts.slugPrefix = opts.slugPrefix || ''
//     opts.toPath = opts.toPath || '/'
//     opts.isPermanent = opts.isPermanent || false

//     if (old_slugs && old_slugs.length >= 1) {
//       old_slugs.forEach(oldSlug => {
//         // Very important that oldSlug !== ''
//         // '' is an empty array item, which is how I am
//         // getting around the GraphQL API issue when there
//         // are no redirects
//         if (oldSlug && oldSlug !== '') {
//           createRedirect({
//             fromPath: `${opts.slugPrefix}${oldSlug}`,
//             toPath: opts.toPath,
//             isPermanent: opts.isPermanent,
//           })
//         }
//       })
//     }

//     return
//   }

//   return new Promise((resolve, reject) => {
//     // First, query all the pages on your WordPress
//     graphql(
//       `
//         {
//           allWordpressPage {
//             edges {
//               node {
//                 id
//                 slug
//                 old_slugs
//                 status
//                 template
//               }
//             }
//           }
//         }
//       `
//     )
//       .then(result => {
//         if (result.errors) {
//           reject(result.errors)
//         }

//         // Create pages with the Page template.
//         result.data.allWordpressPage.edges.forEach(({ node }) => {
//           let slugPrefix = '/'
//           let slugPath = `${slugPrefix}${node.slug}/`

//           createPage({
//             path: slugPath,
//             component: template[node.slug] || template.page,
//             context: {
//               id: node.id,
//             },
//           })

//           oldSlugsToRedirects(node.old_slugs, {
//             slugPrefix: slugPrefix,
//             toPath: slugPath,
//           })

//           return
//         })
//       })

//       // Now, querying all wordpressPosts
//       .then(() => {
//         let cptGraphQL = []

//         // Create the query for each Custom Post Type
//         customPostTypes.forEach(cpt => {
//           cptGraphQL.push(`allWordpressWp${cpt.name} {
//             edges {
//               node {
//                 id
//                 slug
//                 old_slugs
//                 modified
//                 title
//               }
//             }
//           }`)
//         })

//         cptGraphQL = cptGraphQL.join(' ')

//         graphql(
//           `
//             {
//               allWordpressPost {
//                 edges {
//                   node {
//                     id
//                     slug
//                     # TODO return as null in WP
//                     old_slugs
//                     modified
//                     title
//                   }
//                 }
//               }
//               ${cptGraphQL}
//             }
//           `
//         )
//           .then(result => {
//             if (result.errors) {
//               reject(result.errors)
//             }

//             // We want to create a detailed page for each
//             // post node. We'll just use the Wordpress Slug for the slug.
//             // The Post ID is prefixed with 'POST_'
//             result.data.allWordpressPost.edges.forEach(({ node }) => {

//               // Don’t include placeholder schema posts
//               // Don’t include placeholder schema posts
//               if (!permittedSlug(node.slug)) {
//                 return false
//               }

//               let slugPrefix = `/blog/`
//               let slugPath = `${slugPrefix}${node.slug}`

//               createPage({
//                 path: slugPath,
//                 component: template.post,
//                 context: {
//                   id: node.id,
//                 },
//               })

//               oldSlugsToRedirects(node.old_slugs, {
//                 slugPrefix: slugPrefix,
//                 toPath: slugPath,
//               })

//               return
//             })

//             // Do the same for each Custom Post Type
//             customPostTypes.forEach(cpt => {
//               let query = `allWordpressWp${cpt.name}`
//               let edges = result.data[query].edges
//               if (edges.length >= 1) {
//                 edges.forEach(({ node }) => {

//                   // Don’t include placeholder schema posts
//                   if (!permittedSlug(node.slug)) {
//                     return false
//                   }

//                   let slugPrefix = `/${cpt.slug}`
//                   let slugPath = `${slugPrefix}${node.slug}`
//                   let slugTemplate = template[cpt.template]

//                   createPage({
//                     path: slugPath,
//                     component: slugTemplate ? slugTemplate : template['page'],
//                     context: {
//                       id: node.id,
//                     },
//                   })

//                   oldSlugsToRedirects(node.old_slugs, {
//                     slugPrefix: slugPrefix,
//                     toPath: slugPath,
//                   })

//                   return
//                 })
//               }

//               return
//             })
//           })
//           .then(() => {
//             resolve()
//           })
//       })
//   })
// }
