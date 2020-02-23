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
      resolve: "gatsby-transformer-yaml",
      options: {
        typeName: "Product"
      }
    }
  ]
});
