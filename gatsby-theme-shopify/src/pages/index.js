import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import StickyHero from '../components/StickyHero';
import ProductList from '../components/ProductList';
import Header from '../components/header';

const Content = styled.div`
  margin: 0;
  background: ${props => props.theme.white};
`;

export default function Home({ data }) {
  const products = data.products.nodes;
  console.log(products);
  return (
    <Layout>
      <Header smart />
      <StickyHero />
      <Content>
        <ProductList products={products} />
      </Content>
    </Layout>
  );
}

export const query = graphql`
  query allProducts {
    products: allShopifyProduct(sort: { order: DESC, fields: handle }) {
      nodes {
        title
        description
        handle
        availableForSale
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
