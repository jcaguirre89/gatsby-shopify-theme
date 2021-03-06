require("dotenv").config();
const siteConfig = require("./config/site-config");

module.exports = {
  siteMetadata: { ...siteConfig },
  plugins: [
    {
      resolve: "@jcaguirre/gatsby-shopify-theme",
      options: {
        shopName: process.env.GATSBY_SHOP_NAME,
        accessToken: process.env.GATSBY_SHOPIFY_ACCESS_TOKEN,
        sanityProjectId: process.env.GATSBY_SANITY_PROJECT_ID,
        sanityDataset: process.env.GATSBY_SANITY_DATASET,
        sanityToken: process.env.GATSBY_SANITY_TOKEN
      }
    }
  ]
};
