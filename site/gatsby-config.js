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
        sanityProjectId: process.env.SANITY_PROJECT_ID,
        sanityDataset: process.env.SANITY_DATASET,
        sanityToken: process.env.SANITY_TOKEN
      }
    },
    {
      resolve: "gatsby-plugin-google-analyitcs",
      options: {
        trackingId: process.env.GA_ID,
        head: true,
        anonymize: true
      }
    },
    {
      resolve: "gatsby-plugin-canonical-urls",
      options: {
        siteUrl: siteConfig.siteUrl,
        stripQueryString: true
      }
    },
    "gatsby-plugin-robots-txt",
    "gatsby-plugin-netlify" // make sure to keep last
  ]
};
