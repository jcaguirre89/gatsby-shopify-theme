module.exports = ({ shopName, accessToken }) => ({
  plugins: [
    {
      resolve: `gatsby-source-shopify`,
      options: {
        shopName,
        accessToken
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: "data"
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: "images"
      }
    },
    {
      resolve: "gatsby-transformer-yaml",
      options: {
        typeName: "Product"
      }
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`
  ]
});
