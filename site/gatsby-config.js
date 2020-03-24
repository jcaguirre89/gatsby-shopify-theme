require("dotenv").config();

module.exports = {
  siteMetadata: {
    title: "De Blanco Joyas",
    titleTemplate: "%s | Store",
    description: "Aros y joyería elegante a buen precio",
    url: "https://www.example.com", // no trailing slash
    twitterHandle: "@placeholder",
    instagramHandle: "@placeholder",
    image: "/images/avatar.jpg"
  },
  plugins: [
    {
      resolve: "gatsby-theme-shopify",
      options: {
        shopName: process.env.GATSBY_SHOP_NAME,
        accessToken: process.env.GATSBY_SHOPIFY_ACCESS_TOKEN,
        basePath: "/store",
        sanityProjectId: process.env.SANITY_PROJECT_ID,
        sanityDataset: process.env.SANITY_DATASET,
        sanityToken: process.env.SANITY_TOKEN
      }
    }
  ]
};
