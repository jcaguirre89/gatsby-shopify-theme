import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Header from '../components/header';
import ProductList from '../components/ProductList';

export default function CollectionPage({ data }) {
  const { title, products } = data.shopifyCollection;
  return (
    <Layout>
      <Header smart={false} />
      <ProductList products={products} />
    </Layout>
  );
}

export const query = graphql`
  query CollectionQuery($handle: String!) {
    shopifyCollection(handle: { eq: $handle }) {
      title
      products {
        availableForSale
        description
        descriptionHtml
        handle
        variants {
          id
          price
        }
        images {
          localFile {
            childImageSharp {
              fluid(maxWidth: 910) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
        }
      }
    }
  }
`;
