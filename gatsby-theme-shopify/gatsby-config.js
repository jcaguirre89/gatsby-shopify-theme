module.exports = ({ shopName, accessToken }) => ({
  siteMetadata: {
    title: 'Placeholder Store Name',
    titleTemplate: '%s | Store',
    description: 'Placeholder descripion',
    url: 'https://www.example.com', // no trailing slash
    twitterHandle: '@placeholder',
    instagramHandle: '@placeholder',
    image: '/images/avatar.jpg',
  },
  plugins: [
    {
      resolve: `gatsby-source-shopify`,
      options: {
        shopName,
        accessToken,
      },
    },
    {
      resolve: `gatsby-source-sanity`,
      options: {
        projectId: process.env.SANITY_PROJECT_ID,
        dataset: process.env.SANITY_DATASET,
        token: process.env.SANITY_TOKEN,
        watchMode: true,
        overlayDrafts: true,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: 'data',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: 'images',
      },
    },
    {
      resolve: 'gatsby-transformer-yaml',
      options: {
        typeName: 'Product',
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-sharp`,
  ],
});
