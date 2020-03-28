import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Header from '../components/header';
import ProductList from '../components/ProductList';
import Hero from '../components/Hero';

export default function CollectionPage({ data }) {
  const { title, image, products } = data.shopifyCollection;
  console.log('a', title);
  return (
    <Layout>
      <Header smart />
      <Hero
        contentLocation="right"
        title={title}
        imageFluid={image.localFile.childImageSharp.fluid}
      />
      <ProductList products={products} />
    </Layout>
  );
}

export const query = graphql`
  query CollectionQuery($handle: String!) {
    shopifyCollection(handle: { eq: $handle }) {
      title
      image {
        localFile {
          childImageSharp {
            fluid(maxWidth: 1400) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
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
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`;
