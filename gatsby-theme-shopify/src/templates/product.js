import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Product from '../components/product';

export const query = graphql`
  query($productID: String!) {
    product(id: { eq: $productID }) {
      brand
      model
      year
      description
      price
      datePublished(formatString: "MMMM DD YYYY")
      slug
    }
  }
`;

export default function ProductTemplate({ data: { product } }) {
  return (
    <Layout>
      <Product {...product} />
    </Layout>
  );
}
