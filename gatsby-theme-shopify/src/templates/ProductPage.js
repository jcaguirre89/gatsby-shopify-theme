/* eslint-disable react/prop-types, react/no-danger */

import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Img from 'gatsby-image';
import SEO from '../components/SEO';
import Layout from '../components/layout';
import Header from '../components/header';

const Container = styled.div`
  transform: translateY(90px);
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
`;

const ImageContainer = styled.ul`
  display: flex;
  flex-direction: column;
`;

export default function ProductPage({ data }) {
  const product = data.shopifyProduct;
  return (
    <Layout>
      <SEO title={product.title} description={product.description} />
      <Header smart={false} />
      <Container>
        <ImageContainer>
          {product.images.map(image => (
            <Img
              fluid={image.localFile.childImageSharp.fluid}
              key={image.id}
              alt={product.title}
            />
          ))}
        </ImageContainer>
        <div>
          <h2>{product.title}</h2>
          <p dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}></p>
        </div>
      </Container>
    </Layout>
  );
}

export const query = graphql`
  query($handle: String!) {
    shopifyProduct(handle: { eq: $handle }) {
      id
      title
      handle
      description
      descriptionHtml
      images {
        id
        localFile {
          childImageSharp {
            fluid(maxWidth: 910) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
      variants {
        id
        price
      }
    }
  }
`;
