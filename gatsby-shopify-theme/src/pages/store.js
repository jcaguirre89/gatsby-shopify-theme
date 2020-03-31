import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import ProductList from '../components/ProductList';
import Header from '../components/header';
import LandingPage from '../components/LandingPage';

const Content = styled.div`
  margin: 0;
  background: ${props => props.theme.white};
`;

export default function Store({ data }) {
  const products = data && data.products.nodes;
  const landingPage = data && data.landingPage;
  return (
    <Layout>
      <Header smart />
      <LandingPage {...landingPage} />
      <Content>
        <ProductList products={products} />
      </Content>
    </Layout>
  );
}

export const query = graphql`
  query StoreQuery {
    landingPage: sanityLandingPage(handle: { current: { eq: "store" } }) {
      id
      _rawBody
      title
      subtitle
      cta {
        link
        text
      }
      handle {
        current
      }
      mainImage {
        crop {
          _key
          _type
          top
          bottom
          left
          right
        }
        hotspot {
          _key
          _type
          x
          y
          height
          width
        }
        asset {
          _id
        }
        alt
      }
    }
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
