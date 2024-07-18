let isWPDev = process.env.WP_ENV === 'development'
let isDev = process.env.NODE_ENV === 'development'

require('dotenv').config({
  path: `.env.${isWPDev ? 'development' : 'production'}`,
})

let config = {
  siteMetadata: {
    title: 'Wagner & Co.',
    siteUrl: 'https://wagnerandco.film',
  },
  plugins: [
    'gatsby-plugin-layout',
    'gatsby-plugin-postcss',
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-gatsby-cloud`,
      options: {
        mergeSecurityHeaders: false,
        mergeLinkHeaders: true,
        mergeCachingHeaders: true,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Wagner & Co.`,
        short_name: `W & Co.`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#0074d9`,
        display: `standalone`,
        icon: `./favicon.png`,
      },
    },
    {
      /**
       * ? We need this plugin so that it adds the "File.publicURL" to our site
       * ? It will allow us to access static url's for assets like PDF's
       * ? See https://www.gatsbyjs.org/packages/gatsby-source-filesystem/ for more info
       */
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: `gatsby-theme-headless-wordpress`,
      options: {
        type: {
          __all: {
            // '__all' will override options for all post types
            postsPerPage: 6, // overrides the postsPerPage option from WordPress reading settings
          },
        },
      },
    },
    `gatsby-plugin-image`,

    {
      resolve: 'gatsby-source-wordpress',
      options: {
        // The base URL of the Wordpress site without the trailingslash and the protocol.
        url: `${process.env.WP_URL}/graphql`,
        html: {
          createStaticFiles: false,
        },
        type: {
          MediaItem: {
            createFileNodes: false,
          },
          Post: {
            limit: 20,
          },
        },
      },
    },
    {
      resolve: 'gatsby-source-gravityforms',
      options: {
        // Base URL needs to include protocol (http/https)
        baseUrl: process.env.WP_URL,
        // Gravity Forms API
        api: {
          key: process.env.GF_KEY,
          secret: process.env.GF_SECRET,
        },
        basicAuth: {
          // Not working with Basic Auth, GF API keys already
          // seem to be used for Basic Auth, so you wouldn’t have
          // that and the site-wide Basic Auth as far as I can tell
          // Actually do seem to need this on Anchor.host setup,
          // which is good
          username: process.env.WP_USERNAME,
          password: process.env.WP_PASSWORD,
        },
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        excludes: [
          `/packages/*`,
          `/highlights/*`,
          `/guides/*`,
          `/packages`,
          `/highlight`,
          `/guide`,
          `/video-demo`,
          `/styleguide`,
        ],
        query: `{
          site {
            siteMetadata {
              siteUrl
            }
          }
          allSitePage {
            nodes {
              path
            }
          }
          allWpContentNode(filter: {nodeType: {in: ["Post", "Page", "Product"]}}) {
            nodes {
              ... on WpPost {
                uri
                modifiedGmt
              }
              ... on WpPage {
                uri
                modifiedGmt
              }
            }
          }
      }`,
        resolveSiteUrl: () => config.siteMetadata.siteUrl,
        resolvePages: ({
          allSitePage: { nodes: allPages },
          allWpContentNode: { nodes: allWpNodes },
        }) => {
          const wpNodeMap = allWpNodes.reduce((acc, node) => {
            const { uri } = node
            acc[uri] = node

            return acc
          }, {})

          return allPages.map((page) => {
            return { ...page, ...wpNodeMap[page.path] }
          })
        },
        serialize: ({ path, modifiedGmt }) => {
          return {
            url: path,
            lastmod: modifiedGmt,
          }
        },
      },
    },
  ],
}

if (isDev) {
  config.plugins.push('gatsby-plugin-accessibilityjs')
}

module.exports = config
