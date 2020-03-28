require("dotenv").config();

module.exports = {
  siteMetadata: {
    title: "De Blanco Joyas",
    titleTemplate: "%s | Store",
    description: "Aros y joyería elegante a buen precio",
    url: "https://www.example.com", // no trailing slash
    twitterHandle: "@placeholder",
    instagramHandle: "@placeholder",
    email: "contact@example.com",
    phone: "+569 xxxx xxxx",
    image: "/images/avatar.jpg",
    gatsbyStorefrontConfig: {
      storePath: "/store",
      collectionsPath: "/collections",
      productsPerCollectionPage: 9
    }
  },
  plugins: [
    {
      resolve: "gatsby-theme-shopify",
      options: {
        shopName: process.env.GATSBY_SHOP_NAME,
        accessToken: process.env.GATSBY_SHOPIFY_ACCESS_TOKEN,
        sanityProjectId: process.env.SANITY_PROJECT_ID,
        sanityDataset: process.env.SANITY_DATASET,
        sanityToken: process.env.SANITY_TOKEN
      }
    }
  ]
};
