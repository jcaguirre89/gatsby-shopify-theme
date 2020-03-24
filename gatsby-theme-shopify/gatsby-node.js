const productTemplate = require.resolve('./src/templates/ProductPage.js');

function removeTrailingLeadingSlashes(string) {
  return string.replace(/^\/*|\/*$/g, '');
}

exports.createPages = async ({ graphql, actions }, options) => {
  const { createPage } = actions;
  let { storePath = '' } = options;
  storePath = removeTrailingLeadingSlashes(storePath);
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
};
