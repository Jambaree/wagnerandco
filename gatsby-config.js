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
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        // The base URL of the Wordpress site without the trailingslash and the protocol.
        url: `${process.env.WP_URL}/graphql`,
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
      resolve: `gatsby-plugin-sitemap`,
      options: {
        exclude: [
          '/home',
          '/packages', // Packages are noindex
          '/packages/*',
          '/guides', // Packages are noindex
          '/guides/*',
          '/highlights', // Packages are noindex
          '/highlights/*',
          '/video-demo',
          '/styleguide',
          '/info',
        ],
        serialize: ({ site, allSitePage }) =>
          allSitePage.edges.map(edge => {
            let edgePath = edge.node.path
            let priority = 0.7
            let changefreq = 'weekly'

            if (edgePath.includes('blog')) {
              priority = 0.4
            }

            if (edgePath.includes('weddings')) {
              priority = 0.8
            }

            if (edge.node.path === '' || edge.node.path === '/') {
              priority = 1.0
            }

            return {
              url: site.siteMetadata.siteUrl + edgePath,
              changefreq: changefreq,
              priority: priority,
            }
          }),
      },
    },
  ],
}

if (isDev) {
  config.plugins.push('gatsby-plugin-accessibilityjs')
}

module.exports = config
