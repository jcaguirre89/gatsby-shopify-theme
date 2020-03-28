import React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import Layout from '../components/layout';
import StickyHero from '../components/StickyHero';
import ProductList from '../components/ProductList';
import Header from '../components/header';
import Hero from '../components/Hero';

const Content = styled.div`
  margin: 0;
  background: ${props => props.theme.white};
`;

export default function Home({ data }) {
  const products = data.products.nodes;
  const {
    background,
    title,
    subtitle,
    content_location,
  } = data.allSanityHero.edges[0].node;
  return (
    <Layout>
      <Header smart />
      <Hero
        title={title}
        subtitle={subtitle}
        contentLocation={content_location}
        imageFluid={background.asset.fluid}
      />
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
    allSanityHero(filter: { publish: { eq: true } }) {
      edges {
        node {
          title
          subtitle
          content_location
          background {
            asset {
              fluid(maxWidth: 1400) {
                ...GatsbySanityImageFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`;
