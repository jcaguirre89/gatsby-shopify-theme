const path = require('path')

function removeTrailingLeadingSlashes(string) {
  return string.replace(/^\/*|\/*$/g, '');
}






const fs = require('fs');
// Make sure directory exists
exports.onPreBootstrap = ({ reporter }) => {
  const contentPath = 'data';
  const imagePath = 'images';
  if (!fs.existsSync(contentPath)) {
    reporter.info(`creating the ${contentPath} directory`);
    fs.makedirSync(contentPath);
  }
  if (!fs.existsSync(imagePath)) {
    reporter.info(`creating the ${imagePath} directory`);
    fs.makedirSync(imagePath);
  }
};
// Define the Product type
exports.sourceNodes = ({ actions }) => {
  actions.createTypes(`
    type Product implements Node @dontInfer {
      id: ID!
      brand: String!
      model: String!
      price: Int!
      year: Int!
      description: String
      datePublished: Date! @dateformat @proxy(from: "date_published")
      slug: String!
      imgLarge: String
      imgSmall: String
    }
  `);
};
// Define resolvers for custom fields
exports.createResolvers = ({ createResolvers }) => {
  const basePath = '/';
  // Quick-and-dirty helper to convert strings into URL-friendly slugs.
  const slugify = str => {
    const slug = str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    return `/${basePath}/${slug}`.replace(/\/\/+/g, '/');
  };
  createResolvers({
    Product: {
      slug: {
        resolve: source =>
          slugify(`${source.brand} ${source.model} ${source.year}`)
      }
    }
  });
};
// Query for products and create pages
exports.createPages = async ({ actions, graphql, reporter }) => {
  const basePath = '/';
  actions.createPage({
    path: basePath,
    component: require.resolve('./src/templates/products.js')
  });
  const result = await graphql(`
    query MyQuery {
      allProduct(sort: { fields: price, order: DESC }) {
        nodes {
          id
          slug
        }
      }
    }
  `);
  if (result.errors) {
    reporter.panic('error loading products', result.errors);
    return;
  }
  const products = result.data.allProduct.nodes;
  products.forEach(product => {
    const slug = product.slug;
    actions.createPage({
      path: slug,
      component: require.resolve('./src/templates/product.js'),
      context: {
        productID: product.id
      }
    });
  });
};
