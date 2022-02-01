let isWPDev = process.env.WP_ENV === 'development'
let isDev = process.env.NODE_ENV === 'development'

require('dotenv').config({
  path: `.env.${isWPDev ? 'development' : 'production'}`,
})

let splitUrl = process.env.WP_URL.toString().split('://')
let baseUrl = splitUrl[1]
let protocol = splitUrl[0]

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
      resolve: 'gatsby-source-wordpress',
      options: {
        // The base URL of the Wordpress site without the trailingslash and the protocol.
        baseUrl: baseUrl,

        // The protocol. This can be http or https.
        protocol: isWPDev ? 'http' : 'https',

        // Indicates whether the site is hosted on wordpress.com.
        hostingWPCOM: false,

        // If useACF is true, then the source plugin will try to import the Wordpress ACF Plugin contents.
        useACF: true,

        auth: {
          // If auth.user and auth.pass are filled, then the source plugin will be allowed
          // to access endpoints that are protected with .htaccess.
          htaccess_user: process.env.WP_USERNAME,
          htaccess_pass: process.env.WP_PASSWORD,
          htaccess_sendImmediately: false,
          //
          //   // If hostingWPCOM is true then you will need to communicate with wordpress.com API
          //   // in order to do that you need to create an app (of type Web) at https://developer.wordpress.com/apps/
          //   // then add your clientId, clientSecret, username, and password here
          //   wpcom_app_clientSecret:
          //     'NMPnXYFtj2gKas7V1kZyMxr7oLry9V5ZxIyBQGu2txjVHg0GhFz6RYcKopkHICYg',
          //   wpcom_app_clientId: '54793',
          //   wpcom_user: 'gatsbyjswpexample@gmail.com',
          //   wpcom_pass: 'very-secured-password',
        },

        // Set verboseOutput to true to display a verbose output on `npm run develop` or `npm run build`
        // It can help you debug specific API Endpoints problems.
        verboseOutput: isDev,

        // Set how many pages are retrieved per API request.
        perPage: 30,
        // perPage: 100,

        // Search and Replace Urls across WordPress content.
        searchAndReplaceContentUrls: {
          // if def
          sourceUrl: process.env.WP_URL,
          replacementUrl: '',
        },

        // Set how many simultaneous requests are sent at once.
        concurrentRequests: 10,

        // Exclude specific routes using glob parameters
        // See: https://github.com/isaacs/minimatch
        // Example:  `["/*/*/comments", "/yoast/**"]` will exclude routes ending in `comments` and
        // all routes that begin with `yoast` from fetch.
        excludedRoutes: [
          '/*/*/comments',
          '/*/*/comments/*',
          '/*/*/themes',
          '/*/*/search',
          '/*/*/taxonomies',
          '/*/*/categories',
          '/*/*/tags',
          '/*/*/users',
          '/*/*/users/me',
          '/gf/**/entries',
          '/gf/**/entries/**/*',
        ],
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
    'gatsby-plugin-netlify',
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
