const productTemplate = require.resolve('./src/templates/ProductPage.js');
const collectionTemplate = require.resolve('./src/templates/CollectionPage.js');

function removeTrailingLeadingSlashes(string) {
  return string.replace(/^\/*|\/*$/g, '');
}

exports.createPages = async ({ graphql, actions }, options) => {
  const { createPage } = actions;

  const gatsbyStorefrontConfig = await graphql(`
    {
      site {
        siteMetadata {
          gatsbyStorefrontConfig {
            productsPerCollectionPage
            storePath
            collectionPath
          }
        }
      }
    }
  `);
  let {
    productsPerCollectionPage = 9,
    storePath,
    collectionPath,
  } = gatsbyStorefrontConfig.data.site.siteMetadata.gatsbyStorefrontConfig;
  storePath = removeTrailingLeadingSlashes(storePath);
  collectionPath = removeTrailingLeadingSlashes(collectionPath);

  // Product Pages
  const queryProducts = await graphql(`
    {
      allShopifyProduct {
        nodes {
          handle
        }
      }
    }
  `);
  queryProducts.data.allShopifyProduct.nodes.forEach(({ handle }) => {
    createPage({
      path: `${storePath}/${handle}/`,
      component: productTemplate,
      context: { handle },
    });
  });

  // Collections pages
  const queryCollections = await graphql(`
    {
      collections: allShopifyCollection {
        nodes {
          handle
          products {
            id
          }
        }
      }
    }
  `);
  queryCollections.data.collections.nodes.forEach(({ handle, products }) => {
    const collectionProductsCount = products.length;
    const productsPerPage = parseInt(productsPerCollectionPage);
    const numPages = Math.ceil(collectionProductsCount / productsPerPage);
    // This is the for i in range(x) of javascript
    Array.from({ length: numPages }).forEach((_, page) => {
      createPage({
        path:
          page === 0
            ? `${collectionPath}/${handle}`
            : `${collectionPath}/${handle}/${numPages + 1}`,
        component: collectionTemplate,
        context: {
          handle,
          limit: productsPerPage,
          skip: page * productsPerPage,
          numPages,
          currentPage: page + 1,
        },
      });
    });
  });
};
