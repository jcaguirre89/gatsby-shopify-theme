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
    image: '/images/avatar.jpg',
    email: 'contact@example.com',
    phone: '+569 xxxx xxxx',
    twitterHandle: '@placeholder',
    instagramHandle: '@placeholder',
    facebookHandle: 'placeholder',
    shopify: {
      domain: `${shopName}.myshopify.com`,
      accessToken,
    },
    gatsbyStorefrontConfig: {
      storePath: '/store',
      collectionPath: '/collections',
      productsPerCollectionPage: 9,
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
    {
      resolve: 'gatsby-plugin-styled-components',
      options: {
        displayName: process.env.NODE_ENV !== 'production',
      },
    },
    {
      resolve: '@gatsby-contrib/gatsby-plugin-elasticlunr-search',
      options: {
        fields: ['title', 'description'],
        resolvers: {
          ShopifyProduct: {
            title: node => node.title,
            description: node => node.description,
            handle: node => node.handle,
            // mainImage: (node, getNode) => getNode(node.images[0]),
          },
        },
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
  ],
});
