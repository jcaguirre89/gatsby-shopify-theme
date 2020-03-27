module.exports = ({
  shopName,
  accessToken,
  sanityProjectId,
  sanityDataset,
  sanityToken,
}) => ({
  siteMetadata: {
    title: 'Placeholder Store Name',
    titleTemplate: '%s | Store',
    description: 'Placeholder descripion',
    url: 'https://www.example.com', // no trailing slash
    twitterHandle: '@placeholder',
    instagramHandle: '@placeholder',
    image: '/images/avatar.jpg',
    shopify: {
      domain: `${shopName}.myshopify.com`,
      accessToken,
    },
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
        projectId: sanityProjectId,
        dataset: sanityDataset,
        token: sanityToken,
        watchMode: true,
        overlayDrafts: true,
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /\.inline\.svg$/,
        },
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-sharp`,
    // Safe to remove these?
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
  ],
});
